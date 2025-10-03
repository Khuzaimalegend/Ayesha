import { PrayerTimes } from "@/components/prayer-times"
import { DailyVerse } from "@/components/daily-verse"
import { DhikrCounter } from "@/components/dhikr-counter"
import { IslamicCalendar } from "@/components/islamic-calendar"

export function IslamicSidebar() {
  return (
    <aside className="space-y-6">
      <IslamicCalendar />
      <DailyVerse />
      <PrayerTimes />
      <DhikrCounter />
    </aside>
  )
}
