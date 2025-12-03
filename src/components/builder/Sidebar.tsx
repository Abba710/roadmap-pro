import { Plus, FolderOpen, Trash2, Edit2, Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import type { Roadmap } from '../../types/roadmap'
import { useState } from 'react'

interface SidebarProps {
  roadmaps: Roadmap[]
  activeRoadmapId: string | null
  onSelectRoadmap: (id: string) => void
  onCreateRoadmap: () => void
  onDeleteRoadmap: (id: string) => void
  onDeleteRoadmapTrigger: () => void
  onUpdateRoadmap: (id: string, updates: Partial<Roadmap>) => void
  canCreate: boolean
  onUpgradeClick: () => void
  mobile: boolean
  setMobile: (mobile: boolean) => void
  setShowForm: (s: boolean) => void
}

/**
 * Sidebar component for managing multiple roadmaps
 * Allows users to create, switch, edit, and delete roadmaps
 */
export function Sidebar({
  roadmaps,
  activeRoadmapId,
  onSelectRoadmap,
  onCreateRoadmap,
  onDeleteRoadmap,
  onDeleteRoadmapTrigger,
  onUpdateRoadmap,
  canCreate,
  onUpgradeClick,
  mobile,
  setMobile,
  setShowForm,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')

  /**
   * Start editing a roadmap name
   */
  const startEditing = (roadmap: Roadmap): void => {
    setEditingId(roadmap.id)
    setEditName(roadmap.name)
  }

  /**
   * Save the edited roadmap name
   */
  const saveEdit = (id: string): void => {
    if (editName.trim()) {
      onUpdateRoadmap(id, { name: editName.trim() })
    }
    setEditingId(null)
  }

  /**
   * Cancel editing
   */
  const cancelEdit = (): void => {
    setEditingId(null)
    setEditName('')
  }

  /**
   * Handle create roadmap with upgrade check
   */
  const handleCreate = (): void => {
    if (!canCreate) {
      onUpgradeClick()
      return
    }
    onCreateRoadmap()
  }

  /**
   * Handle mobile roadmap selection
   */
  const handleMobileSelect = (id: string): void => {
    onSelectRoadmap(id)
    setMobile(!mobile)
    setShowForm(false)
  }

  /**
   * Format date for display
   */
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  /**
   * Render roadmap list
   */
  const renderRoadmapList = (isMobile: boolean = false) => {
    const handleSelect = isMobile ? handleMobileSelect : onSelectRoadmap

    return (
      <>
        {roadmaps.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No roadmaps yet</p>
            <p className="text-slate-400 text-xs mt-1">
              Click "Add Roadmap" to start
            </p>
          </div>
        ) : (
          roadmaps.map((roadmap) => {
            const isActive = roadmap.id === activeRoadmapId
            const isEditing = editingId === roadmap.id

            return (
              <Card
                key={roadmap.id}
                className={`p-4 cursor-pointer transition-all ${
                  isActive
                    ? 'border-2 border-purple-500 bg-purple-50 shadow-md'
                    : 'border border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
                onClick={() => {
                  if (!isEditing) {
                    handleSelect(roadmap.id)
                  }
                  setShowForm(false)
                }}
              >
                {/* Roadmap Name */}
                {isEditing ? (
                  <div
                    className="flex items-center gap-2 mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(roadmap.id)
                        if (e.key === 'Escape') cancelEdit()
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => saveEdit(roadmap.id)}
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={cancelEdit}
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className={`text-sm font-medium ${
                        isActive ? 'text-purple-900' : 'text-slate-900'
                      }`}
                    >
                      {roadmap.name}
                    </h3>
                    {isActive && (
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-700 border-purple-300 text-xs"
                      >
                        Active
                      </Badge>
                    )}
                  </div>
                )}

                {/* Description */}
                {roadmap.description && !isEditing && (
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                    {roadmap.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span>{roadmap.phases.length} phases</span>
                  <span>{formatDate(roadmap.updatedAt)}</span>
                </div>

                {/* Actions */}
                {!isEditing && (
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs flex-1"
                      onClick={() => startEditing(roadmap)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Rename
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        if (confirm('Delete this roadmap?')) {
                          onDeleteRoadmap(roadmap.id)
                          onDeleteRoadmapTrigger()
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </Card>
            )
          })
        )}
      </>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 hidden md:flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="mb-4 text-slate-900">My Roadmaps</h2>
          <Button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Roadmap
          </Button>
          {!canCreate && (
            <p className="text-xs text-orange-600 mt-2 text-center">
              Free plan: 1 roadmap limit
            </p>
          )}
        </div>

        {/* Roadmaps List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {renderRoadmapList(false)}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobile && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => {
              setMobile(!mobile)
            }}
          />

          {/* Sidebar Panel */}
          <aside className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-900">My Roadmaps</h2>
                <button
                  onClick={() => {
                    setMobile(!mobile)
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
              <Button
                onClick={handleCreate}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Roadmap
              </Button>
              {!canCreate && (
                <p className="text-xs text-orange-600 mt-2 text-center">
                  Free plan: 1 roadmap limit
                </p>
              )}
            </div>

            {/* Roadmaps List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {renderRoadmapList(true)}
            </div>
          </aside>
        </>
      )}
    </>
  )
}
