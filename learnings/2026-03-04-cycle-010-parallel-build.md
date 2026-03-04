# Learning Record: Cycle 010 Parallel Build

## Cycle Metadata

- `learning_id`: `cycle-010-parallel-build`
- `observation_window`: `2026-03-04T00:00:00Z/2026-03-04T23:59:59Z`
- `source_type`: `integration`

## What Changed

- Parallelized delivery into three isolated branches/worktrees:
  - `feat/ws1-regression-freeze`
  - `feat/ws2-cli-runner`
  - `feat/ws3-ui-sandbox`
- Merged in required order: WS1 -> WS2 -> WS3.
- Added compatibility hardening:
  - runner accepts frozen suite `profiles` schema in addition to `cases`.
  - runner anti-loop/risk-trend projection logic tightened deterministically.
  - UI profile loader now filters directly by committed regression suite IDs.

## What Failed / Was Weak

- Initial WS2 audit rejected WS1 suite shape (`profiles` vs `cases` mismatch).
- Initial integrated projection surfaced artificial loop/risk drift due simplistic repeat selection.
- UI build failed before dependency install in clean workspace.

## Rule-Level Outcome

- Determinism preserved (`10/10`) with no null NBA (`0/10`).
- Graph invariants remain preserved (`backward unlock 0/10`, `prerequisite bypass 0/10`).
- Frozen-suite drift gates now pass (`risk concentration 0/10`, `loop tendency 0/10`).
