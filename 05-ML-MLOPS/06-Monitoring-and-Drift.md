# Monitoring, Drift, and Silent Failures

The most dangerous ML failures are quiet: performance decays while dashboards look “fine”.

## What to monitor

- input data distribution
- feature coverage/freshness
- model output distribution
- outcome metrics (delayed labels)
- business guardrails (latency, cost)

## Drift types

- covariate shift (inputs changed)
- concept drift (relationship changed)
- label drift (labels changed)

## Common silent failures

- a joined table stops updating
- feature coverage drops
- model is stale

## Response plan

- detect → triage → rollback/shadow → fix pipeline → re-deploy
