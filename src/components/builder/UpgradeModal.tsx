import { X, Crown, Check } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { PRICING_PLANS } from '../../data/pricing'
import type { PlanType } from '../../types/subscription'

interface UpgradeModalProps {
  onClose: () => void
  onUpgrade: (plan: PlanType) => void
}

/**
 * Modal prompting users to upgrade their plan
 */
export function UpgradeModal({ onClose, onUpgrade }: UpgradeModalProps) {
  const handleUpgrade = (planId: PlanType): void => {
    onUpgrade(planId)
    onClose()
  }

  const paidPlans = PRICING_PLANS.filter((plan) => plan.id !== 'free')

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
            <Crown className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="mb-2 text-slate-900">Upgrade to Pro</h2>
          <p className="text-slate-600 text-lg">
            Unlock unlimited roadmaps, PDF exports, and more
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {paidPlans.map((plan) => {
            const isYearly = plan.id === 'yearly'

            return (
              <Card
                key={plan.id}
                className={`p-6 relative ${
                  isYearly
                    ? 'border-4 border-purple-500 shadow-lg'
                    : 'border-2 border-slate-200'
                }`}
              >
                {isYearly && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                )}

                <h3 className="mb-2 text-slate-900">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-slate-900">${plan.price}</span>
                  <span className="text-slate-600">/{plan.interval}</span>
                  {isYearly && (
                    <p className="text-sm text-green-600 mt-1">
                      Save $20 per year
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full mb-4 ${
                    isYearly
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : ''
                  }`}
                  variant={isYearly ? 'default' : 'outline'}
                >
                  Choose {plan.name}
                </Button>

                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500">
          All plans include 24/7 support and a 30-day money-back guarantee
        </p>
      </Card>
    </div>
  )
}
