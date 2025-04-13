"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  PlusCircle,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Printer,
  BarChart,
  ChevronDown,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BudgetManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("Tech Workshop 2025")

  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "BarChart",
  })
  const [currentCategory, setCurrentCategory] = useState("")
  const [currentSubcategory, setCurrentSubcategory] = useState("")
  const [newBudgetItem, setNewBudgetItem] = useState({
    description: "",
    amount: "",
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  })

  // Sample data for events
  const events = [
    {
      id: 1,
      name: "Tech Workshop 2025",
      date: "March 15, 2025",
      budget: 5000,
      spent: 3750,
    },
    {
      id: 2,
      name: "IT Career Fair",
      date: "April 5, 2025",
      budget: 8000,
      spent: 2000,
    },
    {
      id: 3,
      name: "Hackathon Challenge",
      date: "May 10-12, 2025",
      budget: 12000,
      spent: 4500,
    },
  ]

  // Get the selected event data
  const selectedEventData = events.find((event) => event.name === selectedEvent) || events[0]

  // Budget categories and items for the selected event
  const budgetCategories = [
    {
      name: "Marketing",
      icon: BarChart,
      iconColor: "text-[#1A9A32]",
      subcategories: [
        {
          name: "Online",
          items: [
            {
              id: 1,
              description: "Social Media Ads",
              amount: 500,
              status: "Approved",
              date: "2025-02-10",
            },
            {
              id: 2,
              description: "Email Marketing Campaign",
              amount: 250,
              status: "Pending",
              date: "2025-02-15",
            },
            {
              id: 3,
              description: "Website Banners",
              amount: 150,
              status: "Approved",
              date: "2025-02-05",
            },
          ],
        },
        {
          name: "Offline",
          items: [
            {
              id: 4,
              description: "Printed Flyers",
              amount: 300,
              status: "Approved",
              date: "2025-02-12",
            },
            {
              id: 5,
              description: "Campus Posters",
              amount: 200,
              status: "Approved",
              date: "2025-02-08",
            },
          ],
        },
      ],
    },
    {
      name: "Venue",
      icon: MapPin,
      iconColor: "text-[#89CB81]",
      subcategories: [
        {
          name: "Rental",
          items: [
            {
              id: 6,
              description: "Main Hall Rental",
              amount: 1500,
              status: "Approved",
              date: "2025-01-20",
            },
          ],
        },
        {
          name: "Equipment",
          items: [
            {
              id: 7,
              description: "AV Equipment",
              amount: 600,
              status: "Approved",
              date: "2025-02-18",
            },
            {
              id: 8,
              description: "Furniture Rental",
              amount: 400,
              status: "Pending",
              date: "2025-02-25",
            },
          ],
        },
      ],
    },
    {
      name: "Personnel",
      icon: Users,
      iconColor: "text-accent",
      subcategories: [
        {
          name: "Speakers",
          items: [
            {
              id: 9,
              description: "Speaker Honorariums",
              amount: 1000,
              status: "Approved",
              date: "2025-03-01",
            },
            {
              id: 10,
              description: "Speaker Travel",
              amount: 500,
              status: "Pending",
              date: "2025-03-05",
            },
          ],
        },
        {
          name: "Staff",
          items: [
            {
              id: 11,
              description: "Event Staff",
              amount: 800,
              status: "Approved",
              date: "2025-03-10",
            },
          ],
        },
      ],
    },
    {
      name: "Catering",
      icon: Coffee,
      iconColor: "text-[#B6E29F]",
      subcategories: [
        {
          name: "Food",
          items: [
            {
              id: 12,
              description: "Lunch Buffet",
              amount: 1200,
              status: "Approved",
              date: "2025-03-12",
            },
          ],
        },
        {
          name: "Beverages",
          items: [
            {
              id: 13,
              description: "Coffee & Tea Service",
              amount: 300,
              status: "Approved",
              date: "2025-03-12",
            },
            {
              id: 14,
              description: "Water & Soft Drinks",
              amount: 150,
              status: "Approved",
              date: "2025-03-12",
            },
          ],
        },
      ],
    },
  ]

  // Calculate totals for the selected event
  const totalBudget = selectedEventData.budget
  const totalSpent = selectedEventData.spent
  const remainingBudget = totalBudget - totalSpent
  const budgetUtilization = (totalSpent / totalBudget) * 100

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#1A9A32] text-white"
      case "Pending":
        return "bg-[#89CB81] text-black"
      case "Rejected":
        return "bg-red-500 text-white"
      default:
        return "bg-white/20 text-white"
    }
  }

  // Function to add a new budget item
  const addNewBudgetItem = (category: string, subcategory: string) => {
    setCurrentCategory(category)
    setCurrentSubcategory(subcategory)
    setIsAddItemDialogOpen(true)
  }

  const handleAddBudgetItem = () => {
    console.log("Adding new budget item:", {
      category: currentCategory,
      subcategory: currentSubcategory,
      ...newBudgetItem,
    })

    // Here you would typically add the item to your backend

    // Reset form and close dialog
    setNewBudgetItem({
      description: "",
      amount: "",
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddItemDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewBudgetItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCategory = () => {
    console.log("Adding new budget category:", newCategory)

    // Here you would typically add the category to your backend

    // Reset form and close dialog
    setNewCategory({
      name: "",
      icon: "BarChart",
    })
    setIsAddCategoryDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Event Budget Management</h1>
          <p className="text-white/80">Track expenses and income for each event</p>
        </div>
      </div>

      {/* Event Selection */}
      <Card className="bg-black border-[#1A9A32]/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Select Event</CardTitle>
          <CardDescription className="text-white/70">Choose an event to manage its budget</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className={`bg-black cursor-pointer transition-all ${
                  selectedEvent === event.name
                    ? "border-accent shadow-md shadow-accent/20"
                    : "border-[#1A9A32]/30 hover:border-[#1A9A32]/60"
                }`}
                onClick={() => setSelectedEvent(event.name)}
              >
                <div
                  className={`p-4 ${
                    selectedEvent === event.name ? "bg-accent/20" : "bg-[#074A29]/20"
                  } flex justify-between items-center`}
                >
                  <div>
                    <h3 className="font-medium text-white">{event.name}</h3>
                    <p className="text-white/70 text-sm">{event.date}</p>
                    <div className="flex items-center mt-2 text-xs text-white/80">
                      <span>
                        ${event.spent.toLocaleString()} of ${event.budget.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(event.spent / event.budget) * 100}
                      className="h-1.5 mt-2 bg-[#074A29]/30"
                      indicatorClassName={`${
                        event.spent / event.budget > 0.9
                          ? "bg-red-500"
                          : event.spent / event.budget > 0.7
                            ? "bg-accent"
                            : "bg-[#1A9A32]"
                      }`}
                    />
                  </div>
                  {selectedEvent === event.name && (
                    <div className="bg-accent rounded-full p-1">
                      <Check className="h-5 w-5 text-black" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-black border-[#1A9A32]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-[#1A9A32]" />
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalBudget.toLocaleString()}</div>
            <p className="text-[#B6E29F] text-sm mt-1">Allocated for {selectedEvent}</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-accent/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center">
              <TrendingDown className="mr-2 h-5 w-5 text-accent" />
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalSpent.toLocaleString()}</div>
            <p className="text-accent text-sm mt-1">{budgetUtilization.toFixed(1)}% of budget used</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-[#1A9A32]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-[#89CB81]" />
              Remaining Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${remainingBudget >= 0 ? "text-[#1A9A32]" : "text-red-500"}`}>
              ${remainingBudget.toLocaleString()}
            </div>
            <p className="text-white/70 text-sm mt-1">
              {remainingBudget >= 0 ? "Available to spend" : "Budget deficit"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Budget Categories for {selectedEvent}</h2>
        <div className="space-y-4">
          {budgetCategories.map((category, index) => (
            <Collapsible key={index} className="bg-black border border-[#1A9A32]/30 rounded-lg overflow-hidden">
              <CollapsibleTrigger className="w-full">
                <div className="bg-gradient-to-r from-[#074A29]/40 to-[#1A9A32]/30 p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 bg-[#1A9A32]/20 mr-3`}>
                      <category.icon className={`h-5 w-5 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-medium text-white">{category.name}</h3>
                  </div>
                  <ChevronDown className="h-5 w-5 text-white transition-transform ui-open:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 space-y-6">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium text-[#89CB81]">{subcategory.name}</h4>
                        <Button
                          size="sm"
                          onClick={() => addNewBudgetItem(category.name, subcategory.name)}
                          className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white"
                        >
                          <PlusCircle className="mr-2 h-3 w-3" />
                          Add Item
                        </Button>
                      </div>
                      <div className="bg-[#074A29]/10 rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader className="bg-[#074A29]/20">
                            <TableRow className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                              <TableHead className="text-white">Description</TableHead>
                              <TableHead className="text-white text-right">Amount</TableHead>
                              <TableHead className="text-white">Date</TableHead>
                              <TableHead className="text-white">Status</TableHead>
                              <TableHead className="text-white text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {subcategory.items.map((item) => (
                              <TableRow key={item.id} className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                                <TableCell className="font-medium text-white">{item.description}</TableCell>
                                <TableCell className="text-right text-accent">
                                  ${item.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-white/80">
                                  <div className="flex items-center">
                                    <Calendar className="mr-2 h-3 w-3 text-[#B6E29F]" />
                                    {new Date(item.date).toLocaleDateString()}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-black border-[#1A9A32]/50">
                                      <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
                                      <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">
                                        Edit Item
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">
                                        Change Status
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
                                      <DropdownMenuItem className="text-red-500 hover:bg-red-500/10">
                                        Delete Item
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                            {subcategory.items.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-white/70">
                                  No budget items in this category yet.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Add New Budget Category */}
      <div className="flex justify-center mb-8">
        <Button
          className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white"
          onClick={() => setIsAddCategoryDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Budget Category
        </Button>
      </div>

      {/* Budget Summary */}
      <Card className="bg-black border-[#1A9A32]/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Budget Summary</CardTitle>
          <CardDescription className="text-white/70">Overview of budget allocation by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetCategories.map((category, index) => {
              // Calculate total for this category
              const categoryTotal = category.subcategories.reduce(
                (sum, subcategory) => sum + subcategory.items.reduce((subSum, item) => subSum + item.amount, 0),
                0,
              )
              const categoryPercentage = (categoryTotal / totalSpent) * 100

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <category.icon className={`h-4 w-4 mr-2 ${category.iconColor}`} />
                      <span className="text-white">{category.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white mr-2">${categoryTotal.toLocaleString()}</span>
                      <span className="text-white/70 text-sm">({categoryPercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <Progress
                    value={categoryPercentage}
                    className="h-2 bg-[#074A29]/30"
                    indicatorClassName={
                      index % 4 === 0
                        ? "bg-[#1A9A32]"
                        : index % 4 === 1
                          ? "bg-[#89CB81]"
                          : index % 4 === 2
                            ? "bg-accent"
                            : "bg-[#B6E29F]"
                    }
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-[#1A9A32]/30 pt-4">
          <Button variant="outline" className="border-[#1A9A32]/50 text-white">
            <FileText className="mr-2 h-4 w-4" />
            Export Budget Report
          </Button>
          <Button variant="outline" className="border-[#1A9A32]/50 text-white">
            <Printer className="mr-2 h-4 w-4" />
            Print Budget
          </Button>
        </CardFooter>
      </Card>

      {/* Add Budget Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="bg-black border-[#1A9A32]/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add Budget Item</DialogTitle>
            <DialogDescription className="text-white/70">
              Add a new budget item to {currentCategory} - {currentSubcategory}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={newBudgetItem.description}
                onChange={handleInputChange}
                placeholder="Enter item description"
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={newBudgetItem.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newBudgetItem.date}
                onChange={handleInputChange}
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newBudgetItem.status}
                onValueChange={(value) => setNewBudgetItem((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#1A9A32]/30">
                  <SelectItem value="Pending" className="text-white hover:bg-[#1A9A32]/20">
                    Pending
                  </SelectItem>
                  <SelectItem value="Approved" className="text-white hover:bg-[#1A9A32]/20">
                    Approved
                  </SelectItem>
                  <SelectItem value="Rejected" className="text-white hover:bg-[#1A9A32]/20">
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddItemDialogOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={handleAddBudgetItem} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Budget Category Dialog */}
      <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
        <DialogContent className="bg-black border-[#1A9A32]/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add Budget Category</DialogTitle>
            <DialogDescription className="text-white/70">
              Create a new budget category for {selectedEvent}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={newCategory.name}
                onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryIcon">Icon</Label>
              <Select
                value={newCategory.icon}
                onValueChange={(value) => setNewCategory((prev) => ({ ...prev, icon: value }))}
              >
                <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#1A9A32]/30">
                  <SelectItem value="BarChart" className="text-white hover:bg-[#1A9A32]/20">
                    Chart
                  </SelectItem>
                  <SelectItem value="Coffee" className="text-white hover:bg-[#1A9A32]/20">
                    Food & Drinks
                  </SelectItem>
                  <SelectItem value="Users" className="text-white hover:bg-[#1A9A32]/20">
                    People
                  </SelectItem>
                  <SelectItem value="MapPin" className="text-white hover:bg-[#1A9A32]/20">
                    Location
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddCategoryDialogOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={handleAddCategory} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Missing icons from the imports
function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Coffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
