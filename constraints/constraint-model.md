# Constraint Model

## Purpose

Define the finite constraints that govern if a decision can progress safely.

## Constraint Categories

- `time`
- `money`
- `knowledge`
- `risk`
- `legal_exposure`
- `cognitive_load`
- `emotional_maturity`

Each decision node specifies `constraints_required` with minimum levels and evidence quality.

Category uniqueness rule:
- Each category is canonical and appears exactly once in evaluator state.
- Domain overlays may adjust thresholds but may not duplicate or rename canonical categories.

## Constraint State Mechanics

Each constraint follows one or more state dynamics:

- **Consumed**: depleted by effort or commitments.
  - Examples: time, money, cognitive load.
- **Replenished**: recoverable through rest, inflow, learning, or de-risking.
  - Examples: money (income), knowledge (study), cognitive load (recovery), emotional maturity (stabilization time).
- **Compounded**: effects increase non-linearly when neglected or stacked.
  - Examples: risk debt, legal exposure, cognitive overload, emotional volatility.

## Canonical Constraint State Fields

For each category, maintain:
- `current_level` (`0.0` to `1.0`)
- `required_level` (`0.0` to `1.0`)
- `trend` (`improving`, `stable`, `degrading`)
- `evidence_age_days` (integer)
- `confidence` (`0.0` to `1.0`)

## Default Evidence Freshness Windows

Unless a decision node sets `constraints_required[].evidence_freshness_days_max`, apply these canonical defaults:

- `time`: 14 days
- `money`: 30 days
- `knowledge`: 45 days
- `risk`: 14 days
- `legal_exposure`: 7 days
- `cognitive_load`: 7 days
- `emotional_maturity`: 7 days

If a node-level freshness limit is defined, the stricter (smaller) value prevails.

## Evaluation Outcomes

Constraint evaluation produces one of:
- `pass`: required level met with acceptable confidence and evidence recency.
- `soft_block`: near threshold or low confidence; learning/simulation can continue.
- `hard_block`: below non-negotiable threshold or legal/risk stop condition triggered.
- `simulation_only`: execution disallowed, simulation/learning allowed.

## Conflict Logic

When constraints compete, apply deterministic precedence:

1. `legal_exposure` hard blocks override all speed/cost preferences.
2. `risk` hard blocks override economic upside and timeline pressure.
3. `emotional_maturity` hard block overrides identity-locking and irreversible decisions.
4. unresolved `risk` policy caps (for capital allocation/liability decisions) override money/time acceleration preferences.
5. `time` vs `money` trade-off is allowed only if legal/risk/compliance minimums remain met.
6. `speed` vs `compliance` always resolves in favor of compliance.

## Conflict Resolution Matrix (Canonical)

- `money` shortage + `time` abundance -> permit slower path if risk/legal remain green.
- `time` shortage + `money` abundance -> permit paid acceleration only when compliance controls are not reduced.
- `knowledge` shortage + high urgency -> force `simulation_only` until evidence threshold is met.
- `cognitive_load` high + high irreversibility -> hard block execution until load normalizes.
- `emotional_maturity` low + identity-locking decision -> hard block regardless of other scores.

## Constraint Invariants

- Hard block constraints cannot be overridden by operator preference.
- Simulation-only constraints can be bypassed only by improving evidence-backed levels, not by argument.
- Constraint confidence below `0.60` downgrades `pass` to `soft_block`.
- Evidence older than domain-defined freshness windows downgrades outcome one level.
- Missing freshness override in a node must not disable freshness checks; canonical defaults still apply.

## Formal Evaluation Order (Deterministic)

Evaluate constraints in this fixed order for every candidate decision:

1. hydrate canonical categories (single instance each).
2. apply freshness downgrade checks using stricter-of(node, canonical-default).
3. apply confidence downgrade checks.
4. evaluate category thresholds in precedence order:
   - `legal_exposure`
   - `risk`
   - `emotional_maturity` (only for identity-locking or `irreversibility_score >= 0.80`)
   - `money`
   - `time`
   - `knowledge`
   - `cognitive_load`
5. collapse category outcomes into one of: `hard_block`, `simulation_only`, `soft_block`, `pass`.

Resolution is fail-closed:
- when multiple outcomes apply, choose most conservative (`hard_block` > `simulation_only` > `soft_block` > `pass`).
