# Capacity Planning Cheatsheet

Capacity planning is about making design choices defensible.

## A minimal template

1. Users and traffic

- DAU/MAU (if relevant)
- QPS average and peak factor

2. Data size

- size per record/object
- storage growth per day

3. Bandwidth

- read/write bandwidth at peak

4. Latency budget

- p95/p99 target
- where time goes (network, compute, DB)

## Useful rules of thumb

- You don’t need perfect math; you need the right order of magnitude.
- Tail latency gets worse under saturation; plan for headroom.
- Caches reduce load but introduce invalidation complexity.

## Common mistakes

- ignoring peak factor
- ignoring read/write asymmetry
- no plan for hot keys/hot partitions
