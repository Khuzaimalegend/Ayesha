interface BlogPostStructuredDataProps {
  post: {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    author_name?: string
    created_at: string
    updated_at: string
    category: string
    quranic_verse?: string
    verse_reference?: string
  }
}

export function BlogPostStructuredData({ post }: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: [`https://noorwritings.com/og-image.jpg`],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name || "Noor Writings",
      url: "https://noorwritings.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Noor Writings",
      logo: {
        "@type": "ImageObject",
        url: "https://noorwritings.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://noorwritings.com/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: ["Islamic", "spirituality", "Quran", "faith", post.category],
    inLanguage: "en",
    genre: "Religious Content",
    about: {
      "@type": "Thing",
      name: "Islamic Spirituality",
      description: "Islamic teachings and spiritual guidance",
    },
  }

  // Add religious context if Quranic verse is present
  if (post.quranic_verse && post.verse_reference) {
    structuredData["citation"] = {
      "@type": "CreativeWork",
      name: post.verse_reference,
      text: post.quranic_verse,
      author: {
        "@type": "Thing",
        name: "Quran",
      },
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
