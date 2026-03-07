# UI Sandbox Parity Validation (Cycle 011)

Date: 2026-03-07
Suite: `simulation/regression-suite.yaml`
Denominator: `N=10`

## Method

For each frozen-suite profile:

1. Computed CLI output via `tools/runner/run-nba` and `tools/runner/project --steps 5`.
2. Computed UI output via `ui-sandbox/src/lib/evaluator.js` (`runEvaluator` + `runProjection`).
3. Compared:
   - decision chosen
   - gating reason/status mapping
   - optionality delta
   - 5-step projection tuple (`decision`, `status`, `optionality_delta`)

## Result

- compared profiles: `10/10`
- decision mismatches: `0/10`
- gating mismatches: `0/10`
- optionality mismatches: `0/10`
- projection mismatches: `0/10`
- parity verdict: **Pass**

## Notes

- UI data source now uses `ui-sandbox/public/data/regression-profiles.json` plus `regression-suite.json`, ensuring suite-profile parity with CLI audits.
- No engine rule changes were applied; only UI evaluator parity alignment and data-source correction.
