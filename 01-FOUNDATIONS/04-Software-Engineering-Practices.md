# Software Engineering Practices (That Interviewers Notice)

Strong candidates write code that is correct _and_ maintainable under change.

## Practices that transfer to interviews

- Name things clearly
- Keep functions small with single responsibility
- Validate inputs and handle errors explicitly
- Write small tests / examples for edge cases

## Testing mindset

In interviews, you usually can’t write full test suites, but you can show the mindset:

- boundary cases
- invariants
- “what could go wrong in production?”

## Debugging approach

1. Reproduce with smallest case
2. Form a hypothesis
3. Add one probe/log/print to confirm or refute
4. Fix + prevent (guardrail)

## Common failure modes

- Overengineering (patterns before problems)
- No error handling (happy path only)
- Inconsistent naming and messy control flow
