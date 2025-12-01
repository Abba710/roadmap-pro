import { useState, useCallback } from 'react'
import type { Phase, Milestone } from '../types/roadmap'

/**
 * Custom hook for managing roadmap state and operations
 * Separates business logic from UI components
 */
export function useRoadmap(initialPhases: Phase[]) {
  const [phases, setPhases] = useState<Phase[]>(initialPhases)

  /**
   * Toggle the completion status of a milestone
   * Automatically recalculates phase progress
   */
  const toggleMilestone = useCallback(
    (phaseId: string, milestoneId: string): void => {
      setPhases((prevPhases: Phase[]) =>
        prevPhases.map((phase: Phase) => {
          if (phase.id === phaseId) {
            const updatedMilestones: Milestone[] = phase.milestones.map(
              (milestone: Milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, completed: !milestone.completed }
                  : milestone
            )
            const completedCount: number = updatedMilestones.filter(
              (m: Milestone) => m.completed
            ).length
            const progress: number = Math.round(
              (completedCount / updatedMilestones.length) * 100
            )
            return { ...phase, milestones: updatedMilestones, progress }
          }
          return phase
        })
      )
    },
    []
  )

  /**
   * Update all phases at once
   * Used when saving changes from the editor
   */
  const updatePhases = useCallback((newPhases: Phase[]): void => {
    setPhases(newPhases)
  }, [])

  /**
   * Calculate overall progress across all phases
   */
  const getOverallProgress = useCallback((): number => {
    if (phases.length === 0) return 0
    return Math.round(
      phases.reduce((acc: number, p: Phase) => acc + p.progress, 0) /
        phases.length
    )
  }, [phases])

  /**
   * Get total number of completed milestones
   */
  const getTotalCompletedMilestones = useCallback((): number => {
    return phases.reduce(
      (acc: number, p: Phase) =>
        acc + p.milestones.filter((m: Milestone) => m.completed).length,
      0
    )
  }, [phases])

  /**
   * Get total number of milestones across all phases
   */
  const getTotalMilestones = useCallback((): number => {
    return phases.reduce(
      (acc: number, p: Phase) => acc + p.milestones.length,
      0
    )
  }, [phases])

  return {
    phases,
    toggleMilestone,
    updatePhases,
    getOverallProgress,
    getTotalCompletedMilestones,
    getTotalMilestones,
  }
}
