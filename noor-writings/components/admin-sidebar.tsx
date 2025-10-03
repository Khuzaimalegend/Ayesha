import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, FolderOpen, Settings, Plus } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "New Article", href: "/admin/posts/new", icon: Plus }, // Added new article link
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-card border-r min-h-screen">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-amber-50 hover:text-amber-700",
                "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Islamic Quote */}
      <div className="p-4 mt-8">
        <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
          <p className="text-xs italic text-foreground mb-1">
            "And whoever relies upon Allah - then He is sufficient for him."
          </p>
          <p className="text-xs text-amber-600 font-medium">— Quran 65:3</p>
        </div>
      </div>
    </aside>
  )
}
