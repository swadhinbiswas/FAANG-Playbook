# ML Fundamentals for Interviews

The goal: explain ML clearly, choose reasonable metrics, and reason about tradeoffs.

## Core concepts

- bias/variance intuition
- overfitting and regularization
- train/validation/test splits
- calibration and thresholds

## Metrics cheat sheet

- Classification: precision/recall, ROC-AUC, PR-AUC
- Ranking: NDCG, MAP
- Regression: MAE/MSE, pinball loss (quantiles)

## Practical evaluation

- Offline metrics are not product success.
- Define guardrails: latency, cost, fairness, safety.
- Use online experiments when possible; otherwise use careful offline validation.

## Failure modes

- optimizing the wrong metric
- leakage
- dataset shift
