import { createClient } from "@/lib/supabase/server"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()
  const baseUrl = "https://noorwritings.com"

  // Get all published blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at, created_at")
    .eq("published", true)
    .order("updated_at", { ascending: false })

  // Get all categories
  const { data: categories } = await supabase.from("categories").select("slug")

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Blog post pages
  const blogPages =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || []

  // Category pages
  const categoryPages =
    categories?.map((category) => ({
      url: `${baseUrl}/blog?category=${encodeURIComponent(category.slug)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || []

  return [...staticPages, ...blogPages, ...categoryPages]
}
