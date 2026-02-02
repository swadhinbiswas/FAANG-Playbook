# System Design: URL Shortener

**Problem:** Design a service that converts long URLs into short, unique codes. Users can share the short code and be redirected to the original URL.

---

## **Requirements**

### **Functional**

- Shorten a long URL → get a unique short code (6–8 characters)
- Redirect from short code → original URL
- Custom aliases (optional; user-defined short codes)
- Analytics (redirect count, source, timestamp)

### **Non-Functional**

- Scale: 1M shorten requests/day, 100M redirect requests/day
- Latency: <100ms for both shorten and redirect
- Availability: 99.9% uptime
- Durability: Data must never be lost

---

## **Capacity Planning**

| Metric                   | Value     | Calculation                                   |
| ------------------------ | --------- | --------------------------------------------- |
| **Shorten QPS**          | ~12       | 1M requests / 86.4K seconds                   |
| **Redirect QPS**         | ~1,150    | 100M requests / 86.4K seconds                 |
| **Storage (5 years)**    | ~365 GB   | 1M/day × 365 days × 5 years × 100 bytes/entry |
| **Bandwidth (redirect)** | ~345 Mbps | 1,150 QPS × 300 bytes avg (including headers) |

---

## **API Design**

### **1. Create Short URL**

```
POST /api/v1/shorten
Content-Type: application/json

{
  "long_url": "https://example.com/page?param1=value1&param2=value2",
  "custom_alias": "mylink",          // Optional
  "expiration_seconds": 31536000     // Optional; 1 year default
}

Response (201 Created):
{
  "short_code": "abc123",
  "short_url": "https://tinyurl.co/abc123",
  "long_url": "https://example.com/page?param1=value1&param2=value2",
  "created_at": "2026-02-01T10:00:00Z",
  "expires_at": "2027-02-01T10:00:00Z",
  "analytics_url": "https://tinyurl.co/abc123/analytics"
}
```

### **2. Redirect to Long URL**

```
GET /api/v1/{short_code}
OR
GET /{short_code}  (for direct browser access)

Response (301 Moved Permanently):
Location: https://example.com/page?param1=value1&param2=value2
Set-Cookie: __tracking_id=xyz789; Path=/; HttpOnly; Secure
```

### **3. Get Analytics**

```
GET /api/v1/{short_code}/analytics

Response (200 OK):
{
  "short_code": "abc123",
  "total_clicks": 5432,
  "clicks_by_day": [
    { "date": "2026-02-01", "count": 123 },
    { "date": "2026-02-02", "count": 456 }
  ],
  "top_referrers": [
    { "referrer": "twitter.com", "count": 2000 },
    { "referrer": "facebook.com", "count": 1500 }
  ],
  "top_countries": [
    { "country": "US", "count": 3000 },
    { "country": "IN", "count": 1500 }
  ]
}
```

---

## **Data Model**

### **Core Table: `urls`**

```sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code VARCHAR(8) UNIQUE NOT NULL,
  long_url TEXT NOT NULL,
  user_id BIGINT,  -- NULL for anonymous
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,

  INDEX idx_short_code (short_code),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
```

### **Analytics Table: `url_clicks`**

```sql
CREATE TABLE url_clicks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  url_id BIGINT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  referrer VARCHAR(2048),
  user_agent VARCHAR(512),
  ip_address VARCHAR(45),  -- IPv6 safe
  country VARCHAR(2),

  INDEX idx_url_id_timestamp (url_id, timestamp),
  INDEX idx_timestamp (timestamp),
  FOREIGN KEY (url_id) REFERENCES urls(id)
);
```

### **User Table: `users` (optional)**

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## **High-Level Architecture**

```
┌─────────────────────────────────────┐
│       Client (Browser/Mobile)       │
└──────────────┬──────────────────────┘
               │
       ┌───────▼───────┐
       │  CDN / LB     │  (Geographic distribution)
       └───────┬───────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐        ┌──────▼────┐
│ Shorten │        │ Redirect  │
│ Service │        │ Service   │
└───┬────┘        └──────┬────┘
    │                    │
    │    ┌───────────────┼────────────┐
    │    │               │            │
    │ ┌──▼──┐      ┌────▼─────┐   ┌──▼──┐
    │ │Cache│      │ Database │   │Queue│
    │ │Redis│      │PostgreSQL│   │RabbitMQ
    │ └─────┘      └──────────┘   └─────┘
    │                    │
    └────────────────────┴───────────────┐
                         │
                    ┌────▼─────┐
                    │ Analytics│
                    │ (Spark)  │
                    └──────────┘
```

---

## **Detailed Design**

### **Shorten Flow**

**Step 1: Receive Request**

- Parse long URL
- Validate format
- Check if already shortened (cache lookup)

**Step 2: Generate Short Code**

```
Option A: Base62 Encoding (Recommended)
- Use atomic counter (distributed)
- Convert to base62 (A-Z, a-z, 0-9)
- Ensure uniqueness + collision handling

Option B: Random String
- Generate random 8-char string
- Check collision; retry if exists
- Slower than counter; good for custom aliases

Option C: Zookeeper-based ID Generator
- Use Zookeeper to allocate ID ranges
- Each service gets range; no central bottleneck
```

**Step 2 (Recommended):**

```
counter = AtomicLong(1_000_000_000)
def shorten(long_url):
    id = counter.incrementAndGet()
    short_code = base62_encode(id)  // e.g., 1B → "a", 1B+1 → "b"
    store_url(short_code, long_url)
    cache.set(short_code, long_url, ttl=24h)
    return short_code
```

**Step 3: Store in Database**

- Insert into `urls` table
- Set expiration (default 1 year)
- Return short code

**Step 4: Cache**

- Store mapping in Redis: `short_code → long_url`
- TTL: 24 hours (or based on expiration)

### **Redirect Flow**

**Step 1: Receive Request**

```
GET /abc123
```

**Step 2: Cache Lookup**

```
long_url = cache.get("abc123")
if long_url exists:
    return 301 Redirect to long_url
```

**Step 3: Database Lookup** (if cache miss)

```
row = db.query("SELECT long_url FROM urls WHERE short_code = 'abc123'")
if row:
    cache.set("abc123", row.long_url, ttl=24h)
    return 301 Redirect
else:
    return 404 Not Found
```

**Step 4: Log Analytics** (async)

```
// Async queue; don't block redirect response
analytics_queue.push({
  url_id: row.id,
  referrer: request.headers['referer'],
  user_agent: request.headers['user-agent'],
  ip_address: request.ip,
  timestamp: now()
})
```

---

## **Handling Scale**

### **High Redirect QPS (1,150 QPS)**

- **Problem:** Database can't handle 1,150 queries/sec
- **Solution:**
  - Cache heavily (Redis cluster; 99% hit rate)
  - Use read replicas for cache misses
  - Cache layer should handle 95%+ of traffic

### **Database Writes (12 QPS)**

- **Problem:** Single DB can't handle growth
- **Solution:**
  - Use write-through cache
  - Database writes are cheap (small payload)
  - Sharding by user_id (if applicable) for future scale

### **Analytics Processing**

- **Problem:** 1,150 clicks/sec = 100M clicks/day; can't insert all in DB
- **Solution:**
  - Use message queue (RabbitMQ, Kafka)
  - Batch process: write 100K clicks at a time to analytics table
  - Use Spark/Hadoop for historical analysis

---

## **Failure Handling**

### **Cache Miss (Redis down)**

- Fall back to database
- Database query latency ~5–10ms (acceptable)
- Use circuit breaker; if too many misses, degrade gracefully

### **Database Down**

- Return 503 Service Unavailable
- Use read replicas as failover
- Data already replicated; recovery is quick

### **Queue Overflow (analytics backlog)**

- Discard old analytics events (non-critical)
- Or store in local file; batch upload when queue recovers
- Analytics is nice-to-have; redirect is critical

### **Duplicate Short Codes**

- Use unique constraint on `short_code`
- Handle collision: retry with next ID
- Probability very low if using base62 + counter

---

## **Trade-offs**

| Decision                             | Pros                        | Cons                           |
| ------------------------------------ | --------------------------- | ------------------------------ |
| **Base62 counter vs. random string** | Predictable, no collisions  | Sequential codes (less pretty) |
| **Cache everything vs. selective**   | 99% hit rate, fast          | Cache memory cost              |
| **Analytics sync vs. async**         | Accurate counts             | Blocks response                |
| **Redis vs. Memcached**              | Persistence, expiration     | More complex setup             |
| **PostgreSQL vs. DynamoDB**          | Relational queries, cheaper | Less flexible at scale         |

---

## **Scalability Limits**

| Bottleneck          | Current                      | Solution                         |
| ------------------- | ---------------------------- | -------------------------------- |
| **Cache hits**      | 99% (Redis: 8 cores, 256 GB) | Add more cache nodes; sharding   |
| **Database writes** | 12 QPS                       | Fine for years                   |
| **Database reads**  | Via cache; minimal direct    | Add read replicas if needed      |
| **Storage**         | 365 GB / 5 years             | Data lifecycle; archive old URLs |

---

## **Monitoring + Alerting**

- **P99 redirect latency:** Target <50ms; alert if >100ms
- **Cache hit rate:** Target >95%; alert if <90%
- **Database replication lag:** Alert if >1s
- **Queue depth:** Alert if >100K pending analytics events
- **Shorten error rate:** Alert if >0.1%
- **Redirect 404 rate:** Monitor for abuse

---

## **Follow-Up Questions (for Interview)**

- "What if we need 10x more scale?" → Sharding, multi-region replication
- "How do we prevent abuse (malicious URLs, spam)?" → URL validation, rate limiting per user
- "How do we handle deleted URLs?" → Soft delete + expiration + cleanup jobs
- "How do we monetize?" → Premium features (custom alias, analytics, expiration)
- "How do we prevent hash collisions at 1B URLs?" → Base62 has 62^8 ≈ 200 trillion combinations; fine

---

**System is production-ready at 100M+ redirects/day with proper cache + database setup.** ✅
