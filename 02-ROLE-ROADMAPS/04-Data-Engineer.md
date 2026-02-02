# Data Engineer Roadmap

DE interviews test whether you can build reliable data products: correct, cost-efficient, and understandable.

## Core competencies

1. SQL under time

- joins, group by, window functions
- correctness and performance intuition

2. Data modeling

- dimensional vs normalized models
- keys, grain, slowly changing dimensions

3. Pipelines and orchestration

- batch vs streaming
- idempotency, backfills, reprocessing

4. Data quality and reliability

- freshness, completeness, accuracy
- lineage and governance
- cost control

## 10-week plan

Weeks 1–2: SQL drill

- 4 timed SQL sessions/week
- keep a mistake log by failure type

Weeks 3–4: Modeling

- design schemas for common domains (orders, payments, events)

Weeks 5–7: Pipelines

- design batch + streaming pipelines
- handle late data and schema evolution

Weeks 8–10: Mock DE loop

- SQL + system design (data platform) + behavioral

## Common failure cases

- wrong assumptions about data grain
- ignoring late/out-of-order events
- no backfill strategy
- no quality checks or alerting

## Company archetype adjustments

- **FAANG/high-growth:** scale + real-time needs often stronger.
- **Enterprise:** governance, compliance, and integration are heavier.
- **Automotive/industrial:** lifecycle is long; traceability and reliability are key.
