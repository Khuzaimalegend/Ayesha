import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://noorwritings.com"),
  title: {
    default: "Noor Writings - Islamic Reflections & Spiritual Insights",
    template: "%s - Noor Writings",
  },
  description:
    "A beautiful collection of Islamic reflections, Quranic insights, and spiritual guidance to illuminate your faith journey. Discover authentic Islamic wisdom for the modern Muslim soul.",
  keywords: [
    "Islamic blog",
    "Quran",
    "spirituality",
    "Islamic reflections",
    "faith",
    "Muslim",
    "Islamic teachings",
    "Hadith",
    "Islamic wisdom",
    "spiritual guidance",
    "Islamic lifestyle",
    "Quranic verses",
    "Islamic inspiration",
    "Muslim community",
    "Islamic values",
  ],
  authors: [{ name: "Noor Writings", url: "https://noorwritings.com" }],
  creator: "Noor Writings",
  publisher: "Noor Writings",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noorwritings.com",
    siteName: "Noor Writings",
    title: "Noor Writings - Islamic Reflections & Spiritual Insights",
    description:
      "A beautiful collection of Islamic reflections, Quranic insights, and spiritual guidance to illuminate your faith journey.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Noor Writings - Islamic Reflections & Spiritual Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor Writings - Islamic Reflections & Spiritual Insights",
    description:
      "A beautiful collection of Islamic reflections, Quranic insights, and spiritual guidance to illuminate your faith journey.",
    images: ["/og-image.jpg"],
    creator: "@noorwritings",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "religion",
  classification: "Islamic Content",
  referrer: "origin-when-cross-origin",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#d4a574" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href="https://noorwritings.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Noor Writings",
              description: "Islamic reflections, Quranic insights, and spiritual guidance for the modern Muslim soul",
              url: "https://noorwritings.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://noorwritings.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Noor Writings",
                url: "https://noorwritings.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://noorwritings.com/logo.png",
                },
              },
              sameAs: [
                "https://twitter.com/noorwritings",
                "https://facebook.com/noorwritings",
                "https://instagram.com/noorwritings",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
