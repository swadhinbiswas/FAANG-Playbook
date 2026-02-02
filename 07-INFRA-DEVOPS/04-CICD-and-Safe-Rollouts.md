# CI/CD and Safe Rollouts

CI/CD interviews are about reducing risk while maintaining speed.

## Core elements

- automated tests
- build artifacts are immutable
- environments are reproducible (IaC)
- progressive delivery (canary/blue-green)

## Deployment safety checklist

- health checks and readiness probes
- rollback plan
- feature flags for risky changes
- metrics-based rollout gates

## Failure modes

- deploying without observability
- no rollback path
- manual steps that drift over time
