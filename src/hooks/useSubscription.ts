import { useState, useCallback } from 'react'
import type { PlanType, UserSubscription } from '../types/subscription'

/**
 * Hook for managing user subscription state
 */
export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: 'free',
    roadmapsCount: 0,
  })

  /**
   * Check if user can create more roadmaps based on their plan
   */
  const canCreateRoadmap = useCallback((): boolean => {
    if (subscription.plan === 'free') {
      return subscription.roadmapsCount < 1
    }
    return true // Premium users have unlimited roadmaps
  }, [subscription])

  /**
   * Check if user has access to PDF export
   */
  const hasPdfExport = useCallback((): boolean => {
    return subscription.plan !== 'free'
  }, [subscription])

  /**
   * Increment roadmap count
   */
  const incrementRoadmapCount = useCallback((): void => {
    setSubscription((prev) => ({
      ...prev,
      roadmapsCount: prev.roadmapsCount + 1,
    }))
  }, [])

  const decrementRoadmapCount = useCallback((): void => {
    setSubscription((prev) => ({
      ...prev,
      roadmapsCount: prev.roadmapsCount - 1,
    }))
  }, [])

  /**
   * Upgrade user plan
   */
  const upgradePlan = useCallback((newPlan: PlanType): void => {
    setSubscription((prev) => ({
      ...prev,
      plan: newPlan,
    }))
  }, [])

  return {
    subscription,
    canCreateRoadmap,
    hasPdfExport,
    incrementRoadmapCount,
    decrementRoadmapCount,
    upgradePlan,
  }
}
