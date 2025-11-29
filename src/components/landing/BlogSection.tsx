import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

/**
 * Blog posts data
 */
const blogPosts = [
  {
    id: 1,
    title: "How to Create Effective Product Roadmaps",
    excerpt: "Learn the best practices for building roadmaps that align your team and drive results.",
    category: "Guide",
    date: "Nov 20, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "5 Common Roadmap Mistakes to Avoid",
    excerpt: "Discover the pitfalls that derail roadmap planning and how to steer clear of them.",
    category: "Tips",
    date: "Nov 15, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Agile Roadmapping for Modern Teams",
    excerpt: "Adapt your roadmap strategy for agile development and stay flexible as priorities change.",
    category: "Strategy",
    date: "Nov 10, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
  },
];

/**
 * Blog section with featured posts
 */
export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-slate-900">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tips, guides, and insights to help you master roadmap planning
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-purple-200 cursor-pointer group"
            >
              {/* Post image */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-purple-700 border-0">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Post content */}
              <div className="p-6">
                <h3 className="mb-3 text-slate-900 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Post meta */}
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Read more link */}
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:text-purple-600 p-0 h-auto"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Posts
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
