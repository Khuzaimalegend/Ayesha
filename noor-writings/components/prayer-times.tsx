"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

interface PrayerTime {
  name: string
  time: string
  arabic: string
}

export function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [location, setLocation] = useState("Loading...")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Get user location and fetch prayer times
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            // Using a free prayer times API
            const response = await fetch(
              `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`,
            )
            const data = await response.json()

            if (data.code === 200) {
              const timings = data.data.timings
              setPrayerTimes([
                { name: "Fajr", time: timings.Fajr, arabic: "الفجر" },
                { name: "Dhuhr", time: timings.Dhuhr, arabic: "الظهر" },
                { name: "Asr", time: timings.Asr, arabic: "العصر" },
                { name: "Maghrib", time: timings.Maghrib, arabic: "المغرب" },
                { name: "Isha", time: timings.Isha, arabic: "العشاء" },
              ])

              // Get location name
              const locationResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
              )
              const locationData = await locationResponse.json()
              setLocation(`${locationData.city}, ${locationData.countryName}`)
            }
          } catch (error) {
            console.error("Error fetching prayer times:", error)
            // Fallback prayer times
            setPrayerTimes([
              { name: "Fajr", time: "05:30", arabic: "الفجر" },
              { name: "Dhuhr", time: "12:30", arabic: "الظهر" },
              { name: "Asr", time: "15:45", arabic: "العصر" },
              { name: "Maghrib", time: "18:20", arabic: "المغرب" },
              { name: "Isha", time: "19:45", arabic: "العشاء" },
            ])
            setLocation("Default Location")
          }
        },
        () => {
          // Fallback if location access denied
          setPrayerTimes([
            { name: "Fajr", time: "05:30", arabic: "الفجر" },
            { name: "Dhuhr", time: "12:30", arabic: "الظهر" },
            { name: "Asr", time: "15:45", arabic: "العصر" },
            { name: "Maghrib", time: "18:20", arabic: "المغرب" },
            { name: "Isha", time: "19:45", arabic: "العشاء" },
          ])
          setLocation("Default Location")
        },
      )
    }

    return () => clearInterval(timer)
  }, [])

  const getCurrentPrayer = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()

    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(":").map(Number)
      const prayerMinutes = hours * 60 + minutes

      if (now < prayerMinutes) {
        return i
      }
    }
    return 0 // Next day's Fajr
  }

  const currentPrayerIndex = getCurrentPrayer()

  return (
    <Card className="border-amber-200/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-amber-600" />
          <span>Prayer Times</span>
          <span className="text-amber-600 font-arabic text-sm">أوقات الصلاة</span>
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {location}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {prayerTimes.map((prayer, index) => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              index === currentPrayerIndex ? "bg-amber-50 border border-amber-200" : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{prayer.name}</span>
              <span className="text-amber-600 font-arabic text-sm">{prayer.arabic}</span>
            </div>
            <span className="font-mono text-sm font-medium">{prayer.time}</span>
          </div>
        ))}

        <div className="pt-2 mt-3 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Current time: {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
