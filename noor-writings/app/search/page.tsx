import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog-grid"
import type { Metadata } from "next"

interface SearchPageProps {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ""

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: query
      ? `Find Islamic articles and spiritual insights related to "${query}" on Noor Writings.`
      : "Search through our collection of Islamic articles and spiritual insights.",
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const supabase = createClient()
  const query = searchParams.q || ""

  let posts = []

  if (query) {
    const { data } = await supabase
      .from("blog_posts")
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq("published", true)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order("created_at", { ascending: false })

    posts = data || []
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              {query ? `Search Results for "${query}"` : "Search Articles"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {query
                ? `Found ${posts.length} article${posts.length !== 1 ? "s" : ""} matching your search`
                : "Search through our collection of Islamic articles and spiritual insights"}
            </p>
          </div>

          {/* Search Results */}
          {query && (
            <div className="mb-8">
              {posts.length > 0 ? (
                <BlogGrid posts={posts} />
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any articles matching "{query}". Try different keywords or browse our categories.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Islamic Reflections</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Quranic Insights</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Spiritual Growth</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Duas and Dhikr</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Popular Articles */}
          {!query && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Search</h3>
              <p className="text-muted-foreground mb-6">
                Use the search bar above to find articles on Islamic topics, Quranic verses, spiritual guidance, and
                more.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
