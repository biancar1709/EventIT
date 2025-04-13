"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Users, Clock, PlusCircle, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#074A29] to-[#1A9A32] rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to EventIT</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Your comprehensive platform for managing student-oriented events for the Cybernetics Students Union
              (SiSC). Organize, track, and analyze your events with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="overflow-hidden border-[#1A9A32]/50 bg-black">
          <div className="bg-[#074A29]/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#B6E29F] mb-1">Upcoming Events</h3>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-xs text-white/80 mt-1">Next event in 2 days</p>
              </div>
              <div className="bg-[#1A9A32]/30 p-3 rounded-full">
                <Calendar className="h-5 w-5 text-[#B6E29F]" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden border-[#89CB81]/50 bg-black">
          <div className="bg-[#1A9A32]/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#89CB81] mb-1">Total Participants</h3>
                <p className="text-2xl font-bold text-white">1,248</p>
                <p className="text-xs text-white/80 mt-1">Across all your events</p>
              </div>
              <div className="bg-[#1A9A32]/30 p-3 rounded-full">
                <Users className="h-5 w-5 text-[#89CB81]" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden border-accent/50 bg-black">
          <div className="bg-accent/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-accent mb-1">Next Event</h3>
                <p className="text-2xl font-bold text-white">2 days</p>
                <p className="text-xs text-white/80 mt-1">Tech Workshop 2025</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-full">
                <Clock className="h-5 w-5 text-accent" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-2xl font-bold text-[#1A9A32] mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Manage Events",
            description: "View and edit all your events",
            icon: Calendar,
            link: "/organizer/events",
            bgColor: "bg-[#074A29]/40",
            borderColor: "border-[#1A9A32]/50",
            iconColor: "text-[#B6E29F]",
          },
          {
            title: "Create Event",
            description: "Set up a new event",
            icon: PlusCircle,
            link: "/organizer/create-event",
            bgColor: "bg-[#1A9A32]/30",
            borderColor: "border-[#89CB81]/50",
            iconColor: "text-[#89CB81]",
          },
          {
            title: "Budget Overview",
            description: "Track expenses and income",
            icon: Clock,
            link: "/organizer/budget",
            bgColor: "bg-[#074A29]/40",
            borderColor: "border-[#1A9A32]/50",
            iconColor: "text-[#B6E29F]",
          },
          {
            title: "Task Management",
            description: "Manage your pending tasks",
            icon: Calendar,
            link: "/organizer/tasks",
            bgColor: "bg-accent/20",
            borderColor: "border-accent/50",
            iconColor: "text-accent",
          },
        ].map((card, index) => (
          <Link href={card.link} key={index}>
            <Card
              className={`overflow-hidden ${card.borderColor} bg-black hover:shadow-md hover:shadow-[#1A9A32]/20 transition-shadow cursor-pointer h-full`}
            >
              <div className={`${card.bgColor} p-6 flex flex-col h-full`}>
                <div className="flex items-center justify-between mb-4">
                  <card.icon className={`h-8 w-8 ${card.iconColor}`} />
                  <ArrowRight className="h-5 w-5 text-white/50" />
                </div>
                <h3 className="font-medium text-white text-lg">{card.title}</h3>
                <p className="text-white/70 mt-1 text-sm">{card.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Event */}
      <h2 className="text-2xl font-bold text-[#1A9A32] mb-4">Featured Event</h2>
      <Card className="overflow-hidden border-[#1A9A32]/50 bg-black mb-8">
        <div className="bg-gradient-to-r from-[#074A29]/40 to-[#1A9A32]/30 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-black/20 rounded-lg flex items-center justify-center p-8">
              <Calendar className="h-16 w-16 text-[#1A9A32]" />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-white mb-2">Tech Workshop 2025</h3>
              <p className="text-white/80 mb-4">
                Learn the latest technologies from industry experts in this comprehensive workshop designed for students
                of all skill levels.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-black/20 p-3 rounded-lg">
                  <p className="text-white/70 text-xs">Date</p>
                  <p className="text-white font-medium">March 15, 2025</p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                  <p className="text-white/70 text-xs">Time</p>
                  <p className="text-white font-medium">10:00 AM - 4:00 PM</p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                  <p className="text-white/70 text-xs">Location</p>
                  <p className="text-white font-medium">Main Campus, Building A</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white" asChild>
                  <Link href="/organizer/events">Manage Event</Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-[#1A9A32]/50 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">Tech Workshop 2025</DialogTitle>
                      <DialogDescription className="text-white/80">Event details and information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-white">
                        Learn the latest technologies from industry experts in this comprehensive workshop designed for
                        students of all skill levels.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#074A29]/20 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-[#B6E29F]" />
                            <span className="text-[#B6E29F] font-medium">Date & Time</span>
                          </div>
                          <p className="text-white">March 15, 2025</p>
                          <p className="text-white">10:00 AM - 4:00 PM</p>
                        </div>
                        <div className="bg-[#074A29]/20 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 mr-2 text-[#B6E29F]" />
                            <span className="text-[#B6E29F] font-medium">Location</span>
                          </div>
                          <p className="text-white">Main Campus, Building A</p>
                          <p className="text-white/70 text-sm">Room 302</p>
                        </div>
                        <div className="bg-[#074A29]/20 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Users className="h-4 w-4 mr-2 text-[#B6E29F]" />
                            <span className="text-[#B6E29F] font-medium">Participants</span>
                          </div>
                          <p className="text-white">45 registered</p>
                          <p className="text-white/70 text-sm">Maximum capacity: 50</p>
                        </div>
                        <div className="bg-[#074A29]/20 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-[#B6E29F]" />
                            <span className="text-[#B6E29F] font-medium">Status</span>
                          </div>
                          <p className="text-white">Registration Open</p>
                          <p className="text-white/70 text-sm">Closes on March 10, 2025</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
