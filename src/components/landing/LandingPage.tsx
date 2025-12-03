import { Header } from './Header'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { DemoSection } from './DemoSection'
import { BlogSection } from './BlogSection'
import { Footer } from './Footer'
import type { User } from '@/types/user'

interface LandingPageProps {
  onGetStarted: () => void
  userData: User | null
  onSignIn: () => void
  onSignOut: () => void
}

/**
 * Main landing page component
 * Showcases the product and pricing
 */
export function LandingPage({
  onGetStarted,
  userData,
  onSignIn,
  onSignOut,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header
        onGetStarted={onGetStarted}
        userData={userData}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <HeroSection onGetStarted={onGetStarted} />
      <DemoSection />
      <FeaturesSection />
      <BlogSection />
      <Footer />
    </div>
  )
}
