import { useState, useCallback } from 'react'
import type { Roadmap, Phase } from '../types/roadmap'

/**
 * Custom hook for managing multiple roadmaps
 *
 * This hook handles:
 * - Creating new roadmaps
 * - Switching between roadmaps
 * - Updating roadmap metadata
 * - Deleting roadmaps
 *
 * @param initialRoadmaps - Array of roadmaps to initialize with
 * @returns Object with roadmaps state and management functions
 *
 * @example
 * ```typescript
 * const {
 *   roadmaps,
 *   activeRoadmapId,
 *   createRoadmap,
 *   selectRoadmap
 * } = useRoadmaps([]);
 *
 * // Create a new roadmap
 * const newId = createRoadmap("My Project");
 *
 * // Switch to a different roadmap
 * selectRoadmap(roadmapId);
 * ```
 */
export function useRoadmaps(initialRoadmaps: Roadmap[] = []) {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(initialRoadmaps)
  const [activeRoadmapId, setActiveRoadmapId] = useState<string | null>(
    initialRoadmaps.length > 0 ? initialRoadmaps[0].id : null
  )

  /**
   * Get the currently active roadmap
   * Returns null if no roadmap is selected
   */
  const getActiveRoadmap = useCallback((): Roadmap | null => {
    if (!activeRoadmapId) return null
    return roadmaps.find((r) => r.id === activeRoadmapId) || null
  }, [roadmaps, activeRoadmapId])

  /**
   * Create a new roadmap
   *
   * @param name - Name of the roadmap
   * @param description - Optional description
   * @returns The ID of the newly created roadmap
   *
   * @example
   * ```typescript
   * const newId = createRoadmap("Q1 2025 Roadmap", "Product development plan");
   * ```
   */
  const createRoadmap = useCallback(
    (name: string = 'New Roadmap', description: string = ''): string => {
      const newRoadmap: Roadmap = {
        id: Date.now().toString(),
        name,
        description,
        phases: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      setRoadmaps((prev) => [...prev, newRoadmap])
      setActiveRoadmapId(newRoadmap.id)

      return newRoadmap.id
    },
    []
  )

  /**
   * Update an existing roadmap's metadata
   *
   * @param roadmapId - ID of the roadmap to update
   * @param updates - Partial roadmap object with fields to update
   *
   * @example
   * ```typescript
   * updateRoadmap("123", { name: "Updated Name" });
   * ```
   */
  const updateRoadmap = useCallback(
    (
      roadmapId: string,
      updates: Partial<Omit<Roadmap, 'id' | 'createdAt'>>
    ): void => {
      setRoadmaps((prev) =>
        prev.map((roadmap) =>
          roadmap.id === roadmapId
            ? { ...roadmap, ...updates, updatedAt: Date.now() }
            : roadmap
        )
      )
    },
    []
  )

  /**
   * Update the phases of a specific roadmap
   * This is the main function for updating roadmap content
   *
   * @param roadmapId - ID of the roadmap to update
   * @param phases - New phases array
   *
   * @example
   * ```typescript
   * const updatedPhases = [...phases, newPhase];
   * updateRoadmapPhases(roadmapId, updatedPhases);
   * ```
   */
  const updateRoadmapPhases = useCallback(
    (roadmapId: string, phases: Phase[]): void => {
      setRoadmaps((prev) =>
        prev.map((roadmap) =>
          roadmap.id === roadmapId
            ? { ...roadmap, phases, updatedAt: Date.now() }
            : roadmap
        )
      )
    },
    []
  )

  /**
   * Delete a roadmap
   * Automatically selects another roadmap if the deleted one was active
   *
   * @param roadmapId - ID of the roadmap to delete
   *
   * @example
   * ```typescript
   * deleteRoadmap("123");
   * ```
   */
  const deleteRoadmap = useCallback(
    (roadmapId: string): void => {
      setRoadmaps((prev) => {
        const filtered = prev.filter((r) => r.id !== roadmapId)

        // If we deleted the active roadmap, select another one
        if (roadmapId === activeRoadmapId) {
          setActiveRoadmapId(filtered.length > 0 ? filtered[0].id : null)
        }

        return filtered
      })
    },
    [activeRoadmapId]
  )

  /**
   * Select a roadmap to make it active
   *
   * @param roadmapId - ID of the roadmap to select
   *
   * @example
   * ```typescript
   * selectRoadmap("123");
   * ```
   */
  const selectRoadmap = useCallback((roadmapId: string): void => {
    setActiveRoadmapId(roadmapId)
  }, [])

  return {
    roadmaps,
    activeRoadmapId,
    activeRoadmap: getActiveRoadmap(),
    createRoadmap,
    updateRoadmap,
    updateRoadmapPhases,
    deleteRoadmap,
    selectRoadmap,
  }
}
