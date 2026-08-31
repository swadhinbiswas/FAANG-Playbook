# Senior Engineer: 4-Month FAANG Prep Plan

**Target:** Staff Engineer / L5–L6 (senior; potential principal track)
**Timeline:** 16 weeks, ~12 hours/week (you're busy; this is surgical)
**Outcome:** Ready for 2–3 FAANG loops; negotiating principal offers

---

## **Overview**

| Phase                  | Weeks | Focus                                             | Goal                              |
| ---------------------- | ----- | ------------------------------------------------- | --------------------------------- |
| **Calibration**        | 1–3   | Understand senior bar; refresh on medium-hard DSA | Know what you're preparing for    |
| **Depth & Leadership** | 4–11  | Principal-level designs + strategic thinking      | Ready for senior/staff interviews |
| **Application & Loop** | 12–16 | Focused applications + real onsites               | Principal offer in hand           |

---

## **PHASE 1: CALIBRATION (Weeks 1–3)**

**Mindset:** Senior interviews are NOT harder DSA; they're about judgment, strategy, and impact.
**Time commitment:** 10 hours/week

### **Week 1: Self-Assessment**

| Day     | Activity                                                                                           | Output                        |
| ------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| Mon     | Review [senior bar](../../00-START-HERE/02-Interview-Loop-At-A-Glance.md) for your company         | Notes on expectations         |
| Tue     | Read 3 senior-level system design interviews (Palantir, Jane Street, etc.)                         | Understand the depth required |
| Wed     | Record yourself designing a system (untimed); compare vs. junior approach                          | Identify gaps                 |
| Thu–Fri | Skim DSA hard problems; time yourself on 3 (LeetCode)                                              | Ensure speed (< 20 min each)  |
| Sat–Sun | Light: read [career progression](../../08-CAREER/05-Company-Archetypes-and-How-to-Prepare.md) docs | Calibrate expectations        |

**Output:** Clear picture of senior bar; confidence in existing skills.

---

### **Week 2–3: DSA Maintenance + Signal**

**Goal:** You can code fast; prove you think big.

| Day     | Activity                                                     | Format      | Time       |
| ------- | ------------------------------------------------------------ | ----------- | ---------- |
| Mon–Wed | 3 hard problems per day; aim for < 20 min (with explanation) | LeetCode    | 60 min/day |
| Thu     | Record coding session; focus on _explaining_ your approach   | Self-record | 45 min     |
| Fri     | **Mock coding interview 1** (60 min; hard problem)           | Peer-led    | 90 min     |
| Sat     | Debrief; identify communication gaps (not correctness gaps)  | Self-study  | 30 min     |
| Sun     | Rest                                                         | Rest        | Rest       |

**Weeks 2–3 parallel:** Read 2–3 architecture blogs (AWS Well-Architected, Google SRE Book excerpts).

**Output:** Fast problem solving + clear explanation; DSA not a bottleneck.

---

## **PHASE 2: DEPTH & LEADERSHIP (Weeks 4–11)**

**Mindset:** At senior level, interviews test your _judgment_, not your _speed_. Take your time. Think aloud.
**Time commitment:** 12 hours/week

### **Week 4–6: Strategic System Design (I)**

**Goal:** Design systems that matter; discuss tradeoffs like a principal engineer.

| Day | Activity                                                                                                        | Problem           | Notes                                                                          |
| --- | --------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------ |
| Mon | Study: [capacity planning](../../04-System-Design-Library/01-Capacity-Planning-Cheatsheet.md)                   | Numbers precision | Get numbers exactly right                                                      |
| Tue | Study: [patterns & failure handling](../../04-System-Design-Library/02-Design-Patterns-and-Failure-Handling.md) | Theory depth      | Understand _why_ patterns matter                                               |
| Wed | Design: URL Shortener, BUT add: analytics, real-time dashboard, ML recommendations                              | Deep design       | Think 3 years out                                                              |
| Thu | Design: News Feed; focus on ranking system (ML + data infrastructure)                                           | Data pipeline     | Show data thinking                                                             |
| Fri | **Mock Design 1** (90 min; novel prompt)                                                                        | Peer-led          | [Rubric](../../05-Mock-Interviews/01-Self-Evaluation-Rubric.md): Expect 4.5/5+ |
| Sat | Debrief; ask peer: "What would a principal engineer do differently?"                                            | Mentorship        | Incorporate feedback                                                           |
| Sun | Rest                                                                                                            | Rest              | Recharge                                                                       |

**Weeks 5–6:** Repeat with:

- Rate limiter (add: fairness across users, dynamic adjustment)
- Chat system (add: encryption, compliance, geo-distribution)
- Video streaming (add: bitrate adaptation, licensing, monetization)

**Output:** 6 designs where you think about business + technical depth.

---

### **Week 7–9: Senior Lens on ML/Data/Infra**

**Choose your strongest domain OR the one you want to own at senior level:**

#### **If Backend/Data:**

- Design: Distributed transaction system (ACID guarantees at scale)
- Design: Data warehouse (query optimization, cost, performance)
- Read: [ML system design templates](../../05-ML-MLOps/03-ML-System-Design-Templates.md) (even if not ML-track; understand ML infrastructure thinking)
- Deep dive: Consistency models (strong, eventual, causal)
- Mock: 3 backend-centric designs

#### **If ML/Data Science:**

- Design: Recommendation ranking at scale (10B queries/day)
- Design: LLM inference + serving (batching, caching, cost optimization)
- Read: [ML testing + MLOps](../../05-ML-MLOps/04-ML-Testing-and-ML-Test-Score.md)
- Deep dive: Feature store architecture; online/offline serving gaps
- Mock: 3 ML-centric designs

#### **If Infra/SRE/Platform:**

- Design: Observability system at scale (Prometheus + tracing + logs)
- Design: Canary deployment + incident detection system
- Read: [incident response](../../07-Infra-DevOps/05-Incident-Response.md), [observability](../../07-Infra-DevOps/06-Observability.md)
- Deep dive: Distributed tracing; cost of observability
- Mock: 3 infra-centric designs

**Output:** Expertise in your domain; ability to talk to cross-functional leads.

---

### **Week 10–11: Leadership + Strategic Thinking**

**This is what separates L5 from L6.**

| Activity                                                                                                  | Time | Focus                                     |
| --------------------------------------------------------------------------------------------------------- | ---- | ----------------------------------------- |
| **Mon:** Write 10 leadership stories (vs. mid's 15 generic ones)                                          | 2h   | Emphasize: decisions, outcomes, influence |
| **Tue:** Record yourself; focus on impact metrics                                                         | 1h   | "We improved X by Y%; it saved Z"         |
| **Wed:** Mock behavioral (90 min; hard questions: "Tell me about a time you disagreed with your manager") | 1.5h | Leadership signal                         |
| **Thu:** Debrief behavioral; identify weak stories; replace them                                          | 1h   | Iterate                                   |
| **Fri:** Full loop mock: Coding (60 min) + Design (90 min) + Behavioral (60 min)                          | 3.5h | Full pressure test                        |
| **Sat:** Debrief full loop; score on rubric                                                               | 1h   | Calibrate                                 |
| **Sun:** Rest                                                                                             | Rest | Rest                                      |

**Interview readiness check:** Are you scoring 4.5+ across all dimensions? If not, identify weak area and focus Week 12 on that.

**Output:** Polished leadership narrative; full loop comfort.

---

## **PHASE 3: APPLICATION & LOOP (Weeks 12–16)**

**Mindset:** You're selective. Target 2–3 companies. Go deep.
**Time commitment:** 10–12 hours/week (mostly interviews; less prep)

### **Week 12: Targeting + Deep Dive**

| Day     | Activity                                                          | Output                |
| ------- | ----------------------------------------------------------------- | --------------------- |
| Mon     | Identify 2–3 target companies (don't spray resume)                | Final list + research |
| Tue     | Research each company's engineering culture, scale, challenges    | Deep notes            |
| Wed     | Tailor resume/cover for each company; emphasize relevant scale    | Custom materials      |
| Thu     | Reach out to network at each company (LinkedIn, prior colleagues) | Referrals             |
| Fri     | Apply officially; include referral or custom cover letter         | Applications sent     |
| Sat–Sun | Maintain coding (2 problems/week; easy/medium to stay warm)       | Light prep            |

**Expected:** 1–2 recruiter calls Week 13.

---

### **Week 13–14: Phone Screens**

**Assume 1–2 phone screens per company.**

| Weekly Schedule  | Activity                                               | Time      |
| ---------------- | ------------------------------------------------------ | --------- |
| **3x per week**  | Coding reps (1 per day; medium hard; 45 min)           | 2.5h/week |
| **1x per week**  | System design deep dive (new problem; untimed; 90 min) | 1.5h/week |
| **As scheduled** | Phone screen (with company)                            | 1–2h      |

**Debrief after each screen:** What went well? What surprised you?

**Apply to parallel backup companies:** If 1 company slow, have 2–3 more in pipeline.

**Expected outcome:** 1–2 advances to onsite by Week 14.

---

### **Week 15: Onsite Preparation**

**Assume 1–2 onsites scheduled for Week 15–16.**

| Daily Routine                                                                        | Time   |
| ------------------------------------------------------------------------------------ | ------ |
| **Morning:** Coding warm-up (2 problems; easy/medium; 45 min)                        | 45 min |
| **Mid-day:** Deep system design (new problem; 2 hours; focus on reasoning not speed) | 2h     |
| **Evening:** Behavioral prep (record 2 stories; iterate; 45 min)                     | 45 min |
| **Onsite day:** Interview + debrief (3.5–4.5 hours)                                  | 4h     |

**Before onsite:** Review company-specific [hiring archetype](../../08-CAREER/05-Company-Archetypes-and-How-to-Prepare.md); know what they care about.

---

### **Week 16: Decision + Negotiation**

| Activity         | Timeline   | Expected                                                                                       |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| Offers received  | Week 15–16 | 1–2 offers                                                                                     |
| Debrief feedback | Week 16    | Understand your strongest loop                                                                 |
| Negotiate        | Week 16    | [Use playbook](../../08-CAREER/04-Offer-Negotiation.md); emphasize your senior impact |
| Decide           | Week 16    | Accept offer                                                                                   |

**Senior negotiation tip:** Emphasize _scope_ not just salary. What will you own? What's the bar for promotion to principal?

---

## **Success Metrics**

### **By Week 3**

- ✅ Senior bar understood
- ✅ DSA speed maintained (< 20 min for hard problems)
- ✅ 1 mock coding scored 4.5+

### **By Week 11**

- ✅ 9+ systems designed at principal level
- ✅ Domain expertise clear
- ✅ 10 leadership stories; 3+ with strategic decisions
- ✅ Full loop mock scored 4.5+ across all dimensions

### **By Week 16**

- ✅ 2+ onsites completed
- ✅ 1+ principal/senior offer
- ✅ Negotiation complete; offer accepted

---

## **Daily Routine (Senior)**

**Time budget: 12 hours/week = ~1.5–2 hours/day average**

- **Quick:** 2 coding problems (45 min total; warm-up + explain)
- **Deep:** 1 system design OR leadership prep (90 min)
- **Optional:** Read (30 min; blogs, papers, architecture docs)

**Reality:** Some days you'll do 4 hours (interview day); others just 30 min (maintenance).

---

## **Interview Strategy**

### **Coding Round**

- **Approach:** Solve correctly first; then optimize.
- **Communication:** Explain your thinking out loud; don't hide.
- **Red flag:** If you get stuck, ask clarifying questions; don't sit silent.

### **System Design Round**

- **Approach:** Take 5 min to clarify requirements; then design slowly.
- **Communication:** Discuss tradeoffs explicitly. "Option A is faster but costs more. Option B is cheaper but has latency. Here's why I'd choose A..."
- **Senior-level thinking:** Ask about business requirements first; don't assume technical specs.
- **Red flag:** If you're moving too fast, _slow down_. This is about judgment, not speed.

### **Behavioral Round**

- **Approach:** Tell stories that show _decisions you made_, not just actions you took.
- **Communication:** Include metrics. "We improved latency from 200ms to 50ms, which increased conversion by 3%, worth $2M ARR."
- **Senior-level thinking:** Discuss _tradeoffs_ in your decisions. "We could have done X, but chose Y because of Z..."
- **Red flag:** If your stories don't include business impact, rewrite them.

---

## **Red Flags (Adjust Plan if You See These)**

- ⚠️ Week 4: Can't design a system that feels "principal-grade" → Read more theory; study existing senior designs; slow down
- ⚠️ Week 8: Your domain expertise isn't landing → Shift focus; pick a different specialization
- ⚠️ Week 12: No recruiter calls after referrals → Reach out more aggressively; consider lateral roles (not just staff track)
- ⚠️ Week 14: Phone screen feedback is "too confident" or "too detailed" → Calibrate your style; ask interviewer what they're looking for

---

## **Resources**

- **System design:** [Palantir interviews](https://www.palantir.com/careers/), [Jane Street blogs](https://blog.janestreet.com/), [Stripe Press](https://press.stripe.com/)
- **Coding:** LeetCode Hard, but focus on communication (screenshare with peer)
- **Behavioral:** [Leadership principles](../../02-Role-Roadmaps/01-SWE-Generalist.md) for your target companies
- **Negotiation:** [Salary guide](../../08-CAREER/04-Offer-Negotiation.md) + talk to current senior engineers at target companies

---

**You've prepared well. 16 weeks to a senior/principal offer.** 🚀
