type Intake = {
  role: string
  monthlyIncomeBand: string
  savingsBand: string
  hasBankAccount: string
  knowledgeLevel: string
  weeklyHoursBand: string
  riskPressure: string
  legalClarity: string
  primaryGoal: string
}

const incomeToMoney: Record<string, number> = {
  none: 0.12,
  low: 0.32,
  medium: 0.56,
  high: 0.82,
}

const savingsToMoneyBoost: Record<string, number> = {
  none: -0.08,
  low: 0.0,
  medium: 0.08,
  high: 0.16,
}

const knowledgeToLevel: Record<string, number> = {
  low: 0.24,
  medium: 0.5,
  high: 0.74,
}

const hoursToTime: Record<string, number> = {
  low: 0.32,
  medium: 0.5,
  high: 0.66,
}

const legalToLevel: Record<string, number> = {
  low: 0.52,
  medium: 0.64,
  high: 0.8,
}

const riskToLevel: Record<string, number> = {
  low: 0.76,
  medium: 0.64,
  high: 0.48,
}

const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function buildProfileFromIntake(intake: Intake) {
  const moneyBase = incomeToMoney[intake.monthlyIncomeBand] ?? 0.3
  const money = clamp(moneyBase + (savingsToMoneyBoost[intake.savingsBand] ?? 0))
  const knowledge = knowledgeToLevel[intake.knowledgeLevel] ?? 0.4
  const time = hoursToTime[intake.weeklyHoursBand] ?? 0.45
  const legal = legalToLevel[intake.legalClarity] ?? 0.62
  const risk = riskToLevel[intake.riskPressure] ?? 0.62
  const bankPenalty = intake.hasBankAccount === 'no' ? -0.06 : 0

  return {
    profile_id: `guided-${intake.role}`,
    description: `Guided intake profile for ${intake.role}`,
    scenario_label: `Guided profile (${intake.role})`,
    intake,
    constraints: {
      time: { current_level: clamp(time), required_level: 0.4, trend: 'stable', evidence_age_days: 3, confidence: 0.78 },
      money: { current_level: clamp(money + bankPenalty), required_level: 0.55, trend: 'stable', evidence_age_days: 5, confidence: 0.8 },
      knowledge: { current_level: clamp(knowledge), required_level: 0.65, trend: 'improving', evidence_age_days: 8, confidence: 0.72 },
      risk: { current_level: clamp(risk), required_level: 0.7, trend: 'stable', evidence_age_days: 4, confidence: 0.78 },
      legal_exposure: { current_level: clamp(legal + bankPenalty * 0.5), required_level: 0.75, trend: 'stable', evidence_age_days: 5, confidence: 0.79 },
      cognitive_load: { current_level: clamp(0.5 - (intake.weeklyHoursBand === 'low' ? 0.08 : 0.0)), required_level: 0.5, trend: 'stable', evidence_age_days: 2, confidence: 0.82 },
      emotional_maturity: { current_level: clamp(0.68 - (intake.riskPressure === 'high' ? 0.06 : 0)), required_level: 0.72, trend: 'stable', evidence_age_days: 2, confidence: 0.78 },
    },
  }
}
