"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Settings,
  LogOut,
  User,
  BarChart,
  PlusCircle,
  ClipboardList,
  DollarSign,
  FileText,
  Bell,
  Home,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface EventSidebarProps {
  userRole?: "participant" | "organizer" | "sponsor" | "admin"
  userName?: string
  userAvatar?: string
}

export function EventSidebar({
  userRole = "organizer",
  userName = "Event Organizer",
  userAvatar = "",
}: EventSidebarProps) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/")

  return (
    <Sidebar className="border-r border-[#1A9A32]/30 bg-black">
      <SidebarHeader className="flex items-center justify-center py-4 bg-[#074A29]/30">
        <Link href="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-[#1A9A32]" />
          <span className="text-xl font-bold text-white">EventIT</span>
          <Badge className="ml-2 bg-accent text-black border-none">Organizer</Badge>
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="bg-[#1A9A32]/30" />
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#89CB81] font-medium">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/home")}
                  tooltip="Home"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/home">
                    <Home className="h-4 w-4 text-[#89CB81]" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  tooltip="Dashboard"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/">
                    <BarChart className="h-4 w-4 text-[#89CB81]" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organizer/notifications")}
                  tooltip="Notifications"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/organizer/notifications">
                    <Bell className="h-4 w-4 text-[#89CB81]" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-accent text-black">2</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Event Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#1A9A32] font-semibold">Event Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organizer/create-event")}
                  tooltip="Create Event"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/organizer/create-event">
                    <PlusCircle className="h-4 w-4 text-[#1A9A32]" />
                    <span>Create Event</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organizer/events")}
                  tooltip="Manage Events"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/organizer/events">
                    <Calendar className="h-4 w-4 text-[#1A9A32]" />
                    <span>Manage Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Administration */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#1A9A32] font-semibold">Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organizer/budget")}
                  tooltip="Budget"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/organizer/budget">
                    <DollarSign className="h-4 w-4 text-[#1A9A32]" />
                    <span>Budget Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organizer/reports")}
                  tooltip="Reports"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/organizer/reports">
                    <FileText className="h-4 w-4 text-[#1A9A32]" />
                    <span>Reports & Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organizer/tasks")}
                  tooltip="Tasks"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/organizer/tasks">
                    <ClipboardList className="h-4 w-4 text-[#1A9A32]" />
                    <span>Task Management</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-[#1A9A32] text-white">5</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings - Minimized */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#89CB81]">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/settings")}
                  tooltip="Settings"
                  className="text-white hover:bg-[#1A9A32]/20 data-[active=true]:bg-[#1A9A32]/30 data-[active=true]:text-white"
                >
                  <Link href="/settings">
                    <Settings className="h-4 w-4 text-[#89CB81]" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 bg-[#074A29]/30 m-2 rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2 text-white hover:bg-[#1A9A32]/20">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                  <AvatarFallback className="bg-[#1A9A32]/30 text-white">{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-black border-[#1A9A32]/30">
              <DropdownMenuLabel className="text-white">Organizer Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
              <DropdownMenuItem asChild className="text-white hover:bg-[#1A9A32]/20">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-white hover:bg-[#1A9A32]/20">
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
              <DropdownMenuItem asChild className="text-white hover:bg-[#1A9A32]/20">
                <Link href="/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
