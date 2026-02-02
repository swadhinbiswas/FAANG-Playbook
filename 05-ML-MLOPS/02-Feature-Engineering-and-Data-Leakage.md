# Feature Engineering & Data Leakage

Leakage is one of the fastest ways to fail an MLE interview because it shows weak production intuition.

## Common leakage patterns

- using future information (post-outcome fields)
- target leakage through derived aggregates
- using labels as features (directly or indirectly)
- sampling bias (logging only shown items)

## Defensive checklist

- define what is available at serving time
- version features and enforce freshness
- validate training/serving parity
- monitor feature coverage and distribution

## Feature ownership

Production ML improves when feature columns have owners, documentation, and monitoring.
