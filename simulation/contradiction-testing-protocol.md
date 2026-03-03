# Contradiction Testing Protocol (Phase 3)

## Purpose

Define deterministic simulation checks used to detect deadlocks, contradictory blockers, and unsafe unlock pathways.

## Test Inputs

- graph definition: `graph/canonical-decision-graph.md`
- node instances: `graph/universal-decision-nodes.yaml`
- synthetic states: `simulation/synthetic-profiles.yaml`
- core policies:
  - `constraints/constraint-model.md`
  - `readiness/readiness-framework.md`

## Required Tests

1. **Deadlock Check**
   - ensure each profile has at least one feasible `learning` or simulation path.
   - fail if all candidate nodes are `hard_block` with no remediation path.

2. **Contradiction Check**
   - fail when a node is both `execute-eligible` and `hard_block` under the same state.
   - fail when unlock edge requires a successor with stricter prerequisite that predecessor cannot satisfy.

3. **Unsafe Unlock Check**
   - fail when a predecessor with lower safety requirement unlocks a high-irreversibility node without legal/risk coverage.

4. **Oscillation Check**
   - run next-best selection repeatedly with identical input and shuffled candidate ordering.
   - fail when output `next_decision_id` changes across runs.

5. **Freshness Check**
   - fail when stale evidence is treated as `pass` due to missing node-level freshness override.

## Resolution Rules

- If contradiction involves legal/risk gating, enforce conservative outcome (`learn-only` or `hard_block`).
- If contradiction is due to missing data, downgrade to `simulation_only`, never promote to execute.
- Changes must target rules, thresholds, or sequencing; never rely on narrative exceptions.

## Required Output Format

- `test_id`
- `profile_id`
- `node_id`
- `outcome_before`
- `outcome_after`
- `contradiction_id` (if applicable)
- `rule_change_ref`
