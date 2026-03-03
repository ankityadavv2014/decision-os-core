# Cycle 006 Forward Projection (Post-Fix)

Date: 2026-03-02
Profiles: `simulation/cycle-005-long-horizon-profiles.yaml`
Projection horizon: 5 steps

## Baseline Reproduction

Re-run against Cycle 005 methodology confirms baseline drift (or equivalent baseline window):
- risk concentration: `3/5`
- loop tendency: `3/5`
- null NBA: `0/5`

## Post-Fix Metrics

- risk concentration: `0/5`
- loop tendency: `1/5`
- null NBA: `0/5`
- determinism: preserved (`10/10`, see `simulation/cycle-006-determinism-regression.md`)

## Convergence Summary

| profile_id | dominant path pattern | risk trend outcome | convergence note |
|---|---|---|---|
| fast-scaling-founder | literacy -> routines -> risk/legal pivot | stable/improving | no null, no trap |
| risk-seeking-serial-operator | literacy/routines with out-of-loop legal pivot | stable | equivalent-loop broken |
| conservative-saver | low-lock progression with minimal drift | stable | one remaining mild loop tendency |
| compliance-heavy-operator | legal baseline relief inserted early | improving -> stable | concentration removed |
| over-leveraged-growth-seeker | literacy/routines + legal relief escalation | stable/improving | concentration removed |

## Structural Changes Driving Improvement

1. risk-trend precedence override for `>=2` degrading steps.
2. equivalent-loop detection with out-of-loop pivot requirement.
3. deadlock-signature escalation when fallback repeats exceed threshold.
4. compounding calibration to avoid over-penalizing risk under valid relief decisions.

## Remaining Anomaly

- one profile still shows mild loop tendency (`<=2` unique decisions over 5 steps) but without nulls, concentration, or optionality collapse.
