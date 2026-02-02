# Computer Systems (OS + Networking)

Systems knowledge matters because many “senior” bugs are systems bugs: timeouts, memory, contention, caching, and partial failure.

## OS basics you should be able to explain

- process vs thread
- context switching and why too many threads hurt
- memory: stack vs heap, GC basics (if using managed languages)
- IO vs CPU bound
- locks vs lock-free intuition (don’t overclaim)

### Interview-grade mental models

- Latency is not just “slow code”; it’s often queueing.
- Most outages are dependency + retry storms + timeouts misconfigured.

## Networking basics you should be able to explain

- DNS and where caching happens
- TCP vs UDP (and why HTTP/3 exists)
- TLS basics: what it gives you, handshake cost, cert rotation
- HTTP semantics: idempotency, retries, timeouts

## Practical debugging checklist

When a service is “slow”:

1. Is it CPU bound? (high CPU)
2. Is it IO bound? (waiting on DB, remote calls)
3. Is it lock/contention bound? (high latency but low CPU)
4. Is it GC bound? (stop-the-world pauses)
5. Is it saturation? (queues growing, p95 exploding)

## Company archetype differences

- **FAANG/high-growth:** expects you to reason about tail latencies and tradeoffs.
- **Enterprise:** expects you to manage compatibility, change control, and safe rollouts.
- **Automotive/industrial:** expects careful risk thinking, testing discipline, and verification mindset.
