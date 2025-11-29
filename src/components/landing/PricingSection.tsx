import { Check, Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { PRICING_PLANS } from "../../data/pricing";
import { PlanType } from "../../types/subscription";

interface PricingSectionProps {
  currentPlan: PlanType;
  onUpgrade: (plan: PlanType) => void;
  onGetStarted: () => void;
}

/**
 * Pricing section with plan cards
 */
export function PricingSection({ currentPlan, onUpgrade, onGetStarted }: PricingSectionProps) {
  const handleSelectPlan = (planId: PlanType): void => {
    if (planId !== "free") {
      onUpgrade(planId);
    }
    onGetStarted();
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start for free, upgrade when you need more power
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.id === "yearly";
            const isCurrent = currentPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={`relative p-8 ${
                  isPopular
                    ? "border-4 border-purple-500 shadow-2xl scale-105"
                    : "border-2 border-slate-200"
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
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      Current Plan
                    </Badge>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="mb-2 text-slate-900">{plan.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-600">/{plan.interval}</span>
                  {plan.id === "yearly" && (
                    <p className="text-sm text-green-600 mt-1">Save $20 per year</p>
                  )}
                </div>

                {/* CTA button */}
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full mb-6 ${
                    isPopular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : ""
                  }`}
                  variant={isPopular ? "default" : "outline"}
                  disabled={isCurrent}
                >
                  {isCurrent ? "Current Plan" : plan.id === "free" ? "Get Started" : "Upgrade Now"}
                </Button>

                {/* Features list */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="mt-16 text-center">
          <p className="text-slate-600">
            All plans include 24/7 support and regular updates.{" "}
            <button className="text-purple-600 hover:text-purple-700 underline">
              Contact us
            </button>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
