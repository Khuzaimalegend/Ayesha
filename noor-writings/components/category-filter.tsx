import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
  currentCategory?: string
}

export function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  return (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            asChild
            variant={!currentCategory ? "default" : "outline"}
            size="sm"
            className={!currentCategory ? "bg-amber-600 hover:bg-amber-700" : ""}
          >
            <Link href="/blog">All Articles</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              asChild
              variant={currentCategory === category.name ? "default" : "outline"}
              size="sm"
              className={currentCategory === category.name ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              <Link href={`/blog?category=${encodeURIComponent(category.name)}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
