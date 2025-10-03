import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  created_at: string
}

interface RecentPostsProps {
  posts: BlogPost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  if (!posts.length) return null

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 gradient-text">Recent Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay connected with our latest spiritual reflections and Islamic teachings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.slice(0, 6).map((post) => (
            <Card key={post.id} className="group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-serif text-lg font-semibold group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                >
                  Continue Reading →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
