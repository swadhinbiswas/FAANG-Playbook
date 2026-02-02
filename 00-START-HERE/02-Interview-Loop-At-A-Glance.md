# Interview Loop at a Glance

Most loops are some variation of:

1. **Recruiter screen** (fit + logistics)
2. **Technical screen** (coding / SQL / ML / infra)
3. **Onsite / virtual onsite** (multiple rounds)
4. **Hiring committee / debrief** (calibration)

## What interviewers are really scoring

Across companies, the scoring typically reduces to:

- **Correctness:** you can produce correct solutions and validate them.
- **Reasoning:** you can explain tradeoffs and constraints.
- **Signal-to-noise:** you communicate without wandering.
- **Engineering maturity:** you build maintainable systems, not just demos.
- **Ownership:** you take responsibility for outcomes.

## Coding round signals

Good

- Clarifies requirements and constraints early.
- Chooses an approach that fits time and complexity.
- Writes clean code with tests / edge cases.
- Narrates tradeoffs and alternative approaches.

Bad

- Starts coding without clarifying input/output.
- Overcomplicates: premature optimization, clever tricks.
- Can’t reason about complexity or edge cases.

## System design round signals

Good

- Defines requirements and makes them measurable (SLOs, throughput, latency).
- Proposes a simple baseline architecture first.
- Identifies bottlenecks and failure modes.
- Connects tradeoffs to product goals.

Bad

- Talks in buzzwords without data flows.
- No capacity planning.
- No failure handling or operational plan.

## Behavioral round signals

Good

- Uses concrete stories with impact and learning.
- Shows judgment and ownership (not blame).
- Demonstrates collaboration and conflict handling.

Bad

- Generic STAR with no specifics.
- No reflection on what you’d do differently.

## How loops differ by role

- **Backend:** more depth in storage, distributed systems, APIs, reliability.
- **MLE/MLOps:** production readiness, data issues, monitoring, deployment patterns.
- **DE:** SQL, modeling, pipelines, orchestration, cost, quality.
- **DS:** experimentation, metrics, ambiguity-to-plan, stakeholder influence.
- **DevOps/SRE:** incident response, operability, automation, systems fundamentals.

## How loops differ by company archetype

- **FAANG/high-growth:** fast iteration, scale assumptions, structured rubric, strong calibration.
- **Enterprise:** integration/migration, governance, long-lived systems, stakeholder nuance.
- **Automotive/industrial:** safety mindset, verification, traceability, risk control.

## Quick self-scoring rubric (0–2)

Use this after every practice session.

- Requirements clarified: 0/1/2
- Correct solution delivered: 0/1/2
- Tradeoffs explained: 0/1/2
- Edge cases tested: 0/1/2
- Communication clarity: 0/1/2
- Post-mortem written: 0/1/2

If you’re consistently below 8/12, shorten scope and increase reps.
