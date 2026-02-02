# Amazon: Detailed Interview Playbook

**Company Profile:** Hiring L4–L7 (SDE), L4–L6 (SRE/Principal). Culture: customer obsession, ownership, frugality, bias for action. **Leadership Principles** are central to every interview.

---

## **Loop Structure**

| Stage                     | Duration  | Evaluators                       | What They Test                                    |
| ------------------------- | --------- | -------------------------------- | ------------------------------------------------- |
| **Phone Screen (Coding)** | 60 min    | SDE                              | Hard DSA; problem-solving                         |
| **Onsite (4–5 rounds)**   | 5–6 hours | SDEs, bar raiser, hiring manager | Coding + design + behavioral (heavy) + leadership |

_Note: Amazon's bar raiser round is critical; they have high standards._

---

## **Phone Screen (Coding)**

**What Amazon cares about:** Can you solve hard problems cleanly and quickly?

### **Problem Style**

- Hard LeetCode (Amazon-tagged)
- Examples: [Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/), [LRU Cache](https://leetcode.com/problems/lru-cache/), [Word Ladder](https://leetcode.com/problems/word-ladder/), [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

### **Evaluation (1–5 scale)**

- **5:** Optimal solution on first try; clean code; great communication
- **4:** Correct solution; minor inefficiency; good communication
- **3:** Correct solution with hints; acceptable communication
- **<3:** Wrong approach or incomplete solution

### **Strategy**

1. **Clarify (2 min):** Ask constraints, edge cases. Amazon likes precision.
2. **Discuss approach (5 min):** Explain before coding.
3. **Code cleanly (20–25 min):** Readable; follows style guidelines.
4. **Test thoroughly (10 min):** Edge cases; example walkthroughs.
5. **Optimize (5 min):** Space/time analysis; discuss alternative approaches.

### **Real Interview Tips**

- Amazon interviewers expect _hard_ problems solved correctly.
- They often ask: "Can you optimize this further?"
- Be ready to discuss time/space complexity clearly.

---

## **Onsite (4–5 Rounds)**

### **Round 1: Coding (60–70 min)**

Hard problem; same level as phone screen. Often requires knowledge of multiple data structures or algorithms.

**Patterns:** Graphs, trees, dynamic programming, bit manipulation.

---

### **Round 2: System Design (60–70 min)**

**Typical prompts:**

- Design Amazon's retail system (catalog, inventory, ordering)
- Design a recommendation engine
- Design AWS S3
- Design a rate limiter for AWS

**Amazon's twist:** Emphasis on **cost optimization** and **operational excellence**. They will ask "How would you reduce costs by 50%?" or "What monitoring would you set up?"

**Template:**

1. Clarify: "How many requests? Data volume? Cost constraints?"
2. High-level design: Components, data flow.
3. Deep dive: Pick key component (e.g., database, cache).
4. Cost analysis: "This would cost $X/month. How do we optimize?"
5. Monitoring: "How would we know if something broke?"

**Amazon interviewer tip:** They care about _operational excellence_. Can you design something that's easy to monitor and debug?

---

### **Round 3: Leadership Principles + Behavioral (60 min)**

This is Amazon's biggest differentiator. They evaluate you against their [16 Leadership Principles](https://www.amazon.jobs/en/principles).

**Most commonly asked principles:**

1. **Customer Obsession:** "Tell me about a time you went out of your way for a customer."
2. **Ownership:** "Describe a project where you had complete ownership."
3. **Bias for Action:** "Tell me about a time you acted with incomplete information."
4. **Frugality:** "Give an example of when you optimized costs."
5. **Learn and Be Curious:** "Tell me about something new you learned."
6. **Earn Trust:** "Describe a time you earned someone's trust."

**STAR format (Amazon-specific):**

- **Situation:** 1–2 sentences
- **Task:** The challenge or decision (1–2 sentences)
- **Action:** What you did; emphasize _your_ decision-making and values alignment (4–5 sentences)
- **Result:** Quantifiable outcome; business impact (2–3 sentences)

**Scoring (1–5):**

- **5:** Clear alignment with multiple leadership principles; strong metrics
- **4:** Good story; mostly aligned with principles; decent metrics
- **3:** Acceptable story; some principle alignment; unclear impact
- **<3:** Weak story or no principle alignment

---

### **Round 4: Design or Coding (60 min)**

Depending on your experience level, this could be another coding round or another design problem.

---

### **Round 5: Bar Raiser (Optional; 60 min)**

A senior SDE from a different team. They're evaluating overall quality + cultural fit.

**What bar raisers look for:**

- Can you think outside the box?
- Do you challenge assumptions?
- Would you raise the bar of the team?

**They might ask:**

- "Walk me through your career. What did you learn?"
- "Tell me about a time you failed."
- "What would you change about Amazon's engineering culture?"

---

## **Leveling Guide**

### **L4 (Junior)**

- Phone: Hard LeetCode
- Onsite: 3–4 rounds (coding + design + behavioral + one other)
- Design: Emphasis on correctness; some scalability thinking
- Behavioral: Show ownership and learning; align with 2–3 leadership principles

### **L5 (Mid)**

- Phone: Hard LeetCode; sometimes design-first
- Onsite: 4–5 rounds (2 coding or mixed + design + behavioral + bar raiser)
- Design: Scale thinking; cost optimization matters
- Behavioral: Strong leadership principle alignment; mentoring examples

### **L6 (Senior)**

- Phone: Design interview or hard coding
- Onsite: 4–5 rounds (hard design + hard coding + behavioral + bar raiser + optional deep dive)
- Design: Novel systems; operational excellence; business thinking
- Behavioral: Strategic impact; influence across teams

---

## **Leadership Principles Deep Dive**

### **Customer Obsession**

- Amazon measure: Does this solve a real customer problem?
- Story template: "I talked to customers. Learned they wanted X. Built X instead of Y. Result: Z% increase in adoption."

### **Ownership**

- Amazon measure: Do you take full responsibility, even outside your job description?
- Story template: "The system was broken. Not officially my responsibility, but I owned fixing it. Coordinated with X team. Result: System stable."

### **Bias for Action**

- Amazon measure: Do you make good decisions with limited information?
- Story template: "We had limited data on which approach to take. Made a decision based on first principles. Shipped quickly. Result: Learned and adjusted."

### **Frugality**

- Amazon measure: Do you optimize for cost, not just performance?
- Story template: "We could throw more servers at the problem, but I optimized the query instead. Saved $X/month."

---

## **Preparation Timeline**

| Week | Activity                                            |
| ---- | --------------------------------------------------- |
| 1–2  | Phone screen preparation (20 hard problems)         |
| 3–4  | System design (4 problems; include cost analysis)   |
| 5–6  | Leadership principles (map 8 stories to principles) |
| 7    | Light maintenance + refinement                      |
| 8    | Rest + final review                                 |

---

## **Negotiation**

- **Standard L4 offer:** ~160–180k base + 30–40k bonus + ~120–150k stock (4-year)
- **L5 offer:** ~200–230k base + 50–60k bonus + ~250–350k stock (4-year)
- **Negotiation leverage:** Amazon is less flexible than Google/Meta on base salary; focus on sign-on bonus + stock refresh
- **Equity vesting:** Amazon vests 5% year 1, 15% year 2, 40% year 3, 40% year 4 (back-loaded)

---

## **Red Flags at Amazon**

- ❌ No quantifiable results in your behavioral stories → Amazon values metrics
- ❌ Your system design lacks cost analysis → Amazon thinks about efficiency
- ❌ You don't align with leadership principles → Major red flag; they won't hire you
- ❌ No examples of ownership beyond your job → Amazon wants owners, not individual contributors

---

## **Amazon Culture**

- **Fast-paced:** Expect high velocity; they ship quickly.
- **Data-driven:** Decisions are made on data, not intuition.
- **Frugal:** Don't expect unlimited resources; optimize ruthlessly.
- **Customer-obsessed:** Everything starts with "how does this help the customer?"

---

**Amazon values owners + data + frugality. Prepare your leadership principle stories well.** 🚀
