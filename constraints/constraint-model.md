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
4. `time` vs `money` trade-off is allowed only if legal/risk/compliance minimums remain met.
5. `speed` vs `compliance` always resolves in favor of compliance.

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
