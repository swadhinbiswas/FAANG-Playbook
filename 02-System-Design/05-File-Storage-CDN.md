# System Design: File Storage & CDN (Cloud Storage)

**Problem:** Design a file storage and distribution system (like AWS S3, Google Cloud Storage). Users upload files; they're stored durably and served globally with low latency.

---

## **Requirements**

### **Functional**
- Upload files (any type, any size)
- Download files with low latency
- Delete files
- List files
- Batch operations (upload multiple, delete multiple)
- Access control (public, private, signed URLs)
- Versioning (optional; keep multiple versions)

### **Non-Functional**
- Scale: 1B uploads/day, 100B downloads/day
- Latency: <100ms for upload ACK, <50ms for download (99th percentile)
- Availability: 99.99% uptime
- Durability: Never lose data (11 nines minimum)
- Cost: Optimize storage and bandwidth

---

## **Capacity Planning**

| Metric | Value | Calculation |
|--------|-------|-------------|
| **Upload QPS** | ~11,600 | 1B/day / 86.4K sec |
| **Download QPS** | ~1.16M | 100B/day / 86.4K sec |
| **Storage (1 year)** | ~500 PB | 1B/day × 365 × 500 KB avg file |
| **Bandwidth (down)** | ~58 Tbps | 1.16M QPS × 50 KB |

---

## **API Design**

### **1. Upload File**
```
PUT /api/v1/files/{file_path}
Authorization: Bearer {token}
Content-Type: application/octet-stream
Content-Length: 1048576

[Binary file content]

Response (200 OK):
{
  "id": "file_xyz789",
  "path": "/uploads/user_123/documents/report.pdf",
  "size": 1048576,
  "mime_type": "application/pdf",
  "url": "https://cdn.example.com/file_xyz789",
  "created_at": "2026-02-01T10:00:00Z",
  "etag": "abc123def456"
}
```

### **2. Download File**
```
GET /api/v1/files/{file_id}
Authorization: Bearer {token}  // Optional; depends on access control

Response (200 OK):
[Binary file content]
Headers:
  Content-Type: application/pdf
  Content-Length: 1048576
  ETag: abc123def456
  Cache-Control: public, max-age=86400
  X-Served-By: cdn-sg-1  // CDN edge location
```

### **3. Get Signed URL (Pre-signed URL)**
```
POST /api/v1/files/{file_id}/signed-url
Authorization: Bearer {token}

{
  "expiration_seconds": 3600,  // Valid for 1 hour
  "method": "GET"  // GET or PUT
}

Response (200 OK):
{
  "url": "https://cdn.example.com/file_xyz789?signature=...&expires=...",
  "expires_at": "2026-02-01T11:00:00Z"
}
```

### **4. Delete File**
```
DELETE /api/v1/files/{file_id}
Authorization: Bearer {token}

Response (204 No Content)
```

### **5. List Files**
```
GET /api/v1/files?prefix=/uploads/user_123&limit=100
Authorization: Bearer {token}

Response (200 OK):
{
  "files": [
    {
      "id": "file_abc",
      "path": "/uploads/user_123/documents/report.pdf",
      "size": 1048576,
      "created_at": "2026-02-01T10:00:00Z"
    },
    ...
  ],
  "next_cursor": "file_def"
}
```

---

## **Data Model**

### **File Metadata**
```sql
CREATE TABLE file_metadata (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(2048) NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  access_control VARCHAR(50),  -- public, private, shared
  
  INDEX idx_user_id_created (user_id, created_at),
  INDEX idx_file_path (file_path),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Chunks (for large files)**
```sql
CREATE TABLE file_chunks (
  id BIGINT PRIMARY KEY,
  file_id BIGINT NOT NULL,
  chunk_index INT NOT NULL,
  chunk_size BIGINT NOT NULL,
  chunk_hash VARCHAR(64),  -- SHA-256
  storage_location VARCHAR(255),  -- s3://bucket/path
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY uk_file_chunk (file_id, chunk_index),
  FOREIGN KEY (file_id) REFERENCES file_metadata(id)
);
```

### **Access Control**
```sql
CREATE TABLE file_access (
  id BIGINT PRIMARY KEY,
  file_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  access_level VARCHAR(50),  -- read, write, admin
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY uk_file_user (file_id, user_id),
  FOREIGN KEY (file_id) REFERENCES file_metadata(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## **High-Level Architecture**

```
┌──────────────────────────────────────┐
│      Client (Upload/Download)        │
└────────────────┬─────────────────────┘
                 │
         ┌───────▼────────┐
         │ API Gateway    │ (Auth, routing)
         └───────┬────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
  Upload Path          Download Path
      │                     │
  ┌───▼─────┐         ┌────▼─────┐
  │ Upload  │         │ Download │
  │ Service │         │ Service  │
  │ (Chunking)        │ (CDN)    │
  └───┬─────┘         └────┬─────┘
      │                    │
   ┌──▼──────────────────┐ │
   │                     │ │
   │  Storage Backend    │ │
   │                     │ │
   │ ┌─────────────────┐ │ │
   │ │ Region 1 (us)   │ │ │
   │ │ ├─ Master       │◄┼─┘
   │ │ ├─ Replica 1    │ │
   │ │ └─ Replica 2    │ │
   │ ├─────────────────┤ │
   │ │ Region 2 (eu)   │ │
   │ │ ├─ Master       │ │
   │ │ └─ Replica      │ │
   │ └─────────────────┘ │
   └─────────────────────┘
         │
      ┌──▼──────────────┐
      │  CDN (CloudFront)
      │  Edge Locations │  (100+ edge nodes globally)
      └────────────────┘
```

---

## **Upload Flow (Large Files)**

### **Step 1: Initiate Multi-Part Upload**
```python
response = s3_client.create_multipart_upload(
    Bucket='my-bucket',
    Key='large-file.bin'
)
upload_id = response['UploadId']
```

### **Step 2: Upload Chunks (Parallel)**
```python
def upload_chunk(file_chunk, chunk_number):
    response = s3_client.upload_part(
        Bucket='my-bucket',
        Key='large-file.bin',
        PartNumber=chunk_number,
        UploadId=upload_id,
        Body=file_chunk  # 5 MB - 5 GB per chunk
    )
    return response['ETag']

# Upload 5 chunks in parallel
etags = []
for i, chunk in enumerate(chunks):
    etag = upload_chunk(chunk, i+1)
    etags.append(etag)
```

### **Step 3: Complete Upload**
```python
s3_client.complete_multipart_upload(
    Bucket='my-bucket',
    Key='large-file.bin',
    UploadId=upload_id,
    MultipartUpload={
        'Parts': [
            {'PartNumber': i+1, 'ETag': etag}
            for i, etag in enumerate(etags)
        ]
    }
)
```

**Benefits:**
- Parallel uploads (faster)
- Resumable (retry failed chunks)
- Bandwidth efficient

---

## **Download Flow**

### **Step 1: Request File**
```
GET /files/large-file.bin
Host: cdn.example.com
```

### **Step 2: CDN Edge Check**
```
┌─────────────────────┐
│ CDN Edge Location   │ (e.g., Singapore)
│ (Closest to user)   │
├─────────────────────┤
│ Cache Hit? YES      │
│ → Serve from cache  │
│ (P99: <50ms)        │
└─────────────────────┘
```

### **Step 3: Cache Miss → Origin**
```
Cache Miss
    ↓
Fetch from Origin Server
    ↓
Store in CDN Cache (TTL: 24 hours)
    ↓
Return to user
```

---

## **Storage Optimization**

### **Data Deduplication**
```python
def deduplicate_file(file_content):
    file_hash = sha256(file_content)
    
    # Check if file already exists
    existing = db.query("SELECT * FROM file_chunks WHERE chunk_hash = ?", file_hash)
    
    if existing:
        # Same file uploaded before; just link to existing
        db.create_symlink(file_id, existing.storage_location)
    else:
        # New file; upload to storage
        upload_to_storage(file_id, file_content)
```

**Savings:** 30–50% storage (common files like libraries shared)

### **Compression**
```python
def compress_file(file_content, compression_type='gzip'):
    if is_compressible(file_content.mime_type):
        compressed = zlib.compress(file_content, level=6)
        if len(compressed) < len(file_content):
            return compressed, compression_type
    return file_content, None
```

**Savings:** 50–70% for text files; 5–10% for images

### **Tiering**
```
Hot (< 30 days): SSD, fast access, $0.023/GB
Warm (30–90 days): HDD, slower access, $0.015/GB
Cold (> 90 days): Glacier, very slow, $0.004/GB
```

**Savings:** 50% storage cost with intelligent tiering

---

## **Handling Scale**

### **11.6K Upload QPS**
- **Problem:** Single server can't handle throughput
- **Solution:**
  - Load balancer across upload servers
  - Each server handles ~1K QPS
  - 12–15 servers needed

### **1.16M Download QPS**
- **Problem:** Origin server can't serve 1.16M QPS
- **Solution:**
  - CDN with global edge locations
  - 99% hits from edge; only 1% from origin
  - Origin only needs 11.6K QPS

### **500 PB Storage**
- **Problem:** Single data center can't store 500 PB
- **Solution:**
  - Geo-distributed regions (US, EU, Asia)
  - Replication: 3x redundancy per region
  - Total storage across regions: ~1.5 EB

---

## **Failure Handling**

### **Corruption Detection**
```python
def verify_file_integrity(file_id):
    stored_hash = db.get_hash(file_id)
    retrieved_file = storage.download(file_id)
    actual_hash = sha256(retrieved_file)
    
    if stored_hash != actual_hash:
        # Corruption detected!
        alert("File corruption detected")
        # Recover from replica
```

### **Replication & Recovery**
- 3 copies per region (3x redundancy)
- If 1 replica fails: recover from other 2
- If entire region fails: failover to another region
- RTO (Recovery Time Objective): <1 minute

### **Availability During Failure**
- User attempts download from CDN edge
- Edge tries origin; if down, serves stale cache
- User gets file within 1–2 minutes (acceptable)

---

## **Trade-offs**

| Decision | Pros | Cons |
|----------|------|------|
| **Multi-part upload** | Parallel, resumable | More complex |
| **CDN caching** | Fast downloads | Cache invalidation complexity |
| **Deduplication** | Storage savings | Computation overhead |
| **Geo-distribution** | High availability | Cost, consistency complexity |

---

## **Cost Breakdown (Per 1M uploads/day)**

| Component | Cost/Month | Notes |
|-----------|-----------|-------|
| **Storage** | $50K | 500 PB ÷ 10M days × $0.023/GB |
| **Bandwidth (down)** | $100K | 100B downloads × $0.01/GB |
| **Compute (upload)** | $10K | Upload servers, processing |
| **CDN** | $50K | 100+ edge locations |
| **Replication** | $30K | 3x storage |
| **Total** | **$240K/month** | Includes redundancy + CDN |

---

## **Monitoring + Alerting**

- **Upload success rate:** Target >99.9%; alert if <99%
- **P99 upload latency:** Target <5s; alert if >10s
- **P99 download latency:** Target <50ms; alert if >100ms
- **Data durability:** Alert if any replica fails; repair within 1 hour
- **CDN hit rate:** Target >95%; alert if <90%
- **Storage quota:** Alert if >80% full

---

## **Follow-Up Questions (for Interview)**

- "How do we handle file versioning?" → Keep last 10 versions; delete old ones
- "How do we support live streaming?" → Progressive upload + HLS/DASH adaptive bitrate
- "How do we handle ransomware?" → Immutable backups; snapshots per day
- "How do we optimize costs?" → Tiering, deduplication, compression
- "How do we handle concurrent downloads?" → Range requests; download from multiple edges
- "How do we support resumable downloads?" → HTTP Range header; split file into chunks

---

**System is production-ready at 1B uploads/day with 99.99% availability.** ✅

