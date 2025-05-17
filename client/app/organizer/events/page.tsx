"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Copy,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import eventsService, { Event } from "@/services/events.service"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ManageEvents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const data = await eventsService.getAllEvents()
      setEvents(data)
    } catch (error) {
      toast.error("Failed to fetch events")
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    try {
      await eventsService.deleteEvent(id)
      toast.success("Event deleted successfully")
      fetchEvents() // Refresh the events list
    } catch (error) {
      toast.error("Failed to delete event")
      console.error("Error deleting event:", error)
    }
  }

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-[#1A9A32] text-white"
      case "Planning":
        return "bg-[#89CB81] text-black"
      case "Draft":
        return "bg-white/20 text-white"
      case "Completed":
        return "bg-accent text-black"
      default:
        return "bg-white/20 text-white"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-white">Loading events...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="text-white/80">View, edit and manage all your events</p>
        </div>
        <Link href="/organizer/create-event">
          <Button className="mt-4 md:mt-0 bg-accent hover:bg-accent/90 text-black">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search events..."
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
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">All Events</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Upcoming Events</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Past Events</DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#1A9A32]/20">Draft Events</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Events Table */}
      <Card className="bg-black border-[#1A9A32]/30 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-[#074A29]/20">
              <TableRow className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                <TableHead className="text-white">
                  <div className="flex items-center">
                    Event Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-white">Date & Time</TableHead>
                <TableHead className="text-white">Location</TableHead>
                <TableHead className="text-white">Type</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-white/70">
                    No events found matching your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                    <TableCell className="font-medium text-white">{event.title}</TableCell>
                    <TableCell className="text-white/80">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3 w-3 text-[#B6E29F]" />
                          {event.date}
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="mr-2 h-3 w-3 text-[#B6E29F]" />
                          {event.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-3 w-3 text-[#B6E29F]" />
                        {event.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80">{event.type}</TableCell>
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
                          <DropdownMenuItem
                            className="text-white hover:bg-[#1A9A32]/20"
                            onClick={() => router.push(`/organizer/events/${event.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-white hover:bg-[#1A9A32]/20"
                            onClick={() => router.push(`/organizer/events/${event.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Event
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
                          <DropdownMenuItem
                            className="text-red-500 hover:bg-red-500/10"
                            onClick={() => handleDeleteEvent(event.id!)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-black border-[#1A9A32]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Event Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Total Events</span>
                <span className="text-white font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Upcoming Events</span>
                <span className="text-white font-medium">{events.filter((e) => e.date > new Date().toISOString()).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Past Events</span>
                <span className="text-white font-medium">{events.filter((e) => e.date < new Date().toISOString()).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-[#89CB81]/50 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from(new Set(events.map(e => e.type))).map((type, index) => (
                <div key={index} className="bg-[#1A9A32]/30 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#B6E29F]">
                    {events.filter((e) => e.type === type).length}
                  </span>
                  <span className="text-white/80 text-sm mt-1">{type}s</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
