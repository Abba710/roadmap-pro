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
      'Drag & Drop editor',
      'Progress tracking',
      'Color themes',
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
    name: 'Pro',
    price: 10,
    interval: 'month',
    features: [
      'All Free features',
      'Unlimited roadmaps',
      'PDF export',
      'Share roadmap',
      'All future updates and improvements from the roadmap',
    ],
    limits: {
      maxRoadmaps: -1,
      pdfExport: true,
      teamCollaboration: true,
      customThemes: true,
    },
  },
  {
    id: 'yearly',
    name: 'Pro Yearly',
    price: 7,
    interval: 'month',
    features: [
      'All Free features',
      'Unlimited roadmaps',
      'PDF export',
      'All future updates and improvements from the roadmap',
      'Save $48/year',
    ],
    limits: {
      maxRoadmaps: -1,
      pdfExport: true,
      teamCollaboration: true,
      customThemes: true,
    },
  },
]
