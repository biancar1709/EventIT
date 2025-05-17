"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import eventsService from "@/services/events.service"
import budgetService from "@/services/budget.service"
import { EventSelection } from "@/components/ui/BudgetComponents/EventSelection"
import { BudgetOverview } from "@/components/ui/BudgetComponents/BudgetOverview"
import { BudgetCategory } from "@/components/ui/BudgetComponents/BudgetCategory"
import { AddCategoryDialog } from "@/components/ui/BudgetComponents/AddCategoryDialog"
import { AddItemDialog } from "@/components/ui/BudgetComponents/AddItemDialog"
import { Button } from "@/components/ui/button"
import { PlusCircle, BarChart } from "lucide-react"
import { Event } from "@/services/events.service"
import { Budget, BudgetCategory as BudgetCategoryType, BudgetItem } from "@/services/budget.service"

export default function BudgetManagement() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategoryType | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "BarChart",
    iconColor: "#1A9A32",
  })
  const [newItem, setNewItem] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    status: "Pending" as const,
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    console.log("selectedEvent", selectedEvent)
  }, [selectedEvent])

  const fetchEvents = async () => {
    try {
      const data = await eventsService.getAllEvents()
      setEvents(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching events:", error)
      setLoading(false)
    }
  }


  const handleEventSelect = async (event: Event) => {
    const budget = await budgetService.getBudgetById(event.BudgetId)
    setSelectedEvent({ ...event, budget })
    console.log("event", event)

  }

  const handleAddCategory = async () => {
    if (!selectedEvent?.id || !selectedEvent?.budget?.id) return

    try {
      const category = await budgetService.createCategory({
        ...newCategory,
        BudgetId: selectedEvent.budget.id
      })
      if (category) {
        setSelectedEvent((prev) => {
          if (!prev) return null
          return {
            ...prev,
            budget: {
              ...prev.budget!,
              BudgetCategories: [...(prev.budget?.BudgetCategories || []), category],
            },
          }
        })
        setNewCategory({ name: "", icon: "BarChart", iconColor: "#1A9A32" })
        setIsAddCategoryDialogOpen(false)
      }
    } catch (error) {
      console.error("Error creating category:", error)
    }
  }

  const handleAddItem = async () => {
    if (!selectedEvent?.id || !selectedCategory?.id) return

    try {
      const item = await budgetService.createItem({
        ...newItem,
        BudgetCategoryId: selectedCategory.id
      })
      if (item) {
        setSelectedEvent((prev) => {
          if (!prev) return null
          return {
            ...prev,
            budget: {
              ...prev.budget!,
              BudgetCategories: prev.budget?.BudgetCategories.map((cat) =>
                cat.id === selectedCategory.id
                  ? { ...cat, items: [...(cat.items || []), item] }
                  : cat
              ) || [],
            },
          }
        })
        setNewItem({
          description: "",
          amount: 0,
          date: new Date().toISOString().split("T")[0],
          status: "Pending",
        })
        setIsAddItemDialogOpen(false)
      }
    } catch (error) {
      console.error("Error creating item:", error)
    }
  }

  const handleUpdateItemStatus = async (categoryId: number, itemId: number, status: "Approved" | "Rejected") => {
    if (!selectedEvent?.id) return

    try {
      await budgetService.updateItem(itemId, { status })
      setSelectedEvent((prev) => {
        if (!prev) return null
        return {
          ...prev,
          budget: {
            ...prev.budget!,
            BudgetCategories: prev.budget?.BudgetCategories.map((cat) =>
              cat.id === categoryId
                ? {
                  ...cat,
                  items: cat.items.map((item) =>
                    item.id === itemId ? { ...item, status } : item
                  ),
                }
                : cat
            ) || [],
          },
        }
      })
    } catch (error) {
      console.error("Error updating item status:", error)
    }
  }

  const handleDeleteItem = async (categoryId: number, itemId: number) => {
    if (!selectedEvent?.id) return

    try {
      await budgetService.deleteItem(itemId)
      setSelectedEvent((prev) => {
        if (!prev) return null
        return {
          ...prev,
          budget: {
            ...prev.budget!,
            BudgetCategories: prev.budget?.BudgetCategories.map((cat) =>
              cat.id === categoryId
                ? {
                  ...cat,
                  items: cat.items.filter((item) => item.id !== itemId),
                }
                : cat
            ) || [],
          },
        }
      })
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  const calculateTotals = () => {
    if (!selectedEvent?.budget?.BudgetCategories) return { total: 0, spent: 0, remaining: 0 }

    if (selectedEvent.budget.BudgetCategories.length === 0) return { total: 0, spent: 0, remaining: 0 }

    const total = selectedEvent.budget.BudgetCategories.reduce(
      (sum, category) =>
        sum +
        category.BudgetItems?.reduce((categorySum, item) => categorySum + item.amount, 0) || 0,
      0
    )

    const spent = selectedEvent.budget.BudgetCategories.reduce(
      (sum, category) =>
        sum +
        category.BudgetItems  
          ?.filter((item) => item.status === "Approved")
          .reduce((categorySum, item) => categorySum + item.amount, 0) || 0,
      0
    )

    return {
      total,
      spent,
      remaining: total - spent,
    }
  }

  const { total, spent, remaining } = calculateTotals()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A9A32]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Budget Management</h1>

      <EventSelection
        events={events}
        selectedEvent={selectedEvent}
        totalBudget={total}
        spentAmount={spent}
        onEventSelect={handleEventSelect}
      />

      {selectedEvent && (
        <>
          <BudgetOverview
            total={total}
            spent={spent}
            remaining={remaining}
            eventTitle={selectedEvent.name}
          />

          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Budget Categories</h2>
              <Button
                onClick={() => setIsAddCategoryDialogOpen(true)}
                className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>

            {selectedEvent.budget?.BudgetCategories && selectedEvent.budget.BudgetCategories.length > 0 ? (
              selectedEvent.budget.BudgetCategories.map((category) => (
                <BudgetCategory
                  key={category.id}
                  category={category}
                  onAddItem={(category) => {
                    setSelectedCategory(category)
                    setIsAddItemDialogOpen(true)
                  }}
                  onUpdateItemStatus={(categoryId, itemId, status) => handleUpdateItemStatus(categoryId, itemId, status as "Approved" | "Rejected")}
                  onDeleteItem={handleDeleteItem}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-black border border-[#1A9A32]/30 rounded-lg">
                <div className="mb-4">
                  <BarChart className="h-12 w-12 mx-auto text-[#1A9A32]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Categories Yet</h3>
                <p className="text-white/70 mb-6">
                  Start by creating your first budget category for {selectedEvent.title}
                </p>
                <Button
                  onClick={() => setIsAddCategoryDialogOpen(true)}
                  className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create First Category
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      <AddCategoryDialog
        isOpen={isAddCategoryDialogOpen}
        onOpenChange={setIsAddCategoryDialogOpen}
        newCategory={newCategory}
        onNewCategoryChange={setNewCategory}
        onSubmit={handleAddCategory}
        eventTitle={selectedEvent?.name || ""}
      />

      <AddItemDialog
        isOpen={isAddItemDialogOpen}
        onOpenChange={setIsAddItemDialogOpen}
        newItem={newItem}
        onNewItemChange={setNewItem}
        onSubmit={handleAddItem}
        categoryName={selectedCategory?.name || ""}
      />
    </div>
  )
}
