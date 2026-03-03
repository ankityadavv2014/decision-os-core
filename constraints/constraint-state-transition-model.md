# Constraint State Transition Model (Cycle 004)

## Purpose

Formally define safe state transitions for constraint updates during decision evaluation.

## State Variables

For each canonical constraint category:

- `current_level` in `[0.0, 1.0]`
- `required_level` in `[0.0, 1.0]`
- `trend` in `{improving, stable, degrading}`
- `evidence_age_days` in `[0, +inf)`
- `confidence` in `[0.0, 1.0]`

## Transition Equations

Given category `c` at time `t`:

- `current_level_t+1 = clamp01(current_level_t + replenish_delta_t - consume_delta_t - compound_penalty_t)`
- `confidence_t+1 = clamp01(confidence_t + evidence_gain_t - staleness_penalty_t)`
- `evidence_age_days_t+1 = 0` when refreshed evidence arrives; otherwise `evidence_age_days_t + delta_days`

Where:
- all deltas are non-negative
- `clamp01(x) = min(1.0, max(0.0, x))`

## Category Semantics

- consumed-dominant: `time`, `money`, `cognitive_load`
- replenishable: `money`, `knowledge`, `cognitive_load`, `emotional_maturity`
- compound-risk dominant: `risk`, `legal_exposure`, `cognitive_load`, `emotional_maturity`

## Safety Invariants

- no category may transition below `0.0` or above `1.0`.
- no category may be undefined during candidate evaluation.
- stale evidence applies downgrade before threshold comparison.
- unresolved hard-block categories remain blocking regardless of other category improvements.

## Deterministic Evaluation Coupling

This transition model feeds the deterministic evaluation order in `constraints/constraint-model.md`.
Transition updates are applied first; classification (`hard_block`/`simulation_only`/`soft_block`/`pass`) is applied second.
