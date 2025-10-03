export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  image_url: string
  published: boolean
  created_at: string
  updated_at: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Beauty of Patience in Islam",
    slug: "beauty-of-patience-in-islam",
    excerpt:
      "Discover how sabr (patience) is not just endurance, but a profound spiritual practice that transforms our relationship with Allah and life's challenges.",
    content: `Patience, or sabr in Arabic, is one of the most emphasized virtues in Islam. It's mentioned in the Quran over 90 times, highlighting its crucial role in a Muslim's spiritual journey.

## Understanding Sabr

Sabr is not merely passive endurance. It's an active, conscious choice to remain steadfast in faith during trials, to control one's reactions, and to trust in Allah's wisdom. The Prophet Muhammad (peace be upon him) said: "How wonderful is the affair of the believer, for his affairs are all good, and this applies to no one but the believer. If something good happens to him, he is thankful for it and that is good for him. If something bad happens to him, he bears it with patience and that is good for him." (Muslim)

## Types of Patience

Islamic scholars identify three main types of sabr:
1. Patience in obeying Allah
2. Patience in avoiding sins
3. Patience during trials and hardships

## The Rewards of Patience

Allah promises immense rewards for those who practice patience. In Surah Az-Zumar (39:10), Allah says: "Indeed, the patient will be given their reward without account."

May Allah grant us all the strength to practice true sabr in all aspects of our lives.`,
    author: "Noor Writings Team",
    category: "Spiritual Growth",
    image_url: "/placeholder.svg?height=400&width=600",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Understanding the Five Pillars of Islam",
    slug: "understanding-five-pillars-islam",
    excerpt:
      "A comprehensive guide to the fundamental practices that form the foundation of Islamic faith and worship.",
    content: `The Five Pillars of Islam are the foundation of Muslim life, representing the core practices that every Muslim should follow.

## 1. Shahada (Faith)

The declaration of faith: "There is no god but Allah, and Muhammad is His messenger." This simple yet profound statement is the entry point into Islam and the foundation of all other practices.

## 2. Salah (Prayer)

Muslims pray five times daily, maintaining a constant connection with Allah throughout the day. These prayers serve as spiritual anchors, reminding us of our purpose and keeping us grounded in faith.

## 3. Zakat (Charity)

Giving a portion of one's wealth to those in need purifies our wealth and helps create a more equitable society. It reminds us that all we have is a trust from Allah.

## 4. Sawm (Fasting)

During Ramadan, Muslims fast from dawn to sunset, developing self-discipline, empathy for the less fortunate, and spiritual awareness.

## 5. Hajj (Pilgrimage)

For those who are able, performing Hajj to Mecca once in a lifetime is a profound spiritual journey that unites Muslims from around the world.

These pillars work together to create a balanced, purposeful life centered on worship and service to Allah.`,
    author: "Noor Writings Team",
    category: "Islamic Basics",
    image_url: "/placeholder.svg?height=400&width=600",
    published: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "The Power of Dua: Connecting with Allah",
    slug: "power-of-dua-connecting-with-allah",
    excerpt:
      "Learn how sincere supplication strengthens our bond with Allah and brings peace, guidance, and blessings into our lives.",
    content: `Dua, or supplication, is one of the most powerful acts of worship in Islam. It's a direct conversation with Allah, requiring no intermediary.

## The Essence of Dua

The Prophet Muhammad (peace be upon him) said: "Dua is the essence of worship" (Tirmidhi). When we make dua, we acknowledge our dependence on Allah and His power over all things.

## When to Make Dua

While dua can be made at any time, certain moments are particularly blessed:
- During the last third of the night
- Between the adhan and iqamah
- While prostrating in prayer
- On Fridays
- During Ramadan

## The Etiquette of Dua

1. Begin with praise of Allah and sending blessings upon the Prophet
2. Make dua with sincerity and conviction
3. Be persistent and patient
4. Make dua for others as well as yourself
5. End with praise and blessings

## Trust in Allah's Wisdom

Remember that Allah answers every dua in one of three ways: He gives you what you ask for, He protects you from harm, or He saves it as a reward for the Hereafter. Trust in His wisdom and timing.

May Allah accept all our duas and grant us what is best for us in this life and the next.`,
    author: "Noor Writings Team",
    category: "Worship & Practice",
    image_url: "/placeholder.svg?height=400&width=600",
    published: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
]
