import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import { signOut } from "@/lib/actions"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-pink-300 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-serif text-xl font-semibold gradient-text">Noor Writings</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Admin</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" target="_blank">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
