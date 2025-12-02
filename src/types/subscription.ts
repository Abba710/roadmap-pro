/**
 * Subscription and pricing types
 */

export type PlanType = 'free' | 'monthly' | 'yearly'

export interface Plan {
  id: PlanType
  name: string
  price: number
  interval: string
  features: string[]
  limits: {
    maxRoadmaps: number
    pdfExport: boolean
  }
}

export interface UserSubscription {
  plan: PlanType
  roadmapsCount: number
  setRoadmapsCount?: (count: number) => void
}
