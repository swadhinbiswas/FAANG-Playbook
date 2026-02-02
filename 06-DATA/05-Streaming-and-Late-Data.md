# Streaming and Late Data

Streaming systems fail in interviews when candidates assume perfect ordering and completeness.

## Concepts to handle explicitly

- out-of-order events
- late arrivals
- deduplication
- exactly-once vs at-least-once semantics

## Practical strategies

- event time vs processing time
- watermarks
- idempotent consumers
- replay/backfill plan

## Failure modes

- double counting due to retries
- missing late data leading to wrong analytics
