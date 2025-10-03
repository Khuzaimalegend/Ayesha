"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Sign In
        </>
      )}
    </Button>
  )
}

export function AdminLoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
    }
  }, [state, router])

  return (
    <Card className="border-amber-200/50">
      <CardHeader>
        <CardTitle className="text-center">Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{state.error}</div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@noorwritings.com"
              required
              className="border-amber-200 focus:border-amber-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="border-amber-200 focus:border-amber-400"
            />
          </div>

          <SubmitButton />
        </form>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
          <p className="text-sm italic text-foreground mb-1">
            "And whoever fears Allah - He will make for him a way out."
          </p>
          <p className="text-xs text-amber-600 font-medium">— Quran 65:2</p>
        </div>
      </CardContent>
    </Card>
  )
}
