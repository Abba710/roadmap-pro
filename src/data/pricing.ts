import type { Plan } from '../types/subscription'

/**
 * Pricing plans configuration
 */
export const PRICING_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    features: [
      '1 roadmap',
      'Basic templates',
      'Drag & drop editor',
      'Progress tracking',
    ],
    limits: {
      maxRoadmaps: 1,
      pdfExport: false,
      teamCollaboration: false,
      customThemes: false,
    },
  },
  {
    id: 'monthly',
    name: 'Pro Monthly',
    price: 10,
    interval: 'month',
    features: [
      'Unlimited roadmaps',
      'PDF export',
      'Custom themes',
      'Team collaboration',
      'Priority support',
      'Advanced analytics',
    ],
    limits: {
      maxRoadmaps: -1, // -1 means unlimited
      pdfExport: true,
      teamCollaboration: true,
      customThemes: true,
    },
  },
  {
    id: 'yearly',
    name: 'Pro Yearly',
    price: 100,
    interval: 'year',
    features: [
      'Unlimited roadmaps',
      'PDF export',
      'Custom themes',
      'Team collaboration',
      'Priority support',
      'Advanced analytics',
      'Save $20/year',
    ],
    limits: {
      maxRoadmaps: -1,
      pdfExport: true,
      teamCollaboration: true,
      customThemes: true,
    },
  },
]
