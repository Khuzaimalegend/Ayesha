"use client"

import { useState, useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, Eye, Upload, X, Plus, BookOpen, Star, Tag, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { createOrUpdatePost } from "@/lib/blog-actions"

interface BlogUploadFormProps {
  categories: any[]
  initialData?: any
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()

  return (
    <div className="flex gap-3">
      <Button type="submit" name="action" value="save" disabled={pending} className="flex-1">
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEdit ? "Update Post" : "Save Post"}
          </>
        )}
      </Button>

      <Button type="submit" name="action" value="publish" disabled={pending} variant="default">
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Eye className="mr-2 h-4 w-4" />
            {isEdit ? "Update & Publish" : "Publish Now"}
          </>
        )}
      </Button>
    </div>
  )
}

export function BlogUploadForm({ categories, initialData }: BlogUploadFormProps) {
  const router = useRouter()
  const [state, formAction] = useActionState(createOrUpdatePost, null)
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [newTag, setNewTag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialData?.category || "")
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image_url || "")

  const isEdit = !!initialData

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/posts")
    }
  }, [state, router])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden fields for edit mode */}
      {isEdit && <input type="hidden" name="id" value={initialData.id} />}
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <input type="hidden" name="category" value={selectedCategory} />
      <input type="hidden" name="featured_image_url" value={featuredImage} />

      {state?.error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Post Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter your post title..."
                  defaultValue={initialData?.title}
                  required
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="url-friendly-title"
                  defaultValue={initialData?.slug}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Leave empty to auto-generate from title</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief description of your post..."
                  defaultValue={initialData?.excerpt}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your Islamic reflection here..."
                  defaultValue={initialData?.content}
                  required
                  rows={15}
                  className="font-serif"
                />
                <p className="text-xs text-muted-foreground">You can use Markdown formatting for rich text</p>
              </div>
            </CardContent>
          </Card>

          {/* Quranic Verse Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quranic Verse (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quranic_verse">Verse Text</Label>
                <Textarea
                  id="quranic_verse"
                  name="quranic_verse"
                  placeholder="Enter the Quranic verse in Arabic or English..."
                  defaultValue={initialData?.quranic_verse}
                  rows={3}
                  className="font-arabic text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verse_reference">Verse Reference</Label>
                <Input
                  id="verse_reference"
                  name="verse_reference"
                  placeholder="e.g., Quran 2:255 (Ayat al-Kursi)"
                  defaultValue={initialData?.verse_reference}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Published
                </Label>
                <Switch id="published" name="published" defaultChecked={initialData?.published} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured
                </Label>
                <Switch id="featured" name="featured" defaultChecked={initialData?.featured} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="author_name">Author Name</Label>
                <Input
                  id="author_name"
                  name="author_name"
                  placeholder="Author name"
                  defaultValue={initialData?.author_name || "Noor Writings"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featured_image_input">Image URL</Label>
                <Input
                  id="featured_image_input"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {featuredImage && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <img
                    src={featuredImage || "/placeholder.svg"}
                    alt="Featured image preview"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                </div>
              )}

              <Button type="button" variant="outline" className="w-full bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Buttons */}
      <Card>
        <CardContent className="pt-6">
          <SubmitButton isEdit={isEdit} />
        </CardContent>
      </Card>
    </form>
  )
}
