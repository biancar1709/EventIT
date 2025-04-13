import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Check, Clock } from "lucide-react"

export default function NotificationsPage() {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "Event Created: Tech Workshop 2025",
      description: "The event has been successfully created and is now in planning phase.",
      date: "Feb 15, 2025",
      time: "10:23 AM",
      type: "created",
      read: false,
    },
    {
      id: 2,
      title: "Event Completed: Data Science Bootcamp",
      description: "The event has been marked as completed. You can now generate reports.",
      date: "Jan 12, 2025",
      time: "5:45 PM",
      type: "completed",
      read: false,
    },
    {
      id: 3,
      title: "Event Created: IT Career Fair",
      description: "The event has been successfully created and is now in planning phase.",
      date: "Jan 5, 2025",
      time: "2:30 PM",
      type: "created",
      read: true,
    },
    {
      id: 4,
      title: "Event Completed: Cybersecurity Workshop",
      description: "The event has been marked as completed. You can now generate reports.",
      date: "Dec 20, 2024",
      time: "6:15 PM",
      type: "completed",
      read: true,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div className="flex items-center">
          <Bell className="h-6 w-6 mr-3 text-accent" />
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-white/80">Event creation and completion notifications</p>
          </div>
        </div>
        <Badge className="mt-2 md:mt-0 bg-accent text-black">
          {notifications.filter((n) => !n.read).length} Unread
        </Badge>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`bg-black border-${
              notification.type === "created" ? "[#1A9A32]" : "accent"
            }/50 ${notification.read ? "opacity-70" : ""}`}
          >
            <div
              className={`bg-gradient-to-r ${
                notification.type === "created" ? "from-[#074A29]/40 to-[#1A9A32]/30" : "from-accent/20 to-[#1A9A32]/20"
              } text-white`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {notification.type === "created" ? (
                      <Calendar className="h-5 w-5 mr-2 text-[#B6E29F]" />
                    ) : (
                      <Check className="h-5 w-5 mr-2 text-accent" />
                    )}
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                  </div>
                  {!notification.read && <Badge className="bg-accent text-black">New</Badge>}
                </div>
                <CardDescription className="text-white/80 mt-1">{notification.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-white/70">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {notification.date} at {notification.time}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card className="bg-black border-[#1A9A32]/30">
            <div className="bg-[#074A29]/20 p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-3 text-white/40" />
              <p className="text-white/70">No notifications at the moment</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
