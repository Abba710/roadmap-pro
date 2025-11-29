import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { CheckCircle2, Circle } from 'lucide-react'
import type { Phase, Milestone, ThemeColorsMap } from '../types/roadmap'
import { getIconEmoji } from '../utils/icons'

interface PhaseCardProps {
  phase: Phase
  index: number
  onToggleMilestone?: (phaseId: string, milestoneId: string) => void
}

/**
 * Theme color configurations for different phase themes
 */
const themeColors: ThemeColorsMap = {
  green: {
    gradient: 'from-green-500 to-emerald-600',
    bg: 'from-green-50 to-emerald-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700 border-green-300',
    progress: 'bg-green-500',
    icon: 'text-green-600',
    glow: 'shadow-green-200',
  },
  purple: {
    gradient: 'from-purple-500 to-violet-600',
    bg: 'from-purple-50 to-violet-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700 border-purple-300',
    progress: 'bg-purple-500',
    icon: 'text-purple-600',
    glow: 'shadow-purple-200',
  },
  gold: {
    gradient: 'from-yellow-500 to-amber-600',
    bg: 'from-yellow-50 to-amber-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    progress: 'bg-yellow-500',
    icon: 'text-yellow-600',
    glow: 'shadow-yellow-200',
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-600',
    bg: 'from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    progress: 'bg-blue-500',
    icon: 'text-blue-600',
    glow: 'shadow-blue-200',
  },
  red: {
    gradient: 'from-red-500 to-rose-600',
    bg: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700 border-red-300',
    progress: 'bg-red-500',
    icon: 'text-red-600',
    glow: 'shadow-red-200',
  },
  orange: {
    gradient: 'from-orange-500 to-amber-600',
    bg: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700 border-orange-300',
    progress: 'bg-orange-500',
    icon: 'text-orange-600',
    glow: 'shadow-orange-200',
  },
}

/**
 * Phase card component displaying phase information and milestones
 * Features hover effects and milestone toggle functionality
 */
export function PhaseCard({ phase, index, onToggleMilestone }: PhaseCardProps) {
  const colors = themeColors[phase.theme]
  const iconEmoji: string = getIconEmoji(phase.icon)

  // Calculate animation delay based on index
  const animationDelayClass =
    index === 0 ? 'delay-0' : index === 1 ? 'delay-150' : 'delay-300'

  return (
    <div
      className={`transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${animationDelayClass}`}
    >
      <Card
        className={`overflow-hidden border-2 ${colors.border} ${colors.glow} shadow-xl`}
      >
        {/* Card Header with Theme Gradient */}
        <div
          className={`bg-gradient-to-r ${colors.gradient} p-6 text-white relative overflow-hidden`}
        >
          {/* Background decorative icon */}
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
            <span className="text-8xl">{iconEmoji}</span>
          </div>

          {/* Header content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white">{phase.name}</h2>
              <span className="text-3xl">{iconEmoji}</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {phase.status}
            </Badge>
          </div>
        </div>

        {/* Card Body with Milestones */}
        <div className={`bg-gradient-to-br ${colors.bg} p-6`}>
          {/* Progress Bar Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Progress</span>
              <span className="text-slate-900">{phase.progress}%</span>
            </div>
            <Progress value={phase.progress} className="h-3" />
          </div>

          {/* Milestones List */}
          <div className="space-y-3">
            <h3 className="text-slate-700 mb-4">Development Steps</h3>
            {phase.milestones.length === 0 ? (
              <div className="text-center py-6 text-sm text-slate-500">
                No tasks in this phase
              </div>
            ) : (
              phase.milestones.map((milestone: Milestone, idx: number) => (
                <div
                  key={milestone.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/60 ${
                    milestone.completed ? 'bg-white/40' : 'bg-white/20'
                  } ${onToggleMilestone ? 'cursor-pointer' : ''}`}
                  onClick={() =>
                    onToggleMilestone &&
                    onToggleMilestone(phase.id, milestone.id)
                  }
                >
                  {/* Completion status icon */}
                  {milestone.completed ? (
                    <CheckCircle2
                      className={`w-5 h-5 ${colors.icon} mt-0.5 flex-shrink-0`}
                    />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  )}

                  {/* Milestone details */}
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        milestone.completed
                          ? 'text-slate-600 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {milestone.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Step {idx + 1} of {phase.milestones.length}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Completion Summary */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Completed:</span>
              <span className={`${colors.icon}`}>
                {phase.milestones.filter((m: Milestone) => m.completed).length}{' '}
                / {phase.milestones.length}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
