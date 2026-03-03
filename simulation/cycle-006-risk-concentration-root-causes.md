# Cycle 006 Risk Concentration Root-Causes

Date: 2026-03-02
Baseline source: Cycle 005 projection methodology on `simulation/cycle-005-long-horizon-profiles.yaml`

## Root-Cause Table (Baseline 3/5 Concentration Profiles)

| profile_id | degrading risk components | root cause | structural fix applied |
|---|---|---|---|
| fast-scaling-founder | `risk.current_level` gap, `legal_exposure` gap, `time` debt spillover | time/cognitive strain prevented transition into stronger risk-relief path; trend stayed degraded | risk-trend precedence override + equivalent-loop pivot + calibrated stability recovery counterbalance |
| compliance-heavy-operator | `risk` gap under compliance load, repeated legal/risk gating pressure | legal-safe progression existed but selection oscillated around root-safe path before relief pivot | equivalent-loop detection + out-of-loop pivot + deadlock-signature escalation |
| over-leveraged-growth-seeker | deep `money` deficit, `risk` gap, `legal_exposure` gap | compounding penalties outpaced relief effects under high leverage fragility | reduced compounding penalty intensity + stronger legal/risk counterbalance from relief decisions |

## Evidence Linkage

- baseline drift metrics: `simulation/cycle-005-forward-projection.md`
- post-fix drift metrics: `simulation/cycle-006-forward-projection.md`
