# Backend Engineer Roadmap

Backend interviews test whether you can build reliable services: APIs, data, scaling, and operability.

## What backend loops emphasize

- API design and data contracts
- storage choices and consistency tradeoffs
- scaling and latency (especially p95/p99)
- reliability patterns (timeouts, retries, rate limits)
- operational excellence (debugging, incidents, rollbacks)

## Core competencies

### 1) Data and storage

- relational modeling and indexes
- transactions and isolation intuition
- caching and invalidation
- partitioning/sharding basics

### 2) Distributed systems mindset

- partial failure is normal
- idempotency and retries
- backpressure and queueing

### 3) Operability

- SLIs/SLOs
- dashboards/alerts
- runbooks and safe rollouts

## 10-week plan (mid/senior)

Weeks 1–2: Refresh foundations

- Databases + networking + reliability basics
- 2 design mini-drills/week (cache, queue, storage)

Weeks 3–6: System design reps

- 1 full prompt/week
- Focus prompts: rate limiter, notification system, feed/timeline, file upload

Weeks 7–8: Production thinking

- Add failure modes + rollback + observability to every design
- Practice explaining tradeoffs succinctly

Weeks 9–10: Mock loops

- Combine coding + design + behavioral

## Common backend failure cases

- Over-indexing on microservices without reason
- No capacity planning (“we’ll scale later”)
- No failure handling (timeouts/retries/circuit breakers)
- No data model clarity (no keys/indexes/partition strategy)

## Projects that read as “backend”

- API service with schema versioning + migrations
- Background jobs + queues + idempotency
- Multi-tenant architecture considerations (authz, quotas)

## Company archetype adjustments

- **FAANG/high-growth:** emphasize scale math, tail latency, de-risking launches.
- **Enterprise:** emphasize migrations, change management, compatibility.
- **Automotive/industrial:** emphasize correctness, risk control, verification discipline.
