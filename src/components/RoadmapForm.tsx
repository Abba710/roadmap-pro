import { useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Plus, Trash2, GripVertical, Check } from 'lucide-react'
import type { Phase, Milestone, ThemeColor } from '../types/roadmap'
import { useRoadmapEditor } from '../hooks/useRoadmapEditor'
import { getIconEmoji } from '@/utils/icons'

interface RoadmapFormProps {
  phases: Phase[]
  onUpdatePhases: (phases: Phase[]) => void
}

/**
 * Drag and drop item types
 */
const ItemTypes = {
  PHASE: 'phase',
  MILESTONE: 'milestone',
}

/**
 * Theme color options with visual indicators
 */
const themeColors: Record<ThemeColor, string> = {
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  gold: 'bg-yellow-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
}

const icons: string[] = [
  'Zap',
  'Rocket',
  'Trophy',
  'Target',
  'Star',
  'Heart',
  'Flag',
  'Sparkles',
  'Code',
  'Coffee',
  'Lightbulb',
  'Briefcase',
]

/**
 * Main roadmap editor form with drag & drop functionality
 */
export function RoadmapForm({ phases, onUpdatePhases }: RoadmapFormProps) {
  const {
    editingPhases,
    addPhase,
    removePhase,
    updatePhase,
    addMilestone,
    removeMilestone,
    updateMilestone,
    reorderPhases,
    reorderMilestones,
  } = useRoadmapEditor(phases)

  /**
   * Sync local editing state with parent when phases prop changes
   */
  useEffect(() => {
    // Only sync if external changes occurred
  }, [phases])

  /**
   * Save changes and notify parent component
   */
  const handleSave = (): void => {
    onUpdatePhases(editingPhases)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-slate-200 shadow-xl">
        {/* Form Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-slate-800 mb-1">Roadmap Editor</h2>
            <p className="text-sm text-slate-500">
              Configure phases and tasks of your plan
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Phases List */}
        <div className="space-y-6">
          {editingPhases.map((phase: Phase, phaseIndex: number) => (
            <DraggablePhaseCard
              key={phase.id}
              phase={phase}
              index={phaseIndex}
              onMove={reorderPhases}
              onRemove={removePhase}
              onUpdate={updatePhase}
              onAddMilestone={addMilestone}
              onRemoveMilestone={removeMilestone}
              onUpdateMilestone={updateMilestone}
              onReorderMilestones={reorderMilestones}
            />
          ))}

          {/* Add Phase Button */}
          <Button
            onClick={addPhase}
            variant="outline"
            className="w-full border-dashed border-2 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Phase
          </Button>
        </div>
      </Card>
    </DndProvider>
  )
}

/**
 * Draggable phase card component
 */
interface DraggablePhaseCardProps {
  phase: Phase
  index: number
  onMove: (dragIndex: number, hoverIndex: number) => void
  onRemove: (phaseId: string) => void
  onUpdate: (phaseId: string, updates: Partial<Phase>) => void
  onAddMilestone: (phaseId: string) => void
  onRemoveMilestone: (phaseId: string, milestoneId: string) => void
  onUpdateMilestone: (
    phaseId: string,
    milestoneId: string,
    updates: Partial<Milestone>
  ) => void
  onReorderMilestones: (
    phaseId: string,
    startIndex: number,
    endIndex: number
  ) => void
}

function DraggablePhaseCard({
  phase,
  index,
  onMove,
  onRemove,
  onUpdate,
  onAddMilestone,
  onRemoveMilestone,
  onUpdateMilestone,
  onReorderMilestones,
}: DraggablePhaseCardProps) {
  /**
   * Setup drag functionality
   */
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.PHASE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  /**
   * Setup drop functionality
   */
  const [, drop] = useDrop({
    accept: ItemTypes.PHASE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => {
        preview(node)
        drop(node)
      }}
      className={isDragging ? 'opacity-50' : 'opacity-100'}
    >
      <Card className="p-5 bg-slate-50 border-2 border-slate-200">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Drag Handle */}
          <div
            ref={(node) => {
              drag(node)
            }}
            className="mt-2 cursor-move"
          >
            <GripVertical className="w-5 h-5 text-slate-400 hover:text-slate-600" />
          </div>

          {/* Phase Content */}
          <div className="flex-1 w-full md:w-fit space-y-4">
            {/* Phase Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`phase-name-${phase.id}`}>Phase Name</Label>
                <Input
                  id={`phase-name-${phase.id}`}
                  value={phase.name}
                  onChange={(e) => onUpdate(phase.id, { name: e.target.value })}
                  placeholder="Name"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor={`phase-status-${phase.id}`}>Status</Label>
                <Input
                  id={`phase-status-${phase.id}`}
                  value={phase.status}
                  onChange={(e) =>
                    onUpdate(phase.id, { status: e.target.value })
                  }
                  placeholder="Status"
                  className="w-full"
                />
              </div>

              {/* theme color selection */}
              <div>
                <Label htmlFor={`phase-theme-${phase.id}`}>Theme Color</Label>
                <Select
                  value={phase.theme}
                  onValueChange={(value: string) =>
                    onUpdate(phase.id, { theme: value as ThemeColor })
                  }
                >
                  <SelectTrigger
                    id={`phase-theme-${phase.id}`}
                    className="w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themeColors).map(([key, colorClass]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${colorClass}`}
                          />
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Icon Selection */}
              <div>
                <Label htmlFor={`phase-icon-${phase.id}`}>Icon</Label>
                <Select
                  value={phase.icon}
                  onValueChange={(value: string) =>
                    onUpdate(phase.id, { icon: value as string })
                  }
                >
                  <SelectTrigger
                    id={`phase-icon-${phase.id}`}
                    className="w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(icons).map(([key, emoji]) => (
                      <SelectItem key={key} value={emoji}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4">{getIconEmoji(emoji)}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Milestones Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                <Label>Tasks and Goals</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddMilestone(phase.id)}
                  className="h-8"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Task
                </Button>
              </div>

              <div className="space-y-2">
                {phase.milestones.length === 0 ? (
                  <div className="text-center py-4 text-sm text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                    No tasks. Add the first task
                  </div>
                ) : (
                  phase.milestones.map((milestone, milestoneIndex) => (
                    <DraggableMilestone
                      key={milestone.id}
                      phaseId={phase.id}
                      milestone={milestone}
                      index={milestoneIndex}
                      onMove={onReorderMilestones}
                      onRemove={onRemoveMilestone}
                      onUpdate={onUpdateMilestone}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Phase Statistics */}
            <div className="flex flex-wrap md:flex-nowrap gap-1 pt-2">
              <Badge variant="outline" className="text-xs">
                Progress: {phase.progress}%
              </Badge>
              <Badge variant="outline" className="text-xs">
                Tasks: {phase.milestones.length}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Completed: <br />
                {phase.milestones.filter((m) => m.completed).length}
              </Badge>
            </div>
          </div>

          {/* Remove Phase Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemove(phase.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2 md:mt-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

/**
 * Draggable milestone component
 */
interface DraggableMilestoneProps {
  phaseId: string
  milestone: Milestone
  index: number
  onMove: (phaseId: string, startIndex: number, endIndex: number) => void
  onRemove: (phaseId: string, milestoneId: string) => void
  onUpdate: (
    phaseId: string,
    milestoneId: string,
    updates: Partial<Milestone>
  ) => void
}

function DraggableMilestone({
  phaseId,
  milestone,
  index,
  onMove,
  onRemove,
  onUpdate,
}: DraggableMilestoneProps) {
  /**
   * Setup drag functionality for milestone
   */
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.MILESTONE,
    item: { phaseId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  /**
   * Setup drop functionality for milestone
   */
  const [, drop] = useDrop({
    accept: ItemTypes.MILESTONE,
    hover: (item: { phaseId: string; index: number }) => {
      if (item.phaseId === phaseId && item.index !== index) {
        onMove(phaseId, item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => {
        preview(node)
        drop(node)
      }}
      className={`flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Drag Handle */}
      <div
        ref={(node) => {
          drag(node)
        }}
        className="cursor-move"
      >
        <GripVertical className="w-4 h-4 text-slate-400 hover:text-slate-600" />
      </div>

      {/* Completion Checkbox */}
      <button
        onClick={() =>
          onUpdate(phaseId, milestone.id, {
            completed: !milestone.completed,
          })
        }
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          milestone.completed
            ? 'bg-green-500 border-green-500'
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        {milestone.completed && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Milestone Title Input */}
      <Input
        value={milestone.title}
        onChange={(e) =>
          onUpdate(phaseId, milestone.id, { title: e.target.value })
        }
        placeholder="Task name"
        className={`flex-1 h-8 ${
          milestone.completed ? 'line-through text-slate-500' : ''
        }`}
      />

      {/* Remove Milestone Button */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onRemove(phaseId, milestone.id)}
        className="h-8 w-8 p-0"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  )
}
