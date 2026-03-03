# Canonical Decision Graph (Phase 2 Baseline)

## Purpose

Define the minimum universal decision set and sequencing edges used by Decision OS Core.
This graph encodes decision intelligence only; it does not provide execution actions.

## Design Rules

- Model only high-impact, high-irreversibility, and prerequisite-bearing decisions.
- Keep node count minimal and reusable across student, employee, creator, and founder states.
- Block execution when hard constraints or readiness deficits are present.
- Prefer `learning` nodes as unlock mechanisms before irreversible commitments.

## Universal Node Set

Each node must validate against `schemas/decision-node.schema.yaml` when materialized as YAML instances.

| decision_id | domain | decision_type | irreversibility_score | primary role |
|---|---|---|---:|---|
| establish-legal-safety-baseline | risk | legal | 0.62 | prevents unlawful pathways before progression |
| build-financial-buffer-policy | assets | financial | 0.58 | reduces fragility before leveraged decisions |
| define-income-stability-strategy | income | operational | 0.52 | stabilizes replenishment constraints |
| validate-core-contract-literacy | learning | learning | 0.20 | reduces legal and asymmetry risk |
| choose-credit-exposure-policy | credit | financial | 0.73 | governs leverage posture |
| decide-major-liability-commitment | assets | legal | 0.84 | captures high lock-in obligations |
| define-ownership-structure-path | ownership | structural | 0.78 | determines ownership topology |
| commit-identity-linked-public-positioning | operations | identity-locking | 0.81 | constrains future optionality and reputational pathway |
| design-operating-system-routines | operations | operational | 0.40 | supports durable execution discipline |
| approve-risk-cap-policy | risk | structural | 0.67 | limits downside and exposure stacking |
| authorize-capital-allocation-envelope | assets | financial | 0.69 | controls capital concentration and deployment bounds |
| prioritize-competing-constraints | risk | structural | 0.71 | arbitrates highest-severity active constraints under multi-deficit states |
| resolve-conflicting-objectives | operations | structural | 0.75 | resolves cross-domain objective conflicts before irreversible progression |
| invoke-escalation-policy | learning | legal | 0.79 | enters explicit escalation governance under systemic stress |
| enter-conservative-mode | operations | structural | 0.83 | enforces strategic risk-downshift when safety margins compress |
| launch-domain-specific-execution-plan | operations | operational | 0.86 | irreversible launch commitment boundary before external handoff |

## Canonical Sequencing Edges

`A -> B` means `A` is a prerequisite unlock for `B`.

- validate-core-contract-literacy -> establish-legal-safety-baseline
- validate-core-contract-literacy -> choose-credit-exposure-policy
- establish-legal-safety-baseline -> choose-credit-exposure-policy
- establish-legal-safety-baseline -> decide-major-liability-commitment
- define-income-stability-strategy -> build-financial-buffer-policy
- define-income-stability-strategy -> choose-credit-exposure-policy
- define-income-stability-strategy -> approve-risk-cap-policy
- build-financial-buffer-policy -> authorize-capital-allocation-envelope
- build-financial-buffer-policy -> choose-credit-exposure-policy
- authorize-capital-allocation-envelope -> decide-major-liability-commitment
- choose-credit-exposure-policy -> decide-major-liability-commitment
- establish-legal-safety-baseline -> approve-risk-cap-policy
- approve-risk-cap-policy -> authorize-capital-allocation-envelope
- approve-risk-cap-policy -> decide-major-liability-commitment
- define-ownership-structure-path -> commit-identity-linked-public-positioning
- approve-risk-cap-policy -> define-ownership-structure-path
- validate-core-contract-literacy -> design-operating-system-routines
- design-operating-system-routines -> define-income-stability-strategy
- design-operating-system-routines -> define-ownership-structure-path
- design-operating-system-routines -> launch-domain-specific-execution-plan
- authorize-capital-allocation-envelope -> launch-domain-specific-execution-plan
- decide-major-liability-commitment -> launch-domain-specific-execution-plan
- validate-core-contract-literacy -> prioritize-competing-constraints
- establish-legal-safety-baseline -> prioritize-competing-constraints
- approve-risk-cap-policy -> prioritize-competing-constraints
- prioritize-competing-constraints -> resolve-conflicting-objectives
- define-income-stability-strategy -> resolve-conflicting-objectives
- resolve-conflicting-objectives -> invoke-escalation-policy
- invoke-escalation-policy -> enter-conservative-mode
- enter-conservative-mode -> launch-domain-specific-execution-plan

## Global Blocker Patterns

These blocker templates must be included when instantiating node YAML:

- `legal_exposure.current_level < min_required_level` -> `hard`
- `risk.current_level < min_required_level` -> `hard`
- `constraint_confidence < 0.60` -> at least `soft_block`
- `irreversibility_score >= 0.80 and emotional_stability < 0.72` -> `hard`

## Anti-Bloat Policy

- New nodes require proof that existing nodes cannot represent the same state transition.
- Domain specialization belongs in downstream overlays; core graph remains universal.
- Node additions without new gating semantics are rejected as duplicate abstraction.

## Graph Safety Invariants

- Unlock edges must be monotonic on irreversibility (`score(successor) >= score(predecessor)`).
- Credit exposure nodes cannot be unlocked before income-stability node is satisfied.
- Ownership-structure nodes cannot be unlocked before operating-system stability node is satisfied.
