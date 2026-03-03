# Cycle 006 Risk-Trend Precedence Update

## Objective

Reduce systemic risk concentration drift without introducing heuristics or weights.

## Rule Change

When `risk_exposure_trend` is `degrading` for >=2 consecutive steps:

1. Candidate set remains constrained by existing hard-block and prerequisite rules.
2. Among eligible candidates, rank decisions that improve risk trend ahead of money/time relief candidates.
3. This override is disabled only when legal hard block prevents those risk-relief candidates.

## Deterministic Ordering (within override mode)

1. legal hard-block admissibility
2. risk-relief eligibility
3. irreversibility ordering
4. optionality impact
5. lexicographic tie-break

## Safety Note

This is a precedence tightening, not a scoring heuristic.
