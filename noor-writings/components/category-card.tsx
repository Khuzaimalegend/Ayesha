import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  blog_posts?: { count: number }[]
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const postCount = category.blog_posts?.[0]?.count || 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-amber-200/50">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <BookOpen className="h-6 w-6 text-amber-600" />
          <span className="text-sm text-muted-foreground">
            {postCount} article{postCount !== 1 ? "s" : ""}
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold group-hover:text-amber-600 transition-colors">
          {category.name}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {category.description || "Explore articles in this category"}
        </p>
        <Button
          asChild
          variant="outline"
          className="w-full border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
        >
          <Link href={`/blog?category=${encodeURIComponent(category.name)}`}>Explore Articles</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
