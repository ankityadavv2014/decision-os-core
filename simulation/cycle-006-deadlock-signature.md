# Cycle 006 Deadlock Signature Audit

## Purpose

Ensure null-prevention fallback does not mask true deadlocks through repeated learn-only fallback loops.

## Signature Definition

`deadlock_signature` is triggered when:
- fallback status is selected more than `fallback_max_triggers_in_projection` times in a 5-step projection window, and
- no out-of-loop improvable candidate is selected.

Threshold source:
- `progression/decision-repeatability-policy.yaml`
  - `fallback_max_triggers_in_projection: 2`
  - `deadlock_signature_action: escalate-constraint-pivot`

## Enforcement

When signature triggers:
1. classify state as design flaw (not intended pause).
2. force pivot to highest-severity unresolved improvable constraint class.
3. record escalation in projection output status (`learn-only-pivot-escalated`).

## Cycle 006 Result

- deadlock signature occurrences: 0
- null NBA occurrences: 0
- conclusion: fallback did not mask deadlocks in Cycle 006 projection run.
