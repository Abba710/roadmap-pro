import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '@/utils/simpleUtils'
import { BlogPrew } from '@/components/blog/BlogArticlesPrev'

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-slate-900">Latest from Our Blog</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tips, guides, and insights to help you master roadmap planning
          </p>
        </div>
        <BlogPrew />
        {/* View all button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <NavLink
              to="/blog/"
              onClick={scrollToTop}
              className="hover:text-white transition-colors"
            >
              View All Posts
            </NavLink>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
