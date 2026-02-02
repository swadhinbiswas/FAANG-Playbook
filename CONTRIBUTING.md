# Contributing to Tech Interview Roadmap

<p align="center">
  <img src="website/public/faang.png" alt="FAANG Job Roadmap" width="100" height="100">
</p>

Thank you for your interest in contributing! Your contributions help thousands of candidates prepare for interviews at any tech company — from FAANG to startups.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#-development-setup)
- [Contribution Guidelines](#-contribution-guidelines)
- [Pull Request Process](#-pull-request-process)
- [What We Need Most](#-what-we-need-most)

---

## 📜 Code of Conduct

- Be respectful and inclusive
- No discrimination, harassment, or exclusionary language
- Disagree on ideas, not people
- Assume good intent
- Celebrate effort, not just "brilliance"

---

## 🤝 How Can I Contribute?

### 1. 🐛 Report Issues

Found a bug or outdated information? [Open an issue](https://github.com/swadhinbiswas/FAANG-Playbook/issues/new) with:

- **Title:** Clear description of the issue
- **Description:** What you found and why it's a problem
- **Suggested Fix:** (Optional) How to resolve it

**Examples of issues to report:**

- Broken links
- Outdated company interview processes
- Factual errors
- Unclear explanations

### 2. 📝 Add Your Interview Experience

We want **authentic stories** from real candidates!

**Create a file:** `08-Company-Specific-Notes/EXPERIENCES/<company>-<role>-<date>.md`

**Example filename:** `google-backend-feb2026.md`

**Use this template:**

```markdown
# [Company] - [Role] - [Date]

**Contributor:** [Your name or "Anonymous"]
**Role Applied:** [e.g., "Backend Engineer (L4)"]
**Date Interviewed:** [Month/Year]
**Outcome:** [Hired / Rejected / Offer declined]

## Interview Loop

### Round 1: [Type] — [Duration]

- **Topic:** [What was asked]
- **Your approach:** [How you tackled it]
- **Result:** [Pass / Weak pass / Fail]

### Round 2: [Type] — [Duration]

[Same format...]

## What Surprised Me

- [Unexpected difficulty or insight]

## What I'd Do Differently

- [Lessons learned]

## Advice for Next Candidates

1. [Tip 1]
2. [Tip 2]
3. [Tip 3]
```

### 3. 📚 Improve Documentation

Help make our guides clearer and more actionable:

1. Fork the repository
2. Create a branch: `git checkout -b improve/dsa-roadmap`
3. Make your changes
4. Submit a Pull Request

**What we look for:**

- ✅ Accuracy (cite sources or your experience)
- ✅ Clarity (can a junior understand this?)
- ✅ Actionable advice (not vague tips)
- ✅ Real examples and templates

### 4. 🏢 Add Company-Specific Content

Have experience with a company not yet covered?

**Create:** `08-Company-Specific-Notes/<company>-specific.md`

**Include:**

- Company's hiring philosophy
- Typical interview loop structure
- Common question patterns
- What they value (throughput vs quality? etc.)
- Salary/leveling typical ranges
- Time-to-decision benchmarks

### 5. 💻 Contribute to the Website

The website is built with [Astro](https://astro.build/). See [Development Setup](#-development-setup) below.

**Ways to contribute:**

- Fix bugs or styling issues
- Add new features
- Improve accessibility
- Optimize performance

### 6. 📊 Add LeetCode Data

Have company-tagged LeetCode problems to add?

1. Create a CSV file in `leetcode Question/` folder
2. Format: `id,title,acceptance,difficulty,frequency,url`
3. Run the database builder script

---

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) (recommended)
- Git
- A code editor (VS Code recommended)

### Setup Steps

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/FAANG-Playbook.git
cd FAANG-Playbook

# 3. Add upstream remote
git remote add upstream https://github.com/swadhinbiswas/FAANG-Playbook.git

# 4. Navigate to website directory
cd website

# 5. Install dependencies
bun install   # or npm install

# 6. Start development server
bun run dev   # or npm run dev

# 7. Open http://localhost:4321
```

### Project Structure

```
website/
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Markdown documentation
│   │   └── docs/       # All guide content
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utilities and helpers
│   ├── pages/          # Route pages
│   │   ├── docs/       # Documentation routes
│   │   └── leetcode/   # LeetCode section
│   └── styles/         # Global CSS
├── public/             # Static assets
├── scripts/            # Build scripts
└── astro.config.mjs    # Astro configuration
```

### Useful Commands

```bash
# Development
bun run dev          # Start dev server
bun run build        # Build for production
bun run preview      # Preview production build

# Database (LeetCode)
bun run scripts/build-leetcode-db.ts  # Rebuild LeetCode database
```

---

## 📝 Contribution Guidelines

### Writing Style

- **Be direct:** No marketing fluff. Assume the reader is preparing for a real interview.
- **Use evidence:** Cite sources, real quotes, or your experience.
- **Be specific:**
  - ❌ "Interviewers value clarity"
  - ✅ "Interviewers dock points if you code for 10 minutes before explaining your approach"
- **Use examples:** Templates, checklists, and real code are 10× more useful than bullet points.

### Content Standards

| ❌ Don't                                  | ✅ Do                         |
| ----------------------------------------- | ----------------------------- |
| Copy official company pages word-for-word | Synthesize in your own words  |
| Include proprietary interview questions   | Share patterns and principles |
| Make claims without backing               | Link to official sources      |
| Write AI-generated fluff                  | Provide actionable advice     |

### Formatting

- Use Markdown (.md) files
- Organize with headers (`## H2`, `### H3`)
- Keep paragraphs short
- Use tables and bullet lists
- Use relative paths for internal links: `[DSA Roadmap](../01-Foundations/01-DSA-and-Coding.md)`

### Commit Messages

Follow conventional commits:

```
feat: add Google L5 interview experience
fix: broken link in system design guide
docs: improve behavioral interview examples
style: format code blocks consistently
```

---

## 🔄 Pull Request Process

### 1. Before Submitting

- [ ] Test your changes locally
- [ ] Check for broken links
- [ ] Run the build: `bun run build`
- [ ] Update any affected documentation

### 2. Creating the PR

1. Push your branch to your fork
2. Open a Pull Request against `main`
3. Fill out the PR template:
   - **Title:** Clear, specific description
   - **Description:** What and why
   - **Screenshots:** If applicable

### 3. Review Process

1. Maintainers will review within 1 week
2. Address any requested changes
3. Once approved, your PR will be merged
4. You'll be credited as a contributor!

---

## 🎯 What We Need Most

**Priority contributions (in order):**

1. **📝 Real interview experiences** — Your actual interview transcript, what went well/poorly
2. **🏢 Company-specific hiring loops** — Detailed, recent experiences at FAANG companies
3. **🏗️ System design examples** — Deep dive solutions with diagrams
4. **👥 Role-specific guides** — Frontend, Platform, Mobile, etc.
5. **💰 Salary/leveling data** — Anonymized offer data
6. **❌ Failure case studies** — "I failed because..." + lessons learned

---

## ❓ Questions?

- Open a [GitHub Discussion](https://github.com/swadhinbiswas/FAANG-Playbook/discussions)
- Create an [Issue](https://github.com/swadhinbiswas/FAANG-Playbook/issues)

---

<p align="center">
  <strong>Thank you for making this roadmap better for everyone! 🎯</strong>
</p>
