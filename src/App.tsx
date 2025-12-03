import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './components/landing/LandingPage'
import { RoadmapBuilder } from './components/builder/RoadmapBuilder'
import { BlogPage } from './components/blog/blog'
import { PricingPage } from './components/pricing/price'
import { useSubscription } from './hooks/useSubscription'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from '@/utils/protectedRoute'

export default function App() {
  const auth = useAuth()
  const sub = useSubscription()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onGetStarted={() => {
              if (auth.user) {
                window.location.href = '/app/'
                return
              }

              localStorage.setItem('authIntent', 'start')
              auth.signInWithGoogle()
            }}
            userData={auth.user}
            onSignIn={auth.signInWithGoogle}
            onSignOut={auth.logout}
          />
        }
      />

      <Route
        path="/blog/"
        element={
          <BlogPage
            onGetStarted={() => {
              if (auth.user) {
                window.location.href = '/app/'
                return
              }

              localStorage.setItem('authIntent', 'start')
              auth.signInWithGoogle()
            }}
            subscription={sub.subscription}
            userData={auth.user}
            onSignIn={auth.signInWithGoogle}
            onSignOut={auth.logout}
          />
        }
      />

      <Route
        path="/pricing/"
        element={
          <PricingPage
            currentPlan={sub.subscription.plan}
            onUpgrade={sub.upgradePlan}
            onGetStarted={() => {
              if (auth.user) {
                window.location.href = '/app/'
                return
              }

              localStorage.setItem('authIntent', 'start')
              auth.signInWithGoogle()
            }}
            userData={auth.user}
            onSignIn={auth.signInWithGoogle}
            onSignOut={auth.logout}
          />
        }
      />

      <Route
        path="/app/"
        element={
          <ProtectedRoute user={auth.user} loading={auth.loading}>
            <RoadmapBuilder
              onBack={() => (window.location.href = '/')}
              subscription={sub.subscription}
              canCreateRoadmap={sub.canCreateRoadmap()}
              hasPdfExport={sub.hasPdfExport()}
              onCreateRoadmap={sub.incrementRoadmapCount}
              onDeleteRoadmap={sub.decrementRoadmapCount}
              onUpgrade={sub.upgradePlan}
            />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
