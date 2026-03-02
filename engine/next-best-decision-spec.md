# Next Best Decision Engine Spec (Phase 4)

## Purpose

Define deterministic logic to select one next best decision node.
This engine returns decision intelligence only (`learn-only` vs `execute-eligible`), never execution instructions.

## Inputs

- candidate nodes from canonical graph
- current constraint state snapshot
- readiness dimension scores with evidence/confidence
- node prerequisites and blocker conditions

## Eligibility Pipeline

Evaluate each candidate node in strict order:

1. prerequisite satisfaction check
2. hard-block evaluation from `blocked_when`
3. constraint confidence/freshness checks
4. readiness thresholds from `readiness/readiness-framework.md`
5. irreversibility uplift checks

Status outcomes per node:
- `ineligible-hard-block`
- `eligible-learn-only`
- `eligible-execute`

## Priority Function

For nodes not hard-blocked, compute:

`priority_score = (safety_gain * 0.35) + (unlock_value * 0.30) + (readiness_proximity * 0.20) + (reversibility_advantage * 0.15)`

Where:
- `safety_gain`: expected reduction in legal/risk exposure if resolved
- `unlock_value`: number and criticality of downstream nodes unlocked
- `readiness_proximity`: closeness to meeting execution thresholds
- `reversibility_advantage`: lower irreversibility preferred when safety-equivalent

## Deterministic Tie-Breakers

1. Prefer nodes that reduce `legal_exposure` hard-block first.
2. Then prefer nodes that reduce `risk` hard-block.
3. Then prefer lower `irreversibility_score`.
4. Then prefer older evidence refresh requirement.
5. Final tie-break: lexicographic `decision_id`.

## Mandatory Precedence Rules

These rules prevent unsafe unlock behavior:

- `approve-risk-cap-policy` must be `eligible-execute` before `authorize-capital-allocation-envelope` can be selected as next best.
- no `identity-locking` node may be selected while any unresolved legal hard block exists.
- no node with `irreversibility_score >= 0.80` may be selected when `emotional_stability < 0.72` or confidence `< 0.75`.

## Output Contract

Engine returns:

- `next_decision_id`
- `status` (`learn-only` or `execute-eligible`)
- `blocking_reasons` (if learn-only)
- `evidence_gaps`
- `rule_refs` (which constraints/readiness rules were applied)

## Invariants

- Engine never outputs more than one next decision per cycle.
- Engine never upgrades a hard-blocked decision to learn-only by preference.
- Missing evidence cannot increase eligibility status.
