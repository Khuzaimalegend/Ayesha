"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Plus } from "lucide-react"

interface DhikrItem {
  arabic: string
  transliteration: string
  meaning: string
  target: number
}

const dhikrList: DhikrItem[] = [
  {
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhan Allah",
    meaning: "Glory be to Allah",
    target: 33,
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    meaning: "Praise be to Allah",
    target: 33,
  },
  {
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    meaning: "Allah is Greatest",
    target: 34,
  },
  {
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illa Allah",
    meaning: "There is no god but Allah",
    target: 100,
  },
]

export function DhikrCounter() {
  const [selectedDhikr, setSelectedDhikr] = useState(0)
  const [count, setCount] = useState(0)
  const currentDhikr = dhikrList[selectedDhikr]

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const reset = () => {
    setCount(0)
  }

  const progress = (count / currentDhikr.target) * 100

  return (
    <Card className="border-amber-200/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-5 w-5 rounded-full bg-amber-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">ذ</span>
          </div>
          <span>Dhikr Counter</span>
          <span className="text-amber-600 font-arabic text-sm">عداد الذكر</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dhikr Selection */}
        <div className="grid grid-cols-2 gap-2">
          {dhikrList.map((dhikr, index) => (
            <Button
              key={index}
              variant={selectedDhikr === index ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedDhikr(index)
                setCount(0)
              }}
              className={`text-xs h-auto py-2 ${selectedDhikr === index ? "bg-amber-600 hover:bg-amber-700" : ""}`}
            >
              <div className="text-center">
                <div className="font-arabic text-sm">{dhikr.arabic}</div>
                <div className="text-xs opacity-75">{dhikr.transliteration}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Current Dhikr Display */}
        <div className="text-center p-4 bg-amber-50 rounded-lg">
          <div className="font-arabic text-2xl text-amber-800 mb-2">{currentDhikr.arabic}</div>
          <div className="text-sm font-medium text-amber-700 mb-1">{currentDhikr.transliteration}</div>
          <div className="text-xs text-muted-foreground">{currentDhikr.meaning}</div>
        </div>

        {/* Counter Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-amber-600 mb-2">{count}</div>
          <div className="text-sm text-muted-foreground mb-3">Target: {currentDhikr.target}</div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <Button onClick={increment} size="lg" className="bg-amber-600 hover:bg-amber-700 flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Count
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 bg-transparent"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {count >= currentDhikr.target && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">ماشاء الله! Target completed!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
