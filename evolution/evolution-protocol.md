# Evolution Protocol

## Purpose

Define mandatory governance for changing Decision OS canonical artifacts.

## Change Types

- `add`: introduce a new decision node or canonical model element.
- `modify`: alter semantics, thresholds, or definitions of an existing element.
- `split`: replace one overloaded decision node with multiple specialized nodes.
- `deprecate`: retire a node or model element while preserving historical traceability.

## Workflow: Add a New Decision

1. Propose node using canonical schema.
2. Classify `decision_type`, `domain`, and `irreversibility_score` with rationale.
3. Define prerequisites, constraints, blockers, risks, and failure modes.
4. Run contradiction scan against existing ontology and readiness thresholds.
5. Add changelog entry and version bump according to impact class.

## Workflow: Modify Existing Decision

1. Open change proposal with explicit before/after semantics.
2. Mark affected fields and downstream unlock dependencies.
3. Attach evidence package from `learnings/learning-ingestion-spec.md`.
4. Validate no conflict with legal/risk invariants.
5. Record migration notes and changelog entry.

## Workflow: Split Decision

1. Identify overloaded node and split rationale.
2. Create successor nodes with unique `decision_id`s.
3. Re-map incoming prerequisites and outgoing unlocks.
4. Mark original node as deprecated with replacement map.
5. Add compatibility note for historical queries.

## Workflow: Deprecate Decision

1. Mark node status as deprecated (in future node metadata extension).
2. State reason: obsolete, unsafe, contradictory, or superseded.
3. Link replacement node(s) or terminal rationale.
4. Preserve historical records; never delete without archive protocol.
5. Document version impact in changelog.

## Learning-Driven Updates

Learned evidence can update:
- readiness thresholds
- constraint minimums
- blocker/simulation conditions
- risk and failure mode assumptions

Learned evidence cannot directly:
- bypass hard legal/risk invariants
- redefine ontology categories without ontology-change process
- change canonical required schema fields without major version bump

## Contradiction Resolution Protocol

1. **Detect**: identify inconsistent definitions, thresholds, or gates.
2. **Quarantine**: label affected artifacts as provisional.
3. **Adjudicate**: choose authoritative interpretation based on evidence quality and safety bias.
4. **Merge**: apply reconciled change set.
5. **Audit**: record contradiction ID, decision rationale, and impacted files in changelog.

When unresolved contradiction affects safety-critical gating, default outcome is `learn-only`.

## Versioning Strategy

Use semantic versions for canonical model:
- `MAJOR`: breaking ontology/schema changes (enum removals, required field changes, incompatible gate semantics).
- `MINOR`: additive, backward-compatible capabilities (new optional fields, new non-breaking node templates).
- `PATCH`: threshold tuning, clarifications, typo fixes, non-breaking docs.

Version bump must match `Change Class` in changelog.

## Governance Invariants

- Every canonical change must include a rationale and impact statement.
- No change merges without contradiction scan completion.
- Safety invariants (legal/risk hard blocks) are not optional.
- Agent outputs are advisory artifacts; maintainers own canonical decisions.
