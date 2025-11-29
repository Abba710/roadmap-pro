import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './components/landing/LandingPage'
import { RoadmapBuilder } from './components/builder/RoadmapBuilder'
import { useSubscription } from './hooks/useSubscription'

export default function App() {
  const sub = useSubscription()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onGetStarted={() => (window.location.href = '/app')}
            subscription={sub.subscription}
            onUpgrade={sub.upgradePlan}
          />
        }
      />

      <Route
        path="/app/*"
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
        path="/blog/*"
        element={<Navigate to="/blog/index.html" replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
