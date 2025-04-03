import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Clock, PlusCircle, ArrowRight, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Workshop 2025",
      description: "Learn the latest technologies from industry experts",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Campus, Building A",
      participants: 45,
      status: "Registration Open",
      tasks: 8,
      bgColor: "bg-[#074A29]/40",
      borderColor: "border-[#1A9A32]/50",
      iconColor: "text-[#1A9A32]",
      buttonColor: "bg-[#1A9A32]",
    },
    {
      id: 2,
      title: "IT Career Fair",
      description: "Connect with top employers in the tech industry",
      date: "April 5, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Conference Center",
      participants: 120,
      status: "Planning",
      tasks: 12,
      bgColor: "bg-[#1A9A32]/30",
      borderColor: "border-[#89CB81]/50",
      iconColor: "text-[#89CB81]",
      buttonColor: "bg-[#89CB81]",
    },
    {
      id: 3,
      title: "Hackathon Challenge",
      description: "48 hours to build innovative solutions",
      date: "May 10-12, 2025",
      time: "Starts at 9:00 AM",
      location: "Innovation Hub",
      participants: 75,
      status: "Registration Open",
      tasks: 5,
      bgColor: "bg-accent/20",
      borderColor: "border-accent/50",
      iconColor: "text-accent",
      buttonColor: "bg-accent",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header with Create Event Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-6 rounded-lg text-white">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Event Organizer Dashboard</h1>
          <p className="text-sm md:text-base text-white/90 mt-2">Manage and create events for ITFest</p>
        </div>
        <Link href="/organizer/create-event">
          <Button size="lg" className="mt-4 md:mt-0 bg-accent hover:bg-accent/90 text-black">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Event
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card className="overflow-hidden border-[#1A9A32]/50 bg-black">
          <div className="bg-[#074A29]/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#B6E29F] mb-1">Your Events</h3>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-xs text-white/80 mt-1">3 upcoming, 9 completed</p>
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

      {/* Upcoming Events Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A9A32]">Upcoming Events</h2>
          <Link href="/organizer/events">
            <Button variant="outline" className="mt-2 sm:mt-0 border-[#1A9A32] text-[#1A9A32] hover:bg-[#1A9A32]/10">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className={`overflow-hidden ${event.borderColor} bg-black`}>
              <div className={`${event.bgColor}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{event.title}</CardTitle>
                      <CardDescription className="text-white/70">{event.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/5">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/5">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className={`h-4 w-4 mr-2 ${event.iconColor}`} />
                      <span className="text-sm text-white/90">{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-2 ${event.iconColor}`} />
                      <span className="text-sm text-white/90">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className={`h-4 w-4 mr-2 ${event.iconColor}`} />
                      <span className="text-sm text-white/90">{event.participants} participants</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="text-xs bg-white/10 rounded-md p-2 text-center">
                        <span className="block font-medium text-white">{event.tasks}</span>
                        <span className="text-white/70">Pending Tasks</span>
                      </div>
                      <div className="text-xs bg-white/10 rounded-md p-2 text-center">
                        <span className="block font-medium text-white">{event.status}</span>
                        <span className="text-white/70">Status</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-white/10 pt-4">
                  <Button className={`${event.buttonColor} hover:${event.buttonColor}/90 text-black`}>
                    Manage Event
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    View Details
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A9A32] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Manage Participants",
              icon: Users,
              bgColor: "bg-[#074A29]/40",
              borderColor: "border-[#1A9A32]/50",
              iconColor: "text-[#B6E29F]",
            },
            {
              title: "Schedule Management",
              icon: Calendar,
              bgColor: "bg-[#1A9A32]/30",
              borderColor: "border-[#89CB81]/50",
              iconColor: "text-[#89CB81]",
            },
            {
              title: "Budget Overview",
              icon: Clock,
              bgColor: "bg-[#074A29]/40",
              borderColor: "border-[#1A9A32]/50",
              iconColor: "text-[#B6E29F]",
            },
            {
              title: "Task Management",
              icon: Calendar,
              bgColor: "bg-accent/20",
              borderColor: "border-accent/50",
              iconColor: "text-accent",
            },
          ].map((action, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${action.borderColor} bg-black hover:shadow-md hover:shadow-[#1A9A32]/20 transition-shadow`}
            >
              <div className={`${action.bgColor} p-6 flex flex-col items-center justify-center text-center h-full`}>
                <action.icon className={`h-8 w-8 mb-2 ${action.iconColor}`} />
                <h3 className="font-medium text-white">{action.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

