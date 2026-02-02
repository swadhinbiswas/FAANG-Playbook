# ML Testing and the ML Test Score

Traditional software tests check deterministic behavior. ML systems are probabilistic, so you need broader coverage: data, training, serving, and monitoring.

## What “production-ready” means

- data is validated
- training is reproducible
- serving matches training assumptions
- monitoring detects silent failures
- rollback is possible

## A pragmatic test checklist

### Data tests

- schema checks
- missingness/coverage
- distribution sanity

### Training tests

- deterministic seeds where possible
- training data versioning
- metric regression checks

### Serving tests

- training/serving skew checks
- latency budget checks

### Monitoring

- drift detection
- alerting for stale features
- outcome monitoring and feedback loops

## Why interviewers like this

It shows you understand ML technical debt and can build systems that don’t degrade silently.
