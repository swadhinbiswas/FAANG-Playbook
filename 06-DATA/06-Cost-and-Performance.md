# Cost and Performance (Data Systems)

Cost is a first-class requirement in data platforms.

## Common cost drivers

- scanning too much data
- storing duplicates
- unbounded retention
- too many materializations

## Practical optimizations

- partitioning/clustering
- incremental processing
- caching and reuse
- retention policies

## Failure modes

- “it works” but at unsustainable cost
- no observability into data platform spend
