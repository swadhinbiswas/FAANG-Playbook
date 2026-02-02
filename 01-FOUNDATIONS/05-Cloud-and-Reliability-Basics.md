# Cloud & Reliability Basics

Cloud interviews are rarely about vendor trivia. They’re about architecture and operability.

## Primitive building blocks

- compute: VMs, containers, serverless
- storage: object, block, file
- databases: relational, key-value, document
- messaging: queues, pub/sub, streams
- networking: VPC, load balancing, DNS

## Reliability building blocks

- timeouts and retries (with backoff)
- idempotency
- circuit breaking / bulkheads
- graceful degradation
- rate limiting
- observability (metrics/logs/traces)

## SLO-first thinking

- Define user-facing SLOs (latency, availability, freshness)
- Design for the tails (p95/p99)
- Plan for incidents (runbooks, rollback, alerts)

## Failure mode you must avoid

**Retry storm:** dependency slows → callers retry aggressively → dependency gets worse.

Mitigations:

- cap retries
- add jitter
- use timeouts
- implement circuit breakers
- shed load early
