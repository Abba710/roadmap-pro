import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './components/landing/LandingPage'
import { RoadmapBuilder } from './components/builder/RoadmapBuilder'
import { BlogPage } from './components/blog/blog'
import { PricingPage } from './components/pricing/price'
import { useSubscription } from './hooks/useSubscription'

export default function App() {
  const sub = useSubscription()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onGetStarted={() => (window.location.href = '/app/')}
            subscription={sub.subscription}
          />
        }
      />

      <Route
        path="/app/"
        element={
          <RoadmapBuilder
            onBack={() => (window.location.href = '/')}
            subscription={sub.subscription}
            canCreateRoadmap={sub.canCreateRoadmap()}
            hasPdfExport={sub.hasPdfExport()}
            onCreateRoadmap={sub.incrementRoadmapCount}
            onDeleteRoadmap={sub.decrementRoadmapCount}
            onUpgrade={sub.upgradePlan}
          />
        }
      />

      <Route
        path="/blog/"
        element={
          <BlogPage
            onGetStarted={() => (window.location.href = '/app/')}
            subscription={sub.subscription}
          />
        }
      />

      <Route
        path="/pricing/"
        element={
          <PricingPage
            currentPlan={sub.subscription.plan}
            onUpgrade={sub.upgradePlan}
            onGetStarted={() => (window.location.href = '/app/')}
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
