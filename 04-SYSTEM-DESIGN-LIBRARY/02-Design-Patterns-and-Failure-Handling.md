# Design Patterns & Failure Handling

Most system design interviews are evaluating your handling of partial failure.

## Core patterns

- Caching (read-through, write-through, write-back)
- Queues and async workers
- Idempotency keys
- Rate limiting
- Circuit breakers and bulkheads
- Backpressure

## Failure handling checklist

- Timeouts set everywhere (and sane)
- Retries capped + backoff + jitter
- Fallbacks for degraded dependencies
- Dead-letter queues for async
- Rollback plan

## Observability checklist

- SLIs: latency, errors, saturation
- dashboards show p95/p99
- alerts are actionable
- tracing for dependency chains
