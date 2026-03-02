# Execution Bridge Specification (Phase 5)

## Purpose

Define how `execute-eligible` decisions are handed off to external execution platforms without embedding execution automation in Decision OS Core.

## Non-Goals

- no direct platform integrations
- no API automation
- no action orchestration

## Handoff Payload Contract

For each `execute-eligible` decision, export:

- `decision_id`
- `decision_type`
- `domain`
- `eligibility_status`
- `constraint_snapshot_ref`
- `readiness_snapshot_ref`
- `risk_summary`
- `failure_mode_summary`
- `blocking_conditions_remaining` (must be empty for execute-eligible)
- `simulation_only_conditions` (for monitoring)
- `expiry_timestamp` for eligibility validity

## Platform Expectations

External systems consuming handoff payloads must:

- verify payload integrity and timestamp freshness
- confirm no legal/risk hard block exists at action time
- record external execution outcome back as evidence for learning ingestion
- reject payloads beyond expiry timestamp

## Non-Binding Execution Checklist

1. confirm decision status remains `execute-eligible` at handoff time
2. confirm no stale evidence since eligibility determination
3. confirm failure mode mitigations are acknowledged by operator
4. record completion/abort with reason code
5. send outcome artifact for learning review

## Failure Modes

- **stale-handoff**: eligibility expired before use
- **state-drift**: constraints changed after decision selection
- **mitigation-skipped**: execution occurred without declared mitigations
- **untracked-outcome**: action completed but no evidence returned

## Bridge Invariants

- Decision OS Core does not own execution.
- Execution systems cannot reinterpret hard-block logic.
- Missing outcome evidence downgrades future related decisions to at most `learn-only`.
