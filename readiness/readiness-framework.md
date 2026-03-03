# Readiness Framework

## Purpose

Define multidimensional readiness to determine whether a decision remains `learn-only` or becomes `execute-eligible`.

## Readiness Dimensions

Each dimension is scored `0.0` to `1.0` with evidence-backed confidence:

- `financial_readiness`
- `knowledge_readiness`
- `time_readiness`
- `compliance_capacity`
- `risk_tolerance`
- `emotional_stability`

## Evidence Requirements

Each readiness score must include:
- evidence source
- evidence timestamp
- confidence score (`0.0` to `1.0`)
- reviewer/system origin

Low confidence (`< 0.60`) cannot satisfy execution threshold.

## Decision-Type Threshold Profiles

Execution thresholds by `decision_type`:

| decision_type | min_dimension_floor | weighted_average_min | extra_gate |
|---|---:|---:|---|
| learning | 0.30 | 0.45 | none |
| operational | 0.50 | 0.62 | compliance_capacity >= 0.60 |
| financial | 0.55 | 0.68 | financial_readiness >= 0.65 |
| legal | 0.60 | 0.72 | compliance_capacity >= 0.75 |
| structural | 0.62 | 0.74 | time_readiness >= 0.65 AND compliance_capacity >= 0.68 AND financial_readiness >= 0.60 |
| identity-locking | 0.68 | 0.79 | emotional_stability >= 0.74 AND compliance_capacity >= 0.72 |

`irreversibility_score >= 0.80` applies an additional `+0.08` requirement to weighted average and a mandatory emotional stability floor of `0.72`.

## Weighting Model

Default dimension weights (unless overridden by protocol-approved profile):
- financial_readiness: `0.20`
- knowledge_readiness: `0.20`
- time_readiness: `0.15`
- compliance_capacity: `0.20`
- risk_tolerance: `0.15`
- emotional_stability: `0.10`

Weights sum to `1.00`.

## Gating Logic

Evaluate in order:
1. Apply hard constraints from constraint model.
2. Validate evidence freshness and confidence.
3. Check per-dimension minimum floor.
4. Check weighted average threshold.
5. Apply decision-type extra gate.

Output:
- `learn-only` when any threshold is not met, evidence is stale, or confidence is insufficient.
- `execute-eligible` only when all checks pass and no hard block exists.

## Learn-Only Policy

When in `learn-only`:
- simulation and information gathering are allowed.
- irreversible commitments are disallowed.
- readiness deficits must be explicitly listed with target improvements.

## Invariants

- Readiness never bypasses legal or risk hard blocks.
- High confidence is required for all dimensions used to unlock execution.
- No binary readiness flag is stored without dimension-level scores.
- Structural and identity-locking execution eligibility must remain multi-dimensional; single-dimension gate satisfaction is insufficient.
