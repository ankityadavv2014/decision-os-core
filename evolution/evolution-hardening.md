# Evolution Hardening Protocol (Phase 7)

## Purpose

Stress-test long-term maintainability and prevent regression from learning-driven updates.

## Hardening Test Matrix

For every proposed canonical change, run:

1. **Schema Compatibility Test**
   - verify required fields unchanged unless MAJOR bump.

2. **Constraint Safety Regression Test**
   - verify legal/risk hard-block precedence remains intact.

3. **Readiness Drift Test**
   - compare threshold deltas against prior version and flag unsafe reductions.

4. **Graph Sequencing Regression Test**
   - ensure no new path enables high-irreversibility nodes without prerequisite safety nodes.

5. **Simulation Replay Test**
   - rerun latest synthetic profiles and compare outcome classes.

## Safe-Change Criteria

Change is admissible only if:

- no safety invariant regression
- no unresolved contradiction in impacted files
- changelog includes explicit impact and migration notes
- learning package meets admissibility standards

## Regression Guardrails

- Threshold reductions affecting legal/risk domains require corroborated second-source evidence.
- Any change increasing eligibility for `irreversibility_score >= 0.80` nodes requires explicit emotional stability justification.
- If simulation replay differs from previous cycle in a less conservative direction, require adjudication note before merge.

## Operational Policy

- Default merge posture for ambiguous safety impact: reject and request stronger evidence.
- Contradiction IDs must be immutable and referenced in changelog.
- Hardening failures are tracked as blocking items for the next cycle.
