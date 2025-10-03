import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  created_at: string
  quranic_verse?: string
  verse_reference?: string
  author_name?: string
}

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (!posts.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">No articles found</h2>
            <p className="text-muted-foreground">
              Try selecting a different category or check back later for new content.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-amber-200/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
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
                  <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400 mb-4">
                    <p className="text-sm italic text-foreground mb-1">"{post.quranic_verse}"</p>
                    <p className="text-xs text-amber-600 font-medium">— {post.verse_reference}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                  >
                    Read More →
                  </Link>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Clock className="h-3 w-3 mr-1" />5 min read
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
