"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ClipboardList,
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  CalendarClock,
  ChevronRight,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import React from "react"

export default function TaskManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("Tech Workshop 2025")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Not Started",
    assignee: "John Doe",
    event: selectedEvent,
  })

  // Sample data for events
  const events = [
    {
      id: 1,
      name: "Tech Workshop 2025",
      date: "March 15, 2025",
      totalTasks: 4,
      completedTasks: 1,
      inProgressTasks: 1,
      notStartedTasks: 2,
    },
    {
      id: 2,
      name: "IT Career Fair",
      date: "April 5, 2025",
      totalTasks: 2,
      completedTasks: 1,
      inProgressTasks: 1,
      notStartedTasks: 0,
    },
    {
      id: 3,
      name: "Hackathon Challenge",
      date: "May 10-12, 2025",
      totalTasks: 2,
      completedTasks: 0,
      inProgressTasks: 1,
      notStartedTasks: 1,
    },
  ]

  // Sample data for tasks
  const allTasks = [
    {
      id: 1,
      title: "Finalize speaker list for Tech Workshop",
      description: "Contact all speakers and confirm their participation",
      dueDate: "2025-02-28",
      priority: "High",
      status: "In Progress",
      event: "Tech Workshop 2025",
      assignee: "John Doe",
    },
    {
      id: 2,
      title: "Book venue for Tech Workshop",
      description: "Confirm reservation and pay deposit",
      dueDate: "2025-02-20",
      priority: "High",
      status: "Completed",
      event: "Tech Workshop 2025",
      assignee: "Jane Smith",
    },
    {
      id: 3,
      title: "Arrange catering for Tech Workshop",
      description: "Select menu and confirm number of attendees",
      dueDate: "2025-03-01",
      priority: "Medium",
      status: "Not Started",
      event: "Tech Workshop 2025",
      assignee: "John Doe",
    },
    {
      id: 4,
      title: "Prepare workshop materials",
      description: "Create handouts and presentation slides",
      dueDate: "2025-03-10",
      priority: "Medium",
      status: "Not Started",
      event: "Tech Workshop 2025",
      assignee: "Jane Smith",
    },
    {
      id: 5,
      title: "Set up registration system",
      description: "Configure online registration form and payment processing",
      dueDate: "2025-02-20",
      priority: "High",
      status: "Completed",
      event: "IT Career Fair",
      assignee: "John Doe",
    },
    {
      id: 6,
      title: "Contact companies for IT Career Fair",
      description: "Reach out to potential employers and confirm participation",
      dueDate: "2025-03-15",
      priority: "High",
      status: "In Progress",
      event: "IT Career Fair",
      assignee: "Jane Smith",
    },
    {
      id: 7,
      title: "Prepare participant welcome packages",
      description: "Assemble welcome kits with schedule, name tags, and materials",
      dueDate: "2025-03-08",
      priority: "Medium",
      status: "In Progress",
      event: "Hackathon Challenge",
      assignee: "John Doe",
    },
    {
      id: 8,
      title: "Set up judging criteria",
      description: "Define evaluation metrics and recruit judges",
      dueDate: "2025-04-15",
      priority: "Medium",
      status: "Not Started",
      event: "Hackathon Challenge",
      assignee: "Jane Smith",
    },
  ]

  // Get the selected event data
  const selectedEventData = events.find((event) => event.name === selectedEvent) || events[0]

  // Filter tasks based on search query and selected event
  const filteredTasks = allTasks.filter(
    (task) =>
      task.event === selectedEvent &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-accent text-black"
      case "Medium":
        return "bg-[#89CB81] text-black"
      case "Low":
        return "bg-white/20 text-white"
      default:
        return "bg-white/20 text-white"
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#1A9A32] text-white"
      case "In Progress":
        return "bg-[#89CB81] text-black"
      case "Not Started":
        return "bg-accent/80 text-black"
      default:
        return "bg-white/20 text-white"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-[#1A9A32]" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-[#89CB81]" />
      case "Not Started":
        return <AlertCircle className="h-4 w-4 text-accent" />
      default:
        return <AlertCircle className="h-4 w-4 text-white/50" />
    }
  }

  // Calculate completion percentage
  const completionPercentage = selectedEventData
    ? Math.round((selectedEventData.completedTasks / selectedEventData.totalTasks) * 100) || 0
    : 0

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTask = () => {
    // Here you would typically add the task to your backend
    console.log("Adding new task:", newTask)

    // For demo purposes, we'll just close the dialog
    setIsDialogOpen(false)

    // Reset the form
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "Not Started",
      assignee: "John Doe",
      event: selectedEvent,
    })
  }

  // Add this effect to update the event in newTask when selectedEvent changes
  React.useEffect(() => {
    setNewTask((prev) => ({ ...prev, event: selectedEvent }))
  }, [selectedEvent])

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div className="flex items-center">
          <ClipboardList className="h-6 w-6 mr-3 text-accent" />
          <div>
            <h1 className="text-3xl font-bold">Event Task Management</h1>
            <p className="text-white/80">Organize and track tasks for specific events</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-accent hover:bg-accent/90 text-black">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-[#1A9A32]/50 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Task</DialogTitle>
              <DialogDescription className="text-white/70">Create a new task for {selectedEvent}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  placeholder="Enter task title"
                  className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  placeholder="Enter task description"
                  className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={handleNewTaskChange}
                    className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                    <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#1A9A32]/30">
                      <SelectItem value="High" className="text-white hover:bg-[#1A9A32]/20">
                        High
                      </SelectItem>
                      <SelectItem value="Medium" className="text-white hover:bg-[#1A9A32]/20">
                        Medium
                      </SelectItem>
                      <SelectItem value="Low" className="text-white hover:bg-[#1A9A32]/20">
                        Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newTask.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#1A9A32]/30">
                      <SelectItem value="Not Started" className="text-white hover:bg-[#1A9A32]/20">
                        Not Started
                      </SelectItem>
                      <SelectItem value="In Progress" className="text-white hover:bg-[#1A9A32]/20">
                        In Progress
                      </SelectItem>
                      <SelectItem value="Completed" className="text-white hover:bg-[#1A9A32]/20">
                        Completed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select value={newTask.assignee} onValueChange={(value) => handleSelectChange("assignee", value)}>
                    <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#1A9A32]/30">
                      <SelectItem value="John Doe" className="text-white hover:bg-[#1A9A32]/20">
                        John Doe
                      </SelectItem>
                      <SelectItem value="Jane Smith" className="text-white hover:bg-[#1A9A32]/20">
                        Jane Smith
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button onClick={handleAddTask} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Event Selection */}
      <Card className="bg-black border-[#1A9A32]/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Select Event</CardTitle>
          <CardDescription className="text-white/70">Choose an event to manage its tasks</CardDescription>
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
                        {event.completedTasks}/{event.totalTasks} tasks completed
                      </span>
                    </div>
                    <Progress
                      value={(event.completedTasks / event.totalTasks) * 100}
                      className="h-1.5 mt-2 bg-[#074A29]/30"
                      indicatorClassName={`${
                        event.completedTasks === event.totalTasks
                          ? "bg-[#1A9A32]"
                          : event.completedTasks > 0
                            ? "bg-[#89CB81]"
                            : "bg-accent"
                      }`}
                    />
                  </div>
                  {selectedEvent === event.name && (
                    <div className="bg-accent rounded-full p-1">
                      <CheckCircle2 className="h-5 w-5 text-black" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Statistics for Selected Event */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="mr-2">Tasks for {selectedEvent}</span>
          <Badge className="bg-[#1A9A32] text-white">{completionPercentage}% Complete</Badge>
        </h2>
        <Link href={`/organizer/events`} className="text-[#89CB81] hover:text-[#1A9A32] flex items-center text-sm">
          View Event Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-black border-[#1A9A32]/50">
          <div className="bg-[#074A29]/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#B6E29F] mb-1">Total Tasks</h3>
                <p className="text-2xl font-bold text-white">{selectedEventData.totalTasks}</p>
              </div>
              <div className="bg-[#1A9A32]/30 p-2 rounded-full">
                <ClipboardList className="h-5 w-5 text-[#B6E29F]" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-black border-[#89CB81]/50">
          <div className="bg-[#1A9A32]/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#89CB81] mb-1">Completed</h3>
                <p className="text-2xl font-bold text-white">{selectedEventData.completedTasks}</p>
              </div>
              <div className="bg-[#1A9A32]/30 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-[#89CB81]" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-black border-[#89CB81]/50">
          <div className="bg-[#1A9A32]/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#89CB81] mb-1">In Progress</h3>
                <p className="text-2xl font-bold text-white">{selectedEventData.inProgressTasks}</p>
              </div>
              <div className="bg-[#1A9A32]/30 p-2 rounded-full">
                <Clock className="h-5 w-5 text-[#89CB81]" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-black border-accent/50">
          <div className="bg-accent/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-accent mb-1">Not Started</h3>
                <p className="text-2xl font-bold text-white">{selectedEventData.notStartedTasks}</p>
              </div>
              <div className="bg-accent/30 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder={`Search tasks for ${selectedEvent}...`}
            className="pl-10 bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-[#1A9A32]/50 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black border-[#1A9A32]/50">
            <DropdownMenuLabel className="text-white">Filter By</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">All Tasks</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">High Priority</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Due This Week</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Assigned to Me</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Task Management Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-[#074A29]/30 mb-4">
          <TabsTrigger
            value="all"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            All Tasks
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            value="not-started"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            Not Started
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="bg-black border-[#1A9A32]/30">
              <div className="bg-[#074A29]/20 p-8 text-center">
                <ClipboardList className="h-12 w-12 mx-auto mb-3 text-white/40" />
                <p className="text-white/70">No tasks found for {selectedEvent}.</p>
                <Button className="mt-4 bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add First Task
                </Button>
              </div>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="bg-black border-[#1A9A32]/30">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox id={`task-${task.id}`} className="mt-1" />
                      <div>
                        <h3 className="text-white font-medium">{task.title}</h3>
                        <p className="text-white/70 text-sm mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs text-white/60">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-white/60">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <Badge className={getStatusColor(task.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(task.status)}
                          {task.status}
                        </span>
                      </Badge>
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
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Edit Task</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">
                            Change Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">
                            Reassign Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
                          <DropdownMenuItem className="text-red-500 hover:bg-red-500/10">Delete Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {filteredTasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <Card key={task.id} className="bg-black border-[#89CB81]/50">
                <div className="bg-[#1A9A32]/10 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox id={`task-${task.id}`} className="mt-1" />
                      <div>
                        <h3 className="text-white font-medium">{task.title}</h3>
                        <p className="text-white/70 text-sm mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs text-white/60">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-white/60">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black border-[#1A9A32]/50">
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Edit Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="not-started" className="space-y-4">
          {filteredTasks
            .filter((task) => task.status === "Not Started")
            .map((task) => (
              <Card key={task.id} className="bg-black border-accent/50">
                <div className="bg-accent/10 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox id={`task-${task.id}`} className="mt-1" />
                      <div>
                        <h3 className="text-white font-medium">{task.title}</h3>
                        <p className="text-white/70 text-sm mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs text-white/60">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-white/60">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black border-[#1A9A32]/50">
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Start Task</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Edit Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filteredTasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <Card key={task.id} className="bg-black border-[#1A9A32]/50">
                <div className="bg-[#074A29]/20 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox id={`task-${task.id}`} checked className="mt-1" />
                      <div>
                        <h3 className="text-white/70 font-medium line-through">{task.title}</h3>
                        <p className="text-white/50 text-sm mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs text-white/40">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Completed on: {new Date().toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-white/40">
                            <User className="h-3.5 w-3.5 mr-1" />
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#1A9A32] text-white">Completed</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black border-[#1A9A32]/50">
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Reopen Task</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>

      {/* Upcoming Deadlines */}
      <Card className="bg-black border-accent/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CalendarClock className="mr-2 h-5 w-5 text-accent" />
            Upcoming Deadlines for {selectedEvent}
          </CardTitle>
          <CardDescription className="text-white/70">Tasks due in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks
              .filter((task) => {
                const dueDate = new Date(task.dueDate)
                const today = new Date()
                const sevenDaysLater = new Date()
                sevenDaysLater.setDate(today.getDate() + 7)
                return dueDate >= today && dueDate <= sevenDaysLater && task.status !== "Completed"
              })
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-[#074A29]/20 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{task.title}</p>
                    <div className="flex items-center text-xs text-white/60 mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
              ))}

            {filteredTasks.filter((task) => {
              const dueDate = new Date(task.dueDate)
              const today = new Date()
              const sevenDaysLater = new Date()
              sevenDaysLater.setDate(today.getDate() + 7)
              return dueDate >= today && dueDate <= sevenDaysLater && task.status !== "Completed"
            }).length === 0 && (
              <div className="text-center p-4 text-white/70">
                <p>No upcoming deadlines for {selectedEvent} in the next 7 days.</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-[#1A9A32]/30 pt-4">
          <Button variant="outline" className="w-full border-accent/50 text-white hover:bg-accent/10">
            View All Deadlines
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
