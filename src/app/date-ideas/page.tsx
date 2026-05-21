
"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Heart, MapPin, Wallet } from "lucide-react"
import { generateDateIdeas } from "@/ai/flows/generate-date-ideas"
import { toast } from "@/hooks/use-toast"

export default function DateIdeasPage() {
  const [loading, setLoading] = useState(false)
  const [mood, setMood] = useState("")
  const [budget, setBudget] = useState("")
  const [activityType, setActivityType] = useState("")
  const [ideas, setIdeas] = useState<string[]>([])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setIdeas([])
    
    try {
      const result = await generateDateIdeas({
        mood: mood || undefined,
        budget: budget || undefined,
        activityType: activityType || undefined,
      })
      if (result && result.ideas) {
        setIdeas(result.ideas)
      } else {
        toast({
          title: "Oops!",
          description: "Could not generate ideas. Try again later.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6">
        <h1 className="text-2xl font-bold text-primary">AI Date Planner</h1>
        <p className="text-sm text-muted-foreground">Let AI spark some romance for you.</p>
      </header>

      <section className="px-6 mb-8">
        <Card className="bg-white border-none shadow-sm rounded-3xl">
          <CardContent className="p-6">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mood" className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1">
                  <Heart className="h-3 w-3" /> Desired Mood
                </Label>
                <Input 
                  id="mood"
                  placeholder="e.g. Romantic, Adventurous, Relaxed" 
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="rounded-xl border-primary/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1">
                  <Wallet className="h-3 w-3" /> Budget
                </Label>
                <Input 
                  id="budget"
                  placeholder="e.g. Low-cost, Luxurious, Free" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="rounded-xl border-primary/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity" className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Activity Type
                </Label>
                <Input 
                  id="activity"
                  placeholder="e.g. Indoor, Outdoor, Creative" 
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="rounded-xl border-primary/10"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-2xl py-6 font-bold text-lg shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Date Ideas
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="px-6 space-y-4 pb-12">
        {ideas.length > 0 && <h2 className="text-sm font-bold text-muted-foreground uppercase mb-2">Our Curated Ideas</h2>}
        {ideas.map((idea, idx) => (
          <Card key={idx} className="bg-white border-none shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-xs shrink-0">
                {idx + 1}
              </div>
              <p className="text-sm leading-relaxed">{idea}</p>
            </CardContent>
          </Card>
        ))}
        {!loading && ideas.length === 0 && (
          <div className="text-center py-10 opacity-30 flex flex-col items-center">
            <Sparkles className="h-12 w-12 mb-4" />
            <p className="text-sm font-medium">Input your preferences and tap generate!</p>
          </div>
        )}
      </section>

      <NavBar />
    </div>
  )
}
