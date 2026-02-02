#!/usr/bin/env bun
/**
 * Build LeetCode Database from CSV files
 *
 * This script:
 * 1. Reads all CSV files from the leetcode Question folder
 * 2. Creates a SQLite database (local file)
 * 3. Optionally pushes to Turso (if TURSO_URL and TURSO_AUTH_TOKEN are set)
 *
 * Usage:
 *   bun run scripts/build-leetcode-db.ts
 *
 * Environment Variables (for Turso):
 *   TURSO_DATABASE_URL - Your Turso database URL
 *   TURSO_AUTH_TOKEN - Your Turso auth token
 */

import { createClient } from "@libsql/client";
import { parse } from "csv-parse/sync";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { basename, join } from "path";

// Configuration
const CSV_DIR = join(import.meta.dir, "../../leetcode Question /");
const DB_DIR = join(import.meta.dir, "../data");
const LOCAL_DB_PATH = join(DB_DIR, "leetcode.db");
const JSON_OUTPUT_PATH = join(import.meta.dir, "../public/leetcode-data.json");

// Ensure data directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true });
}

// Create database client
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || `file:${LOCAL_DB_PATH}`,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

interface LeetCodeProblem {
  id: number;
  title: string;
  acceptance: string;
  difficulty: "Easy" | "Medium" | "Hard";
  frequency: number;
  url: string;
}

interface CompanyData {
  company: string;
  timeframe: string;
  problems: LeetCodeProblem[];
}

async function initDatabase() {
  console.log("🗄️  Initializing database schema...");

  // Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS problems (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      UNIQUE(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS company_problems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      problem_id INTEGER NOT NULL,
      timeframe TEXT NOT NULL,
      acceptance TEXT,
      frequency REAL,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (problem_id) REFERENCES problems(id),
      UNIQUE(company_id, problem_id, timeframe)
    )
  `);

  // Create indexes for faster queries
  await db.execute(
    `CREATE INDEX IF NOT EXISTS idx_company_problems_company ON company_problems(company_id)`,
  );
  await db.execute(
    `CREATE INDEX IF NOT EXISTS idx_company_problems_timeframe ON company_problems(timeframe)`,
  );
  await db.execute(
    `CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty)`,
  );

  console.log("✅ Database schema initialized");
}

function parseCompanyName(filename: string): {
  company: string;
  timeframe: string;
} {
  // filename format: company_timeframe.csv (e.g., amazon_1year.csv, google_6months.csv)
  const name = basename(filename, ".csv");
  const parts = name.split("_");
  const timeframe = parts.pop() || "alltime";
  const company = parts.join("_");

  return { company, timeframe };
}

function formatCompanyName(company: string): string {
  // Convert company slug to display name
  return company
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function processCSVFile(filepath: string): Promise<CompanyData | null> {
  const { company, timeframe } = parseCompanyName(filepath);

  try {
    const content = readFileSync(filepath, "utf-8");

    // Parse CSV (no header row based on the data format)
    const records = parse(content, {
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    });

    const problems: LeetCodeProblem[] = [];

    for (const record of records) {
      if (record.length >= 5) {
        const [id, title, acceptance, difficulty, frequency, url] = record;

        // Validate and clean data
        const problemId = parseInt(id, 10);
        if (isNaN(problemId)) continue;

        const cleanDifficulty = ["Easy", "Medium", "Hard"].includes(difficulty)
          ? (difficulty as "Easy" | "Medium" | "Hard")
          : "Medium";

        problems.push({
          id: problemId,
          title: title?.trim() || `Problem ${problemId}`,
          acceptance: acceptance?.trim() || "0%",
          difficulty: cleanDifficulty,
          frequency: parseFloat(frequency) || 0,
          url: url?.trim() || `https://leetcode.com/problems/${problemId}`,
        });
      }
    }

    return {
      company,
      timeframe,
      problems,
    };
  } catch (error) {
    console.error(`Error processing ${filepath}:`, error);
    return null;
  }
}

async function insertData(data: CompanyData) {
  const { company, timeframe, problems } = data;
  const displayName = formatCompanyName(company);

  // Insert company
  await db.execute({
    sql: `INSERT OR IGNORE INTO companies (name, display_name) VALUES (?, ?)`,
    args: [company, displayName],
  });

  // Get company ID
  const companyResult = await db.execute({
    sql: `SELECT id FROM companies WHERE name = ?`,
    args: [company],
  });
  const companyId = companyResult.rows[0]?.id as number;

  // Insert problems and company_problems
  for (const problem of problems) {
    // Insert problem
    await db.execute({
      sql: `INSERT OR IGNORE INTO problems (id, title, url, difficulty) VALUES (?, ?, ?, ?)`,
      args: [problem.id, problem.title, problem.url, problem.difficulty],
    });

    // Insert company_problem relationship
    await db.execute({
      sql: `INSERT OR REPLACE INTO company_problems (company_id, problem_id, timeframe, acceptance, frequency) VALUES (?, ?, ?, ?, ?)`,
      args: [
        companyId,
        problem.id,
        timeframe,
        problem.acceptance,
        problem.frequency,
      ],
    });
  }
}

async function generateJSON() {
  console.log("📄 Generating JSON data for frontend...");

  // Get all companies with problem counts
  const companies = await db.execute(`
    SELECT
      c.id,
      c.name,
      c.display_name,
      COUNT(DISTINCT cp.problem_id) as total_problems,
      GROUP_CONCAT(DISTINCT cp.timeframe) as timeframes
    FROM companies c
    LEFT JOIN company_problems cp ON c.id = cp.company_id
    GROUP BY c.id
    ORDER BY total_problems DESC
  `);

  // Get problem statistics
  const stats = await db.execute(`
    SELECT
      difficulty,
      COUNT(*) as count
    FROM problems
    GROUP BY difficulty
  `);

  // Get top companies (by total problems)
  const topCompanies = await db.execute(`
    SELECT
      c.name,
      c.display_name,
      COUNT(DISTINCT cp.problem_id) as problem_count
    FROM companies c
    JOIN company_problems cp ON c.id = cp.company_id
    GROUP BY c.id
    ORDER BY problem_count DESC
    LIMIT 50
  `);

  // Format JSON output
  const jsonData = {
    generatedAt: new Date().toISOString(),
    stats: {
      totalCompanies: companies.rows.length,
      totalProblems: (
        await db.execute(`SELECT COUNT(DISTINCT id) as count FROM problems`)
      ).rows[0]?.count,
      byDifficulty: Object.fromEntries(
        stats.rows.map((row) => [row.difficulty, row.count]),
      ),
    },
    companies: companies.rows.map((row) => ({
      id: row.id,
      name: row.name,
      displayName: row.display_name,
      totalProblems: row.total_problems,
      timeframes: (row.timeframes as string)?.split(",") || [],
    })),
    topCompanies: topCompanies.rows.map((row) => ({
      name: row.name,
      displayName: row.display_name,
      problemCount: row.problem_count,
    })),
  };

  writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(jsonData, null, 2));
  console.log(`✅ JSON data written to ${JSON_OUTPUT_PATH}`);
}

async function main() {
  console.log("🚀 Starting LeetCode Database Builder\n");

  // Check if CSV directory exists
  if (!existsSync(CSV_DIR)) {
    console.error(`❌ CSV directory not found: ${CSV_DIR}`);
    process.exit(1);
  }

  // Initialize database
  await initDatabase();

  // Get all CSV files
  const csvFiles = readdirSync(CSV_DIR).filter((f) => f.endsWith(".csv"));
  console.log(`📁 Found ${csvFiles.length} CSV files\n`);

  // Process each CSV file
  let processed = 0;
  let totalProblems = 0;

  for (const file of csvFiles) {
    const filepath = join(CSV_DIR, file);
    const data = await processCSVFile(filepath);

    if (data && data.problems.length > 0) {
      await insertData(data);
      totalProblems += data.problems.length;
      processed++;

      // Progress indicator
      if (processed % 50 === 0) {
        console.log(`  Processed ${processed}/${csvFiles.length} files...`);
      }
    }
  }

  console.log(
    `\n✅ Processed ${processed} files with ${totalProblems} problem entries`,
  );

  // Generate JSON for frontend
  await generateJSON();

  // Print summary
  const companiesCount = await db.execute(
    `SELECT COUNT(*) as count FROM companies`,
  );
  const problemsCount = await db.execute(
    `SELECT COUNT(*) as count FROM problems`,
  );

  console.log("\n📊 Database Summary:");
  console.log(`   Companies: ${companiesCount.rows[0]?.count}`);
  console.log(`   Unique Problems: ${problemsCount.rows[0]?.count}`);
  console.log(
    `   Database: ${process.env.TURSO_DATABASE_URL ? "Turso (remote)" : LOCAL_DB_PATH}`,
  );

  console.log("\n✨ Done!");
}

main().catch(console.error);
