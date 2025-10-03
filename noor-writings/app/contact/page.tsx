import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Heart } from "lucide-react"

export const metadata = {
  title: "Contact Us - Noor Writings",
  description: "Get in touch with Noor Writings. We'd love to hear from you and answer any questions you may have.",
  openGraph: {
    title: "Contact Noor Writings - Islamic Reflections & Spiritual Guidance",
    description: "Reach out to us for questions, feedback, or to share your own spiritual insights.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 islamic-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text">Contact Us</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We'd love to hear from you and connect with fellow seekers of Islamic wisdom
              </p>

              {/* Islamic Greeting */}
              <div className="p-6 bg-card rounded-lg border border-amber-200/50 max-w-2xl mx-auto">
                <blockquote className="font-serif text-lg italic text-foreground mb-2">
                  "And whoever brings a good deed - he will have ten times the like thereof to his credit."
                </blockquote>
                <cite className="text-amber-600 font-medium">— Quran 6:160</cite>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Contact Information */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="border-amber-200/50 text-center">
                  <CardContent className="p-6">
                    <div className="p-3 bg-amber-100 rounded-full w-fit mx-auto mb-4">
                      <Mail className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-muted-foreground text-sm">
                      Send us your questions, feedback, or article suggestions
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50 text-center">
                  <CardContent className="p-6">
                    <div className="p-3 bg-amber-100 rounded-full w-fit mx-auto mb-4">
                      <MessageCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Share Your Story</h3>
                    <p className="text-muted-foreground text-sm">
                      Tell us how our articles have impacted your spiritual journey
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50 text-center">
                  <CardContent className="p-6">
                    <div className="p-3 bg-amber-100 rounded-full w-fit mx-auto mb-4">
                      <Heart className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Collaborate</h3>
                    <p className="text-muted-foreground text-sm">
                      Interested in contributing to our Islamic content? Let's connect
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 gradient-text">Send Us a Message</h2>
              <div className="bg-card rounded-lg border border-amber-200/50 p-8">
                <div className="mb-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                  <p className="text-sm text-foreground mb-2">
                    <span className="font-arabic text-amber-600">بِسْمِ اللَّهِ</span> - We begin in the name of Allah
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your message is important to us. We strive to respond within 24-48 hours, In Sha Allah.
                  </p>
                </div>
                <ContactForm />
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Can I submit my own Islamic articles or reflections?</h3>
                    <p className="text-muted-foreground">
                      We welcome contributions from fellow Muslims who wish to share their spiritual insights. Please
                      contact us with your article ideas or completed pieces for review. All submissions should align
                      with authentic Islamic teachings and our content guidelines.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">How do you ensure the authenticity of your content?</h3>
                    <p className="text-muted-foreground">
                      All our articles are carefully researched and based on authentic Islamic sources including the
                      Quran, authentic Hadith, and scholarly works. We consult with knowledgeable Islamic scholars when
                      needed to ensure accuracy and authenticity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Can I request articles on specific Islamic topics?</h3>
                    <p className="text-muted-foreground">
                      We encourage our readers to suggest topics they'd like us to explore. Whether it's a particular
                      aspect of Islamic spirituality, practical guidance, or Quranic commentary, we're always open to
                      reader suggestions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Closing Message */}
            <section className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
              <h2 className="font-serif text-2xl font-bold mb-4 text-green-800">May Allah Bless Your Journey</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for being part of the Noor Writings community. Your engagement and feedback help us serve the
                Ummah better.
              </p>
              <div className="text-green-600 font-arabic text-lg mb-2">جَزَاكَ اللَّهُ خَيْرًا</div>
              <p className="text-sm text-muted-foreground">(May Allah reward you with good)</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
