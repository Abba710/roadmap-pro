import { Check, Crown } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { PRICING_PLANS } from '../../data/pricing'
import type { PlanType } from '../../types/subscription'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import type { User } from '@/types/user'

interface PricingPageProps {
  currentPlan?: PlanType | null
  onUpgrade?: (plan: PlanType) => void
  onGetStarted?: () => void
  userData: User | null
  onSignIn: () => void
  onSignOut: () => void
}

/**
 * Pricing page component with all plan details
 */
export function PricingPage({
  currentPlan = null,
  onUpgrade = () => {},
  onGetStarted = () => {},
  userData,
  onSignIn,
  onSignOut,
}: PricingPageProps) {
  const handleSelectPlan = (planId: PlanType): void => {
    if (planId !== 'free') {
      onUpgrade(planId)
    }
    onGetStarted()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onGetStarted={onGetStarted}
        userData={userData}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600">
              Start for free, upgrade when you need more power. No hidden fees,
              cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan) => {
              const isPopular = plan.id === 'yearly'
              const isCurrent = currentPlan === plan.id

              return (
                <Card
                  key={plan.id}
                  className={`relative p-8 transition-all duration-300 ${
                    isPopular
                      ? 'border-4 border-purple-500 shadow-2xl scale-105 md:scale-110'
                      : 'border-2 border-slate-200 hover:border-purple-300 hover:shadow-lg'
                  }`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                        <Crown className="w-3 h-3 mr-1 inline" />
                        Best Value
                      </Badge>
                    </div>
                  )}

                  {/* Current plan indicator */}
                  {isCurrent && (
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-300"
                      >
                        Current Plan
                      </Badge>
                    </div>
                  )}

                  {/* Plan name and price */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-slate-900">
                        ${plan.price}
                      </span>
                      <span className="text-slate-600 ml-2">
                        /{plan.interval}
                      </span>
                    </div>
                    {plan.id === 'yearly' && (
                      <p className="text-sm text-green-600 mt-3 font-medium">
                        💰 Save $48 per year
                      </p>
                    )}
                  </div>

                  {/* CTA button */}
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full mb-8 font-medium ${
                      isPopular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                    }`}
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {isCurrent ? 'Current Plan' : 'Get Started'}
                  </Button>

                  {/* Features list */}
                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Absolutely! You can upgrade or downgrade your plan whenever you like. Changes take effect immediately.',
              },
              {
                q: 'Is there a free trial for Pro?',
                a: 'Yes! Start with our Free plan to explore all features, and upgrade to Pro anytime to unlock unlimited roadmaps and PDF exports.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards and digital payment methods through our secure partner, Lemon Squezy.',
              },
              {
                q: 'Do you offer refunds?',
                a: "Yes! If you're not happy with Pro within 14 days, we provide a full refund - no questions asked.",
              },
              {
                q: 'Is there a discount for annual billing?',
                a: 'Definitely! Our yearly plan saves you $60 compared to monthly billing',
              },
              {
                q: 'Can I export my data?',
                a: 'Yes! You can easily export your roadmaps as PDF files.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-purple-300 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
