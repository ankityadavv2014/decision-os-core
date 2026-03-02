# Learning Record: Cycle 001 Phase 1 Hardening

## Cycle Metadata

- `learning_id`: `cycle-001-freshness-hardening`
- `observation_window`: `2026-03-02T00:00:00Z/2026-03-02T23:59:59Z`
- `source_type`: `retrospective`
- `affected_artifacts`:
  - `constraints/constraint-model.md`
  - `schemas/decision-node-schema.md`
  - `schemas/decision-node.schema.yaml`

## What Assumptions Changed

- Previous assumption: freshness windows would be "domain-defined" externally.
- New rule: canonical default freshness windows are defined in-core and always enforced unless a stricter node-level override exists.

## What Failed or Was Weak

- Freshness behavior was under-specified for nodes that omit `evidence_freshness_days_max`.
- Different downstream implementations could have silently diverged on stale-evidence handling.

## What Strengthened the Model

- Added explicit per-category freshness defaults.
- Added deterministic precedence rule (stricter value wins).
- Added invariant that missing node override cannot disable freshness checks.

## Rule-Level Outcome

- Freshness now behaves as a mandatory safety rule rather than an implementation detail.
