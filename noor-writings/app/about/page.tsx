import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Users, Star } from "lucide-react"

export const metadata = {
  title: "About Us - Noor Writings",
  description: "Learn about our mission to illuminate hearts through Islamic reflections and spiritual guidance.",
  openGraph: {
    title: "About Noor Writings - Islamic Reflections & Spiritual Guidance",
    description:
      "Discover our journey of sharing Islamic wisdom and spiritual insights with the global Muslim community.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 islamic-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text">About Noor Writings</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Illuminating hearts through Islamic reflections and spiritual guidance
              </p>

              {/* Islamic Greeting */}
              <div className="p-6 bg-card rounded-lg border border-amber-200/50 max-w-2xl mx-auto">
                <p className="text-amber-600 font-arabic text-lg mb-2">السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</p>
                <p className="text-muted-foreground text-sm">Peace be upon you and Allah's mercy and blessings</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Our Mission */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  Noor Writings was born from a deep desire to share the beauty and wisdom of Islam with hearts seeking
                  spiritual nourishment. In a world filled with distractions and challenges, we believe that the light
                  (Noor) of Islamic teachings can guide us toward inner peace, purpose, and connection with our Creator.
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  Our mission is simple yet profound: to create a sanctuary of Islamic reflections where modern Muslims
                  can find solace, inspiration, and practical guidance for their spiritual journey. Through carefully
                  crafted articles, Quranic insights, and thoughtful commentary, we aim to bridge the gap between
                  timeless Islamic wisdom and contemporary life.
                </p>

                {/* Quranic Verse */}
                <div className="p-6 bg-amber-50 rounded-lg border-l-4 border-amber-400 my-8">
                  <blockquote className="font-serif text-lg italic text-foreground mb-2">
                    "Allah is the light of the heavens and the earth. The example of His light is like a niche within
                    which is a lamp, the lamp is within glass, the glass as if it were a brilliant star..."
                  </blockquote>
                  <cite className="text-amber-600 font-medium">— Quran 24:35 (Ayat an-Nur)</cite>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 gradient-text">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3">
                        <Heart className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold">Authenticity</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Every reflection is rooted in authentic Islamic sources - the Quran, Sunnah, and scholarly wisdom,
                      ensuring spiritual accuracy and depth.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold">Accessibility</h3>
                    </div>
                    <p className="text-muted-foreground">
                      We present Islamic teachings in a way that resonates with modern hearts, making profound wisdom
                      accessible to all seekers.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3">
                        <Users className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold">Community</h3>
                    </div>
                    <p className="text-muted-foreground">
                      We foster a sense of spiritual brotherhood and sisterhood, creating a space where Muslims can grow
                      together in faith.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3">
                        <Star className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold">Excellence</h3>
                    </div>
                    <p className="text-muted-foreground">
                      We strive for Ihsan (excellence) in everything we do, from the quality of our content to the
                      beauty of our presentation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Our Story */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 gradient-text">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  Noor Writings began as a personal journey of spiritual reflection and growth. What started as private
                  contemplations on Islamic teachings gradually evolved into a calling to share these insights with the
                  broader Muslim community. We recognized that many of our brothers and sisters were seeking the same
                  spiritual nourishment and guidance that we found in our studies and reflections.
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  The name "Noor" (light) was chosen deliberately. Just as light dispels darkness and reveals hidden
                  beauty, we hope our writings illuminate the path toward spiritual growth and bring clarity to the
                  hearts of our readers. Each article is crafted with care, prayer, and the sincere intention to benefit
                  the Ummah.
                </p>

                {/* Hadith Quote */}
                <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-400 my-8">
                  <blockquote className="font-serif text-lg italic text-foreground mb-2">
                    "Whoever guides someone to virtue will be rewarded equivalent to him who practices that virtue."
                  </blockquote>
                  <cite className="text-green-600 font-medium">— Prophet Muhammad (ﷺ), Sahih Muslim</cite>
                </div>
              </div>
            </section>

            {/* Join Our Journey */}
            <section className="text-center p-8 bg-amber-50 rounded-lg border border-amber-200">
              <h2 className="font-serif text-3xl font-bold mb-4 gradient-text">Join Our Spiritual Journey</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We invite you to be part of this blessed journey of learning, reflection, and spiritual growth.
                Together, let us seek the light of Islamic wisdom and share it with the world.
              </p>
              <div className="text-amber-600 font-arabic text-lg mb-2">وَاللَّهُ يَهْدِي مَن يَشَاءُ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ</div>
              <p className="text-sm text-muted-foreground">
                "And Allah guides whom He wills to a straight path" — Quran 2:213
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
