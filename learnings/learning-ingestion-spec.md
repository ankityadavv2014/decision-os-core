# Learning Ingestion Spec

## Purpose

Define how observed outcomes become admissible evidence for updating constraints and readiness thresholds.

## Required Evidence Package

Any learning proposal must include:

- `learning_id`: unique identifier
- `observation_window`: start/end timestamps
- `source_type`: simulation, retrospective, controlled test, external regulation update
- `sample_size`: count and relevance notes
- `data_quality_score`: `0.0` to `1.0`
- `confidence_score`: `0.0` to `1.0`
- `affected_artifacts`: exact file paths and sections
- `proposed_change`: threshold/constraint delta
- `safety_impact`: expected risk profile shift
- `rollback_trigger`: condition that invalidates the update

Proposals missing any required field are rejected.

## Admissibility Rules

Minimum admissibility:
- `data_quality_score >= 0.65`
- `confidence_score >= 0.70`
- clear causal narrative, not correlation-only assertion
- reproducible or independently reviewable evidence

For legal or high-irreversibility (`>= 0.80`) impacts:
- `confidence_score >= 0.80`
- mandatory second-source corroboration

## Allowed Update Targets

Learned evidence may update:
- readiness thresholds
- constraint minimums and freshness limits
- blocker expressions
- simulation-only exit criteria
- risk and failure-mode parameters

Learned evidence may not update:
- decision type taxonomy
- domain taxonomy
- required canonical schema fields

These require ontology/schema governance and major-version process.

## Update Lifecycle

1. Submit learning package.
2. Validate admissibility.
3. Run contradiction scan on impacted artifacts.
4. Simulate impact against synthetic states (best, nominal, adverse).
5. Approve/reject with rationale.
6. Apply change + changelog entry + version bump.
7. Monitor rollback triggers.

## Contradictory Learnings

When learnings conflict:
- keep both records immutable
- mark conflict set with shared contradiction ID
- adjudicate using evidence quality, recency, and safety bias
- default to conservative thresholds until resolved

## Audit Record Template

```yaml
learning_id: ""
status: proposed
evidence:
  source_type: ""
  observation_window: ""
  sample_size: 0
  data_quality_score: 0.0
  confidence_score: 0.0
change_request:
  affected_artifacts: []
  proposed_change: ""
  safety_impact: ""
  rollback_trigger: ""
adjudication:
  contradiction_id: ""
  decision: pending
  rationale: ""
```
