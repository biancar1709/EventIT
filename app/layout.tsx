import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { EventSidebar } from "@/components/event-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>EventIT - Organizer Portal</title>
        <meta name="description" content="EventIT organizer portal for managing ITFest events" />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <EventSidebar userRole="organizer" userName="Event Organizer" />
              <main className="w-full overflow-auto bg-black">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
