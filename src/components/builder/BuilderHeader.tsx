import { ArrowLeft, Download, Sparkles, Crown, Menu, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import type { PlanType } from '../../types/subscription'

interface BuilderHeaderProps {
  onBack: () => void
  onExportPdf: () => void
  hasPdfExport: boolean
  currentPlan: PlanType
  roadmapName?: string
  mobile: boolean
  setMobile: (mobile: boolean) => void
}

/**
 * Header for the roadmap builder
 */
export function BuilderHeader({
  onBack,
  onExportPdf,
  hasPdfExport,
  currentPlan,
  roadmapName,
  mobile,
  setMobile,
}: BuilderHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobile(!mobile)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobile ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>
          {/* Left: Back button and logo */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-900">RoadmapPro</span>
            </div>
            {roadmapName && (
              <div className="hidden md:block text-slate-400">
                <span className="mx-2">/</span>
                <span className="text-slate-600">{roadmapName}</span>
              </div>
            )}
          </div>

          {/* Right: Plan badge and export button */}
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={
                currentPlan === 'free'
                  ? 'bg-slate-50 text-slate-700 border-slate-300'
                  : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-300'
              }
            >
              {currentPlan === 'free' ? (
                'Free Plan'
              ) : (
                <>
                  <Crown className="w-3 h-3 mr-1" />
                  Pro Plan
                </>
              )}
            </Badge>
            <Button
              onClick={onExportPdf}
              variant={hasPdfExport ? 'default' : 'outline'}
              className={
                hasPdfExport
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : ''
              }
            >
              <Download className="w-4 h-4 mr-2" />
              {hasPdfExport ? 'Export PDF' : 'Export PDF (Pro)'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
