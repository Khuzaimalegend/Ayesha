import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLoginForm } from "@/components/admin-login-form"

export const metadata = {
  title: "Admin Login - Noor Writings",
  description: "Admin access to Noor Writings content management system.",
}

export default async function AdminLoginPage() {
  // Check if user is already logged in
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to admin dashboard
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background islamic-pattern">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-pink-300 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <h1 className="font-serif text-3xl font-bold gradient-text mb-2">Noor Writings</h1>
          <p className="text-muted-foreground">Admin Access</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
