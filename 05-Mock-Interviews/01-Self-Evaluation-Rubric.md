# Mock Interview: Self-Evaluation Rubric

Use this **after every mock interview** to calibrate yourself against real evaluation standards.

---

## **Coding Interview Rubric**

Rate yourself 1–5 on each dimension. Compare to your mock interviewer's feedback.

### **Communication (How clearly did you explain your thinking?)**

| Score | Description                                                                      | What this means                               |
| ----- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| **1** | Silent coding or vague statements ("uh, I'll try this...")                       | Interviewer has no idea what you're thinking. |
| **2** | Some explanation, but incomplete or hard to follow                               | Interviewer misses key steps.                 |
| **3** | Clear but not proactive (only explain when asked)                                | Interviewer has to prompt you repeatedly.     |
| **4** | Clear explanation of approach before coding; narrate while coding                | Interviewer follows your logic.               |
| **5** | Crystal-clear walkthrough; state assumptions; explain tradeoffs; invite feedback | Interviewer feels confident in your clarity.  |

**Target:** 4–5
**Improvement if 1–3:** Practice narrating your approach BEFORE coding. Record yourself solving LeetCode problems.

---

### **Problem Solving (Did you approach the problem systematically?)**

| Score | Description                                                                 | What this means                                      |
| ----- | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| **1** | Jumped to code without understanding the problem                            | You misunderstood the prompt or constraints.         |
| **2** | Asked some questions but still unclear                                      | You didn't extract all constraints.                  |
| **3** | Asked clarifying questions; stated assumptions                              | Interviewer has confidence you understand the scope. |
| **4** | Clarifying questions + outlined approach before coding                      | Interviewer knows your plan.                         |
| **5** | Deep clarification + approach + edge cases + tradeoffs discussed pre-coding | Interviewer confident you're systematic.             |

**Target:** 4–5
**Improvement if 1–3:** Use a standard framework: (1) Clarify, (2) Plan, (3) Code, (4) Test.

---

### **Technical Correctness (Does your solution work?)**

| Score | Description                                                | What this means                              |
| ----- | ---------------------------------------------------------- | -------------------------------------------- |
| **1** | Doesn't compile/run                                        | Syntax errors or logic that doesn't execute. |
| **2** | Runs but fails test cases                                  | Your algorithm is wrong or has bugs.         |
| **3** | Passes most cases but fails edge cases                     | Off-by-one, null checks, or boundary bugs.   |
| **4** | Passes all your test cases                                 | You tested systematically.                   |
| **5** | Passes all cases + explains why it works + invariants hold | You're confident in correctness.             |

**Target:** 4–5
**Improvement if 1–3:** Add test cases BEFORE coding. Include edge cases: empty input, duplicates, overflow, off-by-one.

---

### **Complexity Analysis (Can you explain runtime/space?)**

| Score | Description                                     | What this means                                  |
| ----- | ----------------------------------------------- | ------------------------------------------------ |
| **1** | Can't articulate complexity                     | You don't know Big-O notation.                   |
| **2** | Can state complexity but can't justify it       | You memorized but don't understand.              |
| **3** | State complexity + rough justification          | Interviewer mostly believes you.                 |
| **4** | Accurate complexity + clear reasoning           | Interviewer knows you understand.                |
| **5** | Complexity + tradeoffs + optimization reasoning | Interviewer confident you can design algorithms. |

**Target:** 4–5
**Improvement if 1–3:** Trace through your code and count operations. Practice saying "O(n log n) because we sort (log n) and iterate (n)."

---

### **Optimization & Iterative Thinking (Did you improve your solution?)**

| Score | Description                                                              | What this means                               |
| ----- | ------------------------------------------------------------------------ | --------------------------------------------- |
| **1** | Stuck on first approach; can't pivot                                     | You lack flexibility.                         |
| **2** | Can explain an optimization but didn't implement it                      | You have ideas but didn't execute.            |
| **3** | Implemented a basic solution; discussed optimization but ran out of time | You understand tradeoffs.                     |
| **4** | Implemented, tested, then optimized                                      | You prioritize correctly (correctness first). |
| **5** | Multiple approaches explored; best one chosen; complexity justified      | You're a strategic problem solver.            |

**Target:** 3–4
**Improvement if 1–2:** Time-box: 20 min to working solution, 10 min to optimize.

---

## **System Design Interview Rubric**

### **Requirements Clarification (Did you understand the problem?)**

| Score | Description                                                             | What this means                               |
| ----- | ----------------------------------------------------------------------- | --------------------------------------------- |
| **1** | Started designing immediately                                           | You didn't clarify scope.                     |
| **2** | Asked a few questions but missed key constraints                        | Your design might not fit the actual problem. |
| **3** | Asked good questions; stated assumptions                                | Interviewer confident you understand scope.   |
| **4** | Comprehensive questions + edge cases + constraints                      | You're systematic.                            |
| **5** | Questions + constraints + scale + tradeoffs baseline (before designing) | You're methodical and thorough.               |

**Target:** 4–5
**Improvement if 1–3:** Before designing, confirm: scale (users, RPS, data), latency, availability, consistency, security.

---

### **API & Data Model Design (Is your interface clear?)**

| Score | Description                                                                    | What this means                                 |
| ----- | ------------------------------------------------------------------------------ | ----------------------------------------------- |
| **1** | No clear API or data model                                                     | Interviewer doesn't know what your system does. |
| **2** | Vague API; data model is ad-hoc                                                | Your design is unclear or incomplete.           |
| **3** | Clear API + basic data model                                                   | Interviewer can follow your system.             |
| **4** | Well-defined API + thoughtful data model + schema considerations               | You're precise.                                 |
| **5** | API with examples + schema + indexes + tradeoffs (e.g., denormalization trade) | You think like a database engineer.             |

**Target:** 4–5
**Improvement if 1–3:** Always draw your API endpoints and data schema clearly. Discuss primary keys, indexes, and denormalization.

---

### **Architecture & Components (Does your design scale?)**

| Score | Description                                                              | What this means                    |
| ----- | ------------------------------------------------------------------------ | ---------------------------------- |
| **1** | Monolith or no clear component separation                                | Doesn't scale.                     |
| **2** | Components exist but unclear interaction                                 | Scalability unclear.               |
| **3** | Components + basic interactions; some bottlenecks identified             | You understand scaling ideas.      |
| **4** | Well-separated components + caching + load balancing + database sharding | You're thinking production.        |
| **5** | Components + caching strategy + CDN + queue + failover + monitoring      | You're thinking like an architect. |

**Target:** 4–5
**Improvement if 1–3:** Use a mental checklist: Load Balancer → API Servers → Cache (Redis) → Database → Queue → Async Workers → Monitoring.

---

### **Failure Modes & Reliability (Did you consider reliability?)**

| Score | Description                                                              | What this means                       |
| ----- | ------------------------------------------------------------------------ | ------------------------------------- |
| **1** | No mention of failures or reliability                                    | You haven't thought about production. |
| **2** | Acknowledge failure exists but no mitigation                             | You're aware but not proactive.       |
| **3** | Mention retries, replicas, or backups                                    | You know some patterns.               |
| **4** | Discuss timeouts, retries, fallbacks, redundancy                         | You're thinking like an SRE.          |
| **5** | Comprehensive: idempotency, circuit breakers, graceful degradation, SLOs | You're thinking production-ready.     |

**Target:** 4–5
**Improvement if 1–3:** Ask: "What if a database goes down? A cache node fails? A service is slow?" Plan around each.

---

### **Tradeoffs & Justification (Can you defend your choices?)**

| Score | Description                                                             | What this means                      |
| ----- | ----------------------------------------------------------------------- | ------------------------------------ |
| **1** | No tradeoffs discussed                                                  | You don't understand options.        |
| **2** | Mention tradeoffs vaguely ("consistency vs availability")               | You know the concept but not deeply. |
| **3** | Explain one or two tradeoffs with reasoning                             | Interviewer sees your thinking.      |
| **4** | Discuss multiple tradeoffs + justify choices for this specific problem  | You're thoughtful about context.     |
| **5** | Tradeoffs clearly laid out + justified + revisited based on constraints | You're strategic.                    |

**Target:** 4–5
**Improvement if 1–3:** For each design choice, say: "I chose X over Y because [scale/cost/latency/complexity reason]."

---

## **Behavioral Interview Rubric**

### **Situation & Context (Did you set up the story?)**

| Score | Description                                           | What this means                                |
| ----- | ----------------------------------------------------- | ---------------------------------------------- |
| **1** | No context; unclear what happened                     | Interviewer confused.                          |
| **2** | Vague context ("I worked on a project...")            | Interviewer doesn't understand the stakes.     |
| **3** | Clear context but brief                               | Interviewer understands but wants more detail. |
| **4** | Specific context: company, role, team size, timeframe | Interviewer can visualize.                     |
| **5** | Detailed context + why it mattered + scale/impact     | Interviewer understands the significance.      |

**Target:** 4–5

---

### **Action & Ownership (What did YOU personally do?)**

| Score | Description                                                        | What this means                                     |
| ----- | ------------------------------------------------------------------ | --------------------------------------------------- |
| **1** | Unclear what you did vs team did                                   | You don't own the story.                            |
| **2** | Vague actions ("I helped...")                                      | Your role is ambiguous.                             |
| **3** | Clear actions but minimal detail                                   | Interviewer understands but sees limited ownership. |
| **4** | Specific actions; clear what you owned end-to-end                  | Interviewer sees clear ownership.                   |
| **5** | Actions + rationale + decisions you made + tradeoffs you navigated | Interviewer sees leadership.                        |

**Target:** 4–5
**Improvement if 1–3:** Use "I" language. Say "I designed," "I debugged," "I led," not "we did."

---

### **Result & Metrics (What actually changed?)**

| Score | Description                                       | What this means                                    |
| ----- | ------------------------------------------------- | -------------------------------------------------- |
| **1** | No clear outcome                                  | You don't know if it mattered.                     |
| **2** | Vague outcome ("it went well")                    | Interviewer skeptical.                             |
| **3** | Clear outcome but no metrics                      | Interviewer understands but sees no proof.         |
| **4** | Outcome with metrics (latency -30%, revenue +$2M) | Interviewer sees impact.                           |
| **5** | Metrics + business context + longer-term impact   | Interviewer knows you think like a business owner. |

**Target:** 4–5
**Improvement if 1–3:** Every story needs a number: latency, cost, throughput, revenue, user retention, incident reduction.

---

### **Conflict & Learning (Did you show growth?)**

| Score | Description                                                        | What this means               |
| ----- | ------------------------------------------------------------------ | ----------------------------- |
| **1** | No conflict or learning mentioned                                  | Story feels surface-level.    |
| **2** | Conflict mentioned but avoided/not addressed                       | You avoid hard conversations. |
| **3** | Conflict resolved; learning identified                             | Interviewer sees maturity.    |
| **4** | Conflict clearly articulated + resolution + specific learning      | Interviewer sees judgment.    |
| **5** | Conflict + resolution + learning + how you changed future behavior | Interviewer sees wisdom.      |

**Target:** 4–5
**Improvement if 1–3:** Include a moment where you disagreed, got stuck, or failed. Show what you learned.

---

## **Using This Rubric**

### **Self-Assessment After a Mock**

1. Rate yourself 1–5 on each dimension
2. Compare to your mock interviewer's scores
3. Identify 1–2 biggest gaps
4. Practice specifically on those gaps

### **Tracking Progress**

Create a simple table:

```
Date | Coding Comm | Coding Correctness | System Design | Behavioral | Notes
-----|-------------|-------------------|---------------|-----------|-------
2/1  | 3           | 4                 | 2             | 3         | Need to ask more clarifying Qs
2/8  | 4           | 4                 | 3             | 4         | Better questions; still weak on tradeoffs
2/15 | 4           | 5                 | 4             | 5         | Ready for real loops
```

### **Red Flags**

If you consistently score 1–2 on any dimension, **pause and retrain**:

- Communication 1–2 → Record yourself explaining problems; practice narrating
- Correctness 1–2 → Add systematic testing; study edge cases
- Design 1–2 → Read system design blogs; do more examples
- Behavioral 1–2 → Write out 10 STAR stories; practice telling them

---

**Target Overall:** 4 or higher on all dimensions before real interviews.
