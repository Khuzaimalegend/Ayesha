"use server"

import { createClient } from "@/lib/supabase/server"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function createOrUpdateCategory(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to manage categories" }
  }

  try {
    const id = formData.get("id")
    const name = formData.get("name")?.toString()
    const slug = formData.get("slug")?.toString() || generateSlug(name || "")
    const description = formData.get("description")?.toString()

    if (!name) {
      return { error: "Category name is required" }
    }

    const categoryData = {
      name,
      slug,
      description,
    }

    if (id) {
      // Update existing category
      const { error } = await supabase.from("categories").update(categoryData).eq("id", id)

      if (error) {
        return { error: error.message }
      }
    } else {
      // Create new category
      const { error } = await supabase.from("categories").insert(categoryData)

      if (error) {
        return { error: error.message }
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Category creation/update error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function deleteCategory(categoryId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to delete categories" }
  }

  try {
    const { error } = await supabase.from("categories").delete().eq("id", categoryId)

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Category deletion error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
