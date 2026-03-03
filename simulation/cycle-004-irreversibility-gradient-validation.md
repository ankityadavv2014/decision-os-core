# Cycle 004 Irreversibility Gradient Validation

Date: 2026-03-02
Scope: `readiness/readiness-framework.md`

## Validation Goals

- high-irreversibility nodes require multi-dimensional readiness.
- low-irreversibility nodes avoid excessive readiness burden.

## Adjustments Applied

- Added gradient guardrails:
  - for `irreversibility_score >= 0.75`:
    - `compliance_capacity >= 0.72`
    - `risk_tolerance >= 0.70`
    - `knowledge_readiness >= 0.65`
    - at least 5/6 dimensions meet `(min_dimension_floor + 0.03)`
- Added low-irreversibility relaxation:
  - learning nodes `<= 0.40`: floor `0.28`, weighted min `0.42`
  - operational nodes `<= 0.40`: floor `0.45`, weighted min `0.58`
- Added explicit gating step to apply gradient checks after decision-type thresholds.

## Outcome

- high-lock decisions now require broad readiness coverage instead of isolated pass conditions.
- low-lock nodes remain safely accessible for learning-first progression.
