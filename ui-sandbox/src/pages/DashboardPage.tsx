import { ConstraintMeter } from '../components/ConstraintMeter'
import { OptionalityGauge } from '../components/OptionalityGauge'
import { buildActionPlan } from '../lib/actionItems'

type DashboardPageProps = {
  profile: any
  run: any
}

export function DashboardPage({ profile, run }: DashboardPageProps) {
  if (!profile) {
    return <section>Select a profile from Profiles to populate dashboard state.</section>
  }

  const constraints = profile.constraints || {}
  const readinessCount = Object.values(constraints).filter(
    (constraint: any) => Number(constraint.current_level) >= Number(constraint.required_level),
  ).length
  const totalCount = Object.keys(constraints).length || 1
  const readinessRatio = readinessCount / totalCount
  const risk = constraints.risk?.current_level ?? 0
  const plan = run ? buildActionPlan(profile, run) : null

  return (
    <section>
      <h2>Dashboard</h2>
      {plan && (
        <article className="card">
          <h3>What You Should Do Now</h3>
          <p>
            <strong>Priority:</strong> {plan.headline}
          </p>
          <p>
            <strong>Why:</strong> {plan.why}
          </p>
          <h4>This week checklist</h4>
          <ol>
            {plan.thisWeek.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <h4>Avoid for now</h4>
          <ul>
            {plan.avoid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      )}
      <div className="card-grid">
        <article className="card">
          <h3>Current User State</h3>
          <p>
            <strong>profile:</strong> {profile.profile_id}
          </p>
          <p>
            <strong>readiness indicators:</strong> {readinessCount}/{totalCount}
          </p>
          <p>
            <strong>risk exposure:</strong> {risk.toFixed(2)}
          </p>
          <p>
            <strong>next decision:</strong> {run?.next_decision_id || 'Run evaluation'}
          </p>
        </article>
        <OptionalityGauge value={run?.optionality_delta ?? 0} />
      </div>
      <article className="card">
        <h3>Constraints Summary</h3>
        <div className="meter-grid">
          {Object.entries(constraints).map(([name, values]: any) => (
            <ConstraintMeter
              key={name}
              label={name}
              current={Number(values.current_level)}
              required={Number(values.required_level)}
              trend={values.trend}
            />
          ))}
        </div>
        <p>
          <strong>Readiness ratio:</strong> {(readinessRatio * 100).toFixed(1)}%
        </p>
      </article>
    </section>
  )
}
