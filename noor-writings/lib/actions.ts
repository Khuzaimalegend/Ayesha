"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Authentication actions
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/")
  redirect("/admin/login")
}

// Blog post actions
export async function createPost(postData: {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  featured: boolean
  published: boolean
  quranic_verse?: string
  verse_reference?: string
  meta_title?: string
  meta_description?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const { error } = await supabase.from("blog_posts").insert({
      ...postData,
      author_name: user.email?.split("@")[0] || "Admin",
    })

    if (error) {
      console.error("[v0] Create post error:", error)
      throw new Error(error.message)
    }

    revalidatePath("/admin")
    revalidatePath("/blog")
    revalidatePath("/")
  } catch (error) {
    console.error("[v0] Create post error:", error)
    throw error
  }
}

export async function updatePost(
  id: string,
  postData: {
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    featured: boolean
    published: boolean
    quranic_verse?: string
    verse_reference?: string
    meta_title?: string
    meta_description?: string
  },
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        ...postData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("[v0] Update post error:", error)
      throw new Error(error.message)
    }

    revalidatePath("/admin")
    revalidatePath("/blog")
    revalidatePath("/")
  } catch (error) {
    console.error("[v0] Update post error:", error)
    throw error
  }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      console.error("[v0] Delete post error:", error)
      throw new Error(error.message)
    }

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    revalidatePath("/")
  } catch (error) {
    console.error("[v0] Delete post error:", error)
    throw error
  }
}

// Contact form actions
export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString()
  const email = formData.get("email")?.toString()
  const subject = formData.get("subject")?.toString()
  const message = formData.get("message")?.toString()
  const category = formData.get("category")?.toString() || "general"

  if (!name || !email || !subject || !message) {
    return { error: "All required fields must be filled" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address" }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      subject,
      message,
      category,
    })

    if (error) {
      console.error("[v0] Database error:", error)
      return { error: "Failed to send message. Please try again later." }
    }

    return {
      success:
        "جَزَاكَ اللَّهُ خَيْرًا! Your message has been sent successfully. We'll respond within 24-48 hours, In Sha Allah.",
    }
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return { error: "Failed to send message. Please try again later." }
  }
}
