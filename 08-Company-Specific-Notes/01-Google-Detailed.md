# Google: Detailed Interview Playbook

**Company Profile:** Hiring L3–L6 (SWE), L4–L6 (SRE), L4–L5 (APM). Culture: technical rigor, bias toward action, data-driven.

---

## **Loop Structure**

| Stage                     | Duration      | Evaluators                | What They Test                            |
| ------------------------- | ------------- | ------------------------- | ----------------------------------------- |
| **Recruiter Screen**      | 30 min        | Recruiter                 | Fit, communication, motivation            |
| **Phone Screen (Coding)** | 60 min        | Senior SWE                | Medium-hard DSA; code quality             |
| **Onsite (4 rounds)**     | 5 hours total | SWEs, TPM, hiring manager | Coding + design + behavioral + tech depth |

---

## **Recruiter Screen**

**What Google cares about:** Can you do the job? Do you want to work here?

### **Talking Points**

- **Lead with impact:** "I shipped X, which improved Y by Z%"
- **Show ownership:** "I didn't just implement; I drove the decision"
- **Express genuine interest:** Mention a _specific_ product or initiative (not just "Google is cool")

### **Traps to Avoid**

- ❌ "I want to work at Google because it's prestigious" → ✅ "I want to work on [product]"
- ❌ Generic answers → ✅ Specific examples with metrics
- ❌ Lack of questions → ✅ Ask thoughtful questions about team, product roadmap

### **Questions to Ask**

- "What's the biggest challenge your team is facing right now?"
- "How does success look for this role in the first 90 days?"
- "Can you tell me about the team's culture and how we work together?"

---

## **Phone Screen (Coding)**

**What Google cares about:** Can you solve hard problems cleanly?

### **Problem Style**

- Medium to medium-hard LeetCode (mostly Google-tagged problems)
- Examples: [Binary Tree Max Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/), [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/), [LRU Cache](https://leetcode.com/problems/lru-cache/)

### **Evaluation Criteria**

| Dimension        | Score 4/5                                      | Score 3/5                              | Score <3/5                                 |
| ---------------- | ---------------------------------------------- | -------------------------------------- | ------------------------------------------ |
| **Correctness**  | Fully correct on first try or with 1 minor fix | Correct with guidance; needs debugging | Wrong output; fundamental misunderstanding |
| **Approach**     | Optimal solution explained clearly             | Working solution; suboptimal           | No clear approach                          |
| **Code Quality** | Clean, readable, follows best practices        | Functional; some minor style issues    | Sloppy; hard to read                       |
| **Explanation**  | Walks through logic; explains tradeoffs        | Explains solution; less detail on why  | Minimal explanation                        |

### **Strategy**

1. **Clarify the problem (2 min):** Ask edge cases, constraints.
2. **Think aloud (5 min):** Walk through your approach; don't code immediately.
3. **Code (20–25 min):** Write clean, readable code.
4. **Test (10 min):** Trace through examples; handle edge cases.
5. **Optimize (5 min):** If time, discuss space/time tradeoffs.

### **Real Interview Tips**

- Google interviewers expect clean code; they're evaluating if you'd pass code review.
- Don't rush; explain your reasoning.
- If you get stuck, ask for a hint; most interviewers will help.

---

## **Onsite (4 Rounds)**

### **Round 1: Coding (60 min)**

Same as phone screen; hard problem. Often a data structure question (trees, graphs, heaps).

**Common patterns:** Trees (DFS/BFS), graphs, dynamic programming, heaps.

---

### **Round 2: System Design (60 min)**

**Typical prompts:**

- Design YouTube
- Design Google Search
- Design Google Maps
- Design Ads system

**Google's twist:** Emphasis on **scale** and **distributed systems**.

**Template:**

1. Clarify: "How many users? QPS? Read/write ratio?"
2. High-level design: Draw boxes (frontend, backend, database, cache).
3. Deep dive: Pick one component; explain sharding, replication, consistency.
4. Failure handling: "What if a data center goes down?"
5. Monitoring: "How would we detect issues?"

**What Google interviewers care about:**

- Can you scale to billions?
- Do you understand failure modes?
- Can you discuss tradeoffs (latency vs. consistency)?

**Scoring (1–5):**

- 5: Handles novel questions, thinks about edge cases, discusses business implications
- 4: Good design, minor gaps, handles most questions
- 3: Working design, significant gaps, needs guidance
- <3: Incomplete or confused

---

### **Round 3: Behavioral (45 min)**

**What Google cares about:** Can you work on a team? Do you handle conflict? Do you learn?

**Common questions:**

- "Tell me about a time you had to work with a difficult teammate."
- "Describe a project where you made a mistake. How did you handle it?"
- "Tell me about a time you had to learn something new quickly."
- "Give me an example of when you showed ownership."
- "Tell me about a time you didn't agree with your manager. How did you handle it?"

**STAR format:**

- **Situation:** Set the stage (2–3 sentences)
- **Task:** What was the challenge? (1–2 sentences)
- **Action:** What did you do? (3–4 sentences; emphasize _your_ decisions)
- **Result:** What happened? Include metrics. (2–3 sentences)

**Google-specific:** Show "Googleyness" (collaboration, bias toward action, learning mindset).

---

### **Round 4: Tech Depth (60 min)**

Interviewer dives deep into your prior work or a technical topic.

**Possible focuses:**

- Internals of a system you built
- Database design decisions
- How you'd debug a performance issue
- Your experience with distributed systems

**Strategy:**

- Prepare 2–3 deep dives on projects you've worked on
- Be ready to discuss tradeoffs you made
- Admit what you don't know; don't BS

---

## **Leveling Guide**

### **L3 (Junior)**

- Phone: Medium LeetCode
- Onsite: 2 rounds (coding + design-lite OR behavioral + tech depth)
- Design: Focus on correctness; can miss some scalability nuances
- Behavioral: Show learning ability + teamwork

### **L4 (Mid)**

- Phone: Medium-hard LeetCode
- Onsite: 3–4 rounds (coding + system design + behavioral + tech depth)
- Design: Handle scale; discuss consistency models
- Behavioral: Show ownership + impact; mention mentoring others

### **L5 (Senior)**

- Phone: Hard LeetCode (or design + coding mixed)
- Onsite: 4 rounds (hard coding + complex design + behavioral + architecture review)
- Design: Novel systems; think about operational excellence
- Behavioral: Show strategic thinking; how do you influence decisions?

---

## **Preparation Timeline**

| Week | Activity                                           |
| ---- | -------------------------------------------------- |
| 1–2  | Phone screen preparation (15 medium-hard problems) |
| 3–4  | System design (3 Google-scale problems)            |
| 5–6  | Behavioral deep dive (8 stories with metrics)      |
| 7    | Light maintenance (2 problems/day)                 |
| 8    | Rest + final review                                |

---

## **Red Flags at Google**

- ❌ Your system design doesn't account for scale → Google is obsessed with scale; be prepared
- ❌ Your behavioral stories lack quantifiable impact → Google values metrics
- ❌ You can't explain your past project's architecture → You'll get a deep-dive question; be ready

---

## **Negotiation**

- **Standard L4 offer:** ~180–200k base + 50–60k bonus + ~250–300k stock (4-year)
- **Negotiation leverage:** Get competing offers (Amazon, Meta); Google will match or beat
- **Non-monetary:** Work location, start date, stock refresh schedule

---

**Google values technical depth + scale thinking. Prepare accordingly.** 🚀
