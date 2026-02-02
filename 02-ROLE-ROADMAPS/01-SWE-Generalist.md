# SWE (Generalist) Roadmap

Generalist SWE is the highest-optionality path: strong coding + fundamentals + enough design to build and operate real services.

## What interviewers expect

### Entry / Junior

- solid coding fundamentals
- basic debugging and correctness
- coachability and clear communication

### Mid

- reliable delivery: can own components end-to-end
- good engineering judgment (tests, API design)
- basic system design for small services

### Senior+

- ambiguity handling: can turn vague goals into a plan
- system-level tradeoffs and operational mindset
- influence across teams

## Skill pillars (in priority order)

1. Coding fundamentals (patterns + correctness)
2. Systems basics (networking, OS, databases)
3. System design basics (requirements → design → failure handling)
4. Engineering craft (testing, maintainability, reading code)
5. Behavioral stories (ownership, conflict, impact)

## 8-week plan (job search mode)

Week 1–2: Coding + foundations

- 3 timed coding problems/week + mistake log
- Review: complexity + edge cases

Week 3–4: System design intro

- 1 design prompt/week using [04-SYSTEM-DESIGN-LIBRARY/00-System-Design-Template.md](../04-SYSTEM-DESIGN-LIBRARY/00-System-Design-Template.md)
- Add 2 mini-drills/week (caching, queues, DB indexing)

Week 5–6: Depth + polish

- Mock interviews (coding + design)
- Rewrite 6 behavioral stories (impact + tradeoffs)

Week 7–8: Full loop simulation

- 2 full mock loops/week
- Fix only the top 3 recurring failures

## Projects that create real signal

Pick projects that prove execution and reliability:

- A small API service with authn/authz, DB, caching, rate limiting
- Observability: metrics + logs + traces + dashboards
- A safe deployment strategy (blue/green or canary)

Avoid:

- toy apps with no tests, no monitoring, no failure plan

## Company archetype adjustments

- **FAANG/high-growth:** invest more in system design communication and scale math.
- **Enterprise:** invest more in migrations, compatibility, maintainability.
- **Automotive/industrial:** invest more in correctness, verification mindset, risk control.
