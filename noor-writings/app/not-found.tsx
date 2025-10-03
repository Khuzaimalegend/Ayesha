import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold text-foreground">Page not found</h1>
            <p className="mt-2 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or might have been moved.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="/blog" className="inline-flex text-primary underline">
                Go to Blog
              </a>
              <a href="/" className="inline-flex text-primary underline">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
