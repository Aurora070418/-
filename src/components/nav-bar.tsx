
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Gift, Receipt, MapPin, Calendar, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/wishlist", icon: Gift, label: "Wishes" },
  { href: "/expenses", icon: Receipt, label: "Money" },
  { href: "/activities", icon: MapPin, label: "Place" },
  { href: "/milestones", icon: Calendar, label: "Dates" },
  { href: "/date-ideas", icon: Sparkles, label: "AI Tips" },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-border flex justify-around items-center h-16 max-w-xl mx-auto rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:absolute md:bottom-0">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
            )}
          >
            <item.icon className={cn("h-5 w-5 mb-1 transition-transform", isActive && "scale-110")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
