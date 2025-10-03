import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  published: boolean
  created_at: string
}

interface RecentPostsAdminProps {
  posts: BlogPost[]
}

export function RecentPostsAdmin({ posts }: RecentPostsAdminProps) {
  return (
    <Card className="border-amber-200/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Posts</CardTitle>
          <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700">
            <Link href="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No posts yet</p>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/admin/posts/new">Create your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium line-clamp-1">{post.title}</h3>
                    <Badge variant={post.published ? "default" : "secondary"} className="text-xs">
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
