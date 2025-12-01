import type { Phase } from '../types/roadmap'
import { getIconEmoji } from '../utils/icons'

interface TimelineSectionProps {
  phases: Phase[]
  overallProgress: number
  completedMilestones: number
  totalMilestones: number
}

/**
 * Timeline visualization component
 * Shows progress across all phases with visual indicators
 */
export function TimelineSection({
  phases,
  overallProgress,
  completedMilestones,
  totalMilestones,
}: TimelineSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200">
      <h2 className="mb-6 text-slate-800">Timeline</h2>

      {/* Progress Bar and Phase Indicators */}
      <div className="relative">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-slate-300 to-slate-300 rounded-full opacity-30 -translate-y-1/2" />

        {/* Active progress indicator - using dynamic width with Tailwind-compatible approach */}
        <div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 rounded-full transition-all duration-500 -translate-y-1/2"
          style={{ width: `${overallProgress}%` }}
        />

        {/* Phase nodes */}
        <div className="relative flex justify-between items-center">
          {phases.map((phase: Phase) => {
            const iconEmoji: string = getIconEmoji(phase.icon)
            const themeGradient: string = getThemeGradient(phase.theme)

            return (
              <div
                key={phase.id}
                className="flex flex-col items-center flex-1 z-10"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-4 border-white ${themeGradient}`}
                >
                  <span className="text-2xl">{iconEmoji}</span>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-slate-700">{phase.name}</div>
                  <div className="text-sm text-slate-500">{phase.status}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {phase.progress}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Overall Progress</p>
            <p className="text-slate-900">{overallProgress}%</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Completed Tasks</p>
            <p className="text-slate-900">
              {completedMilestones} of {totalMilestones}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Get gradient classes based on theme color
 */
function getThemeGradient(theme: string): string {
  const gradients: Record<string, string> = {
    green: 'bg-gradient-to-br from-green-400 to-green-600',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
    gold: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
    red: 'bg-gradient-to-br from-red-400 to-red-600',
    orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
  }
  return gradients[theme] || gradients['blue']
}
