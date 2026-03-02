# Decision Node Schema (Normative)

## Canonical Required Fields

Every decision node must include exactly these required top-level fields:

- `decision_id`
- `domain`
- `decision_type`
- `irreversibility_score`
- `prerequisites`
- `constraints_required`
- `risks`
- `failure_modes`
- `unlocks`
- `blocked_when`
- `simulation_only_conditions`

## Field Definitions

### `decision_id`
- Type: string
- Pattern: kebab-case (`^[a-z0-9]+(?:-[a-z0-9]+)*$`)
- Purpose: stable, unique decision identifier.

### `domain`
- Type: enum string
- Allowed: `income`, `ownership`, `credit`, `assets`, `risk`, `learning`, `operations`

### `decision_type`
- Type: enum string
- Allowed: `learning`, `operational`, `financial`, `legal`, `structural`, `identity-locking`

### `irreversibility_score`
- Type: number
- Range: `0.0` to `1.0`
- Purpose: reversibility lock-in intensity.

### `prerequisites`
- Type: array of objects
- Object fields:
  - `prerequisite_id` (string)
  - `description` (string)
  - `satisfied` (boolean)
  - `evidence_ref` (string, optional)

### `constraints_required`
- Type: array of objects (min 1)
- Object fields:
  - `category` (enum: `time`, `money`, `knowledge`, `risk`, `legal_exposure`, `cognitive_load`, `emotional_maturity`)
  - `min_required_level` (number `0.0` to `1.0`)
  - `confidence_min` (number `0.0` to `1.0`, optional)
  - `evidence_freshness_days_max` (integer >= 0, optional)
    - if omitted, evaluator must apply canonical defaults from `constraints/constraint-model.md`

### `risks`
- Type: array of objects (min 1)
- Object fields:
  - `risk_id` (string)
  - `description` (string)
  - `severity` (number `0.0` to `1.0`)
  - `likelihood` (number `0.0` to `1.0`)
  - `mitigation` (string, optional)

### `failure_modes`
- Type: array of objects (min 1)
- Object fields:
  - `mode_id` (string)
  - `trigger` (string)
  - `impact` (string)
  - `detectability` (number `0.0` to `1.0`, optional)

### `unlocks`
- Type: array of objects
- Object fields:
  - `target_decision_id` (string)
  - `rationale` (string)

### `blocked_when`
- Type: array of condition objects (min 1)
- Object fields:
  - `condition_id` (string)
  - `expression` (string)
  - `reason` (string)
  - `block_level` (enum: `hard`, `soft`, optional)

### `simulation_only_conditions`
- Type: array of condition objects
- Object fields:
  - `condition_id` (string)
  - `expression` (string)
  - `reason` (string)
  - `exit_criteria` (string, optional)

## Normative Example Node

```yaml
decision_id: validate-credit-education-path
domain: credit
decision_type: learning
irreversibility_score: 0.18
prerequisites:
  - prerequisite_id: baseline-credit-literacy
    description: understands core credit mechanisms and risks
    satisfied: false
    evidence_ref: notes/credit-basics-assessment-2026-03-02
constraints_required:
  - category: knowledge
    min_required_level: 0.55
    confidence_min: 0.70
    evidence_freshness_days_max: 30
  - category: time
    min_required_level: 0.40
risks:
  - risk_id: misinformation-risk
    description: low-quality sources lead to invalid assumptions
    severity: 0.45
    likelihood: 0.50
    mitigation: rely on validated primary-source materials
failure_modes:
  - mode_id: shallow-understanding
    trigger: skips prerequisite concepts
    impact: later financial decisions become miscalibrated
    detectability: 0.60
unlocks:
  - target_decision_id: choose-credit-building-strategy
    rationale: foundational literacy required for safe strategy selection
blocked_when:
  - condition_id: legal-uncertainty
    expression: legal_exposure.current_level < 0.40
    reason: unresolved legal context for local credit instruments
    block_level: hard
simulation_only_conditions:
  - condition_id: evidence-confidence-low
    expression: knowledge.confidence < 0.70
    reason: evidence insufficient for execution-level decisions
    exit_criteria: complete validated assessment and raise confidence to 0.70
```
