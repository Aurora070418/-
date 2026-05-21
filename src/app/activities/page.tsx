
"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, MapPin, Camera, Utensils, Trash2, Edit2, X, Check, Plus } from "lucide-react"

type Activity = {
  id: string
  title: string
  location: string
  status: "todo" | "done"
  category: "Travel" | "Dining" | "Experience"
}

const ActivityIcon = ({ cat }: { cat: Activity["category"] }) => {
  switch (cat) {
    case "Travel": return <MapPin className="h-4 w-4" />
    case "Dining": return <Utensils className="h-4 w-4" />
    default: return <Camera className="h-4 w-4" />
  }
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", title: "Stargazing at the park", location: "Hill Park", status: "todo", category: "Experience" },
    { id: "2", title: "Visit Kyoto together", location: "Japan", status: "todo", category: "Travel" },
    { id: "3", title: "Try that new French place", location: "Downtown", status: "done", category: "Dining" },
  ])

  const [newTitle, setNewTitle] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editLocation, setEditLocation] = useState("")

  const addActivity = () => {
    if (!newTitle) return
    const activity: Activity = {
      id: Math.random().toString(),
      title: newTitle,
      location: newLocation || "Unknown",
      status: "todo",
      category: "Experience"
    }
    setActivities([activity, ...activities])
    setNewTitle("")
    setNewLocation("")
  }

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id))
  }

  const toggleStatus = (id: string) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, status: a.status === "todo" ? "done" : "todo" } : a
    ))
  }

  const startEdit = (act: Activity) => {
    setEditingId(act.id)
    setEditTitle(act.title)
    setEditLocation(act.location)
  }

  const saveEdit = () => {
    setActivities(activities.map(a => 
      a.id === editingId ? { ...a, title: editTitle, location: editLocation } : a
    ))
    setEditingId(null)
  }

  const renderActivityList = (filteredActivities: Activity[]) => (
    <div className="space-y-4">
      {filteredActivities.map((act) => (
        <Card key={act.id} className={`transition-all ${act.status === 'done' ? 'bg-muted/50 border-none' : 'bg-white shadow-sm'}`}>
          <CardContent className="p-4">
            {editingId === act.id ? (
              <div className="space-y-2">
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <Input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveEdit}><Check className="h-4 w-4 mr-1" /> Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleStatus(act.id)}
                    className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                      act.status === 'done' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {act.status === 'done' ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-sm ${act.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{act.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] flex items-center gap-1 text-muted-foreground">
                        <ActivityIcon cat={act.category} /> {act.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => startEdit(act)}>
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteActivity(act.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6">
        <h1 className="text-2xl font-bold text-primary">Place</h1>
        <p className="text-sm text-muted-foreground">Adventure awaits us.</p>
      </header>

      <section className="px-6 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary/10 space-y-3">
          <Input 
            placeholder="Where do you want to go?" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="rounded-xl"
          />
          <div className="flex gap-2">
            <Input 
              placeholder="Location/Details" 
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="rounded-xl"
            />
            <Button onClick={addActivity} className="rounded-xl px-4 font-bold">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 flex-1">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 rounded-2xl p-1 bg-white shadow-sm border border-primary/5">
            <TabsTrigger value="all" className="rounded-xl">All</TabsTrigger>
            <TabsTrigger value="todo" className="rounded-xl">To-Do</TabsTrigger>
            <TabsTrigger value="done" className="rounded-xl">Done</TabsTrigger>
          </TabsList>

          <TabsContent value="all">{renderActivityList(activities)}</TabsContent>
          <TabsContent value="todo">{renderActivityList(activities.filter(a => a.status === 'todo'))}</TabsContent>
          <TabsContent value="done">{renderActivityList(activities.filter(a => a.status === 'done'))}</TabsContent>
        </Tabs>
      </section>

      <NavBar />
    </div>
  )
}
