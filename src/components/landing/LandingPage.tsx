import { Header } from './Header'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { DemoSection } from './DemoSection'
import { BlogSection } from './BlogSection'
import { Footer } from './Footer'
import type { UserSubscription } from '../../types/subscription'

interface LandingPageProps {
  onGetStarted: () => void
  subscription: UserSubscription
}

/**
 * Main landing page component
 * Showcases the product and pricing
 */
export function LandingPage({ onGetStarted, subscription }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPlan={subscription.plan} onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <DemoSection />
      <FeaturesSection />
      <BlogSection />
      <Footer />
    </div>
  )
}
