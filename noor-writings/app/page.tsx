import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedPosts } from "@/components/featured-posts"
import { RecentPosts } from "@/components/recent-posts"
import { Footer } from "@/components/footer"
import { PrayerTimes } from "@/components/prayer-times"
import { DhikrCounter } from "@/components/dhikr-counter"
import { IslamicCalendar } from "@/components/islamic-calendar"
import { DailyVerse } from "@/components/daily-verse"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured posts
  const { data: featuredPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch recent posts
  const { data: recentPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        <section className="py-12 bg-gradient-to-b from-amber-50/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-8 gradient-text">Islamic Tools & Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DailyVerse />
              <PrayerTimes />
              <IslamicCalendar />
              <DhikrCounter />
            </div>
          </div>
        </section>

        <FeaturedPosts posts={featuredPosts || []} />
        <RecentPosts posts={recentPosts || []} />
      </main>
      <Footer />
    </div>
  )
}
