# ML System Design Interview

ML system design is not a modeling exam. It’s a product + data + production reliability exam.

## A template that works

1. Define product goal and measurable metrics
2. Define data sources and labeling strategy
3. Define model approach (baseline first)
4. Define training pipeline (features, freshness, leakage controls)
5. Define serving (latency, caching, fallbacks)
6. Define evaluation (offline + online)
7. Define monitoring (drift, data quality, silent failures)
8. Define iteration + rollback

Reference anchors:

- Rules of ML emphasizes “pipeline first, simple model first”.
- ML Test Score gives a rubric for tests and monitoring.

## Common prompts

- recommendations / ranking
- fraud/spam detection
- search relevance
- forecasting
- personalization
- LLM application with retrieval

## What interviewers want to hear

- baselines and iteration plan
- how you avoid leakage
- how you handle feedback loops
- how you monitor and rollback safely

## Failure modes

- jumping to deep learning without a baseline
- no plan for labels and data quality
- no monitoring or rollback plan
- optimizing offline metrics without product constraints
