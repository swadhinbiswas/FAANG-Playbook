# Mid-Level Engineer: 6-Month FAANG Prep Plan

**Target:** Software Engineer L4–L5 (mid-level, potential staff track)
**Timeline:** 24 weeks, ~15 hours/week (part-time; assume you have a job)
**Outcome:** Ready for 4–6 FAANG loops; negotiating senior offers

---

## **Overview**

| Phase                       | Weeks | Focus                               | Goal                       |
| --------------------------- | ----- | ----------------------------------- | -------------------------- |
| **Foundation Review**       | 1–6   | DSA mastery + systems depth         | Expert-level fundamentals  |
| **Advanced Practice**       | 7–16  | Complex designs + leadership signal | Ready for mid/senior loops |
| **Application & Interview** | 17–24 | Real loops + refinement             | Offers at L4/L5+           |

---

## **PHASE 1: FOUNDATION REVIEW (Weeks 1–6)**

**Mindset:** You know the basics; get to expert level. Understand _why_, not just _how_.
**Time commitment:** 15 hours/week (3–4 blocks)

### **Week 1–2: DSA Expert Review**

**Goal:** Solve hard problems in <30 min; explain optimality clearly.

| Day     | Activity                                                                                              | Target                                          |
| ------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Mon–Wed | LeetCode hard: 3 problems per day from [company tags](../../06-Study-Plans/01-Junior-3-Month-Plan.md) | Optimize under pressure; think about invariants |
| Thu     | Mock coding (90 min; 2 hard problems back-to-back)                                                    | Test stamina                                    |
| Fri     | Debrief mock + identify pattern gaps                                                                  | Spot weak areas                                 |
| Sat–Sun | 5–6 more hard problems (relaxed pace)                                                                 | Reinforce                                       |

**Output:** 30+ hard problems solved; confidence on tricky edge cases.

**LeetCode path:** Focus on company-specific tags (Google, Amazon, Meta).

---

### **Week 3–4: System Design Depth**

**Goal:** Design systems that scale to billions; discuss tradeoffs like an architect.

| Day     | Activity                                                                                              | Target                                     |
| ------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Mon     | Study [capacity planning](../../04-System-Design-Library/01-Capacity-Planning-Cheatsheet.md) in depth | Numbers intuition: QPS, storage, bandwidth |
| Tue     | Design 1 system untimed; include failure modes + monitoring                                           | Deep thinking                              |
| Wed     | Debrief your design against [example](../../02-System-Design/example-designs/)                        | Identify gaps                              |
| Thu     | 60-min timed design; challenge yourself on tradeoffs                                                  | Pressure + thinking                        |
| Fri     | Mock system design interview (with peer, 90 min)                                                      | Realistic evaluation                       |
| Sat–Sun | 2 more designs; focus on novelty (custom + weird constraints)                                         | Flexibility                                |

**Output:** 5+ systems designed well; comfortable with novel constraints.

---

### **Week 5–6: Behavioral + Leadership**

**Goal:** Tell stories that signal mid-level readiness: ownership, impact, technical leadership.

| Day     | Activity                                                                  | Target                  |
| ------- | ------------------------------------------------------------------------- | ----------------------- |
| Mon     | Write 15 STAR stories (vs junior's 5–10)                                  | Broader portfolio       |
| Tue–Wed | Record yourself telling 5 stories; identify weak ones                     | Spot awkward narratives |
| Thu     | Focus on 3 leadership stories: "led a team," "mentored," "drove decision" | Senior signal           |
| Fri     | Mock behavioral (60 min; 8 random questions)                              | Smooth storytelling     |
| Sat     | Mock behavioral round 2; incorporate feedback                             | Iterate                 |
| Sun     | Rest + reflect                                                            | Recharge                |

**Output:** 15 polished stories; 3 with strong leadership signal.

---

## **PHASE 2: ADVANCED PRACTICE (Weeks 7–16)**

**Mindset:** Push into novel territory. Prepare for "stump the candidate" questions.
**Time commitment:** 15 hours/week

### **Week 7–10: Advanced System Design**

**Goal:** Design like a principal engineer: anticipate scale, solve for future.

| Day | Activity                                                                                          | Format     | Notes                                                                                       |
| --- | ------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Mon | Read [design patterns](../../04-System-Design-Library/02-Design-Patterns-and-Failure-Handling.md) | Theory     | Understand underlying principles                                                            |
| Tue | Design URL Shortener with edge cases (1-1B URLs)                                                  | Untimed    | Go deep on sharding, caching, analytics                                                     |
| Wed | Design News Feed with ML ranking                                                                  | Untimed    | Data pipeline + ML system thinking                                                          |
| Thu | Design Chat System with real-time sync                                                            | Untimed    | Complex state management + reliability                                                      |
| Fri | **Mock Design Interview 1**                                                                       | 90 min     | New prompt; peer interview; [rubric](../../05-Mock-Interviews/01-Self-Evaluation-Rubric.md) |
| Sat | Debrief + redo design with improvements                                                           | Self-study | Iterate                                                                                     |
| Sun | Light week wrap-up                                                                                | Rest       | Consolidate                                                                                 |

**Weeks 8–9:** Repeat with new problems:

- Rate limiter at scale
- Video streaming platform
- Distributed cache system
- Search engine (Google-scale)

**Week 10:** Full loop simulation (2 systems back-to-back + 1 coding).

**Output:** 8+ systems designed at depth; comfort with weird constraints.

---

### **Week 11–14: Role-Specific Deep Dives**

**Choose your specialization and go deep:**

#### **If Backend Track:**

- Study [consistency patterns](../../04-System-Design-Library/02-Design-Patterns-and-Failure-Handling.md)
- Design: distributed transactions, consensus, eventual consistency
- Read: [data modeling](../../06-Data/02-Data-Modeling.md), indexes, query optimization
- Mock: 3 backend-specific system designs

#### **If ML Track:**

- Study [ML system design](../../05-ML-MLOps/03-ML-System-Design-Templates.md)
- Design: recommendation system, ranking pipeline, LLM inference
- Read: [ML fundamentals](../../05-ML-MLOps/01-ML-Fundamentals-for-Interviews.md), feature engineering, A/B testing
- Mock: 3 ML system designs

#### **If Data Track:**

- Study [data pipelines](../../06-Data/03-Pipelines-and-Orchestration.md)
- Design: ETL/ELT at scale, streaming, data quality
- Read: [SQL patterns](../../06-Data/01-SQL-Patterns.md), data modeling, performance
- Mock: 3 data system designs

#### **If Infra/SRE Track:**

- Study [incident response](../../07-Infra-DevOps/05-Incident-Response.md), [observability](../../07-Infra-DevOps/06-Observability.md)
- Design: monitoring at scale, incident detection, canary deployments
- Read: [CI/CD](../../07-Infra-DevOps/04-CICD-and-Safe-Rollouts.md), Kubernetes, Linux fundamentals
- Mock: 3 infra-specific system designs

**Output:** Deep expertise in your chosen lane.

---

### **Week 15–16: Full Loop Simulations**

**Treat these as real interviews:**

| Day     | Activity                                                                        | Duration | Format                    |
| ------- | ------------------------------------------------------------------------------- | -------- | ------------------------- |
| Mon–Tue | **Full Loop 1:** Coding (60 min) + System Design (60 min) + Behavioral (45 min) | 165 min  | Peer-led; full rubric     |
| Wed     | Debrief Loop 1; identify weak points                                            | 60 min   | Self-study                |
| Thu–Fri | **Full Loop 2:** Same structure; new problems                                   | 165 min  | Peer-led; harder problems |
| Sat     | Debrief Loop 2                                                                  | 60 min   | Iterate                   |
| Sun     | Rest; prepare for real applications                                             | Rest     | Mental reset              |

**Checkpoint:** By Week 16, you should score 4.5–5 on rubric across all dimensions.

---

## **PHASE 3: APPLICATION & INTERVIEW (Weeks 17–24)**

**Mindset:** Shift from prep to execution. Handle real rejections and refine.
**Time commitment:** 12–15 hours/week (less study, more interviews)

### **Week 17–18: Targeting + Resume**

| Day     | Activity                                                                                            | Output                           |
| ------- | --------------------------------------------------------------------------------------------------- | -------------------------------- |
| Mon–Tue | Build target list: 15–20 companies                                                                  | Spreadsheet with roles, contacts |
| Wed–Thu | Tailor resume for each role; use [ATS guide](../../04-Resume-LinkedIn-GitHub/faang-resume-guide.md) | 3–5 resume variants              |
| Fri     | Optimize LinkedIn/GitHub; highlight mid-level projects                                              | Updated profiles                 |
| Sat–Sun | Apply to 5–8 companies                                                                              | First wave of applications       |

**Parallel:** 2–3 coding problems/day (maintenance).

---

### **Week 19–20: Early Interviews**

**Assume recruiter calls this week.**

| Activity        | Frequency                       | Notes                                     |
| --------------- | ------------------------------- | ----------------------------------------- |
| Coding problems | 2 per day (30 min each)         | Warm up; easy/medium                      |
| Phone screens   | 1–2                             | Treat like real interviews; debrief after |
| System design   | 1 per day (new problem, 60 min) | Stay sharp                                |

**Expected:** 1–2 phone screens; maybe 1 rejection (normal; move on).

**Weekly:** Apply to another 3–5 companies.

---

### **Week 21–22: Onsite Loops**

**1–3 onsites scheduled.**

| Daily Activity  | Time                       |
| --------------- | -------------------------- | --------------------- |
| Coding reps     | 1–2 per day (30 min)       | Maintenance           |
| System design   | 1 per day (untimed)        | Confidence            |
| Behavioral      | Record yourself; 1 per day | Smoothness            |
| **Real Onsite** | 1–2                        | Actual interview days |

**After each loop:** Debrief; what went well/poorly; iterate.

**Weekly:** Still apply to new companies; expand net.

---

### **Week 23–24: Offers + Negotiation**

| Activity         | Expected                                                         |
| ---------------- | ---------------------------------------------------------------- |
| Offers received  | 1–3                                                              |
| Competing offers | Yes (if multiple onsites)                                        |
| Negotiation      | [Use playbook](../../07-Offer-Negotiation/salary-negotiation.md) |
| Decision         | Final offer accepted                                             |

**By Week 24:** Mid-level or strong senior offer; signed or about to sign.

---

## **Success Metrics**

### **By Week 6**

- ✅ 30+ hard LeetCode problems solved (< 30 min each)
- ✅ 5 systems designed at depth
- ✅ 15 behavioral stories polished
- ✅ Scoring 4–4.5 on mock rubric

### **By Week 16**

- ✅ 8+ advanced system designs
- ✅ Role specialization depth achieved
- ✅ 2 full loop mocks scored 4.5–5
- ✅ Ready for real interviews

### **By Week 24**

- ✅ 3+ onsite loops completed
- ✅ 2+ offers (ideally competing)
- ✅ L4/L5+ offer negotiated
- ✅ Decision made

---

## **Daily Routine (Mid-Level)**

**Time budget: 15 hours/week = ~2 hours/day average**

- **Block 1 (60 min):** Coding problem (30 min) + reflection (30 min)
- **Block 2 (60 min):** System design OR behavioral OR reading
- **3rd block (optional, weekends):** Full mock (90 min) OR deep dive on weak area

**Flexibility:** Adjust around your day job. If busy week, do 8–10 hours. If light week, do 20 hours.

---

## **Resources**

- **Hard coding:** LeetCode Hard + company tags
- **System design:** [Template](../../04-System-Design-Library/00-System-Design-Template.md) + [examples](../../02-System-Design/example-designs/) + company blogs
- **Behavioral:** [Playbook](../../03-INTERVIEWS/06-Behavioral-Interview-Playbook.md) + leadership stories
- **Mock interviews:** Interviewing.io (paid) + peer mocks (free)

---

## **Red Flags (Adjust Plan if You See These)**

- ⚠️ Week 8: Can't design complex system from scratch → Slow down; read more theory; do simpler designs first
- ⚠️ Week 12: Behavioral stories feel generic → Add more specific metrics; emphasize decisions you made
- ⚠️ Week 18: No recruiter calls after 8 applications → Revise resume or cold outreach; consider referrals
- ⚠️ Week 20: Failing phone screens → Increase coding reps; focus on communication

---

**You've got this. 24 weeks to a mid-level or senior offer.** 🚀
