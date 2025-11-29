import { useState } from 'react'
import { LandingPage } from './components/landing/LandingPage'
import { RoadmapBuilder } from './components/builder/RoadmapBuilder'
import { useSubscription } from './hooks/useSubscription'

type Page = 'landing' | 'builder'

/**
 * Main application component
 * Manages routing between landing page and roadmap builder
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const subscriptionState = useSubscription()

  const navigateToBuilder = (): void => {
    setCurrentPage('builder')
  }

  const navigateToLanding = (): void => {
    setCurrentPage('landing')
  }

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage
          onGetStarted={navigateToBuilder}
          subscription={subscriptionState.subscription}
          onUpgrade={subscriptionState.upgradePlan}
        />
      ) : (
        <RoadmapBuilder
          onBack={navigateToLanding}
          subscription={subscriptionState.subscription}
          canCreateRoadmap={subscriptionState.canCreateRoadmap()}
          hasPdfExport={subscriptionState.hasPdfExport()}
          onCreateRoadmap={subscriptionState.incrementRoadmapCount}
          onDeleteRoadmap={subscriptionState.decrementRoadmapCount}
          onUpgrade={subscriptionState.upgradePlan}
        />
      )}
    </>
  )
}
