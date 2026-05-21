
"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Receipt, DollarSign, ArrowUpRight, TrendingUp, Trash2, Edit2, X, Check } from "lucide-react"

type Expense = {
  id: string
  label: string
  amount: number
  date: string
  category: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", label: "Dinner Date", amount: 85, date: "2024-05-15", category: "Dining" },
    { id: "2", label: "Groceries", amount: 42.5, date: "2024-05-14", category: "Home" },
    { id: "3", label: "Netflix", amount: 15, date: "2024-05-10", category: "Entertainment" },
  ])
  const [newLabel, setNewLabel] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [editAmount, setEditAmount] = useState("")

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  const addExpense = () => {
    if (!newLabel || !newAmount) return
    const expense: Expense = {
      id: Math.random().toString(),
      label: newLabel,
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split('T')[0],
      category: "General"
    }
    setExpenses([expense, ...expenses])
    setNewLabel("")
    setNewAmount("")
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const startEdit = (exp: Expense) => {
    setEditingId(exp.id)
    setEditLabel(exp.label)
    setEditAmount(exp.amount.toString())
  }

  const saveEdit = () => {
    setExpenses(expenses.map(e => 
      e.id === editingId 
        ? { ...e, label: editLabel, amount: parseFloat(editAmount) } 
        : e
    ))
    setEditingId(null)
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="p-6">
        <h1 className="text-2xl font-bold text-primary">Money</h1>
        <p className="text-sm text-muted-foreground">Keep an eye on our shared spending.</p>
      </header>

      <section className="px-6 mb-8">
        <Card className="bg-white border-none shadow-sm p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Combined</span>
            <p className="text-3xl font-bold text-primary">${total.toFixed(2)}</p>
          </div>
          <div className="bg-secondary/30 p-4 rounded-3xl text-primary">
            <TrendingUp className="h-8 w-8" />
          </div>
        </Card>
      </section>

      <section className="px-6 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary/10 space-y-3">
          <Input 
            placeholder="Expense title" 
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="rounded-xl"
          />
          <div className="flex gap-2">
            <Input 
              type="number"
              placeholder="Amount" 
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="rounded-xl"
            />
            <Button onClick={addExpense} className="rounded-xl flex-1 font-bold">
              Add Record
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 space-y-3">
        <h2 className="text-sm font-bold text-muted-foreground uppercase mb-2">History</h2>
        {expenses.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-accent">
            {editingId === exp.id ? (
              <div className="space-y-2">
                <Input size="sm" value={editLabel} onChange={(e) => setEditLabel(e.target.value)} />
                <div className="flex gap-2">
                  <Input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                  <Button size="icon" variant="ghost" onClick={saveEdit}><Check className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-muted">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{exp.label}</h4>
                    <p className="text-[10px] text-muted-foreground">{exp.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-sm">-${exp.amount.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => startEdit(exp)}>
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteExpense(exp.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <NavBar />
    </div>
  )
}
