# Online Assessments (OA) / Quizzes

Some companies run an OA as a cheap first filter; others skip it.

Treat an OA like a production incident: **be systematic, reduce mistakes, and keep your head**.

---

## What an OA is testing

In practice, OAs mostly test:

- **Correctness under constraints:** choosing an algorithm that fits time/memory.
- **Implementation hygiene:** clean code, fewer bugs, edge-case handling.
- **Reasoning speed:** can you convert a prompt into a plan quickly?
- **Composure:** do you spiral when stuck?

Many candidates fail for process reasons (I/O mistakes, no tests, misread constraints), not because they don’t “know DSA.”

---

## The OA protocol (repeatable)

### Phase 1: Understand (3–5 minutes)

1. Read the statement twice.
2. Rewrite the task in your own words.
3. Extract constraints (e.g., $n \le 10^5$, values up to $10^9$, time limit 1–2s).
4. Identify required outputs and edge behaviors.

### Phase 2: Design (5–8 minutes)

1. Write 2–3 examples.
2. Add 1–2 edge cases (empty, duplicates, negatives, overflow, extreme sizes).
3. Choose a baseline approach.
4. Sanity-check complexity.

### Phase 3: Implement (rest of time)

1. Code the simplest correct solution.
2. Keep functions small.
3. Avoid cleverness unless required.

### Phase 4: Verify (last 10–20%)

1. Run your examples.
2. Run edge cases.
3. Do a quick “invariants pass” (what must always be true?).
4. Only then micro-optimize.

---

## Time management heuristics

- If you are stuck for 5 minutes: step back and ask, “What’s the simplest representation that makes this easy?” (sorting? hashmap? prefix sums? two pointers?)
- If you are 50% through time with no working code: ship the simplest working baseline.
- If you have a baseline working early: spend the remaining time on tests + clarity.

---

## Common failure modes (and how to avoid them)

- **Ignoring constraints:** $n$ up to $10^5$ but writing $O(n^2)$.
  Fix: complexity check before coding.
- **Misreading the prompt:** wrong interpretation of inclusive/exclusive boundaries.
  Fix: rewrite the prompt and test with examples.
- **Edge-case bugs:** empty input, duplicates, overflow, off-by-one.
  Fix: explicit edge-case tests.
- **I/O mistakes:** parsing errors, forgetting to flush/print formatting.
  Fix: keep I/O minimal and test sample.
- **Over-engineering early:** starting with a fancy structure.
  Fix: baseline first, optimize after.

---

## OA setup checklist (do this before the test)

- Choose your default language and have a template ready (fast input, output formatting).
- Know how to do:
  - sort + custom comparator,
  - binary search,
  - heap/priority queue,
  - BFS/DFS,
  - hashmap/multiset equivalents,
  - modular arithmetic basics.
- Practice at least 2 timed sets in the same environment you’ll use.

---

## Archetype differences

- **FAANG / Big Tech:** OAs are common at junior/mid, less common at senior; they’re often standardized and strict on correctness.
- **Unicorns / startups:** may skip OA or use take-home-ish screens; expect practical coding/debugging.
- **Enterprise / automotive:** may include language/platform/domain checks (C++/embedded, safety, data constraints) more often than pure DSA.

---

## After the OA

- If you can, write down what you struggled with while it’s fresh.
- Regardless of outcome, keep prepping for phone screens; many companies pipeline quickly.

## Cross-links

- DSA foundations: [01-FOUNDATIONS/01-DSA-and-Coding.md](../01-FOUNDATIONS/01-DSA-and-Coding.md)
- Coding interview habits: [03-INTERVIEWS/02-Coding-Interview-Playbook.md](../03-INTERVIEWS/02-Coding-Interview-Playbook.md)

## Grounding sources

- Tech Interview Handbook (common formats incl. quizzes/OA): https://www.techinterviewhandbook.org/software-engineering-interview-guide/
