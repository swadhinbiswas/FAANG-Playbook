# Observability

Observability is how you debug production without guessing.

## The three pillars

- metrics: what is happening?
- logs: what happened?
- traces: where did time go?

## What to monitor

- latency (p50/p95/p99)
- error rate
- saturation (CPU, memory, queues)

## Alerting rules

- alerts must be actionable
- avoid alert fatigue
- focus on SLO-impacting signals

## Failure modes

- dashboards with only averages
- alerts that fire but don’t help diagnose
