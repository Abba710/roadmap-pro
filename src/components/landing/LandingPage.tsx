import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { PricingSection } from "./PricingSection";
import { DemoSection } from "./DemoSection";
import { BlogSection } from "./BlogSection";
import { Footer } from "./Footer";
import { PlanType, UserSubscription } from "../../types/subscription";

interface LandingPageProps {
  onGetStarted: () => void;
  subscription: UserSubscription;
  onUpgrade: (plan: PlanType) => void;
}

/**
 * Main landing page component
 * Showcases the product and pricing
 */
export function LandingPage({ onGetStarted, subscription, onUpgrade }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPlan={subscription.plan} onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <DemoSection />
      <FeaturesSection />
      <BlogSection />
      <PricingSection currentPlan={subscription.plan} onUpgrade={onUpgrade} onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}
