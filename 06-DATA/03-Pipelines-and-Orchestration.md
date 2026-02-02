# Pipelines and Orchestration

Pipelines are systems: they fail, they backfill, and they need observability.

## Concepts that interviewers probe

- idempotency (safe retries)
- backfills and reprocessing
- dependency management
- SLAs and freshness
- cost control

## Failure modes

- non-idempotent jobs corrupt data
- backfills overload systems
- silent failures due to missing alerting
