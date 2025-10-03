import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPost } from "@/components/blog-post"
import { RelatedPosts } from "@/components/related-posts"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BlogPostStructuredData } from "@/components/structured-data"
import { IslamicElements } from "@/components/islamic-elements" // Added Islamic elements for individual posts
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .maybeSingle()

  if (!post) {
    return {
      title: "Post Not Found - Noor Writings",
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: ["Islamic", "spirituality", "Quran", "faith", post.category, ...(post.tags || [])],
    authors: [{ name: post.author_name || "Noor Writings" }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name || "Noor Writings"],
      section: post.category,
      tags: post.tags || [],
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://noorwritings.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = await createClient()

  // Fetch the blog post
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .maybeSingle()

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold text-foreground">Post not found</h1>
              <p className="mt-2 text-muted-foreground">
                The post you&apos;re looking for doesn&apos;t exist or was unpublished.
              </p>
              <a href="/blog" className="mt-6 inline-flex text-primary underline">
                Back to Blog
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Fetch related posts from the same category
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .eq("category", post.category)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-background">
      <BlogPostStructuredData post={post} />
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
              { label: post.title },
            ]}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogPost post={post} />
              <RelatedPosts posts={relatedPosts || []} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <IslamicElements />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
