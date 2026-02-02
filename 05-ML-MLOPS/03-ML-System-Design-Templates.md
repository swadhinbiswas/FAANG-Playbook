# ML System Design Templates

Use these templates to structure design discussions.

## Template A: Ranking / Recommendations

- Goal and metrics (CTR, watch time, satisfaction)
- Candidate generation vs ranking
- Features and freshness
- Training pipeline and evaluation
- Serving latency and fallbacks
- Monitoring: drift, bias, feedback loops

## Template B: Fraud / Abuse

- High recall vs high precision tradeoff
- Label acquisition and adversarial behavior
- Real-time scoring vs batch
- Human-in-the-loop
- Monitoring for concept drift and false positives

## Template C: Forecasting

- horizon and granularity
- missing data and seasonality
- evaluation beyond MSE (business cost)
- retraining schedule
