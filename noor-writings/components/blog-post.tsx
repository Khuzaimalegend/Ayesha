import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

interface BlogPostData {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  author_name?: string
  quranic_verse?: string
  verse_reference?: string
  tags?: string[]
}

interface BlogPostProps {
  post: BlogPostData
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {post.category}
              </Badge>
              <div className="flex items-center text-muted-foreground text-sm gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author_name || "Noor Writings"}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />5 min read
                </div>
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight">{post.title}</h1>

            {/* Quranic Verse */}
            {post.quranic_verse && (
              <div className="p-6 bg-amber-50 rounded-lg border-l-4 border-amber-400 mb-8">
                <blockquote className="font-serif text-lg italic text-foreground mb-2">
                  "{post.quranic_verse}"
                </blockquote>
                <cite className="text-amber-600 font-medium">— {post.verse_reference}</cite>
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-amber-600 border-amber-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Islamic Closing */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-amber-600 font-medium mb-2">وَاللَّهُ أَعْلَمُ</p>
            <p className="text-muted-foreground text-sm">(And Allah knows best)</p>
          </div>
        </div>
      </div>
    </article>
  )
}
