type ActionPlan = {
  headline: string
  why: string
  thisWeek: string[]
  avoid: string[]
}

const DECISION_ACTIONS: Record<string, ActionPlan> = {
  'validate-core-contract-literacy': {
    headline: 'Build baseline decision literacy first',
    why: 'You are currently exposed to avoidable legal/risk mistakes without contract fundamentals.',
    thisWeek: [
      'Spend 45-60 minutes learning core contract terms (liability, termination, indemnity).',
      'Summarize 3 terms in your own words and test with one real example.',
      'Create a one-page checklist you will use before signing anything.',
    ],
    avoid: ['Do not commit to debt or major liabilities this week.'],
  },
  'design-operating-system-routines': {
    headline: 'Stabilize your weekly operating routine',
    why: 'Your current bandwidth signal is too unstable for higher-risk decisions.',
    thisWeek: [
      'Set fixed blocks for study/work, admin, and recovery in your weekly calendar.',
      'Protect one non-negotiable planning block (30 minutes) each day.',
      'Track completion for 5 days to verify routine durability.',
    ],
    avoid: ['Avoid adding new commitments until routine adherence is above 70%.'],
  },
  'establish-legal-safety-baseline': {
    headline: 'Set a minimum legal safety baseline',
    why: 'Legal exposure is the current bottleneck for safe progression.',
    thisWeek: [
      'List your active commitments/agreements in one place.',
      'Flag missing terms, unclear obligations, and deadlines.',
      'Resolve or clarify at least one high-risk ambiguity.',
    ],
    avoid: ['Do not sign new long-term obligations before baseline clarity.'],
  },
}

export function buildActionPlan(profile: any, run: any): ActionPlan {
  const isStudent =
    String(profile?.profile_id || '').includes('student') ||
    String(profile?.scenario_label || '').toLowerCase().includes('student')
  const fallback: ActionPlan = {
    headline: 'Reduce the largest active constraint deficit',
    why: 'The engine selected this decision to improve safety and optionality before irreversible commitments.',
    thisWeek: [
      'Complete one task that improves your weakest constraint category.',
      'Refresh evidence for one stale/low-confidence category.',
      'Re-run the projection after completing your tasks.',
    ],
    avoid: ['Avoid irreversible commitments while status is learn-only.'],
  }

  const base = DECISION_ACTIONS[run?.next_decision_id] || fallback
  if (!isStudent) return base

  return {
    headline: `${base.headline} (Student-friendly path)`,
    why: `${base.why} Student mode prioritizes low-cost, low-risk progress.`,
    thisWeek: [
      ...base.thisWeek,
      'Ask a mentor/teacher to review your checklist or summary once this week.',
    ],
    avoid: [...base.avoid, 'Avoid borrowing or high-pressure commitments without review.'],
  }
}
