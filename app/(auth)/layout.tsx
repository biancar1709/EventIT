import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>EventIT - Authentication</title>
        <meta name="description" content="EventIT authentication portal for organizers" />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
