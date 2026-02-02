# SQL Patterns (High Frequency)

This page is about patterns, not syntax.

## Pattern 1: Deduplicate latest row

Approach:

- define partition key
- order by timestamp
- pick row_number = 1

## Pattern 2: Funnel conversion

Approach:

- define steps
- join events per user/session
- compute drop-off

## Pattern 3: Cohort retention

Approach:

- cohort by first event date
- compute retention by week/month

## Mistakes to avoid

- accidental row multiplication
- filtering too early (before dedupe)
- wrong grain
