
"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Gift, Trash2, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Wish = {
  id: string
  title: string
  addedBy: "Partner A" | "Partner B"
  isGifted: boolean
}

export default function WishlistPage() {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: "1", title: "Wireless Headphones", addedBy: "Partner B", isGifted: false },
    { id: "2", title: "Cooking Class Voucher", addedBy: "Partner A", isGifted: true },
    { id: "3", title: "Scented Candles", addedBy: "Partner B", isGifted: false },
  ])
  const [newWish, setNewWish] = useState("")

  const addWish = () => {
    if (!newWish.trim()) return
    const wish: Wish = {
      id: Math.random().toString(),
      title: newWish,
      addedBy: "Partner A", // Simulating current user
      isGifted: false
    }
    setWishes([wish, ...wishes])
    setNewWish("")
  }

  const deleteWish = (id: string) => {
    setWishes(wishes.filter(w => w.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6">
        <h1 className="text-2xl font-bold text-primary">Wishlist Pool</h1>
        <p className="text-sm text-muted-foreground">Throw your wishes here for your partner to see.</p>
      </header>

      <section className="px-6 mb-6">
        <div className="flex gap-2">
          <Input 
            placeholder="What's on your mind?" 
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            className="rounded-2xl border-primary/20 bg-white"
          />
          <Button onClick={addWish} size="icon" className="rounded-2xl">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="px-6 space-y-4">
        {wishes.map((wish) => (
          <Card key={wish.id} className={wish.isGifted ? "opacity-50 grayscale" : "bg-white"}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${wish.isGifted ? 'bg-muted' : 'bg-secondary/50 text-primary'}`}>
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${wish.isGifted ? 'line-through' : ''}`}>{wish.title}</h3>
                  <div className="flex gap-2 items-center mt-1">
                    <Badge variant="outline" className="text-[9px] font-normal uppercase py-0 leading-none">
                      From {wish.addedBy}
                    </Badge>
                    {wish.isGifted && (
                      <span className="text-[10px] text-accent flex items-center gap-1 font-medium">
                        <Heart className="h-2 w-2 fill-accent" /> Fulfilled
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive"
                onClick={() => deleteWish(wish.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {wishes.length === 0 && (
          <div className="text-center py-20 opacity-30">
            <Gift className="h-12 w-12 mx-auto mb-2" />
            <p>Pool is empty. Start wishing!</p>
          </div>
        )}
      </section>

      <NavBar />
    </div>
  )
}
