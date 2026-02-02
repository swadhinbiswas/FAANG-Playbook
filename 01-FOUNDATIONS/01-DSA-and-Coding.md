# DSA & Coding (Interview-Grade)

The goal isn’t “know all algorithms”. The goal is to reliably:

- identify the right approach quickly
- implement correctly under time
- communicate tradeoffs

## Core patterns you must recognize

### Arrays / strings

- Two pointers
- Sliding window
- Prefix sums / difference arrays
- Sorting + scanning

### Hashing

- Frequency maps
- De-dup and membership
- “Seen set” to break cycles

### Trees / graphs

- BFS vs DFS decision rules
- Topological ordering (DAG)
- Shortest path when edges have weights

### Dynamic programming

- Define state + transition + base case
- Start with 2D DP, then optimize
- If stuck: recursion + memo first

## How interviewers evaluate you

They’re typically scoring:

- correctness and edge cases
- complexity reasoning
- clarity (naming, structure)
- debugging ability

## A 45-minute coding process

1. Restate problem and confirm inputs/outputs
2. Identify constraints and edge cases
3. Propose 1–2 approaches; pick one
4. Write code in small compilable chunks
5. Test with 2–3 cases (happy path + edge)
6. State complexity and any follow-ups

## Common failure cases

- **Off-by-one bugs** in loops/pointers
  - Fix: write invariants (what’s true each iteration)

- **Wrong data structure** (e.g., list instead of set)
  - Fix: ask “do I need membership in O(1)?”

- **DP panic**
  - Fix: first write recursion with memo; only then convert to bottom-up

## Practice plan (minimum effective dose)

- 3 days/week: 1 medium problem timed (45–60 min)
- 2 days/week: 30 min pattern drill (same pattern, different problems)
- 1 day/week: redo a previously-missed problem from scratch

## Notes by company archetype

- **FAANG:** speed + clear communication; they expect structured thinking.
- **Enterprise:** still cares about correctness, but may value maintainability and tests more.
- **Automotive/industrial:** correctness and disciplined reasoning can outweigh “flashy” speed.
