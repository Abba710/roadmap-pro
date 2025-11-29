import { Plus } from 'lucide-react'

/**
 * Empty state component shown when no phases exist
 */
export function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 mb-4">
        <Plus className="w-10 h-10 text-slate-400" />
      </div>
      <h2 className="mb-2 text-slate-700">No Phases Yet</h2>
      <p className="text-slate-500 mb-6">Add the first phase to your roadmap</p>
    </div>
  )
}
