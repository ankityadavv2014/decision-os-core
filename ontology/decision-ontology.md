# Decision Ontology

## Purpose

Define the canonical structure used to classify every decision node in Decision OS.

## Decision Types (Primary)

Every decision must map to exactly one primary `decision_type`:

- `learning`: increases capability, understanding, or validation without immediate operational commitment.
- `operational`: changes recurring process behavior, throughput, or service quality.
- `financial`: commits or reallocates capital, cash flow, leverage, or financial exposure.
- `legal`: creates, modifies, or terminates legal obligations, rights, liabilities, or compliance posture.
- `structural`: changes durable architecture, governance, ownership structure, or system topology.
- `identity-locking`: materially constrains future optionality through long-lived identity, reputation, brand, or role commitments.

## Domains

Every decision must map to one primary `domain`:

- `income`
- `ownership`
- `credit`
- `assets`
- `risk`
- `learning`
- `operations`

Secondary domain tags are allowed for context but do not replace the primary domain.

## Irreversibility Scale

`irreversibility_score` is continuous from `0.0` to `1.0`.

Rubric bands:
- `0.00 - 0.19`: readily reversible with low cost and low residual impact.
- `0.20 - 0.39`: reversible with moderate effort/time, limited residual effects.
- `0.40 - 0.59`: partially reversible, non-trivial sunk cost or friction.
- `0.60 - 0.79`: difficult to reverse, high switching cost or lasting external impact.
- `0.80 - 1.00`: effectively irreversible within planning horizon, high lock-in and material downside if wrong.

Scoring factors (weighted judgment, documented in node notes):
- unwind time required
- direct unwind cost
- residual legal/financial obligations after unwind
- reputational/identity carryover
- optionality lost

## Classification Rules

1. Determine primary intent of the decision (what reality state it changes).
2. Assign `decision_type` by dominant consequence if executed.
3. Assign `domain` by primary resource system affected.
4. Compute `irreversibility_score` before readiness gating.
5. Add secondary tags only when they affect constraints or thresholds.

Tie-breakers:
- If legal obligation changes, prefer `legal` over other types unless legal impact is incidental.
- If capital at risk is primary consequence, prefer `financial`.
- If optionality lock-in dominates long-term impact, prefer `identity-locking`.
- If no durable external commitment exists, prefer `learning`.

## Invariants

- No decision node exists without `decision_type`, `domain`, and `irreversibility_score`.
- A decision type cannot be inferred from user intent text alone; it must be inferred from expected state transition.
- Irreversibility score must be explicitly justified when `>= 0.60`.
