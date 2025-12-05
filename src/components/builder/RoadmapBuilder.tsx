import { useState } from 'react'
import { PhaseCard } from '../PhaseCard'
import { RoadmapForm } from '../RoadmapForm'
import { TimelineSection } from '../TimelineSection'
import { EmptyState } from '../EmptyState'
import { BuilderHeader } from './BuilderHeader'
import { Sidebar } from './Sidebar'
import { UpgradeModal } from './UpgradeModal'
import { Plus, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import type { Phase } from '../../types/roadmap'
import { useRoadmap } from '../../hooks/useRoadmap'
import { useRoadmaps } from '../../hooks/useRoadmaps'
import type { PlanType, UserSubscription } from '../../types/subscription'
import exportToPDF from '../../utils/exportPDF'
import { updateData } from '@/service/updateData'

interface RoadmapBuilderProps {
  onBack: () => void
  subscription: UserSubscription
  canCreateRoadmap: boolean
  hasPdfExport: boolean
  onCreateRoadmap: () => void
  onDeleteRoadmap: () => void
  onUpgrade: (plan: PlanType) => void
}

/**
 * Main roadmap builder interface with sidebar for multiple roadmaps
 */
export function RoadmapBuilder({
  onBack,
  subscription,
  canCreateRoadmap,
  hasPdfExport,
  onCreateRoadmap,
  onDeleteRoadmap,
  onUpgrade,
}: RoadmapBuilderProps) {
  // Manage multiple roadmaps
  const {
    roadmaps,
    activeRoadmapId,
    activeRoadmap,
    createRoadmap,
    updateRoadmap,
    updateRoadmapPhases,
    deleteRoadmap,
    selectRoadmap,
  } = useRoadmaps([])

  // Manage active roadmap phases
  const {
    toggleMilestone,
    updatePhases: setPhases,
    getOverallProgress,
    getTotalCompletedMilestones,
    getTotalMilestones,
  } = useRoadmap(activeRoadmap?.phases || [])

  const [showForm, setShowForm] = useState<boolean>(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /**
   * Handle creating a new roadmap
   */
  const handleCreateRoadmap = (): void => {
    if (!canCreateRoadmap) {
      setShowUpgradeModal(true)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newId = createRoadmap()
    onCreateRoadmap()
  }

  /**
   * Handle updating phases of active roadmap
   */
  const handleUpdatePhases = (newPhases: Phase[]): void => {
    if (activeRoadmapId) {
      updateRoadmapPhases(activeRoadmapId, newPhases)
      setPhases(newPhases)
    }
    if (activeRoadmap) {
      updateData(activeRoadmap)
    }
  }

  /**
   * Handle toggling form visibility
   */
  const handleToggleForm = (): void => {
    setShowForm(!showForm)
  }

  /**
   * Handle PDF export
   */
  const handleExportPdf = async (): Promise<void> => {
    if (!hasPdfExport) {
      setShowUpgradeModal(true)
      return
    }
    await exportToPDF('content-to-export')
  }

  // Sync phases when active roadmap changes
  useState(() => {
    if (activeRoadmap) {
      setPhases(activeRoadmap.phases)
    }
  })

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Sidebar */}
      <Sidebar
        roadmaps={roadmaps}
        activeRoadmapId={activeRoadmapId}
        onSelectRoadmap={selectRoadmap}
        onCreateRoadmap={handleCreateRoadmap}
        onDeleteRoadmap={deleteRoadmap}
        onDeleteRoadmapTrigger={onDeleteRoadmap}
        onUpdateRoadmap={updateRoadmap}
        canCreate={canCreateRoadmap}
        onUpgradeClick={() => setShowUpgradeModal(true)}
        mobile={mobileMenuOpen}
        setMobile={setMobileMenuOpen}
        setShowForm={setShowForm}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <BuilderHeader
          onBack={onBack}
          onExportPdf={handleExportPdf}
          hasPdfExport={hasPdfExport}
          currentPlan={subscription.plan}
          roadmapName={activeRoadmap?.name || ''}
          mobile={mobileMenuOpen}
          setMobile={setMobileMenuOpen}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {!activeRoadmap ? (
              /* No roadmap selected */
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h2 className="mb-2 text-slate-700">No Roadmap Selected</h2>
                <p className="text-slate-500 mb-6">
                  Create or select a roadmap to get started
                </p>
                <Button
                  onClick={handleCreateRoadmap}
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Roadmap
                </Button>
              </div>
            ) : (
              <>
                {/* Title Section */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 mb-4 text-purple-600">
                    <Sparkles className="w-6 h-6" />
                    <span className="text-sm uppercase tracking-wider">
                      Interactive Generator
                    </span>
                  </div>
                  <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    {activeRoadmap.name}
                  </h1>
                  {activeRoadmap.description && (
                    <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                      {activeRoadmap.description}
                    </p>
                  )}
                  <Button
                    onClick={handleToggleForm}
                    className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                  >
                    {showForm ? (
                      <>Hide Editor</>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-[0.5px]" />
                        Edit roadmap
                      </>
                    )}
                  </Button>
                </div>

                {/* Roadmap Editor Form */}
                {showForm && (
                  <div className="mb-12">
                    <RoadmapForm
                      phases={activeRoadmap.phases}
                      onUpdatePhases={handleUpdatePhases}
                    />
                  </div>
                )}

                {/* Main Content: Phase Cards or Empty State */}
                {activeRoadmap.phases.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div
                    id="content-to-export"
                    className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-5"
                  >
                    {/* Phase Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                      {activeRoadmap.phases.map(
                        (phase: Phase, index: number) => (
                          <PhaseCard
                            key={phase.id}
                            phase={phase}
                            index={index}
                            onToggleMilestone={toggleMilestone}
                          />
                        )
                      )}
                    </div>

                    {/* Timeline Section */}
                    <TimelineSection
                      phases={activeRoadmap.phases}
                      overallProgress={getOverallProgress()}
                      completedMilestones={getTotalCompletedMilestones()}
                      totalMilestones={getTotalMilestones()}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={onUpgrade}
        />
      )}
    </div>
  )
}
