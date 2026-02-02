# System Design: Chat System (Real-Time Messaging)

**Problem:** Design a real-time chat system supporting 1-to-1 and group messaging (like WhatsApp, Slack).

---

## **Requirements**

### **Functional**

- 1-to-1 messaging
- Group chat (up to 100K members)
- Message delivery (sent, delivered, read receipts)
- Offline message storage + sync on reconnect
- Message search
- Media sharing (images, videos, files)
- Typing indicators

### **Non-Functional**

- Scale: 100M daily active users, 1B messages/day
- Latency: <100ms message delivery
- Availability: 99.99%
- Durability: Messages never lost
- Order: Messages delivered in order

---

## **Capacity Planning**

| Metric                     | Value     | Calculation                       |
| -------------------------- | --------- | --------------------------------- |
| **Messaging QPS**          | ~11,600   | 1B messages/day / 86.4K sec       |
| **Concurrent connections** | ~50M      | 100M DAU × 50% online concurrency |
| **Storage (1 year)**       | ~100 TB   | 1B/day × 365 × 100 bytes/msg      |
| **Bandwidth (outgoing)**   | ~1.2 Gbps | 11.6K QPS × 100 bytes + metadata  |

---

## **API Design**

### **1. Send Message**

```
POST /api/v1/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipient_ids": ["user_456"],  // 1 for 1-to-1; multiple for group
  "content": "Hello!",
  "media": [{"type": "image", "url": "cdn/img123.jpg"}],
  "message_type": "text"  // text, image, file, etc.
}

Response (202 Accepted):
{
  "id": "msg_xyz789",
  "status": "queued",  // queued → sent → delivered → read
  "created_at": "2026-02-01T10:00:00Z"
}
```

### **2. Receive Messages (WebSocket)**

```
WebSocket: ws://api.example.com/ws?token={token}

Server sends (real-time):
{
  "type": "message",
  "id": "msg_xyz789",
  "sender_id": "user_456",
  "recipient_ids": ["user_123"],
  "content": "Hello!",
  "created_at": "2026-02-01T10:00:00Z"
}
```

### **3. Fetch Chat History**

```
GET /api/v1/chats/{chat_id}/messages?limit=50&before_id={cursor}
Authorization: Bearer {token}

Response (200 OK):
{
  "messages": [
    {
      "id": "msg_123",
      "sender_id": "user_456",
      "content": "Hello!",
      "created_at": "2026-02-01T10:00:00Z",
      "status": "read"
    },
    ...
  ],
  "has_more": true,
  "cursor": "msg_100"
}
```

### **4. Send Read Receipt**

```
POST /api/v1/messages/{message_id}/read
Authorization: Bearer {token}

Response (200 OK):
{
  "status": "read"
}
```

### **5. Typing Indicator (WebSocket)**

```
Client sends:
{
  "type": "typing",
  "chat_id": "chat_xyz",
  "is_typing": true
}

Server broadcasts to other users:
{
  "type": "typing",
  "user_id": "user_456",
  "is_typing": true
}
```

---

## **Data Model**

### **Chats (Conversations)**

```sql
CREATE TABLE chats (
  id BIGINT PRIMARY KEY,
  chat_type VARCHAR(20),  -- 1to1, group
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
```

### **Chat Members**

```sql
CREATE TABLE chat_members (
  chat_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_read_message_id BIGINT,

  PRIMARY KEY (chat_id, user_id),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (chat_id) REFERENCES chats(id)
);
```

### **Messages**

```sql
CREATE TABLE messages (
  id BIGINT PRIMARY KEY,
  chat_id BIGINT NOT NULL,
  sender_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(50),  -- text, image, file
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,

  INDEX idx_chat_id_created (chat_id, created_at),
  INDEX idx_sender_id (sender_id),
  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);
```

### **Message Status (Delivery Tracking)**

```sql
CREATE TABLE message_status (
  id BIGINT PRIMARY KEY,
  message_id BIGINT NOT NULL,
  recipient_id BIGINT NOT NULL,
  status VARCHAR(20),  -- sent, delivered, read
  status_timestamp TIMESTAMP,

  UNIQUE KEY uk_msg_recipient (message_id, recipient_id),
  INDEX idx_status (status),
  FOREIGN KEY (message_id) REFERENCES messages(id)
);
```

---

## **High-Level Architecture**

```
┌────────────────────────────┐
│ Client (Mobile/Web)        │
│ WebSocket Connection       │
└────────────┬───────────────┘
             │
     ┌───────▼────────┐
     │ Load Balancer  │ (Connection affinity)
     └───────┬────────┘
             │
     ┌───────▼────────────────┐
     │ WebSocket Gateway      │ (Handles 50M concurrent)
     │ (Sticky sessions)      │
     └───────┬────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
┌───▼──┐ ┌──▼───┐ ┌──▼────┐
│Chat  │ │Queue │ │Status │
│Svc   │ │Worker│ │Worker │
└───┬──┘ └──────┘ └───────┘
    │
    ├─────────────────────────┐
    │                         │
┌───▼────────────┐      ┌────▼─────┐
│Primary DB      │      │Cache      │
│(PostgreSQL)    │      │(Redis)    │
└────────────────┘      └────┬──────┘
                             │
                    ┌────────▼────────┐
                    │Archive Storage  │
                    │(S3, Cassandra)  │
                    └─────────────────┘
```

---

## **Core Components**

### **1. Connection Handler (WebSocket Gateway)**

```python
class ConnectionHandler:
    def on_connect(user_id):
        # User connects; establish WebSocket
        client = WebSocketClient(user_id)
        connections[user_id] = client

        # Fetch undelivered messages while offline
        offline_messages = db.query(
            "SELECT * FROM messages
             WHERE recipient_id = ?
             AND status IN ('sent', 'queued')
             ORDER BY created_at"
        )
        for msg in offline_messages:
            client.send(msg)
            db.update_status(msg.id, 'delivered')

    def on_message(user_id, message):
        # User sends message
        msg_id = db.insert_message(message)
        queue_message_delivery(msg_id, message.recipient_ids)

    def on_disconnect(user_id):
        # User disconnects
        del connections[user_id]
```

### **2. Message Delivery (Queue Worker)**

```python
class MessageQueue:
    def deliver_message(message_id):
        msg = db.get_message(message_id)

        for recipient_id in msg.recipient_ids:
            # Try to deliver in real-time
            if recipient_id in connections:
                conn = connections[recipient_id]
                conn.send(msg)
                db.update_status(message_id, recipient_id, 'delivered')
            else:
                # User offline; store for later
                db.update_status(message_id, recipient_id, 'sent')
                queue.push(message_id, recipient_id)  # Retry later
```

### **3. Read Receipts (Status Tracker)**

```python
def mark_as_read(message_id, user_id):
    db.update_status(message_id, user_id, 'read')

    # Notify sender
    message = db.get_message(message_id)
    sender_id = message.sender_id

    if sender_id in connections:
        connections[sender_id].send({
            "type": "read_receipt",
            "message_id": message_id,
            "read_by": user_id
        })
```

---

## **Handling Scale**

### **50M Concurrent Connections**

- **Problem:** Single server can't handle 50M WebSocket connections
- **Solution:**
  - Use connection gateway cluster (100 servers × 500K connections each)
  - Sticky sessions: user always connects to same gateway
  - Auto-scale based on connection count

### **1B Messages/Day (11.6K QPS)**

- **Problem:** Database can't handle write throughput
- **Solution:**
  - Use Kafka for message ingestion (100K QPS capacity)
  - Batch writes to database (1K messages/batch)
  - Async write + in-memory acknowledgment

### **Storage (100 TB/year)**

- **Problem:** Database bloats; queries slow
- **Solution:**
  - Archive messages >30 days to cold storage (S3)
  - Use time-series database (Cassandra) for chat history
  - Partition by date + chat_id

### **Message Ordering**

- **Problem:** Distributed system doesn't guarantee order
- **Solution:**
  - Use monotonic clock (TrueTime or Lamport clock)
  - Sequence number per chat
  - Client-side reordering if needed

---

## **Failure Handling**

### **WebSocket Connection Lost**

- Client auto-reconnects with exponential backoff
- Server holds undelivered messages for 24 hours
- Message delivered on reconnect

### **Message Queue Overflow**

- Queue backpressure (server rejects new messages temporarily)
- Client retries with exponential backoff
- User sees "Network error; retrying"

### **Database Down**

- Messages still queue in memory
- Return 503 to client
- Auto-failover to replica

### **Duplicate Messages**

- Use idempotency key (client-generated UUID)
- Deduplicate on server side before inserting
- Return cached result if duplicate detected

---

## **Trade-offs**

| Decision                         | Pros                         | Cons                         |
| -------------------------------- | ---------------------------- | ---------------------------- |
| **WebSocket vs. Polling**        | Real-time, efficient         | Harder to scale connections  |
| **Async delivery vs. sync**      | Faster response; better UX   | Delivery failures possible   |
| **Queue-based vs. direct write** | Durability; no message loss  | Slight delay before DB write |
| **Centralized vs. federated**    | Simpler; consistent ordering | Single point of failure      |
| **Archive old messages**         | Saves storage; cheap access  | Query latency increases      |

---

## **Monitoring + Alerting**

- **P99 message delivery latency:** Target <100ms; alert if >500ms
- **Message loss rate:** Alert if >0.01%
- **Delivery failure rate:** Alert if >1%
- **Connection count:** Alert if approaching gateway limit
- **Queue backlog:** Alert if >100K messages
- **Database replication lag:** Alert if >5s

---

## **Follow-Up Questions (for Interview)**

- "How do we handle 100K+ group chats?" → Separate topics; fanout can scale
- "How do we prevent message spam?" → Rate limiting + reputation scoring
- "How do we support end-to-end encryption?" → Keep keys client-side; server never sees plaintext
- "How do we implement search?" → Elasticsearch indexing; async background job
- "How do we handle media uploads?" → S3 + separate media service with CDN
- "How do we handle time zones?" → Store UTC; client-side rendering

---

**System is production-ready at 1B messages/day with 50M concurrent users.** ✅
