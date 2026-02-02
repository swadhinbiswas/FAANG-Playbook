import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");

// Map folders to URL slugs
const folderToSlug = {
  "00-Hiring-Pipeline": "hiring-pipeline",
  "00-START-HERE": "start-here",
  "01-FOUNDATIONS": "foundations",
  "02-ROLE-ROADMAPS": "role-roadmaps",
  "03-INTERVIEWS": "interviews",
  "04-SYSTEM-DESIGN-LIBRARY": "system-design",
  "05-ML-MLOPS": "ml-mlops",
  "05-Mock-Interviews": "mock-interviews",
  "06-DATA": "data",
  "06-Study-Plans": "study-plans",
  "07-INFRA-DEVOPS": "infra-devops",
  "08-CAREER": "career",
  "08-Company-Specific-Notes": "company-notes",
};

// Section display names
const sectionNames = {
  "hiring-pipeline": "Hiring Pipeline",
  "start-here": "Start Here",
  foundations: "Foundations",
  "role-roadmaps": "Role Roadmaps",
  interviews: "Interviews",
  "system-design": "System Design",
  "ml-mlops": "ML & MLOps",
  "mock-interviews": "Mock Interviews",
  data: "Data",
  "study-plans": "Study Plans",
  "infra-devops": "Infra & DevOps",
  career: "Career",
  "company-notes": "Company Notes",
};

// Extract title from markdown content
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

// Extract first paragraph as description
function extractDescription(content) {
  // Remove the title and get first meaningful paragraph
  const withoutTitle = content.replace(/^#\s+.+$/m, "").trim();
  const paragraphs = withoutTitle.split(/\n\n+/);

  for (const para of paragraphs) {
    const cleaned = para
      .replace(/^#+\s+.+$/gm, "") // Remove headers
      .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove link syntax
      .replace(/`[^`]+`/g, "") // Remove inline code
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
      .replace(/\*([^*]+)\*/g, "$1") // Remove italic
      .trim();

    if (cleaned.length > 30) {
      return cleaned.substring(0, 200) + (cleaned.length > 200 ? "..." : "");
    }
  }
  return "";
}

// Extract key topics/keywords from content
function extractKeywords(content) {
  const keywords = new Set();

  // Extract headers (h2, h3, h4)
  const headers = content.match(/^#{2,4}\s+(.+)$/gm) || [];
  headers.forEach((h) => {
    const text = h.replace(/^#+\s+/, "").toLowerCase();
    keywords.add(text);
  });

  // Extract bold text as keywords
  const bolds = content.match(/\*\*([^*]+)\*\*/g) || [];
  bolds.forEach((b) => {
    const text = b.replace(/\*\*/g, "").toLowerCase();
    if (text.length > 2 && text.length < 50) {
      keywords.add(text);
    }
  });

  return Array.from(keywords).slice(0, 10);
}

function generateSearchIndex() {
  const searchIndex = [];
  let id = 0;

  for (const [folder, slug] of Object.entries(folderToSlug)) {
    const folderPath = path.join(rootDir, folder);

    if (!fs.existsSync(folderPath)) {
      console.log(`Skipping missing folder: ${folder}`);
      continue;
    }

    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const fileSlug = file.replace(".md", "");

      // Generate title from filename if not found in content
      const contentTitle = extractTitle(content);
      const fallbackTitle = fileSlug.replace(/^\d+-/, "").replace(/-/g, " ");
      const title = contentTitle || fallbackTitle;

      const description = extractDescription(content);
      const keywords = extractKeywords(content);

      searchIndex.push({
        id: id++,
        title,
        section: sectionNames[slug] || slug,
        sectionSlug: slug,
        href: `/docs/${slug}/${fileSlug}`,
        description,
        keywords: keywords.join(" "),
        content: content.substring(0, 2000), // First 2000 chars for full-text search
      });
    }
  }

  // Write the search index
  const outputPath = path.join(__dirname, "../public/search-index.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

  console.log(`✓ Generated search index with ${searchIndex.length} documents`);
  return searchIndex;
}

generateSearchIndex();
