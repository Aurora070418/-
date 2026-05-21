
"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

type Milestone = {
  id: string
  title: string
  date: string
  daysLeft: number
  type: "Anniversary" | "Birthday" | "Other"
}

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([])

  useEffect(() => {
    const targetDate = new Date("2027-05-07")
    const today = new Date()
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    setMilestones([
      { id: "1", title: "交往紀念日", date: "2027年5月7日", daysLeft: Math.max(0, diffDays), type: "Anniversary" },
    ])
  }, [])

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-primary">Special Dates</h1>
          <p className="text-sm text-muted-foreground">Counting down to our next moment.</p>
        </div>
        <Button size="icon" className="rounded-2xl">
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      <section className="px-6 space-y-6">
        {milestones.map((ms) => (
          <div key={ms.id} className="relative">
            <Card className="overflow-hidden border-none shadow-sm bg-white">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-16 bg-primary/10 flex flex-col items-center justify-center p-2 text-primary">
                    <CalendarIcon className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-bold uppercase">{ms.type.slice(0, 3)}</span>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-base">{ms.title}</h3>
                      <Badge variant="secondary" className="text-[10px] uppercase">{ms.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{ms.date}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-accent">
                        <Clock className="h-4 w-4" />
                        <span className="text-2xl font-black">{ms.daysLeft}</span>
                        <span className="text-xs font-medium uppercase tracking-tighter">Days to go</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Countdown bar */}
            <div className="absolute bottom-0 left-16 right-0 h-1 bg-muted">
              <div 
                className="h-full bg-accent" 
                style={{ width: `${Math.max(0, Math.min(100, (ms.daysLeft / 3.65)))}%` }} 
              />
            </div>
          </div>
        ))}
      </section>

      <NavBar />
    </div>
  )
}
