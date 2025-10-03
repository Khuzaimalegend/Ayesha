"use client"

import { useState, useActionState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react"
import { createOrUpdateCategory, deleteCategory } from "@/lib/category-actions"
import { useRouter } from "next/navigation"

interface CategoryManagementProps {
  categories: any[]
}

export function CategoryManagement({ categories }: CategoryManagementProps) {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [state, formAction] = useActionState(createOrUpdateCategory, null)

  const handleDelete = async (categoryId: string) => {
    const result = await deleteCategory(categoryId)
    if (result.success) {
      router.refresh()
    }
  }

  const resetForm = () => {
    setIsCreating(false)
    setEditingCategory(null)
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingCategory ? "Edit Category" : isCreating ? "New Category" : "Categories"}</CardTitle>
          </CardHeader>
          <CardContent>
            {isCreating || editingCategory ? (
              <form action={formAction} className="space-y-4">
                {editingCategory && <input type="hidden" name="id" value={editingCategory.id} />}

                {state?.error && (
                  <div className="bg-destructive/10 border border-destructive/50 text-destructive px-3 py-2 rounded text-sm">
                    {state.error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Category name"
                    defaultValue={editingCategory?.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="category-slug"
                    defaultValue={editingCategory?.slug}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty to auto-generate</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Category description"
                    defaultValue={editingCategory?.description}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingCategory ? "Update" : "Create"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <Button onClick={() => setIsCreating(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Categories ({categories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">{category.description}</div>
                          <div className="text-xs text-muted-foreground font-mono">/{category.slug}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{category.postCount} posts</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{category.name}"? This will not delete the posts in
                                  this category.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {categories.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No categories yet. Create your first category!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
