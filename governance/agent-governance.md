# Agent Governance Protocol (Phase 6)

## Purpose

Define internal agent roles, authority boundaries, and safety controls.

## Canonical Rule

Agents are advisory workers only.
Ontology, constraints, and readiness artifacts remain authoritative over any agent output.

## Allowed Agent Roles

- `schema-auditor`: validates schema and doc consistency
- `contradiction-scanner`: identifies conflicting rules or unlock paths
- `simulation-runner`: executes synthetic profile evaluations
- `evidence-curator`: validates learning package admissibility

## Disallowed Agent Actions

- create or modify ontology categories without protocol
- bypass hard constraints or readiness gates
- upgrade `learn-only` to `execute-eligible` without rule satisfaction
- introduce new decision classes outside canonical taxonomy
- rewrite historical changelog or learning records

## Required Agent Output Envelope

Every run must include:

- `run_id`
- `agent_role`
- `evidence_refs`
- `findings`
- `contradictions_found`
- `proposed_diff_scope`
- `confidence`

## Enforcement Controls

- Any proposal conflicting with `legal_exposure`/`risk` hard-block invariants is auto-rejected.
- Any proposal missing evidence references is non-admissible.
- Any proposal altering required schema fields requires major-version governance path.

## Escalation Rules

- unresolved contradiction -> quarantine affected artifact, default affected nodes to `learn-only`
- repeated contradiction from same rule area -> mandatory evolution hardening test entry

## Invariants

- Agents report findings, not final canonical decisions.
- Maintainers approve canonical changes through evolution protocol.
- Safety bias dominates performance bias during adjudication.
