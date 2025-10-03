import { createClient } from "@/lib/supabase/server"
import { BlogUploadForm } from "@/components/admin/blog-upload-form"
import { notFound } from "next/navigation"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const supabase = createClient()

  // Fetch the post to edit
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

  if (!post) {
    notFound()
  }

  // Fetch categories for the form
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-serif text-foreground">Edit Post</h1>
          <p className="text-muted-foreground">Update your Islamic reflection</p>
        </div>

        <BlogUploadForm categories={categories || []} initialData={post} />
      </div>
    </div>
  )
}
