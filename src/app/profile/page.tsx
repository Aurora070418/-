
"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [userA, setUserA] = useState({ name: "Partner A", photo: "https://picsum.photos/seed/p1/100/100" })
  const [userB, setUserB] = useState({ name: "Partner B", photo: "https://picsum.photos/seed/p2/100/100" })

  // Initialize from localStorage if available
  useEffect(() => {
    const savedA = localStorage.getItem("userA")
    const savedB = localStorage.getItem("userB")
    if (savedA) setUserA(JSON.parse(savedA))
    if (savedB) setUserB(JSON.parse(savedB))
  }, [])

  const handleSave = () => {
    localStorage.setItem("userA", JSON.stringify(userA))
    localStorage.setItem("userB", JSON.stringify(userB))
    alert("Profiles updated!")
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-primary">Our Profiles</h1>
      </header>

      <section className="px-6 space-y-6">
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm uppercase text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" /> Partner 1
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20 bg-muted">
                <img src={userA.photo} alt="P1" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={userA.name} onChange={(e) => setUserA({ ...userA, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Photo URL</Label>
              <Input value={userA.photo} onChange={(e) => setUserA({ ...userA, photo: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm uppercase text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" /> Partner 2
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-secondary/20 bg-muted">
                <img src={userB.photo} alt="P2" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={userB.name} onChange={(e) => setUserB({ ...userB, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Photo URL</Label>
              <Input value={userB.photo} onChange={(e) => setUserB({ ...userB, photo: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full rounded-2xl py-6 font-bold text-lg shadow-lg">
          Save Changes
        </Button>
      </section>

      <NavBar />
    </div>
  )
}
