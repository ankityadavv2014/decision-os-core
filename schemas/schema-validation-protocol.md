# Schema Validation Protocol

## Purpose

Define repeatable checks to ensure decision-node artifacts conform to canonical schema without silently promoting optional fields to required.

## Validation Scope

- `schemas/decision-node.schema.yaml`
- `graph/universal-decision-nodes.yaml`
- any future node packs under `graph/`

## Required Checks

1. **Schema Conformance Check**
   - validate every node object against `decision-node.schema.yaml`.
   - fail on any `additionalProperties` or missing required field.

2. **Optional-Field Integrity Check**
   - verify optional fields remain optional in policy:
     - `prerequisites[].evidence_ref`
     - `constraints_required[].confidence_min`
     - `constraints_required[].evidence_freshness_days_max`
     - `risks[].mitigation`
     - `failure_modes[].detectability`
     - `blocked_when[].block_level`
     - `simulation_only_conditions[].exit_criteria`
   - fail if downstream protocol text silently requires these fields.

3. **Policy Overlay Check**
   - run policy-level gates that are stricter than schema (for example, non-empty prerequisites for canonical high-impact nodes).
   - record separately as policy warnings, not schema errors.

## Reference Command

Use python validator with `PyYAML` + `jsonschema`:

```shell
python3 - <<'PY'
import yaml
from pathlib import Path
from jsonschema import Draft202012Validator

root = Path("/Users/theprojectxco./decision-os-core")
schema = yaml.safe_load((root / "schemas/decision-node.schema.yaml").read_text())
nodes = yaml.safe_load((root / "graph/universal-decision-nodes.yaml").read_text())
validator = Draft202012Validator(schema)

for node in nodes:
    errs = list(validator.iter_errors(node))
    if errs:
        print(node.get("decision_id"), "ERROR")
        for e in errs:
            print(" -", e.message)
PY
```

## Output Requirements

- validation date
- node count
- schema errors (if any)
- policy warnings (if any)
- pass/fail conclusion
