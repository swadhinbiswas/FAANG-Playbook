# Phone Screen(s)

Phone screens are usually 1–2 rounds and can include:

- Coding (most common)
- Practical debugging
- Light system design (mid/senior)
- Role-specific (SQL, ML, infra)

Phone screens are high-leverage because they’re cheaper than onsites: companies are trying to quickly answer “is this person worth a full loop?”

## What’s different from onsite

- Less time to build rapport
- Usually one interviewer → one “vote” can gate you
- Often stricter on basics (communication, correctness)

In many orgs, a phone screen fail is not “almost”; it’s a hard stop. Treat it with onsite seriousness.

---

## The phone screen flow (what to expect)

Typical structure for a coding-focused screen:

1. 2–3 minutes: intros + context
2. 2–5 minutes: problem statement + clarifying questions
3. 15–25 minutes: solve + implement
4. 5–10 minutes: testing + complexity + follow-ups
5. 2–5 minutes: your questions

Role-specific screens vary:

- **SQL:** one hard query + follow-ups (edge cases, performance, correctness)
- **ML:** modeling choices, tradeoffs, evaluation pitfalls, data leakage
- **Infra/SRE:** debugging, incident-style reasoning, reliability tradeoffs

---

## What “great” looks like (rubric mindset)

Even when the interviewer doesn’t show you a rubric, they typically grade on dimensions like:

- Communication
- Problem solving
- Technical competency
- Testing

Reference rubric example: https://www.techinterviewhandbook.org/coding-interview-rubrics/

## What “good” looks like

Use a rubric mindset. Many big tech companies evaluate coding on dimensions like:

- Communication
- Problem solving
- Technical competency
- Testing

See: https://www.techinterviewhandbook.org/coding-interview-rubrics/

## Phone screen checklist

- Confirm language + environment (CoderPad, shared doc, etc.).
- Ask clarifying questions early.
- State approach before coding.
- Narrate while coding (don’t go silent).
- Test typical + corner cases.
- If stuck: communicate, propose alternatives, ask for a hint.

Add these “boring but important” items:

- Ensure the environment works (mic, screenshare, editor, typing latency).
- Keep a paper/notebook for quick examples and invariants.
- If you need 30 seconds to think: say so explicitly (“I’m going to think for 30 seconds”).

---

## What to do when you’re stuck

Stuck is not fatal. Silent stuck is.

Use a reset script:

1. Restate the goal.
2. State what you tried.
3. Propose a simpler approach.
4. Ask for a small hint.

Example:

> I’m trying to maintain a running window with two pointers, but handling duplicates is getting messy. Let me step back—if we sort first, we can reduce it to a single pass. Would that be acceptable given the constraints?

---

## Your questions (pick 2–3)

- “What would a strong hire for this role look like?”
- “What does the team own end-to-end?”
- “What are the biggest technical challenges right now?”

---

## Common failure modes

- Implementing without confirming constraints.
- No tests and weak edge-case handling.
- Jumping to an overcomplicated solution.
- Going quiet for long stretches.

## Cross-links

- Coding playbook: [03-INTERVIEWS/02-Coding-Interview-Playbook.md](../03-INTERVIEWS/02-Coding-Interview-Playbook.md)
- System design playbook: [03-INTERVIEWS/03-System-Design-Interview-Playbook.md](../03-INTERVIEWS/03-System-Design-Interview-Playbook.md)
- SQL/data interview playbook: [03-INTERVIEWS/05-SQL-Data-Interview.md](../03-INTERVIEWS/05-SQL-Data-Interview.md)

## Grounding sources

- Tech Interview Handbook rubrics: https://www.techinterviewhandbook.org/coding-interview-rubrics/
