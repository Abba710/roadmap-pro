import { useState } from 'react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { CheckCircle2, Circle } from 'lucide-react'

interface DemoTask {
  id: string
  title: string
  completed: boolean
}

interface DemoPhase {
  id: string
  name: string
  status: string
  theme: 'green' | 'purple' | 'gold'
  icon: string
  tasks: DemoTask[]
}

/**
 * Demo section with interactive roadmap
 */
export function DemoSection() {
  const [phases, setPhases] = useState<DemoPhase[]>([
    {
      id: 'mvp',
      name: 'MVP',
      status: 'Completed',
      theme: 'green',
      icon: '🚀',
      tasks: [
        {
          id: 'm1',
          title: 'Market and competitor research',
          completed: true,
        },
        { id: 'm2', title: 'Design and prototypes', completed: true },
        {
          id: 'm3',
          title: 'User authentication and profiles',
          completed: true,
        },
        {
          id: 'm4',
          title: 'Payment integration and subscriptions',
          completed: true,
        },
        { id: 'm5', title: 'Roadmap builder', completed: true },
        { id: 'm6', title: 'Timeline and sidebar', completed: true },
        { id: 'm7', title: 'Export to PDF', completed: true },
        { id: 'm8', title: 'Public MVP launch', completed: true },
      ],
    },
    {
      id: 'beta',
      name: 'Open Beta',
      status: 'In Progress',
      theme: 'purple',
      icon: '⚡',
      tasks: [
        {
          id: 'b1',
          title: 'Display tasks directly on the timeline',
          completed: false,
        },
        {
          id: 'b2',
          title: 'Notifications for deadlines and changes',
          completed: false,
        },
        {
          id: 'b3',
          title: 'Real-time collaboration on roadmaps',
          completed: false,
        },
        {
          id: 'b4',
          title: 'Set deadlines and task dependencies',
          completed: false,
        },
        {
          id: 'b5',
          title: 'Embed roadmaps on any website',
          completed: false,
        },
        {
          id: 'b6',
          title: 'Ready-made templates for different niches',
          completed: false,
        },
        {
          id: 'b7',
          title: 'Analytics for views and progress',
          completed: false,
        },
      ],
    },
    {
      id: 'full-release',
      name: 'Full Version 1.0',
      status: 'Planned',
      theme: 'gold',
      icon: '🤖',
      tasks: [
        {
          id: 'f1',
          title: 'AI Assistant: Auto-generate roadmap from project description',
          completed: false,
        },
        {
          id: 'f2',
          title: 'Advanced stage creation: subtasks, checklists, files',
          completed: false,
        },
        {
          id: 'f3',
          title: 'Integrations (Notion, Trello, Jira, Slack)',
          completed: false,
        },
        {
          id: 'f4',
          title: 'Public and private roadmaps',
          completed: false,
        },
        { id: 'f5', title: 'Team workspaces', completed: false },
      ],
    },
  ])

  /**
   * Toggle task completion
   */
  const toggleTask = (phaseId: string, taskId: string): void => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            tasks: phase.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          }
        }
        return phase
      })
    )
  }

  /**
   * Calculate progress for a phase
   */
  const calculateProgress = (tasks: DemoTask[]): number => {
    const completed = tasks.filter((t) => t.completed).length
    return Math.round((completed / tasks.length) * 100)
  }

  /**
   * Calculate overall progress
   */
  const calculateOverallProgress = (): number => {
    const totalTasks = phases.reduce(
      (acc, phase) => acc + phase.tasks.length,
      0
    )
    const completedTasks = phases.reduce(
      (acc, phase) => acc + phase.tasks.filter((t) => t.completed).length,
      0
    )
    return Math.round((completedTasks / totalTasks) * 100)
  }

  return (
    <section id="demo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-slate-900">
            Interactive Demo — Our Roadmap in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Try it yourself! Click on tasks to mark them as complete and watch
            the progress update.
          </p>
        </div>

        {/* Demo roadmap cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {phases.map((phase) => {
            const progress = calculateProgress(phase.tasks)
            const colors = getThemeColors(phase.theme)

            return (
              <Card
                key={phase.id}
                className={`overflow-hidden border-2 ${colors.border} ${colors.shadow} shadow-xl transform hover:scale-105 transition-transform`}
              >
                <div
                  className={`bg-gradient-to-r ${colors.gradient} p-6 text-white relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <span className="text-8xl">{phase.icon}</span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-white">{phase.name}</h2>
                      <span className="text-3xl">{phase.icon}</span>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {phase.status}
                    </Badge>
                  </div>
                </div>
                <div className={`bg-gradient-to-br ${colors.bg} p-6`}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-slate-900">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-slate-700 mb-4">Tasks</h3>
                    {phase.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(phase.id, task.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg bg-white/40 hover:bg-white/60 transition-all duration-200 ${
                          task.completed ? 'bg-white/40' : 'bg-white/20'
                        }`}
                      >
                        {task.completed ? (
                          <CheckCircle2
                            className={`w-5 h-5 ${colors.icon} mt-0.5 flex-shrink-0`}
                          />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        )}
                        <p
                          className={`text-sm text-left ${
                            task.completed
                              ? 'text-slate-600 line-through'
                              : 'text-slate-700'
                          }`}
                        >
                          {task.title}
                        </p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Completed:</span>
                      <span className={`${colors.icon}`}>
                        {
                          phase.tasks.filter((m: DemoTask) => m.completed)
                            .length
                        }{' '}
                        / {phase.tasks.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Interactive Timeline */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 shadow-lg">
          <h3 className="mb-6 text-slate-800">Interactive Timeline</h3>
          <div className="relative">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-200 rounded-full -translate-y-1/2" />

            {/* Progress indicator */}
            <div
              className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 rounded-full transition-all duration-500 -translate-y-1/2"
              style={{ width: `${calculateOverallProgress()}%` }}
            />

            {/* Phase nodes */}
            <div className="relative flex justify-between items-center">
              {phases.map((phase) => {
                const progress = calculateProgress(phase.tasks)
                const colors = getThemeColors(phase.theme)
                const nodeGradient = colors.gradient
                  .replace('from-', 'from-')
                  .replace('to-', 'to-')

                return (
                  <div
                    key={phase.id}
                    className="flex flex-col items-center flex-1 z-10"
                  >
                    <button
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-4 border-white bg-gradient-to-br ${nodeGradient}`}
                    >
                      <span className="text-2xl">{phase.icon}</span>
                    </button>
                    <div className="mt-4 text-center">
                      <div className="text-slate-700">{phase.name}</div>
                      <div className="text-sm text-slate-500">
                        {phase.status}
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        {progress}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Overall stats */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Overall Progress</p>
                <p className="text-slate-900">{calculateOverallProgress()}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Completed Tasks</p>
                <p className="text-slate-900">
                  {phases.reduce(
                    (acc, p) => acc + p.tasks.filter((t) => t.completed).length,
                    0
                  )}{' '}
                  of {phases.reduce((acc, p) => acc + p.tasks.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA below demo */}
        <div className="text-center mt-12">
          <p className="text-lg text-slate-600 mb-4">
            Like what you see? Create your own roadmap now!
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Get theme colors for demo cards
 */
function getThemeColors(theme: 'green' | 'purple' | 'gold') {
  const colors = {
    green: {
      gradient: 'from-green-500 to-emerald-600',
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      shadow: 'shadow-green-200',
      icon: 'text-green-600',
    },
    purple: {
      gradient: 'from-purple-500 to-violet-600',
      bg: 'from-purple-50 to-violet-50',
      border: 'border-purple-200',
      shadow: 'shadow-purple-200',
      icon: 'text-purple-600',
    },
    gold: {
      gradient: 'from-yellow-500 to-amber-600',
      bg: 'from-yellow-50 to-amber-50',
      border: 'border-yellow-200',
      shadow: 'shadow-yellow-200',
      icon: 'text-yellow-600',
    },
  }
  return colors[theme]
}
