import { useMemo, useState } from 'react'
import { buildProfileFromIntake } from '../lib/intakeProfile'

const DEFAULT_INTAKE = {
  role: 'student',
  monthlyIncomeBand: 'none',
  savingsBand: 'none',
  hasBankAccount: 'no',
  knowledgeLevel: 'low',
  weeklyHoursBand: 'medium',
  riskPressure: 'high',
  legalClarity: 'low',
  primaryGoal: 'I want to make safe progress without confusion.',
}

type GuidedStartPageProps = {
  onApplyProfile: (profile: any) => void
}

export function GuidedStartPage({ onApplyProfile }: GuidedStartPageProps) {
  const [intake, setIntake] = useState(DEFAULT_INTAKE)
  const preview = useMemo(() => buildProfileFromIntake(intake), [intake])

  const update = (key: string, value: string) => {
    setIntake((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section>
      <h2>Tell me your situation (2 min)</h2>
      <p>
        No need to pick synthetic test profiles. Answer this once and the app creates your personal starting plan.
      </p>
      <article className="card">
        <div className="meter-grid">
          <label>
            Role
            <select value={intake.role} onChange={(e) => update('role', e.target.value)}>
              <option value="student">Student</option>
              <option value="freelancer">Freelancer</option>
              <option value="employee">Salaried Employee</option>
              <option value="founder">Founder</option>
            </select>
          </label>
          <label>
            Monthly income
            <select value={intake.monthlyIncomeBand} onChange={(e) => update('monthlyIncomeBand', e.target.value)}>
              <option value="none">No income</option>
              <option value="low">Low (&lt;$500)</option>
              <option value="medium">Medium ($500-$3000)</option>
              <option value="high">High (&gt;$3000)</option>
            </select>
          </label>
          <label>
            Savings
            <select value={intake.savingsBand} onChange={(e) => update('savingsBand', e.target.value)}>
              <option value="none">$0</option>
              <option value="low">$1-$999</option>
              <option value="medium">$1k-$10k</option>
              <option value="high">$10k+</option>
            </select>
          </label>
          <label>
            Bank account?
            <select value={intake.hasBankAccount} onChange={(e) => update('hasBankAccount', e.target.value)}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <label>
            Knowledge level
            <select value={intake.knowledgeLevel} onChange={(e) => update('knowledgeLevel', e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Weekly available hours
            <select value={intake.weeklyHoursBand} onChange={(e) => update('weeklyHoursBand', e.target.value)}>
              <option value="low">Low (&lt;10h)</option>
              <option value="medium">Medium (10-25h)</option>
              <option value="high">High (25h+)</option>
            </select>
          </label>
          <label>
            Stress / risk pressure
            <select value={intake.riskPressure} onChange={(e) => update('riskPressure', e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Legal clarity
            <select value={intake.legalClarity} onChange={(e) => update('legalClarity', e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <label>
          Primary goal
          <input
            value={intake.primaryGoal}
            onChange={(e) => update('primaryGoal', e.target.value)}
            placeholder="What are you trying to achieve?"
          />
        </label>
        <div style={{ marginTop: '0.8rem' }}>
          <button onClick={() => onApplyProfile(preview)}>Create My Plan</button>
        </div>
      </article>
    </section>
  )
}
