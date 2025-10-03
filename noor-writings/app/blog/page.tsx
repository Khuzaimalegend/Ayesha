import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog-grid"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { blogPosts } from "@/lib/blog-data"

export const metadata = {
  title: "Blog - Islamic Reflections & Spiritual Insights",
  description:
    "Explore our collection of Islamic reflections, Quranic insights, and spiritual guidance for the modern Muslim soul.",
  keywords: ["Islamic blog", "Quran studies", "Islamic reflections", "spiritual guidance", "Islamic teachings"],
  openGraph: {
    title: "Blog - Noor Writings",
    description: "Explore our collection of Islamic reflections, Quranic insights, and spiritual guidance.",
    type: "website",
  },
  alternates: {
    canonical: "https://noorwritings.com/blog",
  },
}

export default async function BlogPage() {
  const posts = blogPosts

  const breadcrumbItems = [{ label: "Blog" }]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 islamic-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text">Islamic Reflections</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover spiritual insights, Quranic wisdom, and guidance for the modern Muslim journey
              </p>

              {/* Quranic Verse */}
              <div className="p-6 bg-card rounded-lg border border-amber-200/50 max-w-2xl mx-auto">
                <blockquote className="font-serif text-lg italic text-foreground mb-2">
                  "And whoever fears Allah - He will make for him a way out."
                </blockquote>
                <cite className="text-amber-600 font-medium text-sm">— Quran 65:2</cite>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </div>
  )
}
