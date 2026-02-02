# System Design Template (Use This Every Time)

This is a repeatable structure to keep you from rambling.

## 1) Requirements

### Functional

- What does the system do?
- Who are the users?
- What are the core APIs?

### Non-functional

- latency targets (p50/p95/p99)
- availability target (e.g., 99.9%)
- consistency requirements
- data retention and privacy constraints

## 2) Back-of-the-envelope numbers

Estimate:

- QPS (reads/writes)
- peak factor
- data size per object
- storage growth
- bandwidth

The point is not perfect math—it’s to justify design choices.

## 3) High-level architecture

Start simple:

- clients → API layer → core services → storage

Then add scaling elements:

- caching
- queues/streams
- read replicas
- sharding/partitioning

## 4) Data model

- key entities
- indexes needed
- partition key and why

## 5) Deep dives (pick 1–3)

- caching strategy and invalidation
- consistency model
- rate limiting
- search/indexing
- async processing

## 6) Failure modes and resilience

- timeouts, retries (with jitter), circuit breakers
- dependency degradation plan
- disaster recovery (RPO/RTO)

## 7) Observability and operations

- SLIs/SLOs
- dashboards + alerts
- runbooks and rollback strategy

## 8) Security and privacy

- authn/authz
- data encryption (in transit/at rest)
- least privilege

## 9) Tradeoffs recap

End with 3–5 explicit tradeoffs:

- what you optimized for
- what you sacrificed
- what you’d do next if given more time
