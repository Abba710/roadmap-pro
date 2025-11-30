import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { blogPosts } from '@/data/blogposts'

export function BlogPrew() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden border-2 border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all"
        >
          {/* Post Image */}
          <div className="h-48 overflow-hidden bg-slate-200">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Post Content */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
              <span className="text-xs text-slate-500">{post.date}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-600 text-sm mb-6 line-clamp-2">
              {post.excerpt}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto"
            >
              <a href={post.url}>Read More</a>
              <ArrowRight className="ml-1 w-3 h-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
