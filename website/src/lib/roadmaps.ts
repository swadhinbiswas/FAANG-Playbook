// Interactive multi-role roadmaps.
// Each role is a list of PHASES (a stage of prep) each containing NODES (specific,
// checkable topics). Nodes carry a short hint and optionally a resource link into
// the docs. State (pending / doing / done) is persisted per node.

export type NodeState = "pending" | "doing" | "done";

export interface RoadmapNode {
  id: string;
  title: string;
  hint: string;
  resource?: string; // relative URL into the docs site
  resources?: { label: string; href: string }[];
}

export interface RoadmapPhase {
  name: string;
  goal: string;
  question: string; // the interview question this phase de-risks
  nodes: RoadmapNode[];
}

export interface Roadmap {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  color: string; // accent base, overridden in import styles? kept css var hue hints
  levels: string;
  loop: string;
  weeklyHours: string;
  phases: RoadmapPhase[];
}

// Reusable resource buckets (keep authoring DRY-ish)
const F = {
  dsa: "/docs/foundations/01-DSA-and-Coding",
  systems: "/docs/foundations/02-Computer-Systems",
  databases: "/docs/foundations/03-Databases",
  swe: "/docs/foundations/04-Software-Engineering-Practices",
  cloud: "/docs/foundations/05-Cloud-and-Reliability-Basics",
  sdTemplate: "/docs/system-design/00-System-Design-Template",
  sdCapacity: "/docs/system-design/01-Capacity-Planning-Cheatsheet",
  sdPatterns: "/docs/system-design/02-Design-Patterns-and-Failure-Handling",
  sdPrompts: "/docs/system-design/03-Common-Prompts-and-What-They-Test",
  codingPlaybook: "/docs/interviews/02-Coding-Interview-Playbook",
  sdPlaybook: "/docs/interviews/03-System-Design-Interview-Playbook",
  mlSdPlaybook: "/docs/interviews/04-ML-System-Design-Interview",
  sqlPlaybook: "/docs/interviews/05-SQL-Data-Interview",
  behavioral: "/docs/interviews/06-Behavioral-Interview-Playbook",
  takehome: "/docs/interviews/07-Take-Home-and-Project-Interviews",
  mlFundamentals: "/docs/ml-mlops/01-ML-Fundamentals-for-Interviews",
  features: "/docs/ml-mlops/02-Feature-Engineering-and-Data-Leakage",
  mlSd: "/docs/ml-mlops/03-ML-System-Design-Templates",
  mlTest: "/docs/ml-mlops/04-ML-Testing-and-ML-Test-Score",
  llm: "/docs/ml-mlops/05-LLM-Applications-and-Evaluation",
  monitoring: "/docs/ml-mlops/06-Monitoring-and-Drift",
  sql: "/docs/data/01-SQL-Patterns",
  modeling: "/docs/data/02-Data-Modeling",
  pipelines: "/docs/data/03-Pipelines-and-Orchestration",
  quality: "/docs/data/04-Data-Quality",
  streaming: "/docs/data/05-Streaming-and-Late-Data",
  cost: "/docs/data/06-Cost-and-Performance",
  linux: "/docs/infra-devops/01-Linux-Networking-Fundamentals",
  docker: "/docs/infra-devops/02-Docker",
  k8s: "/docs/infra-devops/03-Kubernetes",
  cicd: "/docs/infra-devops/04-CICD-and-Safe-Rollouts",
  incident: "/docs/infra-devops/05-Incident-Response",
  observability: "/docs/infra-devops/06-Observability",
  roleSWE: "/docs/role-roadmaps/01-SWE-Generalist",
  roleBE: "/docs/role-roadmaps/02-Backend-Engineer",
  roleMLE: "/docs/role-roadmaps/03-Machine-Learning-Engineer",
  roleDE: "/docs/role-roadmaps/04-Data-Engineer",
  roleDS: "/docs/role-roadmaps/05-Data-Scientist",
  roleDevOps: "/docs/role-roadmaps/06-DevOps-SRE",
  roleMLOps: "/docs/role-roadmaps/07-MLOps-Engineer",
  cheerSkill: "/docs/start-here/00-README",
  roleChooser: "/docs/role-roadmaps/00-Role-Chooser",
};

export const ROADMAPS: Roadmap[] = [
  {
    slug: "swe-generalist",
    name: "SWE Generalist",
    icon: "terminal",
    tagline: "Max optionality, strong fundamentals, enough design to ship.",
    description:
      "The highest-optionality lane. Strong coding + systems fundamentals + enough system design to own and operate real services at a generalist bar.",
    color: "#89b4fa",
    levels: "Junior → Senior IC",
    loop: "Coding + System Design + Behavioral",
    weeklyHours: "10-12 hrs/wk",
    phases: [
      {
        name: "Foundations",
        goal: "Diagnose where you actually stand before grinding.",
        question: "Stop prepping in the dark. Baseline first.",
        nodes: [
          { id: "swe-base-self-audit", title: "Self baseline audit", hint: "One timed coding run + one design prompt + one behavioral story. Score honestly.", resource: F.cheerSkill },
          { id: "swe-base-language", title: "Pick one core language", hint: "Master one language's idioms + stdlib before touching frameworks.", resource: F.dsa },
          { id: "swe-base-cs", title: "CS fundamentals refresh", hint: "Big-O, OS processes/threads, memory, networking basics.", resource: F.systems },
          { id: "swe-base-db", title: "Databases intuition", hint: "Indexes, transactions, ACID vs eventual consistency at the SQL level.", resource: F.databases },
          { id: "swe-base-roadmap", title: "Your role page", hint: "Read the full role page so the plan below lines up with expectations.", resource: F.roleSWE },
        ],
      },
      {
        name: "Data Structures & Algorithms",
        goal: "Build pattern fluency, not solution memorization.",
        question: "Solve a medium in 25 min under whiteboard pressure.",
        nodes: [
          { id: "swe-dsa-arrays", title: "Arrays, strings, hashing", hint: "Two pointers, sliding window, prefix sums. The core of most screens.", resource: F.dsa, resources: [
            { label: "Two Sum", href: "https://leetcode.com/problems/two-sum/" },
            { label: "Longest Substring w/o Repeats", href: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
            { label: "Valid Anagram", href: "https://leetcode.com/problems/valid-anagram/" },
          ]},
          { id: "swe-dsa-trees", title: "Trees & graphs", hint: "DFS/BFS, traversals, binary search trees, topological sort.", resource: F.dsa, resources: [
            { label: "Number of Islands", href: "https://leetcode.com/problems/number-of-islands/" },
            { label: "Course Schedule", href: "https://leetcode.com/problems/course-schedule/" },
            { label: "Serialize/Deserialize Tree", href: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
          ]},
          { id: "swe-dsa-dp", title: "Dynamic programming", hint: "1D then 2D DP. Memoization first, tabulation later.", resource: F.dsa, resources: [
            { label: "Climbing Stairs", href: "https://leetcode.com/problems/climbing-stairs/" },
            { label: "Longest Increasing Subsequence", href: "https://leetcode.com/problems/longest-increasing-subsequence/" },
            { label: "Word Break", href: "https://leetcode.com/problems/word-break/" },
          ]},
          { id: "swe-dsa-heap", title: "Heaps, stacks, queues", hint: "Top-K patterns, monotonic stacks, k-way merge.", resource: F.dsa, resources: [
            { label: "Merge K Sorted Lists", href: "https://leetcode.com/problems/merge-k-sorted-lists/" },
            { label: "Top K Frequent Elements", href: "https://leetcode.com/problems/top-k-frequent-elements/" },
            { label: "Sliding Window Maximum", href: "https://leetcode.com/problems/sliding-window-maximum/" },
          ]},
          { id: "swe-dsa-trie", title: "Trie & specialized structures", hint: "Prefix/autocomplete + interval + union-find topics.", resource: F.dsa, resources: [
            { label: "Implement Trie", href: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
            { label: "Graph Valid Tree", href: "https://leetcode.com/problems/graph-valid-tree/" },
          ]},
          { id: "swe-dsa-reps", title: "Timed reps + mistake log", hint: "3 timed problems/week with a failure post-mortem. Spaced repetition.", resource: F.codingPlaybook, resources: [
            { label: "LRU Cache", href: "https://leetcode.com/problems/lru-cache/" },
            { label: "Median of Two Sorted Arrays", href: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
          ]},
        ],
      },
      {
        name: "System Design Basics",
        goal: "Go from 'no idea' to a defensible small-service design.",
        question: "Design and defend a URL shortener or rate limiter in 45 min.",
        nodes: [
          { id: "swe-sd-template", title: "Lean the design template", hint: "Requirements → constraints → SLOs → data → components → failures.", resource: F.sdTemplate },
          { id: "swe-sd-capacity", title: "Capacity planning", hint: "Rough QPS, storage and bandwidth math without guessing units.", resource: F.sdCapacity },
          { id: "swe-sd-patterns", title: "Patterns & failure handling", hint: "Caching, queues, retries, circuit breakers, idempotency.", resource: F.sdPatterns },
          { id: "swe-sd-prompts", title: "Run small prompts", hint: "URL shortener, rate limiter, notifications, feed.", resource: F.sdPrompts },
          { id: "swe-sd-comm", title: "Present tradeoffs crisply", hint: "Say the choice, the cost, the alternative, and when you'd switch.", resource: F.sdPlaybook },
        ],
      },
      {
        name: "Engineering Craft",
        goal: "Prove you don't just write code — you build software.",
        question: "Talk about testing, maintainability and reliability on the job.",
        nodes: [
          { id: "swe-craft-test", title: "Testing & correctness", hint: "Unit/integration/regen tests; test-first instincts.", resource: F.swe },
          { id: "swe-craft-api", title: "API design & ergonomics", hint: "Good contracts, versioning, sensible errors.", resource: F.swe },
          { id: "swe-craft-ops", title: "Observability basics", hint: "Metrics, logs, traces, and a dashboard that tells a story.", resource: F.observability },
          { id: "swe-craft-deploy", title: "Safe deployments", hint: "Blue/green, canary, feature flags, rollback plan.", resource: F.cicd },
        ],
      },
      {
        name: "Behavioral & Company Fit",
        goal: "Turn real experience into STAR-shaped, non-generic answers.",
        question: "Answer a behavior question with numbers, tradeoffs, and decisions.",
        nodes: [
          { id: "swe-bhv-stories", title: "Six core stories", hint: "Conflict, failure, leadership, ambiguity, deep-dive, impact.", resource: F.behavioral },
          { id: "swe-bhv-star", title: "STAR every story", hint: "Situation → Actions → Result, with your specific contribution quantified.", resource: F.behavioral },
          { id: "swe-bhv-rolefit", title: "'Why this role' narrative", hint: "One paragraph that connects your past to the target company.", resource: F.roleChooser },
          { id: "swe-bhv-archetype", title: "Company archetype tuning", hint: "FAANG: scale. Enterprise: migrations. Automotive: correctness.", resource: F.sdPlaybook },
        ],
      },
      {
        name: "Full Loop",
        goal: "Simulate the real loop under time constraints.",
        question: "Do two full mock loops and target only the top 3 gaps.",
        nodes: [
          { id: "swe-loop-coding", title: "45-min coding mock", hint: "Talk every step. Handle edge cases explicitly.", resource: F.codingPlaybook },
          { id: "swe-loop-design", title: "45-min design mock", hint: "Structured to the visible template, no rabbit holes.", resource: F.sdPlaybook },
          { id: "swe-loop-behavior", title: "15-min behavioral mock", hint: "Two stories told start-to-finish with numbers.", resource: F.behavioral },
          { id: "swe-loop-postmortem", title: "Post-mortem", hint: "Top 3 gaps + top 3 strengths every week.", resource: F.cheerSkill },
        ],
      },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Backend Engineer",
    icon: "server",
    tagline: "Reliable services: APIs, data, scaling and operability.",
    description:
      "Backend interviews probe your ability to build services that survive traffic and time: API contracts, storage, consistency tradeoffs, latency and ops.",
    color: "#a6e3a1",
    levels: "Mid → Senior IC",
    loop: "Coding + System Design + Behavioral",
    weeklyHours: "12-15 hrs/wk",
    phases: [
      {
        name: "Foundations Refresh",
        goal: "Rebuild the base so shoulder-top patterns stick.",
        question: "Explain DB + network + reliability basics under questioning.",
        nodes: [
          { id: "be-base-network", title: "Networking", hint: "TCP/UDP, HTTP, TLS, DNS, load balancers.", resource: F.linux },
          { id: "be-base-db", title: "Databases", hint: "ACID, isolation, indexes, caching, sharding sense.", resource: F.databases },
          { id: "be-base-reliability", title: "Reliability vocabulary", hint: "SLIs/SLOs, timeouts, retries, backpressure.", resource: F.cloud },
          { id: "be-base-stack", title: "Your stack choice", hint: "Language + framework + query store you can discuss deeply.", resource: F.roleBE },
        ],
      },
      {
        name: "Data & Storage",
        goal: "Make defensible storage choices under constraints.",
        question: "Pick storage, model it, then justify consistency tradeoffs.",
        nodes: [
          { id: "be-data-model", title: "Relational modeling & keys", hint: "Normalize/build keys, indexes, the grain of the row.", resource: F.modeling },
          { id: "be-data-consistency", title: "Consistency vs availability", hint: "When eventual is fine; optimistic vs pessimistic locking.", resource: F.databases },
          { id: "be-data-paginate", title: "Caching & invalidation", hint: "Insert/remove, TTL, guaranteed-ish invalidation, write-through vs write-behind.", resource: F.sdPatterns },
          { id: "be-data-shard", title: "Partitioning & sharding", hint: "Hash/range/key, hot spots, rebalancing.", resource: F.sdCapacity },
        ],
      },
      {
        name: "Distributed Systems Mentality",
        goal: "Internalize that partial failure is the norm.",
        question: "Design an answer that degrades gracefully, not the happy path.",
        nodes: [
          { id: "be-dist-partial", title: "Partial failure mental model", hint: "Assume any call may hang or drop. Design around it.", resource: F.sdPatterns },
          { id: "be-dist-idempotency", title: "Idempotency & retries", hint: "Client request IDs, retry semantics, at-least-once.", resource: F.sdPatterns },
          { id: "be-dist-queue", title: "Backpressure & queues", hint: "Bounded queues, rate limits, load-shedding.", resource: F.pipelines },
          { id: "be-dist-txn", title: "Transactions at scale", hint: "Distributed txns, sagas, outbox, and when they're worth it.", resource: F.databases },
        ],
      },
      {
        name: "APIs & Design",
        goal: "Design contracts that are versionable and ergonomic.",
        question: "Design the request/response life cycle of a real endpoint.",
        nodes: [
          { id: "be-api-rest", title: "REST conventions", hint: "Verbs, resources, status codes, pagination, filtering.", resource: F.swe },
          { id: "be-api-version", title: "Versioning & migrations", hint: "URL/header versioning, additive vs breaking changes.", resource: F.swe },
          { id: "be-api-authz", title: "Authn/authz & tenancy", hint: "Tokens, roles, quotas, per-tenant isolation.", resource: F.roleBE },
          { id: "be-api-schema", title: "Schema versioning", hint: "Contracts + migrations that don't break old clients.", resource: F.modeling },
        ],
      },
      {
        name: "Operability & Production",
        goal: "Prove you can run it, not just ship it.",
        question: "Talk alerts, dashboards, rollbacks, and postmortems credibly.",
        nodes: [
          { id: "be-ops-sli", title: "SLIs and SLOs you wrote", hint: "Pick latency/error/availability targets; tie to a burn policy.", resource: F.observability },
          { id: "be-ops-metrics", title: "Dashboards & alerts", hint: "Red-service dashboards, EU=UX alerts, avoid alert fatigue.", resource: F.observability },
          { id: "be-ops-safedeploy", title: "Safe rollouts", hint: "Progressive delivery, canary, auto-rollback, runbooks.", resource: F.cicd },
          { id: "be-ops-incident", title: "Incident leadership", hint: "Own the runbook, communicate, postmortem without blame.", resource: F.incident },
        ],
      },
      {
        name: "System Design Reps",
        goal: "Convert analysis into fast, structured designs.",
        question: "Design a service end-to-end in under 45 min with failure modes.",
        nodes: [
          { id: "be-sd-template", title: "Lock in the template", hint: "Use it every single attempt, not just when it's easy.", resource: F.sdTemplate },
          { id: "be-sd-scale", title: "Scale math fluency", hint: "QPS, reads, writes, storage growth, p95/p99 targets.", resource: F.sdCapacity },
          { id: "be-sd-prompts", title: "High-yield prompts", hint: "Rate limiter, notifications, feed/timeline, upload, chat.", resource: F.sdPrompts },
        ],
      },
      {
        name: "Projects & Evidence",
        goal: "Backend signals on the resume, ready to defend.",
        question: "Have a real service with real ops complaints you can explain.",
        nodes: [
          { id: "be-proj-api", title: "A real API service", hint: "Auth, DB, caching, rate limiting, schema versioning.", resource: F.roleBE },
          { id: "be-proj-jobs", title: "Background jobs & queues", hint: "Idempotency, retries, exactly-once-ish attainment.", resource: F.pipelines },
          { id: "be-proj-multitenant", title: "Multi-tenant architecture", hint: "Quotas, per-tenant authz, isolation decisions.", resource: F.roleBE },
        ],
      },
      {
        name: "Mock Loops",
        goal: "Master the loop: coding + design + behavioral together.",
        question: "Run combined mocks and close your top recurring gaps.",
        nodes: [
          { id: "be-loop-combo", title: "Full mock loop", hint: "Coding + system design + behavioral in one sitting.", resource: F.sdPlaybook },
          { id: "be-loop-tradeoff", title: "Tradeoff storytelling", hint: "Justify every major choice concisely (choose, why, when I'd switch).", resource: F.sdPlaybook },
          { id: "be-loop-failures", title: "Institutional failure cases", hint: "Over-microservices, no failure plan, no capacity estimate.", resource: F.roleBE },
        ],
      },
    ],
  },
  {
    slug: "ml-engineer",
    name: "Machine Learning Engineer",
    icon: "brain",
    tagline: "Software engineering for learning systems that improve safely over time.",
    description:
      "MLE is not just notebooks. It's defining objectives, building robust data paths, training, then shipping, monitoring and iterating models in production.",
    color: "#a6e3a1",
    levels: "Mid–Senior IC",
    loop: "Coding (varies) + ML Theory + ML System Design + Behavioral",
    weeklyHours: "14-16 hrs/wk",
    phases: [
      {
        name: "ML Fundamentals",
        goal: "Interview-grade theory, not just course recall.",
        question: "Explain metrics, bias/variance, regularization and eval tradeoffs.",
        nodes: [
          { id: "ml-supervision", title: "Supervised learning clarity", hint: "Classification vs regression; when each fails.", resource: F.mlFundamentals },
          { id: "ml-metrics", title: "Metrics cheat sheet", hint: "One page per problem type: precision/recall, ROC-AUC, calibration.", resource: F.mlFundamentals },
          { id: "ml-bv", title: "Bias/variance & regularization", hint: "Overfitting intuition, L1/L2, regularization, the tradeoff.", resource: F.mlFundamentals },
          { id: "ml-ol-online", title: "Offline vs online eval", hint: "Holdout, leakage-aware splits, online metrics have latency.", resource: F.mlFundamentals },
        ],
      },
      {
        name: "Data & Features",
        goal: "Data is where real ML problems live.",
        question: "Catch lookahead leakage and label quality issues in a story.",
        nodes: [
          { id: "ml-leakage", title: "Leakage patterns", hint: "Future-heavy, leakage via splits, leakage via features computed on labels-returned.", resource: F.features },
          { id: "ml-label", title: "Label quality & drift", hint: "Crowd-sourced labels, stale labels, feedback loops.", resource: F.features },
          { id: "ml-feature-fresh", title: "Feature freshness & ownership", hint: "Who updates it, staleness, offline-vs-online feature parity.", resource: F.features },
          { id: "ml-feature-store", title: "Feature stores", hint: "Why, online/offline serving, point-in-time correctness.", resource: F.roleMLE },
        ],
      },
      {
        name: "Model Building",
        goal: "Go from a clean dataset to a defensible model and eval.",
        question: "Choose a model, set eval, report both metrics and failure modes.",
        nodes: [
          { id: "ml-baseline", title: "Baseline first", hint: "Predict the majority class / simple logistic. Beat it first, then improve.", resource: F.mlFundamentals },
          { id: "ml-model-choice", title: "Model selection", hint: "Linear, trees/GBM, deep nets; capacity vs data vs latency.", resource: F.mlFundamentals },
          { id: "ml-deep-intuition", title: "Deep learning intuition", hint: "How layers, losses, regularizers behave; when to use DL at all.", resource: F.llm },
          { id: "ml-llm-apps", title: "LLM applications", hint: "RAG, context engineering, eval, hallucination safety.", resource: F.llm },
        ],
      },
      {
        name: "ML System Design",
        goal: "Turn a fuzzy product goal into a measurable system.",
        question: "Design ranking/rec/fraud/search or forecasting prompt end-to-end.",
        nodes: [
          { id: "ml-sd-template", title: "Use the MLSD template", hint: "Product goal → metric → data → model → serving → feedback.", resource: F.mlSd },
          { id: "ml-sd-problems", title: "One prompt a week", hint: "Recommendation, fraud/abuse, search, forecasting, personalization.", resource: F.mlSd },
          { id: "ml-sd-latency", title: "Latency & cost constraints", hint: "Model size, latency budget, batch vs real-time score.", resource: F.mlSd },
          { id: "ml-sd-objective", title: "Metric vs product success", hint: "Metrics optimize look good; tie them to guards and product outcome.", resource: F.mlSdPlaybook },
        ],
      },
      {
        name: "Production ML",
        goal: "Prove you won't just build a notebook.",
        question: "Show monitoring, testing and rollback; aim at ML Test Score.",
        nodes: [
          { id: "ml-prod-skew", title: "Training/serving skew", hint: "Differences between train and serve features; fix them.", resource: F.mlTest },
          { id: "ml-prod-drift", title: "Monitoring & drift", hint: "Input/output/concept drift, silent failure detectors.", resource: F.monitoring },
          { id: "ml-prod-launch", title: "Safe launch patterns", hint: "Shadow, canary, A/B, feature flag, rollback.", resource: F.cicd },
          { id: "ml-prod-testscore", title: "ML Test Score rubric", hint: "Version data, tests, and evaluation grade 1-5 across dimensions.", resource: F.mlTest },
        ],
      },
      {
        name: "Experiments & Feedback",
        goal: "Show the system improves, by evidence.",
        question: "Define an experiment and read the result honestly.",
        nodes: [
          { id: "ml-exp-ab", title: "A/B testing basics", hint: "Power, variance, guardrails, pitfalls (peeking).", resource: F.roleMLE },
          { id: "ml-exp-loop", title: "Label/model feedback loop", hint: "Logged data → retrain → evaluate → ship; track quality of loop.", resource: F.monitoring },
          { id: "ml-exp-rollback", title: "Rollout & rollback state", hint: "Decision windows, drift detection, automated fallback.", resource: F.mlTest },
        ],
      },
      {
        name: "Coding + Mock Loops",
        goal: "Polish role-specific coding plus the ML loop itself.",
        question: "Good up coding & ML system design under time, end-to-end.",
        nodes: [
          { id: "ml-coding", title: "Coding (varies by loop)", hint: "Some teams weight DSA, others drop it. Read the loop.", resource: F.codingPlaybook, resources: [
            { label: "Top K Frequent Elements", href: "https://leetcode.com/problems/top-k-frequent-elements/" },
            { label: "Longest Increasing Subsequence", href: "https://leetcode.com/problems/longest-increasing-subsequence/" },
            { label: "Binary Search", href: "https://leetcode.com/problems/binary-search/" },
          ]},
          { id: "ml-loop-mocks", title: "Full ML mocks", hint: "Coding → MLSD → behavioral, back-to-back.", resource: F.mlSd },
          { id: "ml-fail-cases", title: "Avoid the default failures", hint: "Notebook-only mindset, no data plan, metric-vs-product confusion.", resource: F.roleMLE },
        ],
      },
    ],
  },
  {
    slug: "data-engineer",
    name: "Data Engineer",
    icon: "database",
    tagline: "Correct, cost-efficient, understandable data products.",
    description:
      "DE interviews test whether you can build reliable data products: SQL under time, sound models, pipelines that handle late data, and quality your analysts trust.",
    color: "#f9e2af",
    levels: "Entry → Senior IC",
    loop: "SQL + Data Platform Design + Behavioral",
    weeklyHours: "10-12 hrs/wk",
    phases: [
      {
        name: "SQL Under Time",
        goal: "Being native, not moderate.",
        question: "Write a correct SQL answer in ~25 min with performance intent.",
        nodes: [
          { id: "de-sql-joins", title: "Joins & set operations", hint: "Inner/outer, self, lateral; know semantic pitfalls.", resource: F.sql },
          { id: "de-sql-windows", title: "Window functions", hint: "row_number vs rank vs dense_rank, lead/lag, running sums.", resource: F.sql },
          { id: "de-sql-group", title: "Grouping & aggregations", hint: "GROUP BY, ROLLUP, CUBE, CASE+AGG pattern.", resource: F.sql },
          { id: "de-sql-perf", title: "Performance & correctness", hint: "Explain plans, indexes, avoiding O(n²) join traps.", resource: F.sql },
        ],
      },
      {
        name: "Data Modeling",
        goal: "Design schemas that serve real analytical questions.",
        question: "Design star/snowflake for orders, payments, events.",
        nodes: [
          { id: "de-model-dim", title: "Dimensional modeling basics", hint: "Fact vs dim, grain first, SCD types.", resource: F.modeling },
          { id: "de-model-grain", title: "Keys & grain", hint: "Surrogate keys, granularity, why grain is king.", resource: F.modeling },
          { id: "de-model-scd", title: "Slowly changing dimensions", hint: "SCD Type 1/2/3, which fits which question.", resource: F.modeling },
          { id: "de-model-normalized", title: "Normalized vs denormalized", hint: "Trade correctness vs join cost; which to pick when.", resource: F.modeling },
        ],
      },
      {
        name: "Pipelines & Orchestration",
        goal: "Pipelines that rerun safely and recover.",
        question: "Design a batch pipeline + reprocessing strategy.",
        nodes: [
          { id: "de-pl-batch", title: "Batch pipeline design", hint: "Extract -> transform -> load, partitioning, incremental vs full.", resource: F.pipelines },
          { id: "de-pl-idempotent", title: "Idempotency & backfills", hint: "De-duplicate, re-run safely, backfill strategy.", resource: F.pipelines },
          { id: "de-pl-schema-evolve", title: "Schema evolution", hint: "Add/drop columns non-breaking, back-compat.", resource: F.pipelines },
          { id: "de-pl-orch", title: "Orchestration & retries", hint: "DAG scheduling, dependencies, SLAs on jobs.", resource: F.pipelines },
        ],
      },
      {
        name: "Streaming",
        goal: "Handle out-of-order / late data correctly.",
        question: "Design streaming with watermarks & replay semantics.",
        nodes: [
          { id: "de-stream-batch-vs-stream", title: "Batch vs streaming", hint: "When streaming is worth fear: latency vs complexity.", resource: F.streaming },
          { id: "de-stream-late", title: "Late & out-of-order events", hint: "Watermarks, windows, event-time vs processing-time.", resource: F.streaming },
          { id: "de-stream-semantics", title: "Exactly-once semantics", hint: "At-least-once vs exactly-once, dedup, ids.", resource: F.streaming },
        ],
      },
      {
        name: "Data Quality & Reliability",
        goal: "Data people have to actually trust it.",
        question: "Describe freshness, completeness and accuracy controls.",
        nodes: [
          { id: "de-quality-slos", title: "Freshness/accuracy SLOs", hint: "Measure and alert, not just claim.", resource: F.quality },
          { id: "de-quality-automation", title: "Automated quality checks", hint: "Schema, expectation, freshness and anomaly assertions.", resource: F.quality },
          { id: "de-quality-lineage", title: "Lineage & governance", hint: "Trace, cost, access control and documentation.", resource: F.quality },
          { id: "de-quality-cost", title: "Cost control", hint: "Tiering, time-partition lifecycle, query budget tuning.", resource: F.cost },
        ],
      },
      {
        name: "Platform Design",
        goal: "Design the data platform as a system.",
        question: "Design a warehouse / ingestion platform end-to-end.",
        nodes: [
          { id: "de-platform-prob", title: "Data platform/system design", hint: "Ingest → store → transform → serve → observe.", resource: F.sdPrompts },
          { id: "de-platform-serv", title: "Warehouse/tsb patterns", hint: "Dimension warehouses, data vault, modern stack components.", resource: F.modeling },
          { id: "de-platform-reliability", title: "Reliability of endpoints", hint: "Retries, ordering, monitoring the pipeline health.", resource: F.observability },
        ],
      },
      {
        name: "Mock DE Loop",
        goal: "Master your DE interview: SQL + design + behavioral.",
        question: "Lead a full loop compound under time.",
        nodes: [
          { id: "de-loop-sql", title: "Timed SQL mock", hint: "Timer, correctness, then complexity note.", resource: F.sqlPlaybook },
          { id: "de-loop-platform", title: "Platform design mock", hint: "Structured, failure modes, scale math.", resource: F.sdPlaybook },
          { id: "de-loop-fail", title: "Fix the classic failures", hint: "Wrong grain, forgetting late data, no backfill, no quality checks.", resource: F.roleDE },
        ],
      },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    icon: "chart",
    tagline: "Decisions with data under ambiguity.",
    description: "DS loops center on experimentation, causal intuition, case studies and the ability to turn fuzzy questions into measurable decisions that influence stakeholders.",
    color: "#cba6f7",
    levels: "Entry → Senior IC",
    loop: "Case Studies + SQL + Stats + Experiments + Behavioral",
    weeklyHours: "10-12 hrs/wk",
    phases: [
      {
        name: "Statistical Thinking",
        goal: "Don't freeze on the first probability/statistics question.",
        question: "Power, variance, p-values, and when they don't apply.",
        nodes: [
          { id: "ds-stats-prob", title: "Probability refresher", hint: "Expected value, Bayes, conditional, distributions intuition.", resource: F.mlFundamentals },
          { id: "ds-stats-inf", title: "Estimation & inference", hint: "CIs, hypothetical testing basics, when p is misused.", resource: F.mlFundamentals },
          { id: "ds-stats-bayes", title: "Bayesian intuition", hint: "Priors/updating, when Bayesian framing clarifies.", resource: F.mlFundamentals },
          { id: "ds-stats-visual", title: "Sanity-check edge cases", hint: "Multiple comparisons, base-rate risk, Simpson's.", resource: F.roleDS },
        ],
      },
      {
        name: "Metrics & Experimentation",
        goal: "Define measurability that won't backfire.",
        question: "Define a metric + guardrails + experiment plan + pitfalls.",
        nodes: [
          { id: "ds-metric-choice", title: "Good metric definition", hint: "North-star vs guardrail vs success; how measurable.", resource: F.roleDS },
          { id: "ds-metric-pitfall", title: "Metric pitfalls", hint: "Proxy distortion, dilicacy, confounding, p-hacking.", resource: F.roleDS },
          { id: "ds-ab-power", title: "Power, variance & sample", hint: "MDE, variance, sample size reasoning on the fly.", resource: F.roleDS },
          { id: "ds-ab-honest", title: "Honest A/B reading", hint: "Peeking, novelty, carryover, SRM.", resource: F.roleDS },
        ],
      },
      {
        name: "Causal Reasoning",
        goal: "Tell correlation-versus-causation apart defensibly.",
        question: "Use confounding / selection on a produced example.",
        nodes: [
          { id: "ds-causal-hal", title: "Confounding vs correlation", hint: "When observational, say correlation-only.", resource: F.roleDS },
          { id: "ds-causal-selection", title: "Selection bias", hint: "Survivorship, colliders, sample-selection issues.", resource: F.roleDS },
          { id: "ds-causal-est", title: "Quasi-experimental intuition", hint: "Diff-in-diff, IV, regression cars.", resource: F.roleDS },
        ],
      },
      {
        name: "Case Studies & Product Sense",
        goal: "Product-bred, structured answers to fuzzy prompts.",
        question: "Turn a vague product goal into an actionable, measurable plan.",
        nodes: [
          { id: "ds-case-metrics", title: "Start with success", hint: "Define what 'good' means before analysis.", resource: F.roleDS },
          { id: "ds-case-guardrails", title: "Guardrail metrics", hint: "Call honest: 'metrics that prevent accidental badness'.", resource: F.roleDS },
          { id: "ds-case-clarity", title: "Clarify ambiguity", hint: "One-pass on framing, then decompose logically.", resource: F.roleDS },
          { id: "ds-case-output", title: "One-page conclusions", hint: "A one-page story that drives a decision, not just charts.", resource: F.roleDS },
        ],
      },
      {
        name: "Modeling & Analysis",
        goal: "Deliver models/analysis that answer the question cleanly.",
        question: "Build a defensible but straightforward model from real data.",
        nodes: [
          { id: "ds-model-baseline", title: "Bootstrap & simple first", hint: "Baseline beat; avoid overfitting the demo.", resource: F.mlFundamentals },
          { id: "ds-model-ds-extra", title: "Interpretability vs power", hint: "Model choice: intuition, transparency, latency.", resource: F.mlFundamentals },
          { id: "ds-sql", title: "SQL drill for analysis", hint: "Windows, joins, group—timed.", resource: F.sql },
          { id: "ds-narrative", title: "Storytelling & influence", hint: "Explain, tie to a decision, next step.", resource: F.roleDS },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Put the whole DS loop together.",
        question: "Case + SQL + behavioral back-to-back without freezing.",
        nodes: [
          { id: "ds-loop-case", title: "Case study mock", hint: "Timeboxed, structured, be a consultant.", resource: F.sdPrompts },
          { id: "ds-loop-sql", title: "SQL+analysis mock", hint: "Clips under time + one-page insight.", resource: F.sqlPlaybook },
          { id: "ds-loop-fail", title: "Audit your failure modes", hint: "Metric confusion, p-hacking, unclear recommendations.", resource: F.roleDS },
          { id: "ds-loop-archetype", title: "Tune to company", hint: "FAANG: speed+rigor. Enterprise: stakeholder. Safety: offline eval.", resource: F.roleDS },
        ],
      },
    ],
  },
  {
    slug: "devops-sre",
    name: "DevOps / SRE",
    icon: "server",
    tagline: "Keep systems healthy under change.",
    description:
      "DevOps/SRE interviews verify you can automate, run, debug and lead reliability work: Linux, containers/Kubernetes, CI/CD, observability, SLOs, incidents.",
    color: "#fab387",
    levels: "Entry → Senior IC",
    loop: "Systems + Design + Ops/Incident + Behavioral",
    weeklyHours: "12-15 hrs/wk",
    phases: [
      {
        name: "Systems Fundamentals",
        goal: "You cannot SRE what you cannot reason about.",
        question: "Debug a system with Unix tools and a mental model.",
        nodes: [
          { id: "ob-linux", title: "Linux internals", hint: "Processes, memory, files, sockets, /proc, performance tools.", resource: F.linux },
          { id: "ob-networking", title: "Networking stack", hint: "TCP/IP, DNS, TLS, proxies, load workers.", resource: F.linux },
          { id: "ob-debug", title: "Debugging workflow", hint: "Trial-and-educe: measure first, state hypothesis, verify.", resource: F.incident },
        ],
      },
      {
        name: "Containers & Kubernetes",
        goal: "Know primitives, not just wizards.",
        question: "Explain the failure modes of a pod / deployment / service.",
        nodes: [
          { id: "ob-docker", title: "Docker fundamentals", hint: "Images, layers, runtime further vs namespaces, cgroups.", resource: F.docker },
          { id: "ob-k8s-core", title: "Kubernetes core primitives", hint: "Pod, deployment, service, configmap, network policy basics.", resource: F.k8s },
          { id: "ob-k8s-fail", title: "K8s failure modes", hint: "Scheduling, resource limits, liveness/readiness.", resource: F.k8s },
        ],
      },
      {
        name: "CI/CD & Safe Deployment",
        goal: "Ship faster safely, which is the real job.",
        question: "Design a safe rollout with rollback and surface.",
        nodes: [
          { id: "ob-cicd-pipeline", title: "CI/CD pipeline design", hint: "Test gates, build, artifact, promotion, convention.", resource: F.cicd },
          { id: "ob-rollout", title: "Blue-green & canary", hint: "Progressive delivery, thresholds, automatic rollback.", resource: F.cicd },
          { id: "ob-flags", title: "Feature flags", hint: "Decouple deploy from release, kill switch.", resource: F.cicd },
          { id: "ob-iac", title: "Infra as code", hint: "Terraform-style declarative, drift observation, ephemeral.", resource: F.cloud },
        ],
      },
      {
        name: "Observability",
        goal: "Turn signals into peace-of-mind.",
        question: "Design metrics/logs/traces that catch issues early.",
        nodes: [
          { id: "ob-metrics", title: "Metrics & related", hint: "RED vs USE, efficiency, saturation.", resource: F.observability },
          { id: "ob-logs", title: "Structured logging", hint: "Structured, schemas, correlation IDs.", resource: F.observability },
          { id: "ob-traces", title: "Tracing", hint: "Distributed traces, latency attribution.", resource: F.observability },
          { id: "ob-dash", title: "Actionable dashboards", hint: "From raw charts to asking questions.", resource: F.observability },
        ],
      },
      {
        name: "SLOs & Reliability",
        goal: "SRE in the difference between errors and reliability.",
        question: "Set an SLO, budget it, and detect error budgets.",
        nodes: [
          { id: "ob-sli", title: "Picking SLIs", hint: "Availability, latency, correctness; user-facing when possible.", resource: F.cloud },
          { id: "ob-slo", title: "Setting SLO targets", hint: "Balance engineering vs customer expectations; error budget.", resource: F.cloud },
          { id: "ob-budget", title: "Error budget & on-call", hint: "Stay vigilant, prevent panic, trade for innovation.", resource: F.cloud },
        ],
      },
      {
        name: "Incidents & Communication",
        goal: "Lead an incident; write a blameless find.",
        question: "Role-play of an on-call incident with clear comms.",
        nodes: [
          { id: "ob-incident-mgmt", title: "Incident management", hint: "Roles, severity, escalation, comms (status updates).", resource: F.incident },
          { id: "ob-postmortem", title: "Blameless postmortem", hint: "Find the system flaw, not the culprit.", resource: F.incident },
          { id: "ob-roleplay", title: "Practice incidents", hint: "Timeboxed drill: triage, comms, resolve, follow-up.", resource: F.incident },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Runs the full set of ops signals under time.",
        question: "Pull together the loop + close repeated gaps.",
        nodes: [
          { id: "ob-mock", title: "Mock loop", hint: "System design, incident scenario, behavioral.", resource: F.sdPlaybook },
          { id: "ob-avoid", title: "Avoid default failure cases", hint: "Tool trivia w/o fundamentals, no SLOs, no feedback loop.", resource: F.roleDevOps },
          { id: "ob-archetype", title: "Tune to company", hint: "Fleet-scale SRE vs enterprise heterogeneous, automotive safety.", resource: F.roleDevOps },
        ],
      },
    ],
  },
  {
    slug: "mlops",
    name: "MLOps Engineer",
    icon: "database",
    tagline: "Enable teams to ship models reliably.",
    description:
      "MLOps is platform engineering for ML: deployment, monitoring, feature stores, reproducibility and governance, with a strong developer-experience story.",
    color: "#94e2d5",
    levels: "Mid → Senior IC",
    loop: "Platform/System Design + ML Prod + Infra/Ops + Behavioral",
    weeklyHours: "14-16 hrs/wk",
    phases: [
      {
        name: "Infra & Platform Foundations",
        goal: "Build a platform engineer you can defend.",
        question: "Explain your SaaS / platform reasoning on basics.",
        nodes: [
          { id: "mo-infra-ctnr", title: "Containers & Kubernetes", hint: "Primitives, limits, operators-adjacent concepts.", resource: F.k8s },
          { id: "mo-infra-cicd", title: "CI/CD & environments", hint: "Promote both code + model artifacts safely.", resource: F.cicd },
          { id: "mo-infra-obs", title: "Observing the platform", hint: "Metrics for the platform + the models it runs.", resource: F.observability },
          { id: "mo-infra-cloud", title: "Cloud + IaC", hint: "Reproducible, ephemeral, ready for multi-tenant.", resource: F.cloud },
        ],
      },
      {
        name: "ML Production Basics",
        goal: "Understand how to really get a model to prod.",
        question: "Describe train/serve skew, feature freshness, deployment.",
        nodes: [
          { id: "mlo-skew", title: "Training/serving skew", hint: "Catches it when model behavior drifts offline vs online.", resource: F.mlTest },
          { id: "mlo-deploy-pat", title: "Model deployment patterns", hint: "Shadow, canary, A/B, API vs batch, versioning.", resource: F.mlSd },
          { id: "mlo-feature-fresh", title: "Feature maturity budgets", hint: "Feature store: online/offline parity, staleness.", resource: F.features },
        ],
      },
      {
        name: "Model Serving & Feature Stores",
        goal: "Design the serving + feature layer that teams reuse.",
        question: "Design a path from model to edge and keep it fine.",
        nodes: [
          { id: "mlo-serving", title: "Serving comparisons", hint: "REST/gRPC, GPU serving, scale-out scaling, serverless.", resource: F.mlSd },
          { id: "mlo-feature-store", title: "Feature store design", hint: "Online serving, point-in-time, governance, partitions.", resource: F.features },
          { id: "mlo-experiment", title: "Experimentation infra", hint: "Tracking, reproducibility, offline/online for the team.", resource: F.roleMLOps },
          { id: "mlo-safety", title: "Modelgate & QA", hint: "Tests, validation, rollout gates for model versions.", resource: F.mlTest },
        ],
      },
      {
        name: "Data & Pipelines Reliability",
        goal: "Models are only as good as their data path.",
        question: "Make the data pipeline observables, replayable, fresh.",
        nodes: [
          { id: "mlo-data-orch", title: "Orchestration & ingestion", hint: "DAGs, retries, backfills, dependency; first-class.", resource: F.pipelines },
          { id: "mlo-data-fresh", title: "Freshness & drift on input", hint: "Detect stale data, anomalies, drift pre-scoring.", resource: F.monitoring },
          { id: "mlo-data-lineage", title: "Lineage & audit", hint: "Governance, reproducibility, audit to models.", resource: F.quality },
        ],
      },
      {
        name: "Multi-tenant Platform Design",
        goal: "Design for many teams with one safe platform.",
        question: "Multi-tenant pipelines, quotas, cost control for ML teams.",
        nodes: [
          { id: "mlo-mt-quota", title: "Quotas & limits", hint: "Per-team resources, concurrency, soft limits.", resource: F.sdPrompts },
          { id: "mlo-mt-cost", title: "Cost allocation", hint: "Chargebacks, watching GPU spend, idle cleanup.", resource: F.cost },
          { id: "mlo-mt-xp", title: "Developer experience", hint: "Templates, golden paths, reducing team toil.", resource: F.sdPlaybook },
        ],
      },
      {
        name: "Governance & Security",
        goal: "Models respected, governed and controlled.",
        question: "Explain model risk, approvals, and audit controls.",
        nodes: [
          { id: "mlo-gov-approval", title: "Approval & validation gates", hint: "Model risk, MRM in finance; internal approvals.", resource: F.mlTest },
          { id: "mlo-gov-repro", title: "Reproducibility & versioning", hint: "Data+code+config for every artifact.", resource: F.mlSd },
          { id: "mlo-gov-security", title: "Model security", hint: "Scans, prompt injection for LLMs, data leaks.", resource: F.llm },
        ],
      },
      {
        name: "Mock Loops",
        goal: "Run the full loop and strengthen your impact stories.",
        question: "Platform/system design + ops behaviors for ML.",
        nodes: [
          { id: "mloop-design", title: "Platform/MTSD design", hint: "Make it multi-tenant-safe and observant.", resource: F.mlSd },
          { id: "mloop-velocity", title: "Velocity/safety story", hint: "Quantify how the platform elevated team speed AND safety.", resource: F.roleMLOps },
          { id: "mloop-avoid", title: "Avoid 'just a k8s' trap", hint: "Show ML-specific monitoring/test/attainment plan.", resource: F.roleMLOps },
        ],
      },
    ],
  },
  {
    slug: "frontend-engineer",
    name: "Frontend Engineer",
    icon: "browser",
    tagline: "Product-facing engineering: rendering, performance, UX quality.",
    description:
      "Frontend interviews test your understanding of the browser, JavaScript/TypeScript depth, framework ergonomics, accessibility, performance budgets and shipping polish that survives code review.",
    color: "#f9e2af",
    levels: "Entry → Senior IC",
    loop: "Coding + Frontend System Design + Behavioral",
    weeklyHours: "10-12 hrs/wk",
    phases: [
      {
        name: "Web Fundamentals",
        goal: "Understand what the browser actually does.",
        question: "Explain rendering, DOM, CSS layout and network pipeline.",
        nodes: [
          { id: "fe-web-html", title: "HTML & semantics", hint: "Document structure, forms, accessibility roles, SEO basics.", resource: F.roleSWE },
          { id: "fe-web-css", title: "CSS layout & cascade", hint: "Box model, flex/grid, specificity, stacking contexts.", resource: F.roleSWE },
          { id: "fe-web-browser", title: "Browser internals", hint: "Parsing, render tree, paint/composite, event loop.", resource: F.systems },
          { id: "fe-web-http", title: "HTTP & networking", hint: "Requests, caching, cookies, CORS, WebSockets.", resource: F.linux },
        ],
      },
      {
        name: "JavaScript & TypeScript Depth",
        goal: "Speak the language at interview-grade fluency.",
        question: "Solve closures, async, and typing questions under time.",
        nodes: [
          { id: "fe-js-core", title: "JS core semantics", hint: "Closures, hoisting, this, prototypal inheritance.", resource: F.dsa },
          { id: "fe-js-async", title: "Async & event loop", hint: "Promises, microtasks, async/await, concurrency pitfalls.", resource: F.dsa },
          { id: "fe-js-ts", title: "TypeScript types", hint: "Generics, narrowing, utility types, advanced signatures.", resource: F.dsa },
          { id: "fe-js-perf", title: "Runtime performance", hint: "GC intuition, avoiding jank, worker threads, memoization.", resource: F.dsa },
        ],
      },
      {
        name: "Framework Mastery",
        goal: "Go beyond 'I've used it' to 'I know why'.",
        question: "Design a component and explain re-rendering behavior.",
        nodes: [
          { id: "fe-fw-core", title: "Your main framework", hint: "React/Vue/Angular: lifecycle, state, derived data.", resource: F.roleSWE },
          { id: "fe-fw-state", title: "State management", hint: "Local vs global, external stores, when to lift state.", resource: F.roleSWE },
          { id: "fe-fw-render", title: "Rendering & reconciliation", hint: "Virtual DOM/diffing, keys, avoiding wasted renders.", resource: F.roleSWE },
          { id: "fe-fw-ssr", title: "SSR/SSG & hydration", hint: "SEO, TTFB vs interactivity, islands/hydration.", resource: F.roleSWE },
        ],
      },
      {
        name: "UI Engineering & Accessibility",
        goal: "Polish is a feature — defend it.",
        question: "Design an accessible, responsive interaction under scrutiny.",
        nodes: [
          { id: "fe-ui-a11y", title: "Accessibility (a11y)", hint: "Semantics, keyboard nav, focus, ARIA, contrast.", resource: F.roleSWE },
          { id: "fe-ui-responsive", title: "Responsive & adaptive", hint: "Breakpoints, fluid type, container queries.", resource: F.roleSWE },
          { id: "fe-ui-designsys", title: "Design systems", hint: "Tokens, components, theming, consistency at scale.", resource: F.roleSWE },
          { id: "fe-ui-animation", title: "Animation & micro-interactions", hint: "transform/opacity, compositor-only, reduced motion.", resource: F.roleSWE },
        ],
      },
      {
        name: "Performance & Reliability",
        goal: "Ship fast, catch regressions, stay observable.",
        question: "Optimize and diagnose a slow page on the spot.",
        nodes: [
          { id: "fe-perf-cwv", title: "Core Web Vitals", hint: "LCP, INP, CLS and how to move each one.", resource: F.sdCapacity },
          { id: "fe-perf-bundle", title: "Bundling & code splitting", hint: "Tree shaking, lazy routes, chunk budgets.", resource: F.swe },
          { id: "fe-perf-cache", title: "Caching & data fetching", hint: "Cache headers, SW caching, stale-while-revalidate.", resource: F.sdPatterns },
          { id: "fe-perf-test", title: "Perf testing & budgets", hint: "Lighthouse/CI budgets, A/B experiments on perf.", resource: F.cicd },
          { id: "fe-perf-obs", title: "Client observability", hint: "RUM, error tracking, source maps, session replay.", resource: F.observability },
        ],
      },
      {
        name: "Projects & Evidence",
        goal: "Resume signal that shows craft, not just usage.",
        question: "Talk through a real, shipped, measurable product.",
        nodes: [
          { id: "fe-proj-app", title: "A polished real app", hint: "Accessible, tested, instrumented, deployed.", resource: F.roleSWE },
          { id: "fe-proj-a11y", title: "Accessibility pass", hint: "Run an audit, fix it, document the scores.", resource: F.roleSWE },
          { id: "fe-proj-perf", title: "Perf improvement story", hint: "Measured before/after with a number.", resource: F.roleSWE },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Compose coding, design and behavioral under time.",
        question: "Run full frontend loops and close your top gaps.",
        nodes: [
          { id: "fe-loop-coding", title: "Coding mock", hint: "DOM/JS component exercises + DSA-light.", resource: F.codingPlaybook },
          { id: "fe-loop-design", title: "Frontend design mock", hint: "Component/app design: state, data, edge cases.", resource: F.sdPlaybook },
          { id: "fe-loop-postmortem", title: "Post-mortem", hint: "Top 3 gaps, top 3 strengths each week.", resource: F.cheerSkill },
        ],
      },
    ],
  },
  {
    slug: "fullstack-engineer",
    name: "Fullstack Engineer",
    icon: "terminal",
    tagline: "Both ends, end-to-end ownership of the product surface.",
    description:
      "Fullstack loops test depth on both sides: frontend craft and backend services, plus integration concerns — APIs, auth, data, deployment — and the judgment to choose the right split.",
    color: "#a6e3a1",
    levels: "Entry → Senior IC",
    loop: "Coding (both ends) + Full-stack Design + Behavioral",
    weeklyHours: "12-15 hrs/wk",
    phases: [
      {
        name: "Frontend Layer",
        goal: "Reach a credible frontend baseline fast.",
        question: "Explain rendering, state and interaction for a real screen.",
        nodes: [
          { id: "fs-fe-js", title: "JS/TS + browser basics", hint: "Core language, DOM, event loop, layout/paint.", resource: F.dsa },
          { id: "fs-fe-framework", title: "One framework deeply", hint: "Components, state, effects, rendering behavior.", resource: F.roleSWE },
          { id: "fs-fe-css", title: "CSS & layout", hint: "Flex/grid, spacing, responsive breakpoints.", resource: F.roleSWE },
          { id: "fs-fe-a11y", title: "Accessibility & polish", hint: "Semantics, keyboard, focus, contrast.", resource: F.roleSWE },
        ],
      },
      {
        name: "Backend Layer",
        goal: "Reach a credible backend baseline fast.",
        question: "Design a small service with clean contracts and failure handling.",
        nodes: [
          { id: "fs-be-api", title: "REST/API design", hint: "Resources, status codes, versioning, pagination.", resource: F.swe },
          { id: "fs-be-data", title: "Data & storage", hint: "Modeling, indexing, transactions basics.", resource: F.databases },
          { id: "fs-be-auth", title: "Authn/authz", hint: "Sessions vs tokens, roles, password handling.", resource: F.swe },
          { id: "fs-be-reliability", title: "Reliability basics", hint: "Timeouts, retries, idempotency, rate limits.", resource: F.sdPatterns },
        ],
      },
      {
        name: "Integration & Data",
        goal: "Glue both ends into one working product.",
        question: "Design the full request/response and data flow for a feature.",
        nodes: [
          { id: "fs-int-fetch", title: "Data fetching patterns", hint: "REST/graphQL, caching, optimistic updates, refetch.", resource: F.sdPatterns },
          { id: "fs-int-state", title: "Client-server state", hint: "Sync, conflict, offline/queue, optimistic vs conservative.", resource: F.sdPatterns },
          { id: "fs-int-schema", title: "Contracts & types", hint: "Shared schemas, codegen, validation boundaries.", resource: F.modeling },
          { id: "fs-int-events", title: "Events & realtime", hint: "WebSockets, SSE, outbox, background jobs.", resource: F.pipelines },
        ],
      },
      {
        name: "Deployment & Ops (Full-stack)",
        goal: "Own the path to production end-to-end.",
        question: "Ship a full-stack feature with rollback and observability.",
        nodes: [
          { id: "fs-ops-deploy", title: "Deploy & environments", hint: "Environments, migrations, secrets, CI/CD.", resource: F.cicd },
          { id: "fs-ops-observability", title: "Observability end-to-end", hint: "Errors, logs, traces, RUM across stack.", resource: F.observability },
          { id: "fs-ops-perf", title: "Perf across the stack", hint: "Client vitals + server latency + DB queries.", resource: F.sdCapacity },
        ],
      },
      {
        name: "Full-stack System Design",
        goal: "Design whole features, not just one side.",
        question: "Design a full-stack feature in 45 min with tradeoffs.",
        nodes: [
          { id: "fs-sd-template", title: "Template + capacity", hint: "Requirements → data → both ends → failure modes.", resource: F.sdTemplate },
          { id: "fs-sd-features", title: "Full-stack prompts", hint: "Chat, upload, search, notifications, dashboards.", resource: F.sdPrompts },
          { id: "fs-sd-judgment", title: "Splitting judgment", hint: "When to thicken the client vs server-side logic.", resource: F.sdPlaybook },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Simulate the dual-sided loop honestly.",
        question: "Run full loops and fix the recurring gaps.",
        nodes: [
          { id: "fs-loop", title: "Full mock loop", hint: "Coding + design + behavioral, both ends.", resource: F.sdPlaybook },
          { id: "fs-fail", title: "Audit failure cases", hint: "Shallow on one end, no integration plan, no ops story.", resource: F.roleSWE },
        ],
      },
    ],
  },
  {
    slug: "mobile-engineer",
    name: "Mobile Engineer (iOS/Android)",
    icon: "device",
    tagline: "Craft native experiences constrained by real devices.",
    description:
      "Mobile interviews test platform fundamentals, language/SDK depth, UI frameworks, offline & networking behavior, performance/battery and app-store release discipline.",
    color: "#89dceb",
    levels: "Entry → Senior IC",
    loop: "Coding + Mobile System Design + Behavioral",
    weeklyHours: "12-15 hrs/wk",
    phases: [
      {
        name: "Platform Fundamentals",
        goal: "Reason about the runtime, not just the APIs.",
        question: "Explain app lifecycle, threads and memory under questioning.",
        nodes: [
          { id: "mo-plat-lifecycle", title: "App & UI lifecycle", hint: "Launch, foreground/background, view lifecycle.", resource: F.systems },
          { id: "mo-plat-threads", title: "Concurrency & main thread", hint: "Main-thread, queues, avoiding jank & ANRs.", resource: F.systems },
          { id: "mo-plat-memory", title: "Memory & leaks", hint: "Retain cycles, strong/weak refs, profiling tools.", resource: F.systems },
          { id: "mo-plat-storage", title: "Local persistence", hint: "SQLite, key-value, files, document storage.", resource: F.databases },
        ],
      },
      {
        name: "Language & SDK Depth",
        goal: "Fluent in the platform's native language.",
        question: "Answer language-mechanics questions under time.",
        nodes: [
          { id: "mo-lang-swift", title: "Swift or Kotlin mastery", hint: "Value/reference, optionals/null, protocols/traits.", resource: F.dsa },
          { id: "mo-lang-sdk", title: "Core SDK familiarity", hint: "Networking, background tasks, permissions, sensors.", resource: F.dsa },
          { id: "mo-lang-arch", title: "Architecture patterns", hint: "MVC vs MVVM vs unidirectional; when each fits.", resource: F.roleSWE },
        ],
      },
      {
        name: "UI & Interaction",
        goal: "Build screens that feel native and testable.",
        question: "Design a component with edge cases and animations.",
        nodes: [
          { id: "mo-ui-views", title: "View systems", hint: "Layout, constraints, components, reusability.", resource: F.roleSWE },
          { id: "mo-ui-state", title: "State & data binding", hint: "Observables, diffing, derived UI state.", resource: F.roleSWE },
          { id: "mo-ui-test", title: "UI testing", hint: "Unit, snapshot, integration, E2E; testability.", resource: F.swe },
          { id: "mo-ui-a11y", title: "Accessibility on device", hint: "Screen readers, dynamic type, contrast, focus.", resource: F.roleSWE },
        ],
      },
      {
        name: "Networking & Offline",
        goal: "Behave well when connectivity is hostile.",
        question: "Design a cache + offline strategy for a real feature.",
        nodes: [
          { id: "mo-net-api", title: "API layer design", hint: "Models, mapping, cancellation, retries.", resource: F.sdPatterns },
          { id: "mo-net-cache", title: "Caching & offline-first", hint: "Cache policies, background sync, conflict resolution.", resource: F.sdPatterns },
          { id: "mo-net-security", title: "Security on device", hint: "Keychain/keystore, certificate pinning, data at rest.", resource: F.roleBE },
        ],
      },
      {
        name: "Performance & Release",
        goal: "Ship smooth, battery-friendly, store-ready.",
        question: "Diagnose jank/battery regressions and plan a release.",
        nodes: [
          { id: "mo-perf-render", title: "Rendering performance", hint: "Frame budgets, view reuse, precomputed layouts.", resource: F.roleSWE },
          { id: "mo-perf-battery", title: "Battery & network cost", hint: "Batching, background limits, resource use.", resource: F.roleSWE },
          { id: "mo-release-appstore", title: "Store & release pipeline", hint: "Signing, versions, staged rollouts, review gotchas.", resource: F.roleSWE },
          { id: "mo-release-analytics", title: "Crash & analytics", hint: "Symbolication, crash clusters, release monitoring.", resource: F.observability },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Put the native loop together under time.",
        question: "Run combined mobile loops and fix top gaps.",
        nodes: [
          { id: "mo-loop-coding", title: "Coding mock", hint: "Algorithm-heavy plus platform problem.", resource: F.codingPlaybook },
          { id: "mo-loop-design", title: "Mobile design mock", hint: "Screen/feature design: states, offline, perf.", resource: F.sdPlaybook },
          { id: "mo-loop-fail", title: "Avoid default failures", hint: "Ignoring main-thread, no offline story, leak blind spots.", resource: F.roleSWE },
        ],
      },
    ],
  },
  {
    slug: "security-engineer",
    name: "Security Engineer",
    icon: "shield",
    tagline: "Find weaknesses, harden systems, respond without panic.",
    description:
      "Security interviews test threat modeling, web/app vulnerabilities, authn/authz, network & cloud security, detection/response and the compliance mindset that earns trust.",
    color: "#f38ba8",
    levels: "Entry → Senior IC",
    loop: "Technical + Security Design + Incident/Behavioral",
    weeklyHours: "12-15 hrs/wk",
    phases: [
      {
        name: "Security Fundamentals",
        goal: "A shared vocabulary and threat mindset.",
        question: "Threat-model a system and rank its risks.",
        nodes: [
          { id: "sec-fund-cia", title: "CIA & risk thinking", hint: "Confidentiality, integrity, availability; risk = impact × likelihood.", resource: F.cloud },
          { id: "sec-fund-crypto", title: "Applied crypto basics", hint: "Hashing, encryption, signatures, TLS, when each fits.", resource: F.systems },
          { id: "sec-fund-threat", title: "Threat modeling", hint: "STRIDE/attack trees; find the crown jewels first.", resource: F.sdPatterns },
          { id: "sec-fund-mindset", title: "Attacker mindset", hint: "Abuse cases, trust boundaries, least privilege.", resource: F.sdPatterns },
        ],
      },
      {
        name: "Web & Application Security",
        goal: "Find and fix the bugs that actually get exploited.",
        question: "Explain and remediate a vulnerability in a code sample.",
        nodes: [
          { id: "sec-web-owasp", title: "OWASP Top 10 fluency", hint: "Injection, XSS, CSRF, SSRF, insecure deps.", resource: F.roleBE },
          { id: "sec-web-auth", title: "Authn/authz hardening", hint: "Password storage, sessions, MFA, token misuse, IDOR.", resource: F.roleBE },
          { id: "sec-web-input", title: "Input validation & escaping", hint: "Validate, encode, parameterize everywhere.", resource: F.swe },
          { id: "sec-web-ssdlc", title: "Secure SDLC", hint: "SAST/DAST, dependency scanning, code review gates.", resource: F.cicd },
        ],
      },
      {
        name: "Network & Infrastructure",
        goal: "Defend layers below the app.",
        question: "Design network segmentation and detect lateral movement.",
        nodes: [
          { id: "sec-net-seg", title: "Segmentation & zero trust", hint: "Micro-segmentation, least privilege, network policy.", resource: F.linux },
          { id: "sec-net-egress", title: "Egress & SSRF control", hint: "Allow-lists, proxies, cloud metadata protection.", resource: F.linux },
          { id: "sec-net-tls", title: "TLS & certificates", hint: "Cipher choices, cert lifecycle, mTLS.", resource: F.linux },
        ],
      },
      {
        name: "Cloud & Container Security",
        goal: "Secure modern infra with the right posture.",
        question: "Harden a cloud workload and its supply chain.",
        nodes: [
          { id: "sec-cloud-iam", title: "IAM & least privilege", hint: "Roles, ephemeral creds, key rotation, workload identity.", resource: F.cloud },
          { id: "sec-cloud-supply", title: "Supply chain security", hint: "SBOM, image signing, verified builds, registry scan.", resource: F.k8s },
          { id: "sec-cloud-k8s", title: "Kubernetes security", hint: "RBAC, network policies, secrets, admission control.", resource: F.k8s },
        ],
      },
      {
        name: "Detection, Response & Ops",
        goal: "Assume breach — then detect and respond.",
        question: "Triage an alert and drive an incident calmly.",
        nodes: [
          { id: "sec-detect-log", title: "Detection & monitoring", hint: "Log pipelines, SIEM rules, alert quality.", resource: F.observability },
          { id: "sec-detect-ir", title: "Incident response", hint: "Containment, evidence, comms, lessons learned.", resource: F.incident },
          { id: "sec-detect-pentest", title: "Testing & assurance", hint: "Pentest/red team methodology, scope, reporting.", resource: F.roleDevOps },
        ],
      },
      {
        name: "Compliance & Governance",
        goal: "Turn controls into trust for customers.",
        question: "Explain a control, a framework, and an audit story.",
        nodes: [
          { id: "sec-gov-frameworks", title: "Standards & frameworks", hint: "SOC 2, ISO 27001, GDPR/CCPA; control mapping.", resource: F.roleDevOps },
          { id: "sec-gov-policy", title: "Policy & training", hint: "Acceptable use, security champions, culture.", resource: F.roleDevOps },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Lead security loops end-to-end.",
        question: "Run tech + design + incident mocks, then postmortem.",
        nodes: [
          { id: "sec-loop", title: "Mock loop", hint: "Technical question, security design, incident scenario.", resource: F.sdPlaybook },
          { id: "sec-fail", title: "Avoid default failures", hint: "Tool talk without fundamentals, no threat model, panic in IR.", resource: F.roleDevOps },
        ],
      },
    ],
  },
  {
    slug: "ml-research-scientist",
    name: "ML Research Scientist",
    icon: "brain",
    tagline: "First-principles modeling that moves real metrics.",
    description:
      "Research roles weigh math rigor, model depth, problem framing, and the ability to evaluate honestly and reproduce results — on top of software discipline to ship.",
    color: "#cba6f7",
    levels: "PhD/Research track",
    loop: "Coding + ML Theory + Research Design + Behavioral",
    weeklyHours: "14-16 hrs/wk",
    phases: [
      {
        name: "Mathematical Foundations",
        goal: "Derive, not just recite, the math.",
        question: "Explain optimization, probability and linear algebra intuitions.",
        nodes: [
          { id: "rs-math-linalg", title: "Linear algebra intuition", hint: "Eigendecomposition, SVD, norm geometry, projections.", resource: F.mlFundamentals },
          { id: "rs-math-prob", title: "Probability & statistics", hint: "Distributions, MLE/MAP, CIs, hypothesis testing.", resource: F.mlFundamentals },
          { id: "rs-math-opt", title: "Optimization", hint: "Gradient descent variants, convexity, constraints, schedules.", resource: F.mlFundamentals },
        ],
      },
      {
        name: "Core ML Theory",
        goal: "Reason about learning, not just run it.",
        question: "Explain generalization, bias/variance and capacity tradeoffs.",
        nodes: [
          { id: "rs-theory-generalization", title: "Generalization & bounds", hint: "Train/test, capacity, regularization, when big data helps.", resource: F.mlFundamentals },
          { id: "rs-theory-bv", title: "Bias/variance decomposition", hint: "Where error comes from and how to trade it.", resource: F.mlFundamentals },
          { id: "rs-theory-bayes", title: "Bayesian thinking", hint: "Priors, posteriors, uncertainty quantification.", resource: F.mlFundamentals },
          { id: "rs-theory-classics", title: "Classical models", hint: "LR, SVM, GBM, forests — when they beat deep nets.", resource: F.mlFundamentals },
        ],
      },
      {
        name: "Deep Learning",
        goal: "Go deep on architectures and what makes them work.",
        question: "Explain a modern architecture and diagnose a training failure.",
        nodes: [
          { id: "rs-dl-nn", title: "Neural nets from scratch", hint: "Backprop, initialization, normalization, optimizers.", resource: F.mlFundamentals },
          { id: "rs-dl-cnn", title: "CNNs & vision", hint: "Convolutions, pooling, feature hierarchy, transfer learning.", resource: F.llm },
          { id: "rs-dl-seq", title: "Sequence models", hint: "RNN/attention history, transformers, position encodings.", resource: F.llm },
          { id: "rs-dl-gen", title: "Generative & LLMs", hint: "Diffusion, autoregressive, RLHF, eval & safety.", resource: F.llm },
        ],
      },
      {
        name: "Research Method",
        goal: "Framing is the hardest part of research.",
        question: "Turn an open-ended problem into a testable hypothesis.",
        nodes: [
          { id: "rs-method-problem", title: "Problem framing", hint: "The right question, the right metric, the baseline.", resource: F.mlSd },
          { id: "rs-method-paper", title: "Reading papers critically", hint: "Claims, assumptions, ablations, what's actually shown.", resource: F.mlSd },
          { id: "rs-method-experiments", title: "Experimental discipline", hint: "Controls, ablations, seeds, honest reporting.", resource: F.mlTest },
          { id: "rs-method-repro", title: "Reproducibility", hint: "Pinned data, config, code; determinism strategies.", resource: F.mlTest },
        ],
      },
      {
        name: "Evaluation & Honesty",
        goal: "Metrics that don't fool you.",
        question: "Pick the right eval and explain its failure modes.",
        nodes: [
          { id: "rs-eval-offline", title: "Offline evaluation design", hint: "Splits, leakage, calibration, task-specific metrics.", resource: F.mlTest },
          { id: "rs-eval-deploy", title: "Offline vs online", hint: "Proxy metrics, A/B, when sims lie.", resource: F.mlSd },
          { id: "rs-eval-safety", title: "Robustness & safety", hint: "Adversarial, distribution shift, biases.", resource: F.mlTest },
        ],
      },
      {
        name: "Applied Research & Delivery",
        goal: "Research that lands in the product.",
        question: "Present research as impact, not just papers.",
        nodes: [
          { id: "rs-app-scope", title: "Scope & kill decisions", hint: "Timebox, stop-loss, when simpler wins.", resource: F.mlSd },
          { id: "rs-app-eng", title: "Engineering literacy", hint: "Productionize the model: serving, latency, monitoring.", resource: F.mlSd },
          { id: "rs-app-narrative", title: "Communication & influence", hint: "Explain findings to non-experts and defend tradeoffs.", resource: F.roleMLE },
        ],
      },
      {
        name: "Mock Loop",
        goal: "Survive the research loop intact.",
        question: "Run coding + theory + research design mocks back-to-back.",
        nodes: [
          { id: "rs-loop", title: "Mock loop", hint: "Coding, ML theory whiteboard, research design.", resource: F.mlSd },
          { id: "rs-fail", title: "Avoid default failures", hint: "Rote paper recall, no eval plan, metric-vs-impact confusion.", resource: F.roleMLE },
        ],
      },
    ],
  },
];