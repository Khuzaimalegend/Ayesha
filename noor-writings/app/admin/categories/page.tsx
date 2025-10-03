import { createClient } from "@/lib/supabase/server"
import { CategoryManagement } from "@/components/admin/category-management"

export default async function CategoriesPage() {
  const supabase = createClient()

  // Fetch categories with post counts
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  // Get post counts for each category
  const { data: posts } = await supabase.from("blog_posts").select("category")

  const categoriesWithCounts = categories?.map((category) => ({
    ...category,
    postCount: posts?.filter((post) => post.category === category.slug).length || 0,
  }))

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-serif text-foreground">Manage Categories</h1>
        <p className="text-muted-foreground">Organize your content with categories</p>
      </div>

      <CategoryManagement categories={categoriesWithCounts || []} />
    </div>
  )
}
