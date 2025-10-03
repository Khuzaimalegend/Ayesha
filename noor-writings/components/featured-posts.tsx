import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  created_at: string
  quranic_verse?: string
  verse_reference?: string
}

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts.length) return null

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 gradient-text">Featured Reflections</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most inspiring articles that have touched hearts and illuminated minds
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300 border-amber-200/50 hover:border-amber-300/70 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                  >
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-serif text-xl font-semibold group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                {post.quranic_verse && (
                  <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400 mb-4 hover:bg-amber-100/50 transition-colors">
                    <p className="text-sm italic text-foreground mb-1">"{post.quranic_verse}"</p>
                    <p className="text-xs text-amber-600 font-medium">— {post.verse_reference}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-all duration-200 hover:underline flex items-center gap-1 group/link"
                  >
                    Read More
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Clock className="h-3 w-3 mr-1" />5 min read
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent hover:scale-105 transition-all duration-200"
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
