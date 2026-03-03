# Simulation Results: Cycle 003 Deep Edge Profiles

Date: 2026-03-02
Protocol: `simulation/contradiction-testing-protocol.md`

## Expanded Profiles Used

- `student-low-buffer-high-urgency`
- `employee-stable-income-medium-readiness`
- `founder-high-variance-high-load`
- `low-risk-low-income`
- `high-income-zero-knowledge`
- `high-knowledge-zero-time`
- `high-risk-tolerance-no-capital`
- `mid-career-high-liabilities`

## Observations

### Deadlocks

- In materialized-node subset (3 nodes), 5/8 profiles evaluated as hard-blocked for all currently materialized irreversible nodes.
- This is not a graph-level deadlock because lower-irreversibility learning/operational nodes exist in graph but were not yet materialized during this check.

### Oscillating NBA Outputs

- None detected under deterministic hierarchy in `engine/next-best-decision-spec.md`.
- Selection order is stable across repeated evaluations because weighted heuristics were removed.

### Unsafe Unlocks

- `C-002-UNSAFE-UNLOCK-RISK-CAP` no longer reproduces after precedence hardening.
- Residual caution: prerequisite-gating must be enforced at evaluator runtime, not inferred from constraints alone.

## Outcome

- Deep profile stress did not reveal new contradiction IDs beyond resolved `C-002`.
- Main remaining risk is partial materialization coverage, addressed in Step 14 expansion replay.
