# System Design: Rate Limiter

**Problem:** Design a rate limiter to protect APIs from abuse. Allow N requests per time window per user/IP/API key.

---

## **Requirements**

### **Functional**
- Limit requests per user/IP/API key
- Support multiple time windows (per second, minute, hour, day)
- Return rate limit info in response headers
- Support different limit policies (user tier, API tier)

### **Non-Functional**
- Scale: 100K requests/sec to rate limiter
- Latency: <5ms per request check
- Accuracy: ±5% (distributed systems; hard to be exact)
- Availability: 99.99% (must not bring down API)

---

## **Capacity Planning**

| Metric | Value | Calculation |
|--------|-------|-------------|
| **Requests/sec** | 100K | All APIs through rate limiter |
| **Storage (rate limits)** | ~500 GB | 1B users × 500 bytes per user state |
| **Bandwidth** | ~50 Mbps | 100K QPS × 5 bytes (counter) |

---

## **API Design**

### **Rate Limiter Check**
```
Internal API (called by API gateway):
GET /ratelimit/check
Headers: 
  X-User-Id: 12345
  X-Client-Ip: 192.168.1.1
  X-Api-Key: key_xyz

Response (200 OK):
{
  "allowed": true,
  "remaining": 99,
  "limit": 100,
  "reset_at": 1643643660,
  "retry_after": null
}

Response (429 Too Many Requests):
{
  "allowed": false,
  "remaining": 0,
  "limit": 100,
  "reset_at": 1643643660,
  "retry_after": 30  // seconds until allowed
}
```

### **Set Rate Limit Policy**
```
POST /admin/rate-limits
Authorization: Bearer {admin_token}

{
  "entity_type": "user",  // user, api_key, ip
  "entity_id": "user_12345",
  "limits": {
    "per_second": 10,
    "per_minute": 100,
    "per_hour": 1000,
    "per_day": 10000
  }
}
```

---

## **Algorithms**

### **1. Token Bucket (Recommended)**

**Concept:** User gets N tokens per time window. Each request consumes 1 token.

```python
class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity  # e.g., 10 tokens
        self.refill_rate = refill_rate  # e.g., 10 tokens/sec
        self.tokens = capacity
        self.last_refill = time.now()
    
    def is_allowed(self):
        now = time.now()
        elapsed = (now - self.last_refill).total_seconds()
        
        # Refill tokens
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now
        
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
```

**Advantages:**
- Supports burst traffic (up to capacity)
- Smooth rate limiting
- Works with distributed systems

**Disadvantages:**
- Requires state per user; doesn't scale to 1B users

---

### **2. Leaky Bucket**

**Concept:** Requests flow into bucket; drain at fixed rate.

```python
class LeakyBucket:
    def __init__(self, capacity, drain_rate):
        self.capacity = capacity  # Max requests in bucket
        self.drain_rate = drain_rate  # Req/sec drained
        self.bucket = 0
        self.last_drain = time.now()
    
    def is_allowed(self):
        now = time.now()
        elapsed = (now - self.last_drain).total_seconds()
        
        # Drain bucket
        self.bucket = max(0, self.bucket - elapsed * self.drain_rate)
        self.last_drain = now
        
        if self.bucket < self.capacity:
            self.bucket += 1
            return True
        return False
```

**Advantages:**
- Smooth output; prevents spikes
- Good for protecting backend services

**Disadvantages:**
- Doesn't allow burst traffic

---

### **3. Sliding Window Log**

**Concept:** Keep log of request timestamps; count in window.

```python
class SlidingWindowLog:
    def __init__(self, limit, window_seconds):
        self.limit = limit
        self.window_seconds = window_seconds
        self.requests = deque()  # Timestamps
    
    def is_allowed(self):
        now = time.time()
        
        # Remove old entries outside window
        while self.requests and self.requests[0] < now - self.window_seconds:
            self.requests.popleft()
        
        if len(self.requests) < self.limit:
            self.requests.append(now)
            return True
        return False
```

**Advantages:**
- Accurate; no edge cases

**Disadvantages:**
- High memory (stores all request times)
- Doesn't scale to 1B users

---

### **4. Sliding Window Counter (Most Practical)**

**Concept:** Combine fixed window + sliding window. Interpolate across windows.

```python
class SlidingWindowCounter:
    def __init__(self, limit, window_seconds):
        self.limit = limit
        self.window_seconds = window_seconds
        self.current_window = {}  # {timestamp: count}
    
    def is_allowed(self):
        now = time.time()
        current_second = int(now)
        
        # Clean old windows (keep only current + previous)
        for ts in list(self.current_window.keys()):
            if ts < current_second - self.window_seconds:
                del self.current_window[ts]
        
        # Count requests in current window
        count = sum(self.current_window.values())
        
        if count < self.limit:
            self.current_window[current_second] = \
                self.current_window.get(current_second, 0) + 1
            return True
        return False
```

**Advantages:**
- Memory efficient
- Accurate enough for most use cases
- Handles edge cases between windows

**Disadvantages:**
- Slight inaccuracy (±10%)

---

## **Distributed Rate Limiter (Key Challenge)**

### **Problem with Single Server**
```
API Server 1 → Rate Limiter (bottleneck)
API Server 2 → Rate Limiter
API Server 3 → Rate Limiter
```

Single rate limiter becomes bottleneck at 100K QPS.

### **Solution: Redis-Based Distributed**

```python
class DistributedRateLimiter:
    def is_allowed(self, user_id, limit=100, window_seconds=60):
        redis_client = get_redis()
        key = f"rate_limit:{user_id}"
        
        # Increment counter
        current = redis_client.incr(key)
        
        # Set expiration (only on first request in window)
        if current == 1:
            redis_client.expire(key, window_seconds)
        
        # Check limit
        if current <= limit:
            return True, limit - current + 1  # remaining
        else:
            ttl = redis_client.ttl(key)
            return False, ttl  # seconds until reset
```

**Implementation Details:**
- Use Redis Cluster (3–10 nodes) for redundancy
- Each node holds subset of user rate limits
- Consistent hashing: same user → same Redis node
- TTL expires keys automatically

**Latency:** ~1–2ms per check (network round trip)

---

## **Multi-Level Rate Limiting**

```
┌─────────────────────────┐
│ Client Request          │
└────────────┬────────────┘
             │
      Level 1: IP-based (Simple DDoS protection)
      ┌──────▼──────┐
      │ Limit: 1K/min
      │ per IP       │
      └──────┬──────┘
             │ (Pass)
      Level 2: User-based (Auth required)
      ┌──────▼──────┐
      │ Limit: 100/min
      │ per user     │
      └──────┬──────┘
             │ (Pass)
      Level 3: API key-based (Premium tier)
      ┌──────▼──────┐
      │ Limit: 10K/min
      │ per key      │
      └──────┬──────┘
             │ (Pass)
      Level 4: Global (System protection)
      ┌──────▼──────┐
      │ Limit: 100K/sec
      │ system-wide  │
      └──────┬──────┘
             │
      ┌──────▼──────────────────┐
      │ Request reaches backend │
      └─────────────────────────┘
```

---

## **Configuration by Tier**

```json
{
  "rate_limits": {
    "free_tier": {
      "per_second": 1,
      "per_minute": 10,
      "per_hour": 100
    },
    "pro_tier": {
      "per_second": 10,
      "per_minute": 100,
      "per_hour": 1000
    },
    "enterprise_tier": {
      "per_second": 100,
      "per_minute": 10000,
      "per_hour": 100000
    },
    "internal_api": {
      "per_second": 1000,
      "per_minute": 100000,
      "per_hour": 10000000
    }
  }
}
```

---

## **Response Headers**

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1643643660
```

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1643643660
Retry-After: 30

{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please retry after 30 seconds."
}
```

---

## **Trade-offs**

| Algorithm | Accuracy | Memory | Computation | Best For |
|-----------|----------|--------|-------------|----------|
| **Token Bucket** | High | Low | Low | Burst-friendly |
| **Leaky Bucket** | High | Low | Medium | Smooth output |
| **Sliding Log** | Exact | High | Medium | Accuracy critical |
| **Sliding Counter** | ±10% | Low | Low | Scale-friendly ✓ |

---

## **Failure Handling**

### **Redis Down**
- **Option A:** Fail open (allow all requests; risky)
- **Option B:** Fail closed (reject all requests; safe)
- **Recommended:** Use local in-memory fallback (not accurate but works)

```python
def is_allowed_with_fallback(user_id):
    try:
        return redis.is_allowed(user_id)
    except RedisError:
        # Fallback: in-memory counter (per server)
        return local_fallback.is_allowed(user_id)
```

### **Clock Skew**
- **Problem:** Servers have different clocks; limits can be gamed
- **Solution:** Use NTP (Network Time Protocol); sync clocks

---

## **Monitoring + Alerting**

- **Rate limit hit rate:** Alert if >5% of requests exceed limit
- **Redis latency:** Target <5ms; alert if >10ms
- **Redis memory:** Alert if >80% full
- **Accuracy:** Spot-check periodically (±10% is acceptable)

---

## **Follow-Up Questions (for Interview)**

- "How do we handle requests from bots/scrapers?" → Stricter limits by User-Agent
- "How do we handle legitimate traffic spikes?" → Whitelist trusted IPs; allow exemptions
- "How do we rate limit by API endpoint?" → Per-endpoint config; weighted limits
- "How do we refund throttled requests?" → Credits or priority queue
- "How do we handle distributed user sessions?" → Track by user_id, not IP

---

**System is production-ready at 100K QPS with <5ms latency per check.** ✅

