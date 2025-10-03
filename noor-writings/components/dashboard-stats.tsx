import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, Edit, FolderOpen } from "lucide-react"

interface DashboardStatsProps {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalCategories: number
}

export function DashboardStats({ totalPosts, publishedPosts, draftPosts, totalCategories }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Published",
      value: publishedPosts,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Drafts",
      value: draftPosts,
      icon: Edit,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-amber-200/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
