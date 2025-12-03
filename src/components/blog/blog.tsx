import { Header } from '../landing/Header'
import { Footer } from '../landing/Footer'
import type { UserSubscription } from '../../types/subscription'
import { blogPosts } from '@/data/blogposts'
import { BlogPrew } from '@/components/blog/BlogArticlesPrev'
import type { User } from '@/types/user'

interface BlogPageProps {
  onGetStarted: () => void
  subscription: UserSubscription
  userData: User | null
  onSignIn: () => void
  onSignOut: () => void
}

export function BlogPage({ onGetStarted, userData, onSignIn, onSignOut }: BlogPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onGetStarted={onGetStarted} userData={userData} onSignIn={onSignIn} onSignOut={onSignOut} />

      <main className="flex-grow">
        {/* Blog Posts Grid */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover insights and strategies to grow your business
              </p>
            </div>
            <BlogPrew />
          </div>
        </section>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No blog posts yet
              </h3>
              <p className="text-slate-600">
                Check back soon for insights and guides on roadmap planning!
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
