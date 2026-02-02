# System Design: News Feed (Social Media)

**Problem:** Design a news feed system for a social media platform (like Facebook/Twitter). Users see posts from friends in real-time, ranked by relevance.

---

## **Requirements**

### **Functional**

- Post creation (text, images, videos)
- Fetch personalized feed (ranked by relevance)
- Like, comment, share
- Real-time notifications
- Search + filter

### **Non-Functional**

- Scale: 1B users, 500M daily active users, 50M post creation/day
- Feed fetch QPS: 10K (peak)
- Latency: <200ms for feed fetch
- Availability: 99.99% uptime
- Durability: Never lose posts

---

## **Capacity Planning**

| Metric                | Value       | Calculation                                       |
| --------------------- | ----------- | ------------------------------------------------- |
| **Post creation QPS** | ~580        | 50M/day / 86.4K sec                               |
| **Feed fetch QPS**    | ~10,000     | 500M users × 2 feeds/day / 86.4K sec (avg)        |
| **Storage (posts)**   | ~25 TB/year | 50M/day × 365 × 1 KB/post                         |
| **Storage (graph)**   | ~10 TB      | User follow graph; 500M users × 100 avg followers |
| **Bandwidth (feed)**  | ~240 Mbps   | 10K QPS × 25 KB avg feed response                 |

---

## **API Design**

### **1. Create Post**

```
POST /api/v1/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Hello, world!",
  "images": ["https://cdn.example.com/img1.jpg"],
  "video_id": "vid123",  // Optional
  "visibility": "friends"  // public, friends, private
}

Response (201 Created):
{
  "id": "post_xyz789",
  "user_id": "user_123",
  "content": "Hello, world!",
  "created_at": "2026-02-01T10:00:00Z",
  "engagement": {
    "likes": 0,
    "comments": 0,
    "shares": 0
  }
}
```

### **2. Get Feed**

```
GET /api/v1/feed?limit=20&offset=0
Authorization: Bearer {token}

Response (200 OK):
{
  "posts": [
    {
      "id": "post_abc123",
      "user_id": "user_456",
      "user_name": "Alice",
      "content": "Just launched my new project!",
      "images": [...],
      "created_at": "2026-02-01T08:30:00Z",
      "engagement": {
        "likes": 1500,
        "comments": 200,
        "shares": 50
      },
      "user_interaction": {
        "liked": false,
        "bookmarked": true
      }
    },
    ...
  ],
  "next_cursor": "offset_20"
}
```

### **3. Like/Unlike Post**

```
POST /api/v1/posts/{post_id}/like
Authorization: Bearer {token}

Response (200 OK):
{
  "liked": true,
  "total_likes": 1501
}
```

### **4. Comment**

```
POST /api/v1/posts/{post_id}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Great post!"
}

Response (201 Created):
{
  "id": "comment_xyz",
  "post_id": "post_abc123",
  "user_id": "user_123",
  "content": "Great post!",
  "created_at": "2026-02-01T10:05:00Z"
}
```

---

## **Data Model**

### **Users Table**

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_username (username)
);
```

### **Posts Table**

```sql
CREATE TABLE posts (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  visibility VARCHAR(50),  -- public, friends, private
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,

  INDEX idx_user_id_created (user_id, created_at),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Follows Table (Graph)**

```sql
CREATE TABLE follows (
  follower_id BIGINT NOT NULL,
  following_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (follower_id, following_id),
  INDEX idx_following_id (following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
);
```

### **Likes Table**

```sql
CREATE TABLE likes (
  id BIGINT PRIMARY KEY,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_post_user (post_id, user_id),
  INDEX idx_post_id (post_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Comments Table**

```sql
CREATE TABLE comments (
  id BIGINT PRIMARY KEY,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,

  INDEX idx_post_id_created (post_id, created_at),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## **High-Level Architecture**

```
┌─────────────────────────────────────┐
│       Client (Web/Mobile)           │
└──────────────┬──────────────────────┘
               │
       ┌───────▼───────┐
       │  API Gateway  │  (Load balancing, auth)
       └───────┬───────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼─────┐ ┌─▼────┐  ┌──▼───┐
│ Write   │ │ Feed │  │Online│
│Service  │ │ Gen  │  │Ready│
└───┬─────┘ └──┬───┘  └──┬──┘
    │          │         │
┌───▼──────────┼─────────▼────┐
│   Primary DB (PostGres)     │
│   Posts | Follows | Likes   │
└───────────────┬──────────────┘
                │
        ┌───────▼────────┐
        │ Cache (Redis)  │  (Feed cache, User posts)
        └────────────────┘
                │
        ┌───────▼────────────┐
        │ Message Queue      │  (Posts, notifications)
        │ (Kafka)            │
        └────────┬───────────┘
                 │
        ┌────────▼──────────┐
        │  Analytics (Spark)│
        │  Ranking Engine   │
        └───────────────────┘
```

---

## **Feed Generation (Critical Path)**

### **Timeline/Pull Model vs. Fanout/Push Model**

#### **Pull (Timeline) Model**

```
When user opens feed:
  1. Query: SELECT posts FROM friends WHERE user_id IN (followers)
            ORDER BY created_at DESC LIMIT 20
  2. Problem: 1B users; fetching from millions of friends is slow
  3. Suitable for: Small networks or read-heavy
```

#### **Push (Fanout) Model**

```
When user posts:
  1. Send post to all followers' feed caches (fanout to 100M followers)
  2. Pre-computed feed in cache; user gets feed in <50ms
  3. Problem: Heavy on write side; celebrity users cause fanout storm
  4. Suitable for: Following-based networks; real-time
```

#### **Hybrid (Recommended)**

```
Normal users (< 10K followers):
  - Use fanout (push) model
  - Post reaches all followers immediately

Celebrities (> 10K followers):
  - Use pull model on read side
  - Don't fanout; fetch post when user loads feed
  - Saves bandwidth + cache space
```

### **Feed Generation Algorithm**

```
def get_feed(user_id, limit=20, offset=0):
  // Step 1: Get follower IDs (cached)
  followers = cache.get(f"followers:{user_id}") or db.get_followers(user_id)

  // Step 2: Fetch recent posts from followers
  posts = db.query(
    "SELECT p.* FROM posts p
     WHERE p.user_id IN (followers)
     AND p.visibility IN ('public', 'friends')
     AND p.created_at > NOW() - INTERVAL 7 DAY
     ORDER BY score DESC  -- ML-based ranking
     LIMIT {limit} OFFSET {offset}"
  )

  // Step 3: Rank posts (ML model)
  ranked_posts = ranking_engine.rank(posts, user_id)

  // Step 4: Enrich with engagement data
  for post in ranked_posts:
    post.likes = cache.get(f"likes:{post.id}") or db.count_likes(post.id)
    post.comments = cache.get(f"comments:{post.id}") or db.count_comments(post.id)
    post.user_liked = db.is_liked(post.id, user_id)

  // Step 5: Cache feed for 5 minutes
  cache.set(f"feed:{user_id}:{offset}", ranked_posts, ttl=300)

  return ranked_posts
```

---

## **ML Ranking**

The feed's quality depends on ranking. Key signals:

```
score = w1 * recency + w2 * engagement + w3 * personalization

where:
  recency = 1 / (hours_since_post + 1)
  engagement = (likes + 3*comments + 5*shares) / time_since_post
  personalization = ML_model(user_history, post_content, author)
```

**ML Features:**

- User interests (inferred from past likes)
- Post content (text, images, video)
- Author influence
- Post virality (early engagement)
- Time of day
- User's recent behavior

---

## **Handling Scale**

### **Feed Fetch QPS (10K)**

- **Problem:** Single database can't do 10K queries/sec
- **Solution:**
  - Cache frequently accessed feeds (Memcached/Redis)
  - Use read replicas for cache misses
  - Shard feeds by region (geo-distributed replicas)

### **Post Fanout (Celebrity Posts)**

- **Problem:** One celebrity post to 100M followers = 100M queue jobs
- **Solution:**
  - Selective fanout (only for non-celebrities)
  - Use batch processing (10K followers/batch)
  - Kafka for async fanout; multiple workers consume

### **Storage Growth (25 TB/year)**

- **Problem:** Database grows; queries slow down
- **Solution:**
  - Archive old posts (>1 year) to cold storage (S3)
  - Use sharding by user_id or post_id
  - Time-series storage (Cassandra) for analytics

---

## **Failure Handling**

### **Cache Miss (Redis down)**

- Fall back to database query
- Latency increases to 100–200ms (acceptable)
- Notify on-call to restore cache

### **Database Query Timeout**

- Return partial feed (cached data) + mark as "potentially stale"
- Retry in background
- Use circuit breaker

### **Ranking Engine Failure**

- Fall back to chronological ranking
- Feed is less personalized but still works
- Notify ML team

### **Fanout Queue Backlog**

- Posts still appear in followers' feeds (via pull on read)
- Just delayed by a few minutes
- Queue is not critical path

---

## **Trade-offs**

| Decision                         | Pros                                         | Cons                                   |
| -------------------------------- | -------------------------------------------- | -------------------------------------- |
| **Push vs. Pull**                | Push is fast for users; Pull saves resources | Push fanout storm for celebrities      |
| **Chronological vs. ML-ranked**  | Simple, predictable                          | Less engagement; staleness             |
| **Redis cache for feeds**        | Fast access                                  | Memory cost; requires invalidation     |
| **Sharding by user_id vs. time** | User data locality                           | Imbalanced shards if popularity varies |

---

## **Monitoring + Alerting**

- **P99 feed fetch latency:** Target <100ms; alert if >200ms
- **Feed staleness:** Alert if >5 min old
- **Cache hit rate:** Target >90%; alert if <80%
- **Fanout queue lag:** Alert if >100K backlog
- **Ranking engine latency:** Target <50ms; alert if >100ms
- **Database replication lag:** Alert if >2s

---

## **Follow-Up Questions (for Interview)**

- "How do we handle real-time comments?" → WebSocket + message bus
- "How do we detect and suppress spam?" → ML classifier + user reports
- "How do we handle deleted posts?" → Soft delete + cache invalidation
- "How do we rank for different countries?" → Localized ML models + language features
- "How do we monetize feed?" → Ads insertion using ranking model

---

**System is production-ready at 50M posts/day with 10K QPS feed fetches.** ✅
