# LLM Applications and Evaluation (Interview Notes)

LLM/GenAI interviews often focus on evaluation, cost, latency, and safety—not on prompt poetry.

## Common system types

- Chat assistant with tools
- Retrieval-augmented generation (RAG)
- Classification / routing
- Summarization

## What to define early

- user goal and failure impact
- latency and cost constraints
- acceptable hallucination risk

## Evaluation playbook

- Create a representative evaluation set.
- Define metrics (task success, factuality, latency, cost).
- Add human review for high-risk slices.
- Monitor regressions across model versions.

## Failure modes

- no evaluation plan (only anecdotes)
- ignoring cost and tail latency
- no safety/abuse considerations
