# Cycle 003 Step 01: Monotonic Irreversibility Audit

## Scope

- `graph/canonical-decision-graph.md`

## Violations Detected

1. `establish-legal-safety-baseline (0.62) -> validate-core-contract-literacy (0.20)`
   - violation type: descending irreversibility unlock.
   - risk: higher-lock decision unlocks lower-lock learning node, allowing prerequisite inversion.

2. `authorize-capital-allocation-envelope (0.69) -> launch-domain-specific-execution-plan (0.49)`
3. `decide-major-liability-commitment (0.84) -> launch-domain-specific-execution-plan (0.49)`
   - violation type: descending irreversibility into terminal path.
   - risk: inconsistent monotonic traversal and evaluator ambiguity.

## Proposed Fixes (Pre-Execution)

- Reverse legal-literacy edge to `validate-core-contract-literacy -> establish-legal-safety-baseline`.
- Raise `launch-domain-specific-execution-plan` irreversibility to represent irreversible launch boundary.
- Add explicit anti-shortcut edges:
  - `define-income-stability-strategy -> choose-credit-exposure-policy`
  - `design-operating-system-routines -> define-ownership-structure-path`
  - `approve-risk-cap-policy -> decide-major-liability-commitment`

## Resolution Status

- All proposed fixes applied in Cycle 003 before proceeding to subsequent hardening steps.
