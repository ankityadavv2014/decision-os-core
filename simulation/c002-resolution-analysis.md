# Contradiction Analysis: C-002-UNSAFE-UNLOCK-RISK-CAP

## Contradiction ID

- `C-002-UNSAFE-UNLOCK-RISK-CAP`

## Root Cause

Primary cause was **constraint-precedence incompleteness**, not a single threshold defect:

1. Risk-cap policy dependency existed as an engine precedence note but was not embedded in broader constraint conflict ordering.
2. Sequencing graph allowed capital/liability progression without an explicit risk-cap dependency on all relevant high-impact branches.
3. Terminal launch irreversibility was underspecified, allowing evaluators to treat it as a lower-lock path despite upstream high-lock commitments.

## Why It Was Unsafe

- A permissive evaluator could select capital allocation before risk-cap governance became active.
- This enabled potential exposure expansion without approved downside boundaries.

## Hardening Actions Applied

- `constraints/constraint-model.md`
  - added precedence rule: unresolved risk policy caps override money/time acceleration preferences.
  - added formal deterministic evaluation order.
- `engine/next-best-decision-spec.md`
  - made rule ordering deterministic and retained mandatory risk-cap precedence.
  - added liability precedence dependency on risk-cap eligibility.
- `graph/canonical-decision-graph.md`
  - added `approve-risk-cap-policy -> decide-major-liability-commitment`.
  - raised launch node irreversibility and enforced monotonic unlock invariant.

## Post-Change Status

- C-002 no longer reproduces in Cycle 003 replay.
- Residual dependency: runtime evaluators must enforce prerequisite checks as hard gates.
