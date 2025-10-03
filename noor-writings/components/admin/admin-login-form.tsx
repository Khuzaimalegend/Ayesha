"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/auth-actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Sign In to Admin
        </>
      )}
    </Button>
  )
}

export function AdminLoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
    }
  }, [state, router])

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-center">Admin Access</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@noorwritings.com"
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </label>
            <Input id="password" name="password" type="password" required className="bg-background border-border" />
          </div>

          <SubmitButton />
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-md">
          <h3 className="font-medium text-sm mb-2">Demo Credentials:</h3>
          <p className="text-xs text-muted-foreground">
            Email: admin@noorwritings.com
            <br />
            Password: admin123
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
