# Databases (Interview Foundations)

Databases show up in almost every role: they are the “ground truth” and the bottleneck.

## Concepts to master

- Data modeling: entities, relationships, normalization vs denormalization
- Indexes: what they accelerate and what they cost
- Transactions: atomicity and isolation; practical pitfalls
- Replication and read scaling
- Partitioning/sharding and hotspots

## “Good enough” SQL knowledge

- join types and when they change row counts
- group by + having
- window functions basics
- explain plans (conceptually)

## Common failure modes

- **Index cargo cult:** adding indexes everywhere
  - Cost: write amplification, storage, slower inserts/updates

- **Hot partition:** all traffic hits one shard
  - Fix: choose partition keys with access patterns in mind

- **Ignoring isolation:** phantom reads / lost updates
  - Fix: pick correct isolation/locking approach, use idempotency

## Archetype emphasis

- **FAANG:** expects reasoning about scale + consistency.
- **Enterprise:** expects migrations, compatibility, and operational constraints.
- **Automotive/industrial:** expects reliability, traceability, sometimes stricter governance.
