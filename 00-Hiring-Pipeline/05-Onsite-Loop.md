# Onsite / Virtual Loop

The onsite (or virtual onsite) is usually 3–6 rounds, often combining:

- 2× coding
- 1× system design (mid/senior)
- 1× behavioral
- 0–2× role-specific (ML design, SQL, infra, domain)

This is where companies spend real money: multiple senior interviewers + a debrief process. The loop is designed to **reduce false positives** (hiring the wrong person) more than to avoid false negatives.

## What companies want from the loop

They want multiple independent measurements of the same underlying capability, then a calibration step.

That’s why you’ll see similar themes across rounds (clarity, correctness, tradeoffs, execution).

In other words: you’re not trying to be “brilliant,” you’re trying to be **consistently strong**.

---

## Before the loop (prep that actually matters)

### 1) Standardize your interview operating system

- A repeatable coding process (clarify → plan → implement → test).
- A repeatable system design process (requirements → API/data → components → scaling → reliability → tradeoffs).
- A repeatable behavioral structure (STAR/SAO with metrics and ownership).

### 2) Build a “portfolio” of evidence

Have 6–10 stories ready:

- 2 delivery wins
- 2 reliability/incident stories
- 1 conflict / disagreement
- 1 leading without authority
- 1 big technical tradeoff
- 1 failure + what you learned

### 3) Match archetype expectations

- Big tech: strongest on fundamentals + structured communication.
- Startups: strongest on end-to-end ownership and pragmatism.
- Enterprise: strongest on stakeholder management + maintainability.
- Automotive/industrial: strongest on safety, validation mindset, constraints.

## How to pace yourself

- Early rounds: don’t “warm up.” Treat round 1 as the decider.
- Between rounds: write 5 bullets of what went well/what to fix.
- Food/water: manage energy like a long incident.

Add two more:

- Reset between rounds: close tabs, breathe, sip water, quick posture reset.
- Track time inside rounds: if you’re 10 minutes in and still unclear, force clarity.

---

## Round-by-round guidance

### Coding rounds

What gets you “strong hire” most often:

- Clarifying questions early (inputs/outputs, constraints)
- Clear plan before coding
- Clean implementation
- Systematic tests (including edge cases)
- Able to explain complexity and tradeoffs

### System design (mid/senior)

What kills candidates:

- Building before requirements
- No data model, no APIs, no capacity planning
- No failure handling (timeouts, retries, backpressure)
- No tradeoff discussion

### Behavioral

What kills candidates:

- Vague stories, no ownership
- No metrics, no conflict, no learning
- Blaming others

---

## If the loop is at Amazon (or similar rubric-heavy companies)

Some companies are very explicit about “loop interviews” and structured hiring. Amazon publishes a “How We Hire” overview that highlights loop interviews and preparation resources.

- Overview: https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon

## Common “loop-killers”

- Great solution, poor communication (interviewer can’t follow).
- Incorrect code + weak testing.
- System design without requirements and constraints.
- Behavioral answers without ownership, conflict, or measurable outcomes.

Also common:

- Over-optimizing a subcomponent while ignoring the main requirement.
- Arguing with the interviewer instead of collaborating.
- Not correcting yourself when you notice a bug.

## Cross-links

- System design template: [04-SYSTEM-DESIGN-LIBRARY/00-System-Design-Template.md](../04-SYSTEM-DESIGN-LIBRARY/00-System-Design-Template.md)
- Common design prompts + what they test: [04-SYSTEM-DESIGN-LIBRARY/03-Common-Prompts-and-What-They-Test.md](../04-SYSTEM-DESIGN-LIBRARY/03-Common-Prompts-and-What-They-Test.md)
- Behavioral playbook: [03-INTERVIEWS/06-Behavioral-Interview-Playbook.md](../03-INTERVIEWS/06-Behavioral-Interview-Playbook.md)

## Grounding sources

- Tech Interview Handbook system design guide: https://www.techinterviewhandbook.org/system-design/
- Palantir systems design interview advice (tradeoffs + thought process): https://www.palantir.com/2011/10/how-to-rock-a-systems-design-interview/
