import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, DollarSign, Clock, AlertCircle, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OrganizerDashboard() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
          <p className="text-white/80">Manage your events and monitor performance</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-accent hover:bg-accent/90 text-black">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
          <div className="bg-[#074A29]/40 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">12</div>
                <Calendar className="h-4 w-4 text-[#B6E29F]" />
              </div>
              <p className="text-xs text-white/80 mt-1">3 active, 9 completed</p>
            </CardContent>
          </div>
        </Card>
        <Card className="overflow-hidden bg-black border-[#89CB81]/50">
          <div className="bg-[#1A9A32]/30 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1,248</div>
                <Users className="h-4 w-4 text-[#89CB81]" />
              </div>
              <p className="text-xs text-white/80 mt-1">+24% from last month</p>
            </CardContent>
          </div>
        </Card>
        <Card className="overflow-hidden bg-black border-accent/50">
          <div className="bg-accent/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">78%</div>
                <DollarSign className="h-4 w-4 text-accent" />
              </div>
              <p className="text-xs text-white/70 mt-1">$15,600 of $20,000</p>
            </CardContent>
          </div>
        </Card>
        <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
          <div className="bg-gradient-to-br from-[#074A29]/40 to-[#1A9A32]/30 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">3</div>
                <Clock className="h-4 w-4 text-[#B6E29F]" />
              </div>
              <p className="text-xs text-white/80 mt-1">Next: Tech Workshop (2 days)</p>
            </CardContent>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList className="bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-1">
          <TabsTrigger
            value="upcoming"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-[#1A9A32]"
          >
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-[#1A9A32]"
          >
            Active Events
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-[#1A9A32]"
          >
            Past Events
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Tech Workshop 2025",
                date: "March 15, 2025",
                participants: 45,
                status: "Registration Open",
                tasks: 8,
                gradient: "from-[#074A29]/40 to-[#1A9A32]/30",
                borderColor: "border-[#1A9A32]/50",
              },
              {
                title: "IT Career Fair",
                date: "April 5, 2025",
                participants: 120,
                status: "Planning",
                tasks: 12,
                gradient: "from-[#1A9A32]/30 to-[#89CB81]/30",
                borderColor: "border-[#89CB81]/50",
              },
              {
                title: "Hackathon Challenge",
                date: "May 10-12, 2025",
                participants: 75,
                status: "Registration Open",
                tasks: 5,
                gradient: "from-[#074A29]/40 to-accent/20",
                borderColor: "border-accent/50",
              },
            ].map((event, index) => (
              <Card key={index} className={`overflow-hidden bg-black ${event.borderColor}`}>
                <div className={`bg-gradient-to-r ${event.gradient} text-white`}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="text-white/80">{event.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/80">Participants:</span>
                        <span className="text-sm font-medium">{event.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/80">Status:</span>
                        <span className="text-sm font-medium">{event.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/80">Pending Tasks:</span>
                        <span className="text-sm font-medium">{event.tasks}</span>
                      </div>
                      <Button variant="outline" className="w-full mt-2 border-white/20 text-white hover:bg-white/10">
                        Manage Event
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
            <div className="bg-gradient-to-r from-[#1A9A32]/30 to-[#074A29]/40 text-white p-6">
              <p>No active events at the moment.</p>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
            <div className="bg-gradient-to-r from-[#074A29]/40 to-[#1A9A32]/30 text-white p-6">
              <p>View your past events and their performance metrics.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden bg-black border-accent/50">
          <div className="bg-gradient-to-br from-accent/20 to-[#1A9A32]/30 text-white">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription className="text-white/80">Latest updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Budget approval required",
                    description: "Tech Workshop 2025 budget needs your approval",
                    time: "2 hours ago",
                    icon: DollarSign,
                    urgent: true,
                  },
                  {
                    title: "New participant registrations",
                    description: "15 new registrations for IT Career Fair",
                    time: "Yesterday",
                    icon: Users,
                    urgent: false,
                  },
                  {
                    title: "Schedule conflict detected",
                    description: "Two sessions scheduled at the same time and location",
                    time: "2 days ago",
                    icon: AlertCircle,
                    urgent: true,
                  },
                ].map((notification, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`rounded-full p-2 ${notification.urgent ? "bg-accent text-black" : "bg-[#1A9A32] text-white"}`}
                    >
                      <notification.icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-white/80">{notification.description}</p>
                      <p className="text-xs text-white/80">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
          <div className="bg-gradient-to-br from-[#074A29]/40 to-[#1A9A32]/30 text-white">
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription className="text-white/80">Tasks requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Finalize speaker list for Tech Workshop",
                    dueDate: "Feb 28, 2025",
                    priority: "High",
                  },
                  {
                    title: "Review venue proposals for Hackathon",
                    dueDate: "Mar 5, 2025",
                    priority: "Medium",
                  },
                  {
                    title: "Approve marketing materials for IT Career Fair",
                    dueDate: "Mar 10, 2025",
                    priority: "High",
                  },
                  {
                    title: "Coordinate with catering service",
                    dueDate: "Mar 15, 2025",
                    priority: "Low",
                  },
                ].map((task, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-white/80">Due: {task.dueDate}</p>
                    </div>
                    <Badge
                      className={
                        task.priority === "High"
                          ? "bg-accent text-black hover:bg-accent/90"
                          : task.priority === "Medium"
                            ? "bg-[#89CB81] text-black hover:bg-[#89CB81]/90"
                            : "bg-white/20 text-white hover:bg-white/30"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
