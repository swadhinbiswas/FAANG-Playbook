# Meta: Detailed Interview Playbook

**Company Profile:** Hiring E3–E6 (SWE), E4–E5 (Production Engineer). Culture: move fast, break things, technical excellence, impact.

---

## **Loop Structure**

| Stage                     | Duration      | Evaluators                             | What They Test                               |
| ------------------------- | ------------- | -------------------------------------- | -------------------------------------------- |
| **Recruiter Screen**      | 30 min        | Recruiter                              | Fit, motivation, background                  |
| **Phone Screen (Coding)** | 60 min        | SWE                                    | Hard DSA + communication                     |
| **Onsite (4 rounds)**     | 5 hours total | SWEs, hiring manager, cross-functional | Coding + design + behavioral + product sense |

---

## **Phone Screen (Coding)**

**What Meta cares about:** Can you solve hard problems fast and communicate well?

### **Problem Style**

- Hard LeetCode (Meta-tagged)
- Examples: [Number of Islands](https://leetcode.com/problems/number-of-islands/), [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/), [Serialize/Deserialize BST](https://leetcode.com/problems/serialize-and-deserialize-bst/)

### **Evaluation Criteria (1–5 scale)**

- **5:** Optimal solution quickly; excellent communication; handles edge cases
- **4:** Correct solution; minor inefficiency; good communication
- **3:** Correct with hints; acceptable communication
- **<3:** Incorrect or incomplete

### **Strategy**

1. **Clarify (1–2 min):** Edge cases, constraints.
2. **Think aloud (3–5 min):** Explain your approach before coding.
3. **Code (15–20 min):** Fast; clean; readable.
4. **Test (5 min):** Walkthroughs; edge cases.
5. **Optimize (5 min):** Discuss alternatives.

### **Real Interview Tips**

- Meta's bar is high for coding; they expect you to solve hard problems correctly.
- Communication matters; explain what you're thinking.
- If stuck, ask questions; most Meta interviewers will guide you.

---

## **Onsite (4 Rounds)**

### **Round 1: Coding (60 min)**

Another hard problem; often more complex than phone screen.

**Patterns:** Trees, graphs, heaps, dynamic programming, strings.

---

### **Round 2: System Design (60 min)**

**Typical prompts:**

- Design Messenger
- Design News Feed
- Design Stories
- Design a rate limiter
- Design Ads ranking

**Meta's twist:** Emphasis on **real-time systems**, **scale**, and **trade-offs between latency and correctness**.

**Template:**

1. Clarify requirements: "How many users? Messages per second? Latency requirement?"
2. High-level design: Components, APIs.
3. Deep dive: Pick one hard component (e.g., message delivery, notification system).
4. Failure handling: "What if servers go down? How do users recover?"
5. Scale: "How would we handle 1B users?"

**Meta interviewer focus:** Can you think about real-time systems? Can you discuss trade-offs?

---

### **Round 3: Behavioral (45 min)**

**What Meta cares about:** Can you move fast? Can you adapt? Do you have impact?

**Common questions:**

- "Tell me about a time you shipped something fast."
- "Describe a time you had to learn something new quickly."
- "Tell me about a time you had to make a decision with incomplete information."
- "Give an example of when you made a mistake. What did you learn?"
- "Tell me about a time you influenced a decision without authority."

**STAR format:**

- **Situation:** 1–2 sentences
- **Task:** Challenge; decision needed (1–2 sentences)
- **Action:** What you did; emphasize speed/impact/learning (3–4 sentences)
- **Result:** Outcome; metrics; what you learned (2–3 sentences)

**Meta-specific:**

- Emphasize **speed.** "We shipped in 2 weeks instead of 2 months."
- Emphasize **impact.** "This reduced latency by 30%, improving engagement."
- Emphasize **learning.** "We failed fast, learned, and iterated."

---

### **Round 4: Product Sense / Technical Breadth (60 min)**

This round varies based on level:

- **E3:** Another coding round or light design problem
- **E4+:** Product sense (How would you improve Facebook? What metrics matter?) or cross-functional (How would you design this feature with PM + Design?)

**For product sense:**

- Discuss user needs first
- Propose metrics (engagement, retention, growth)
- Discuss trade-offs (privacy vs. engagement, speed vs. correctness)

---

## **Leveling Guide**

### **E3 (Junior)**

- Phone: Hard LeetCode
- Onsite: 3–4 rounds (coding + design-lite + behavioral + other)
- Design: Focus on correctness; may not fully grasp scale
- Behavioral: Show learning ability; willingness to move fast

### **E4 (Mid)**

- Phone: Hard LeetCode
- Onsite: 4 rounds (2 coding or mixed + design + behavioral + product sense)
- Design: Handle real-time; discuss trade-offs; scale thinking
- Behavioral: Show impact; speed of execution; cross-team collaboration

### **E5 (Senior)**

- Phone: Hard LeetCode or design-first
- Onsite: 4 rounds (hard design + hard coding + behavioral + hiring manager round)
- Design: Novel systems; think about operational complexity; business impact
- Behavioral: Strategic thinking; mentorship; influence across org

---

## **Interview Style**

Meta interviews are relatively **straightforward**—what you see is what you get. Unlike Amazon (leadership principles) or Google (scale obsession), Meta evaluates you on:

- **Technical chops:** Can you solve hard problems?
- **Speed:** Can you move fast?
- **Communication:** Can you articulate your thinking?
- **Impact:** Do you make things better?

---

## **Preparation Timeline**

| Week | Activity                                               |
| ---- | ------------------------------------------------------ |
| 1–2  | Phone screen prep (15 hard problems)                   |
| 3–4  | System design (4 Meta-style problems; real-time focus) |
| 5–6  | Behavioral (8 stories emphasizing speed + impact)      |
| 7    | Maintenance + refinement                               |
| 8    | Rest + final review                                    |

---

## **Negotiation**

- **Standard E4 offer:** ~200–230k base + 50–70k bonus + ~150–200k stock (4-year)
- **E5 offer:** ~260–300k base + 60–80k bonus + ~350–500k stock (4-year)
- **Negotiation leverage:** Meta is competitive on cash; get other offers; they'll match or beat
- **Equity vesting:** Meta vests 25% per year (yearly cliffs for first 4 years)

---

## **Red Flags at Meta**

- ❌ Your code is sloppy or inefficient → Meta cares about code quality
- ❌ You're slow at coding → Speed matters; they expect hard problems solved in ~30 min
- ❌ Your behavioral stories don't emphasize impact → Meta wants people who make things better
- ❌ You're risk-averse → Meta's culture is "move fast"; if you hate rapid iteration, it may not be a fit

---

## **Meta Culture**

- **Move fast:** Iteration is faster than planning. Launch and learn.
- **Impact-driven:** What did you ship? Did users notice?
- **Technical excellence:** Code quality matters; we ship fast but not sloppily.
- **Curious:** Learn constantly; Meta's tech stack is always evolving.

---

**Meta values speed + impact + technical excellence. Prepare to move fast.** 🚀
