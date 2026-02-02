/**
 * LeetCode Database Client
 *
 * This module provides functions to query the LeetCode problems database.
 * It can work with either:
 * - Turso (remote) if TURSO_DATABASE_URL is set
 * - Local SQLite file as fallback
 */

import { createClient, type Client } from "@libsql/client";

let dbClient: Client | null = null;

export function getDbClient(): Client {
  if (!dbClient) {
    // Check for Turso credentials in environment
    const tursoUrl =
      import.meta.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
    const tursoToken =
      import.meta.env.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

    if (tursoUrl && tursoToken) {
      // Use Turso remote database
      dbClient = createClient({
        url: tursoUrl,
        authToken: tursoToken,
      });
    } else {
      // Use local file database
      dbClient = createClient({
        url: "file:./data/leetcode.db",
      });
    }
  }
  return dbClient;
}

export interface Problem {
  id: number;
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance?: string;
  frequency?: number;
}

export interface Company {
  id: number;
  name: string;
  displayName: string;
  totalProblems?: number;
  timeframes?: string[];
}

export interface CompanyProblems {
  company: Company;
  problems: Problem[];
  timeframe: string;
}

// Get all companies
export async function getAllCompanies(): Promise<Company[]> {
  const db = getDbClient();

  const result = await db.execute(`
    SELECT
      c.id,
      c.name,
      c.display_name as displayName,
      COUNT(DISTINCT cp.problem_id) as totalProblems
    FROM companies c
    LEFT JOIN company_problems cp ON c.id = cp.company_id
    GROUP BY c.id
    ORDER BY totalProblems DESC
  `);

  return result.rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    displayName: row.displayName as string,
    totalProblems: row.totalProblems as number,
  }));
}

// Get problems for a specific company and timeframe
export async function getCompanyProblems(
  companyName: string,
  timeframe: string = "alltime",
): Promise<CompanyProblems | null> {
  const db = getDbClient();

  // Get company info
  const companyResult = await db.execute({
    sql: `SELECT id, name, display_name as displayName FROM companies WHERE name = ?`,
    args: [companyName],
  });

  if (companyResult.rows.length === 0) {
    return null;
  }

  const company = companyResult.rows[0] as unknown as Company;

  // Get problems for this company and timeframe
  const problemsResult = await db.execute({
    sql: `
      SELECT
        p.id,
        p.title,
        p.url,
        p.difficulty,
        cp.acceptance,
        cp.frequency
      FROM problems p
      JOIN company_problems cp ON p.id = cp.problem_id
      JOIN companies c ON cp.company_id = c.id
      WHERE c.name = ? AND cp.timeframe = ?
      ORDER BY cp.frequency DESC
    `,
    args: [companyName, timeframe],
  });

  const problems: Problem[] = problemsResult.rows.map((row) => ({
    id: row.id as number,
    title: row.title as string,
    url: row.url as string,
    difficulty: row.difficulty as "Easy" | "Medium" | "Hard",
    acceptance: row.acceptance as string,
    frequency: row.frequency as number,
  }));

  return {
    company,
    problems,
    timeframe,
  };
}

// Get available timeframes for a company
export async function getCompanyTimeframes(
  companyName: string,
): Promise<string[]> {
  const db = getDbClient();

  const result = await db.execute({
    sql: `
      SELECT DISTINCT cp.timeframe
      FROM company_problems cp
      JOIN companies c ON cp.company_id = c.id
      WHERE c.name = ?
      ORDER BY
        CASE cp.timeframe
          WHEN '6months' THEN 1
          WHEN '1year' THEN 2
          WHEN '2year' THEN 3
          WHEN 'alltime' THEN 4
          ELSE 5
        END
    `,
    args: [companyName],
  });

  return result.rows.map((row) => row.timeframe as string);
}

// Search problems by title
export async function searchProblems(
  query: string,
  limit: number = 50,
): Promise<Problem[]> {
  const db = getDbClient();

  const result = await db.execute({
    sql: `
      SELECT DISTINCT id, title, url, difficulty
      FROM problems
      WHERE title LIKE ?
      ORDER BY title
      LIMIT ?
    `,
    args: [`%${query}%`, limit],
  });

  return result.rows.map((row) => ({
    id: row.id as number,
    title: row.title as string,
    url: row.url as string,
    difficulty: row.difficulty as "Easy" | "Medium" | "Hard",
  }));
}

// Get problem statistics
export async function getStats(): Promise<{
  totalCompanies: number;
  totalProblems: number;
  byDifficulty: Record<string, number>;
}> {
  const db = getDbClient();

  const companiesResult = await db.execute(
    `SELECT COUNT(*) as count FROM companies`,
  );
  const problemsResult = await db.execute(
    `SELECT COUNT(*) as count FROM problems`,
  );
  const difficultyResult = await db.execute(`
    SELECT difficulty, COUNT(*) as count
    FROM problems
    GROUP BY difficulty
  `);

  return {
    totalCompanies: companiesResult.rows[0]?.count as number,
    totalProblems: problemsResult.rows[0]?.count as number,
    byDifficulty: Object.fromEntries(
      difficultyResult.rows.map((row) => [
        row.difficulty as string,
        row.count as number,
      ]),
    ),
  };
}

// Get top FAANG companies
export async function getFAANGCompanies(): Promise<Company[]> {
  const db = getDbClient();

  const faangNames = [
    "google",
    "amazon",
    "apple",
    "meta",
    "facebook",
    "netflix",
    "microsoft",
  ];

  const result = await db.execute(`
    SELECT
      c.id,
      c.name,
      c.display_name as displayName,
      COUNT(DISTINCT cp.problem_id) as totalProblems
    FROM companies c
    LEFT JOIN company_problems cp ON c.id = cp.company_id
    WHERE c.name IN (${faangNames.map(() => "?").join(",")})
    GROUP BY c.id
    ORDER BY totalProblems DESC
  `);

  return result.rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    displayName: row.displayName as string,
    totalProblems: row.totalProblems as number,
  }));
}
