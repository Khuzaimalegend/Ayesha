"use server"

import { createClient } from "@/lib/supabase/server"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function createOrUpdatePost(prevState: any, formData: FormData) {
  const supabase = createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to create posts" }
  }

  try {
    const id = formData.get("id")
    const title = formData.get("title")?.toString()
    const slug = formData.get("slug")?.toString() || generateSlug(title || "")
    const excerpt = formData.get("excerpt")?.toString()
    const content = formData.get("content")?.toString()
    const category = formData.get("category")?.toString()
    const tags = JSON.parse(formData.get("tags")?.toString() || "[]")
    const quranic_verse = formData.get("quranic_verse")?.toString()
    const verse_reference = formData.get("verse_reference")?.toString()
    const author_name = formData.get("author_name")?.toString()
    const featured_image_url = formData.get("featured_image_url")?.toString()
    const action = formData.get("action")?.toString()

    const published = action === "publish" || formData.get("published") === "on"
    const featured = formData.get("featured") === "on"

    if (!title || !excerpt || !content) {
      return { error: "Title, excerpt, and content are required" }
    }

    const postData = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      quranic_verse,
      verse_reference,
      author_name,
      featured_image_url,
      published,
      featured,
      updated_at: new Date().toISOString(),
    }

    if (id) {
      // Update existing post
      const { error } = await supabase.from("blog_posts").update(postData).eq("id", id)

      if (error) {
        return { error: error.message }
      }
    } else {
      // Create new post
      const { error } = await supabase.from("blog_posts").insert({
        ...postData,
        created_at: new Date().toISOString(),
      })

      if (error) {
        return { error: error.message }
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Post creation/update error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function deletePost(postId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to delete posts" }
  }

  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", postId)

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Post deletion error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
