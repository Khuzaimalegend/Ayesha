"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface IslamicDate {
  hijri: string
  gregorian: string
  month: string
  year: string
}

export function IslamicCalendar() {
  const [islamicDate, setIslamicDate] = useState<IslamicDate | null>(null)

  useEffect(() => {
    const fetchIslamicDate = async () => {
      try {
        const today = new Date()
        const response = await fetch(
          `https://api.aladhan.com/v1/gToH/${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`,
        )
        const data = await response.json()

        if (data.code === 200) {
          const hijri = data.data.hijri
          setIslamicDate({
            hijri: `${hijri.day} ${hijri.month.en} ${hijri.year}`,
            gregorian: today.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            month: hijri.month.en,
            year: hijri.year,
          })
        }
      } catch (error) {
        console.error("Error fetching Islamic date:", error)
        // Fallback
        const today = new Date()
        setIslamicDate({
          hijri: "Islamic Date",
          gregorian: today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          month: "Hijri Month",
          year: "1445",
        })
      }
    }

    fetchIslamicDate()
  }, [])

  if (!islamicDate) {
    return (
      <Card className="border-amber-200/50">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-amber-200/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-amber-600" />
          <span>Islamic Calendar</span>
          <span className="text-amber-600 font-arabic text-sm">التقويم الهجري</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center p-3 bg-amber-50 rounded-lg">
          <div className="font-arabic text-lg text-amber-800 mb-1">{islamicDate.hijri}</div>
          <div className="text-xs text-muted-foreground">Hijri Date</div>
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-foreground mb-1">{islamicDate.gregorian}</div>
          <div className="text-xs text-muted-foreground">Gregorian Date</div>
        </div>

        <div className="pt-2 border-t text-center">
          <p className="text-xs text-amber-600 font-medium">
            {islamicDate.month} {islamicDate.year} AH
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
