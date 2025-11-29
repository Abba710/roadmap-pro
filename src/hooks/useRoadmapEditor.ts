import { useState, useCallback } from 'react'
import type { Phase, Milestone } from '../types/roadmap'

/**
 * Custom hook for managing roadmap editor state
 * Handles all CRUD operations for phases and milestones
 */
export function useRoadmapEditor(initialPhases: Phase[]) {
  const [editingPhases, setEditingPhases] = useState<Phase[]>(initialPhases)

  /**
   * Add a new phase to the roadmap
   */
  const addPhase = useCallback((): void => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      name: 'New Phase',
      theme: 'blue',
      icon: 'Target',
      milestones: [],
      progress: 0,
      status: 'Planned',
    }
    setEditingPhases((prev: Phase[]) => [...prev, newPhase])
  }, [])

  /**
   * Remove a phase from the roadmap
   */
  const removePhase = useCallback((phaseId: string): void => {
    setEditingPhases((prev: Phase[]) =>
      prev.filter((p: Phase) => p.id !== phaseId)
    )
  }, [])

  /**
   * Update phase properties
   */
  const updatePhase = useCallback(
    (phaseId: string, updates: Partial<Phase>): void => {
      setEditingPhases((prev: Phase[]) =>
        prev.map((phase: Phase) =>
          phase.id === phaseId ? { ...phase, ...updates } : phase
        )
      )
    },
    []
  )

  /**
   * Add a new milestone to a specific phase
   */
  const addMilestone = useCallback((phaseId: string): void => {
    setEditingPhases((prev: Phase[]) =>
      prev.map((phase: Phase) => {
        if (phase.id === phaseId) {
          const newMilestone: Milestone = {
            id: `${phaseId}-${Date.now()}`,
            title: 'New task',
            completed: false,
          }
          return { ...phase, milestones: [...phase.milestones, newMilestone] }
        }
        return phase
      })
    )
  }, [])

  /**
   * Remove a milestone from a phase and recalculate progress
   */
  const removeMilestone = useCallback(
    (phaseId: string, milestoneId: string): void => {
      setEditingPhases((prev: Phase[]) =>
        prev.map((phase: Phase) => {
          if (phase.id === phaseId) {
            const updatedMilestones: Milestone[] = phase.milestones.filter(
              (m: Milestone) => m.id !== milestoneId
            )
            const completedCount: number = updatedMilestones.filter(
              (m: Milestone) => m.completed
            ).length
            const progress: number =
              updatedMilestones.length > 0
                ? Math.round((completedCount / updatedMilestones.length) * 100)
                : 0
            return { ...phase, milestones: updatedMilestones, progress }
          }
          return phase
        })
      )
    },
    []
  )

  /**
   * Update milestone properties and recalculate phase progress
   */
  const updateMilestone = useCallback(
    (
      phaseId: string,
      milestoneId: string,
      updates: Partial<Milestone>
    ): void => {
      setEditingPhases((prev: Phase[]) =>
        prev.map((phase: Phase) => {
          if (phase.id === phaseId) {
            const updatedMilestones: Milestone[] = phase.milestones.map(
              (milestone: Milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, ...updates }
                  : milestone
            )
            const completedCount: number = updatedMilestones.filter(
              (m: Milestone) => m.completed
            ).length
            const progress: number =
              updatedMilestones.length > 0
                ? Math.round((completedCount / updatedMilestones.length) * 100)
                : 0
            return { ...phase, milestones: updatedMilestones, progress }
          }
          return phase
        })
      )
    },
    []
  )

  /**
   * Reorder phases after drag and drop
   */
  const reorderPhases = useCallback(
    (startIndex: number, endIndex: number): void => {
      setEditingPhases((prev: Phase[]) => {
        const result: Phase[] = Array.from(prev)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
      })
    },
    []
  )

  /**
   * Reorder milestones within a phase after drag and drop
   */
  const reorderMilestones = useCallback(
    (phaseId: string, startIndex: number, endIndex: number): void => {
      setEditingPhases((prev: Phase[]) =>
        prev.map((phase: Phase) => {
          if (phase.id === phaseId) {
            const result: Milestone[] = Array.from(phase.milestones)
            const [removed] = result.splice(startIndex, 1)
            result.splice(endIndex, 0, removed)
            return { ...phase, milestones: result }
          }
          return phase
        })
      )
    },
    []
  )

  return {
    editingPhases,
    addPhase,
    removePhase,
    updatePhase,
    addMilestone,
    removeMilestone,
    updateMilestone,
    reorderPhases,
    reorderMilestones,
  }
}
