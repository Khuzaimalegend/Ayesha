"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, RotateCcw } from "lucide-react"

export function IslamicElements() {
  const [dhikrCount, setDhikrCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const islamicDate = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(currentTime)

  const dailyVerses = [
    {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      english: "And whoever fears Allah - He will make for him a way out.",
      reference: "Quran 65:2",
    },
    {
      arabic: "وَاللَّهُ خَيْرٌ حَافِظًا وَهُوَ أَرْحَمُ الرَّاحِمِينَ",
      english: "But Allah is the best guardian, and He is the most merciful of the merciful.",
      reference: "Quran 12:64",
    },
  ]

  const todayVerse = dailyVerses[currentTime.getDate() % dailyVerses.length]

  return (
    <div className="space-y-6">
      {/* Daily Verse */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-600" />
            Daily Verse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-3">
            <p className="font-arabic text-xl text-amber-700 leading-relaxed">{todayVerse.arabic}</p>
            <p className="text-sm italic text-muted-foreground">"{todayVerse.english}"</p>
            <p className="text-xs text-amber-600 font-medium">— {todayVerse.reference}</p>
          </div>
        </CardContent>
      </Card>

      {/* Islamic Date */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-600" />
            Islamic Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Today is</p>
            <p className="font-medium text-amber-700">{islamicDate}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dhikr Counter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="h-5 w-5 text-amber-600" />
            Dhikr Counter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-amber-700">{dhikrCount}</div>
            <p className="text-sm text-muted-foreground">SubhanAllah</p>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => setDhikrCount((prev) => prev + 1)}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button onClick={() => setDhikrCount(0)} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
