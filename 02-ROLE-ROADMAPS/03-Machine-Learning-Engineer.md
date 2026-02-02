# Machine Learning Engineer (MLE) Roadmap

MLE is “software engineering for learning systems”. The job is not just training models; it’s building systems that improve safely over time.

## What gets evaluated

- core ML concepts and evaluation
- data quality, leakage, bias
- production readiness: deployment, monitoring, iteration
- ability to turn product goals into measurable objectives

## MLE foundations

### ML fundamentals (interview-grade)

- supervised learning: classification/regression
- metrics: precision/recall, ROC-AUC, calibration
- bias/variance and regularization intuition
- offline vs online evaluation

### Data + features

- leakage patterns
- label quality and feedback loops
- feature freshness and ownership

### Production ML engineering

- training/serving skew
- monitoring for drift and silent failures
- rollback, shadow deploy, A/B testing

## 12-week plan

Weeks 1–3: Refresh ML fundamentals

- create a one-page “metrics cheat sheet” per problem type
- practice explaining tradeoffs: precision vs recall, latency vs accuracy

Weeks 4–6: ML system design

- 1 prompt/week: ranking/recommendation, fraud/spam, search, forecasting
- use [05-ML-MLOPS/03-ML-System-Design-Templates.md](../05-ML-MLOPS/03-ML-System-Design-Templates.md)

Weeks 7–9: Production readiness

- monitoring plan, testing plan, rollback plan
- map to ML Test Score rubric

Weeks 10–12: Mock loops

- coding (varies), ML system design, behavioral

## Common failure cases

- treating ML like a notebook project
- no plan for data/label issues in production
- confusing metric optimization with product success
- ignoring cost/latency constraints

## Company archetype adjustments

- **FAANG/high-growth:** emphasis on large-scale systems + experimentation.
- **Enterprise:** emphasis on reliability, governance, model risk management.
- **Automotive/industrial:** emphasis on safety, verification, and risk control (often stricter acceptance criteria).
