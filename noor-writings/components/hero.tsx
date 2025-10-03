import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 islamic-pattern">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Islamic Greeting */}
          <div className="mb-6 animate-fade-in">
            <p className="text-amber-600 font-medium text-lg">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            <p className="text-muted-foreground text-sm mt-1">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">Noor Writings</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Illuminating hearts through Islamic reflections, Quranic insights, and spiritual guidance for the modern
            Muslim soul.
          </p>

          <div className="mb-10 p-6 bg-card rounded-lg border border-amber-200/50 max-w-2xl mx-auto hover:shadow-lg transition-all duration-300 hover:border-amber-300/70 animate-fade-in-up">
            <blockquote className="font-serif text-lg md:text-xl text-foreground italic mb-2">
              "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His
              purpose."
            </blockquote>
            <cite className="text-amber-600 font-medium text-sm">— Quran 65:3</cite>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Link href="/blog">Explore Articles</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent hover:scale-105 transition-all duration-200"
            >
              <Link href="/about">About Our Mission</Link>
            </Button>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-pink-50 rounded-lg border border-amber-200/50 animate-fade-in-up">
            <h3 className="font-serif text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Receive weekly Islamic reflections and spiritual insights
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-pink-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-amber-400/20 rounded-full blur-xl animate-pulse"></div>
    </section>
  )
}
