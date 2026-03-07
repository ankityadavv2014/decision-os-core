# Runner / Engine Parity Validation (Cycle 011)

Date: 2026-03-07
Suite: `simulation/regression-suite.yaml`
Denominator: `N=10`

## Method

1. Ran `run-nba` for all 10 frozen-suite profiles.
2. Compared each CLI result to engine evaluator result from `tools/runner/core.py::choose_decision`.
3. Verified both `chosen_decision` and `gating_reason`.

## Result

- compared profiles: `10/10`
- decision mismatches: `0/10`
- gating mismatches: `0/10`
- parity verdict: **Pass**

## Profile-Level Summary

| profile_id | runner_decision | engine_decision | runner_gating_reason | engine_gating_reason | match |
| --- | --- | --- | --- | --- | --- |
| `fast-scaling-founder` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `learn-only` | `learn-only` | yes |
| `risk-seeking-serial-operator` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `execute-eligible` | `execute-eligible` | yes |
| `conservative-saver` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `execute-eligible` | `execute-eligible` | yes |
| `compliance-heavy-operator` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `execute-eligible` | `execute-eligible` | yes |
| `over-leveraged-growth-seeker` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `execute-eligible` | `execute-eligible` | yes |
| `high-income-zero-knowledge` | `design-operating-system-routines` | `design-operating-system-routines` | `execute-eligible` | `execute-eligible` | yes |
| `high-knowledge-zero-time` | `establish-legal-safety-baseline` | `establish-legal-safety-baseline` | `execute-eligible` | `execute-eligible` | yes |
| `high-risk-tolerance-no-capital` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `execute-eligible` | `execute-eligible` | yes |
| `compliance-strong-time-fragile` | `establish-legal-safety-baseline` | `establish-legal-safety-baseline` | `execute-eligible` | `execute-eligible` | yes |
| `recovery-mode-legal-risk-low` | `validate-core-contract-literacy` | `validate-core-contract-literacy` | `execute-eligible` | `execute-eligible` | yes |
