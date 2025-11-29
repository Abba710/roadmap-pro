import { Target, Zap, Download, Palette, Rocket } from 'lucide-react'
import { Card } from '../ui/card'

/**
 * Feature card data
 */
const features = [
  {
    icon: Zap,
    title: 'Drag & Drop Builder',
    description:
      'Intuitive interface that makes creating roadmaps effortless. Reorder phases and tasks with simple drag and drop.',
  },
  {
    icon: Target,
    title: 'Progress Tracking',
    description:
      'Visualize your progress with beautiful charts and timelines. See exactly where you are in your journey.',
  },
  {
    icon: Palette,
    title: 'Custom Themes',
    description:
      'Choose from multiple color themes to match your brand. Make your roadmaps truly yours.',
  },
  {
    icon: Download,
    title: 'PDF Export',
    description:
      'Export your roadmaps as high-quality PDFs for presentations and sharing with stakeholders.',
  },
  {
    icon: Rocket,
    title: 'Coming Soon Updates',
    description:
      'New features and improvements are on the way - stay tuned as we keep adding more functionality to make your experience even better.',
  },
]

/**
 * Features section showcasing product capabilities
 */
export function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-slate-900">
            Everything You Need to Plan Successfully
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features to help you create, manage, and share your
            roadmaps with ease
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow border-2 border-slate-100 hover:border-purple-200"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
