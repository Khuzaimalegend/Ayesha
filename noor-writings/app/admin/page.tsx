import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentPostsAdmin } from "@/components/recent-posts-admin"

export const metadata = {
  title: "Admin Dashboard - Noor Writings",
  description: "Content management dashboard for Noor Writings.",
}

export default async function AdminDashboard() {
  const supabase = createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch dashboard data
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

  const { count: publishedPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true)

  const { count: draftPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("published", false)

  const { data: categories } = await supabase.from("categories").select("*")

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center p-6 bg-amber-50 rounded-lg border-l-4 border-amber-400">
          <h1 className="font-serif text-3xl font-bold gradient-text mb-2">Welcome to Noor Writings Admin</h1>
          <p className="text-muted-foreground mb-3">Manage your Islamic content and inspire the Ummah</p>
          <div className="text-amber-600 font-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
          <p className="text-xs text-muted-foreground mt-1">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats
          totalPosts={totalPosts || 0}
          publishedPosts={publishedPosts || 0}
          draftPosts={draftPosts || 0}
          totalCategories={categories?.length || 0}
        />

        {/* Recent Posts */}
        <RecentPostsAdmin posts={posts || []} />
      </div>
    </AdminLayout>
  )
}
