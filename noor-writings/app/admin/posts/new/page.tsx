import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { PostEditor } from "@/components/post-editor"

export const metadata = {
  title: "New Article - Admin Dashboard",
  description: "Create a new Islamic article for Noor Writings.",
}

export default async function NewPostPage() {
  const supabase = createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch categories for the editor
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold gradient-text mb-2">Create New Article</h1>
          <p className="text-muted-foreground">Share Islamic wisdom and guidance with the Ummah</p>
        </div>

        <PostEditor categories={categories || []} />
      </div>
    </AdminLayout>
  )
}
