"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, Eye, Send } from "lucide-react"
import { createOrUpdatePost } from "@/lib/blog-actions" // use existing server action

interface Category {
  id: string
  name: string
  slug: string
}

interface Post {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  featured: boolean
  published: boolean
  meta_title?: string
  meta_description?: string
}

interface PostEditorProps {
  categories: Category[]
  post?: Post
}

export function PostEditor({ categories, post }: PostEditorProps) {
  const router = useRouter()

  const [formData, setFormData] = useState<Post>({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || categories[0]?.slug || "",
    featured: post?.featured || false,
    published: post?.published || false,
    meta_title: post?.meta_title || "",
    meta_description: post?.meta_description || "",
  })

  // Server action state (captures { success, error })
  const [state, formAction] = useActionState<any, FormData>(createOrUpdatePost as any, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
      router.refresh()
    }
  }, [state, router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title,
    }))
  }

  // Helper submit button to reflect pending status
  function SubmitButton({
    variant,
    value,
    children,
    className,
  }: {
    variant?: "outline" | "default"
    value: "save" | "publish"
    children: React.ReactNode
    className?: string
  }) {
    const { pending } = useFormStatus()
    const isPublish = value === "publish"
    return (
      <Button
        type="submit"
        variant={variant}
        name="action"
        value={value}
        className={isPublish ? `bg-amber-600 hover:bg-amber-700 ${className || ""}` : className}
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isPublish ? (
          <Eye className="mr-2 h-4 w-4" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        {isPublish ? "Publish Article" : "Save Draft"}
      </Button>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Include id for edit mode */}
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

      {/* Ensure 'featured' sends when true (unchecked fields are omitted by browsers) */}
      {formData.featured ? <input type="hidden" name="featured" value="on" /> : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-amber-600" />
            Article Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error state from action */}
          {state?.error ? (
            <div className="p-3 rounded-md border border-destructive/30 text-destructive text-sm">{state.error}</div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title" // name for server action
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title..."
              className="text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              name="slug" // name for server action
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="article-url-slug"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              name="excerpt" // name for server action
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of the article..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category" // name for server action
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured">Featured Article</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="content">Article Content *</Label>
            <Textarea
              id="content"
              name="content" // name for server action
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your Islamic article content here... You can use markdown formatting."
              rows={20}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">
              Tip: Use **bold**, *italic*, and ### headings for better formatting
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              // Not stored in DB yet; kept for future
              value={formData.meta_title}
              onChange={(e) => setFormData((prev) => ({ ...prev, meta_title: e.target.value }))}
              placeholder="SEO title for search engines"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              // Not stored in DB yet; kept for future
              value={formData.meta_description}
              onChange={(e) => setFormData((prev) => ({ ...prev, meta_description: e.target.value }))}
              placeholder="Brief description for search engines (150-160 characters)"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center pt-6 border-t">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>

        <div className="flex gap-3">
          <SubmitButton variant="outline" value="save" />

          <SubmitButton value="publish" className="min-w-[160px]" />
        </div>
      </div>
    </form>
  )
}
