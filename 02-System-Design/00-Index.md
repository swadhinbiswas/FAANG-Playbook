# System Design: Worked Examples

**Five detailed system design examples with complete API design, data models, architecture, failure handling, and trade-offs.**

---

## **Examples**

### **1. URL Shortener** → [01-URL-Shortener.md](01-URL-Shortener.md)
- **Problem:** Convert long URLs to short codes; redirect with analytics
- **Scale:** 1M shorten requests/day, 100M redirects/day
- **Key Topics:** Base62 encoding, caching, distributed ID generation, analytics
- **Duration in interview:** 45 minutes

### **2. News Feed (Social Media)** → [02-News-Feed.md](02-News-Feed.md)
- **Problem:** Personalized feed ranking posts in real-time
- **Scale:** 1B users, 500M DAU, 50M posts/day
- **Key Topics:** Push vs. Pull models, ML ranking, cache strategies, sharding
- **Duration in interview:** 60 minutes

### **3. Chat System (Real-Time Messaging)** → [03-Chat-System.md](03-Chat-System.md)
- **Problem:** 1-to-1 and group messaging with delivery guarantees
- **Scale:** 100M DAU, 1B messages/day, 50M concurrent connections
- **Key Topics:** WebSocket, message queuing, offline sync, ordering guarantees
- **Duration in interview:** 60 minutes

### **4. Rate Limiter** → [04-Rate-Limiter.md](04-Rate-Limiter.md)
- **Problem:** Protect APIs from abuse; limit requests per user/IP
- **Scale:** 100K requests/sec to rate limiter
- **Key Topics:** Token bucket, sliding window, Redis, multi-level limiting
- **Duration in interview:** 30–45 minutes

### **5. File Storage & CDN** → [05-File-Storage-CDN.md](05-File-Storage-CDN.md)
- **Problem:** Durable file storage with global distribution and low latency
- **Scale:** 1B uploads/day, 100B downloads/day
- **Key Topics:** Multi-part upload, CDN, replication, deduplication, tiering
- **Duration in interview:** 60 minutes

---

## **How to Use These Examples**

### **During Interview Prep**
1. **Read one example per day** (takes 20–30 min)
2. **Then design it yourself from scratch** (takes 45–60 min)
3. **Compare your design** against the worked solution
4. **Iterate:** What did you miss? What would you do differently?

### **During Interview**
- **Use these as templates**, not scripts
- **Adapt to the specific prompt** you receive
- **Follow the structure:** Clarify → High-level → Deep dive → Tradeoffs → Failure handling
- **Discuss with interviewer** as you go; don't just present

### **Common Variations (For Practice)**
- **URL Shortener:** "Add real-time trending URLs" / "Support custom expiration"
- **News Feed:** "Add video support" / "Handle 100M concurrent users"
- **Chat:** "Add end-to-end encryption" / "Support video calls"
- **Rate Limiter:** "Add weighted limits" / "Support distributed rate limiting"
- **File Storage:** "Add versioning" / "Support live streaming"

---

## **Interview Strategy**

### **Your Goal**
- Demonstrate you can design scalable systems
- Show communication + collaboration with interviewer
- Prove you understand tradeoffs, not just technologies

### **Success Metrics** (Use [05-Mock-Interviews/01-Self-Evaluation-Rubric.md](../05-Mock-Interviews/01-Self-Evaluation-Rubric.md))
- **Correctness (5/5):** Design handles the scale; no critical flaws
- **Communication (5/5):** Explain clearly; ask interviewer for feedback
- **Tradeoffs (5/5):** Discuss 2–3 key tradeoffs; justify decisions
- **Failure handling (5/5):** Address 2–3 failure scenarios

---

## **Common Interview Questions (Based on These Examples)**

### **Depth Questions**
- "How does your database scale to 1B records?" → Sharding strategy
- "What if cache goes down?" → Fallback to origin; latency degrades
- "How do you prevent message loss?" → Replication, durability guarantees

### **Variant Questions**
- "What if we need 10x scale?" → Add more nodes, sharding, multi-region
- "How do we save costs?" → Compression, tiering, deduplication
- "How do we ensure high availability?" → Redundancy, failover, monitoring

### **Tradeoff Questions**
- "Consistency vs. Availability?" → Depends on use case; discuss both
- "Latency vs. Cost?" → Cache for fast, archive for cheap
- "Simplicity vs. Scale?" → Start simple, add complexity when needed

---

## **Study Path**

**Beginner (Weeks 1–2):** Study all 5 examples
**Intermediate (Weeks 3–4):** Design each from scratch without looking at solution
**Advanced (Weeks 5–6):** Combine ideas (e.g., "Design Twitter" = feed + real-time + storage)
**Expert (Weeks 7–8):** Receive novel prompts; improvise using patterns learned

---

**These examples cover ~70% of real FAANG system design interviews.** ✅

