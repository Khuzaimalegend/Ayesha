"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Verse {
  text: string
  reference: string
  arabic?: string
}

const verses: Verse[] = [
  {
    text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    reference: "Quran 65:3",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
  },
  {
    text: "And it is He who sends down rain from heaven, and We produce thereby the vegetation of every kind.",
    reference: "Quran 6:99",
    arabic: "وَهُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ",
  },
  {
    text: "And whoever fears Allah - He will make for him a way out.",
    reference: "Quran 65:2",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
  },
  {
    text: "And Allah is the best of planners.",
    reference: "Quran 8:30",
    arabic: "وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
  },
  {
    text: "And establish prayer and give zakah and bow with those who bow.",
    reference: "Quran 2:43",
    arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
  },
  {
    text: "And whoever is grateful - he is only grateful for [the benefit of] himself.",
    reference: "Quran 31:12",
    arabic: "وَمَن شَكَرَ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ",
  },
]

export function DailyVerse() {
  const [currentVerse, setCurrentVerse] = useState<Verse>(verses[0])
  const [showArabic, setShowArabic] = useState(false)

  useEffect(() => {
    // Get verse based on day of year to ensure same verse per day
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const verseIndex = dayOfYear % verses.length
    setCurrentVerse(verses[verseIndex])
  }, [])

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length)
    setCurrentVerse(verses[randomIndex])
  }

  return (
    <Card className="border-amber-200/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Book className="h-5 w-5 text-amber-600" />
            <span>Daily Verse</span>
            <span className="text-amber-600 font-arabic text-sm">آية اليوم</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={getRandomVerse} className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showArabic && currentVerse.arabic && (
            <div className="p-3 bg-amber-50 rounded-lg border-r-4 border-amber-400">
              <p className="font-arabic text-lg text-right leading-relaxed text-foreground">{currentVerse.arabic}</p>
            </div>
          )}

          <blockquote className="text-foreground italic leading-relaxed">"{currentVerse.text}"</blockquote>

          <div className="flex items-center justify-between">
            <cite className="text-amber-600 font-medium text-sm">— {currentVerse.reference}</cite>
            {currentVerse.arabic && (
              <Button variant="ghost" size="sm" onClick={() => setShowArabic(!showArabic)} className="text-xs">
                {showArabic ? "Hide Arabic" : "Show Arabic"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
