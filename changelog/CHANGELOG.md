# Changelog

All notable changes to Decision OS Core are documented in this file.

## Entry Template

Use this template for every update:

```md
## [version] - YYYY-MM-DD
### Added | Changed | Deprecated | Removed | Fixed
- Artifact: <path>
  - Change Class: <breaking-ontology | breaking-schema | threshold-tuning | non-breaking-doc>
  - Rationale: <why this was changed>
  - Impact: <what downstream users must adjust>
  - Migration Notes: <required actions if any>
  - Contradiction Link: <optional reference to adjudication record>
```

## [0.1.0] - 2026-03-02
### Added
- Artifact: `README.md`
  - Change Class: `non-breaking-doc`
  - Rationale: establish repository boundary and governance intent.
  - Impact: provides canonical orientation for all future artifacts.
  - Migration Notes: none.

- Artifact: `ontology/decision-ontology.md`
  - Change Class: `breaking-ontology`
  - Rationale: define canonical decision type and domain taxonomy.
  - Impact: all future decision nodes must classify against this taxonomy.
  - Migration Notes: create decision nodes using listed enums only.

- Artifact: `constraints/constraint-model.md`
  - Change Class: `threshold-tuning`
  - Rationale: define constraint state dynamics and conflict logic.
  - Impact: gating decisions must evaluate hard/soft/simulation outcomes.
  - Migration Notes: map decision prerequisites to required constraints.

- Artifact: `readiness/readiness-framework.md`
  - Change Class: `threshold-tuning`
  - Rationale: define multidimensional readiness and gate thresholds.
  - Impact: decision progression now depends on explicit readiness scores.
  - Migration Notes: include evidence packets for readiness dimensions.

- Artifact: `schemas/decision-node.schema.yaml`
  - Change Class: `breaking-schema`
  - Rationale: provide canonical machine-readable decision node contract.
  - Impact: producers must emit all required fields and validations.
  - Migration Notes: validate all nodes against this schema.

- Artifact: `schemas/decision-node-schema.md`
  - Change Class: `non-breaking-doc`
  - Rationale: provide human-readable normative schema and example.
  - Impact: improves implementation consistency.
  - Migration Notes: none.

- Artifact: `evolution/evolution-protocol.md`
  - Change Class: `breaking-ontology`
  - Rationale: define mandatory governance for all model evolution.
  - Impact: all future changes must follow protocol.
  - Migration Notes: apply workflow gates before merging updates.

- Artifact: `learnings/learning-ingestion-spec.md`
  - Change Class: `threshold-tuning`
  - Rationale: define evidence standards for learning-driven updates.
  - Impact: unsupported learnings cannot alter canonical thresholds.
  - Migration Notes: use required evidence structure for proposals.

- Artifact: `changelog/phase-1-audit.md`
  - Change Class: `non-breaking-doc`
  - Rationale: record initial cross-artifact consistency and contradiction scan.
  - Impact: provides auditable baseline for future deltas.
  - Migration Notes: rerun and append for each major phase.
