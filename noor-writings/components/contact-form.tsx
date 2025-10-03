"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Send } from "lucide-react"
import { submitContactForm } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="bg-amber-600 hover:bg-amber-700 text-white">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null)

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{state.error}</div>
      )}

      {state?.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
          {state.success}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your full name"
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="What would you like to discuss?"
          required
          className="border-amber-200 focus:border-amber-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Share your thoughts, questions, or feedback with us..."
          rows={6}
          required
          className="border-amber-200 focus:border-amber-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
        >
          <option value="general">General Inquiry</option>
          <option value="feedback">Feedback</option>
          <option value="article-suggestion">Article Suggestion</option>
          <option value="collaboration">Collaboration</option>
          <option value="technical">Technical Issue</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          * Required fields. We'll respond within 24-48 hours, In Sha Allah.
        </p>
        <SubmitButton />
      </div>
    </form>
  )
}
