# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-02-02

### 🎉 Major Release: Complete Website & LeetCode Integration

#### Added

**Website & Infrastructure**

- 🌐 Full Astro-powered website at [roadmap.swadhin.cv](https://roadmap.swadhin.cv)
- 🎨 Beautiful Catppuccin dark theme with TUI aesthetics
- 📱 Mobile-responsive design with full accessibility
- 🔍 Full-text search across 85+ documentation pages using Fuse.js
- ⚡ Static site generation with 286 pages built in 1.22s

**LeetCode Problem Database**

- 💾 Turso/libSQL database integration for persistent storage
- 📊 1,400+ unique problems from 535 CSV files
- 🏢 200+ companies with their specific problem patterns
- 📈 Difficulty distribution (Easy, Medium, Hard)
- 📅 Frequency data showing recent ask patterns
- ⏱️ Timeframe analysis (6mo, 1yr, 2yr, all-time)
- ✅ Problem progress tracking with localStorage persistence

**Navigation & Features**

- 🗂️ Dynamic [company].astro pages for all 200 companies
- 🎯 Company filtering (FAANG, Finance, Startups, etc.)
- 🧮 Statistics dashboard (problems by difficulty, company breakdown)
- 🔗 Direct links to LeetCode problems
- 📌 Bookmark/favorite functionality with progress saving

**Icons & Design**

- 🎨 NerdFont icons for 100+ companies (Google, Amazon, Apple, Microsoft, etc.)
- 🏪 Category-based icon fallbacks (Finance, Tech, Gaming, etc.)
- 📦 Generated PWA icons (16x16, 32x32, 192x192, 512x512)
- 🍎 Apple touch icon and favicon support

**Developer Experience**

- 📚 Comprehensive CONTRIBUTING.md with setup instructions
- 🛠️ Development environment setup guide
- 📝 Pull request process documentation
- 🎯 Contribution guidelines and standards
- 💡 Template for adding interview experiences

**Content & Documentation**

- 📖 Complete README redesigned for all companies (not just FAANG)
- 🔗 Links to 85+ detailed guides and study materials
- 📊 Repository statistics and metrics
- 🤝 Clear contributing guidelines
- 📄 Project structure documentation

**SEO & Metadata**

- 📡 Dynamic sitemap generation with proper URL structure
- 🤖 robots.txt configuration for search engines
- 📋 Web manifest for PWA support
- 🏷️ OpenGraph meta tags and OG images
- 🔎 Search engine optimization across all pages

#### Changed

- 🔄 Domain updated to roadmap.swadhin.cv (from faang-roadmap.dev)
- 📝 Repository repositioned to reflect all companies, not just FAANG
- 🎯 Focus expanded from FAANG-only to 200+ tech companies
- 💬 Title changed from "FAANG Job Roadmap" to "Tech Interview Roadmap"
- 🏗️ Architecture refactored for better scalability and performance

#### Technical Details

**Dependencies Added:**

- `@libsql/client` v0.17.0 — SQLite database client
- `csv-parse` v6.1.0 — CSV file parsing
- `@webtui/plugin-nf` — NerdFont icon support
- `fuse.js` — Full-text search library

**Build Improvements:**

- 🚀 Production build: 286 pages generated
- ⚙️ Optimized CSS minification
- 📦 Inline stylesheets for better performance
- 🗜️ HTML compression enabled
- 📊 Database indices on company and problem lookups

**Files Generated:**

- `dist/leetcode-data.json` — Pre-built company & problem data
- `dist/search-index.json` — Fuse.js search index
- `dist/sitemap-index.xml` — SEO sitemap index
- `dist/sitemap-0.xml` — Main URL sitemap

---

## [1.5.0] - 2026-01-15

### Added

**Study Resources**

- 📚 Junior 3-Month Study Plan (15 hrs/week)
- 📚 Mid-Level 6-Month Study Plan (15 hrs/week)
- 📚 Senior 4-Month Study Plan (12 hrs/week)
- 🎯 Weekly topic breakdowns for each level
- 📊 Checkpoint and success metrics

**DSA & Algorithms**

- 6️⃣ Core DSA patterns documentation
- 📋 30+ problem patterns with solutions
- 🔗 Links to LeetCode problems for practice
- 📈 Difficulty progression guidance

**Company Playbooks**

- 🏢 Detailed interview loops for 200+ companies
- 💡 What each company values in candidates
- 🎯 Company-specific red flags and green flags
- 📊 Leveling and compensation information
- ⏰ Typical time-to-decision benchmarks

---

## [1.0.0] - 2026-01-01

### Added

**Core Documentation**

- 📖 85+ comprehensive interview prep guides
- 🎯 Role-specific roadmaps (SWE, Backend, ML, Data, DevOps)
- 🏗️ System design library with templates
- 🗣️ Behavioral interview playbook
- 💻 Coding interview playbook with patterns

**Interview Content**

- 📝 Recruiter screen playbook
- 🎤 System design interview framework
- 🤖 ML system design interviews
- 📊 SQL and data interviews
- 💼 Behavioral interview guide
- 🚪 Interview day operations
- 🏠 Take-home and project interviews

**Career & Learning**

- 📚 Foundations curriculum (DSA, Systems, Databases)
- 🛠️ Software engineering best practices
- ☁️ Cloud and reliability basics
- 🚀 Career development guides
- 📋 Resume and LinkedIn optimization
- 💰 Offer negotiation strategies
- 🚗 Rejection handling and iteration

**Infrastructure & DevOps**

- 🐳 Docker and containerization guide
- ☸️ Kubernetes basics
- 🔄 CI/CD and safe rollouts
- 🚨 Incident response procedures
- 📊 Observability and monitoring
- 🖥️ Linux and networking fundamentals

**ML & Data Specialization**

- 🤖 ML fundamentals for interviews
- 🔧 Feature engineering and data leakage
- 📊 ML system design templates
- ⚖️ ML testing and test scores
- 📡 Monitoring and drift detection
- 🎯 LLM applications and evaluation
- 💾 Data pipelines and orchestration
- 🔍 Data quality frameworks

**Hiring Pipeline**

- 📋 ATS and shortlisting strategies
- 🎯 Recruiter screen best practices
- 🧪 Online assessment protocols
- 📞 Phone screen playbook
- 🏢 Onsite loop framework
- 📊 Debrief and decision processes
- 💼 Offer and closing strategies

---

## [0.1.0] - 2025-12-01

### Initial Release

- 📁 Repository structure with 140+ markdown files
- 📖 Basic documentation framework
- 🎯 Initial content organization
- 🔗 Internal linking between guides
- 📚 Foundation documentation in place

---

## 🚀 Roadmap & Future Plans

### Planned for v2.1.0

- [ ] Video tutorials for system design problems
- [ ] Interactive coding editor integration with LeetCode API
- [ ] Mock interview scheduling system with peer matching
- [ ] Community discussion forums by company/topic
- [ ] Real-time problem analytics and trending

### Planned for v2.2.0

- [ ] Multi-language support (Spanish, Mandarin, Hindi)
- [ ] Dark/Light theme toggle (currently dark-only)
- [ ] Export study plans as PDF with progress tracking
- [ ] AI-powered problem recommendations based on progress
- [ ] Company salary negotiation calculator

### Planned for v3.0.0

- [ ] Live interview simulation platform
- [ ] Peer feedback and code review system
- [ ] Advanced progress analytics dashboard
- [ ] Resume optimization with AI suggestions
- [ ] Behavioral interview video practice with feedback

### Planned for v4.0.0

- [ ] Mobile app (iOS/Android)
- [ ] Real-time collaboration on mock interviews
- [ ] AI-powered interview prep coach
- [ ] Job board integration
- [ ] Referral tracking and networking tools

---

## 📊 Statistics

**Current Content:**

- 📖 85+ comprehensive guides
- 💻 1,400+ unique LeetCode problems
- 🏢 200+ companies covered
- 🎯 7 specialized roles
- 📚 3 study plans (Junior/Mid/Senior)
- 🔗 Thousands of internal links

**Website Performance:**

- ⚡ 286 pages generated
- 🚀 Build time: ~1.2 seconds
- 📱 100% mobile responsive
- 🔍 Full-text search capability
- 🎨 Dark mode optimized

---

## 🙏 Contributors

Made with ❤️ by:

- **Swadhin Biswas** [@swadhinbiswas](https://github.com/swadhinbiswas)
- And amazing community contributors!

See [CONTRIBUTING.md](CONTRIBUTING.md) to join us!

---

## 📞 Support

- 🐛 [Report a Bug](https://github.com/swadhinbiswas/FAANG-Playbook/issues)
- 💡 [Request a Feature](https://github.com/swadhinbiswas/FAANG-Playbook/issues)
- 💬 [Start a Discussion](https://github.com/swadhinbiswas/FAANG-Playbook/discussions)
- 🌐 Visit [roadmap.swadhin.cv](https://roadmap.swadhin.cv)

---

**Last Updated:** February 2, 2026
