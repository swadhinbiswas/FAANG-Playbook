# Common System Design Prompts (and what they test)

This is a “why this question” map so you can practice deliberately.

## URL shortener

Tests:

- API design and data modeling
- capacity planning basics
- caching and TTL

## Rate limiter

Tests:

- algorithms (token bucket/leaky bucket)
- distributed coordination tradeoffs
- hot keys and performance

## Notification system

Tests:

- async processing
- retries, DLQs
- user preferences, idempotency

## Feed / timeline

Tests:

- fanout tradeoffs (push vs pull)
- storage and caching
- consistency and freshness

## File upload / media processing

Tests:

- object storage patterns
- async processing pipelines
- security and abuse prevention
