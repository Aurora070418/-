
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ChevronRight, User } from "lucide-react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"

export default function Home() {
  const [daysTogether, setDaysTogether] = useState<number | null>(null)
  const [userA, setUserA] = useState({ name: "P1", photo: "https://picsum.photos/seed/p1/100/100" })
  const [userB, setUserB] = useState({ name: "P2", photo: "https://picsum.photos/seed/p2/100/100" })
  
  useEffect(() => {
    // Anniversary: 2025-05-07
    const startDate = new Date("2025-05-07")
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysTogether(diffDays)

    // Load custom profiles
    const savedA = localStorage.getItem("userA")
    const savedB = localStorage.getItem("userB")
    if (savedA) setUserA(JSON.parse(savedA))
    if (savedB) setUserB(JSON.parse(savedB))
  }, [])

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">OurJourney</h1>
          <p className="text-sm text-muted-foreground">Every moment counts.</p>
        </div>
        <Link href="/profile" className="flex -space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-primary overflow-hidden">
            <img src={userA.photo} alt={userA.name} className="h-full w-full object-cover" />
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-white overflow-hidden">
            <img src={userB.photo} alt={userB.name} className="h-full w-full object-cover" />
          </div>
        </Link>
      </header>

      <section className="px-6 mb-8">
        <Card className="bg-gradient-to-br from-primary to-accent text-white border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Heart size={120} fill="currentColor" />
          </div>
          <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
            <span className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">We've been together for</span>
            <div className="text-6xl font-bold mb-2">
              {daysTogether ?? "---"}
            </div>
            <span className="text-lg font-medium opacity-90">Days of Love</span>
            <div className="mt-6 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Since May 7th, 2025
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-6 grid grid-cols-2 gap-4 mb-8">
        <Link href="/milestones" className="col-span-2">
          <Card className="hover:shadow-md transition-shadow group">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-secondary/50 text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Next Anniversary</h3>
                  <p className="text-xs text-muted-foreground">May 7, 2027</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>

        <Card className="p-4 flex flex-col gap-2 bg-white border-none shadow-sm">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase">Wishlist</h3>
          <p className="text-2xl font-bold">3</p>
          <p className="text-[10px] text-muted-foreground">Items in pool</p>
        </Card>

        <Card className="p-4 flex flex-col gap-2 bg-white border-none shadow-sm">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase">Money</h3>
          <p className="text-2xl font-bold">$142</p>
          <p className="text-[10px] text-muted-foreground">Total spent</p>
        </Card>
      </section>

      <section className="px-6 mb-12">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          Recent Places
        </h2>
        <div className="space-y-3">
          {[
            { title: "Kyoto Trip", type: "Travel" },
            { title: "Italian Dinner", type: "Dining" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <span className="text-[10px] text-muted-foreground px-2 py-0.5 bg-muted rounded-full uppercase">{item.type}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
      
      <NavBar />
    </div>
  )
}
