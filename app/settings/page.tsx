"use client"

import type React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Moon, Sun, Lock, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    eventUpdates: true,
    newParticipants: true,
    taskReminders: true,
    budgetAlerts: true,
  })

  const [appearance, setAppearance] = useState({
    theme: "dark",
    language: "en",
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setAppearance((prev) => ({ ...prev, theme: theme || "dark" }))
  }, [theme])

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleAppearanceChange = (key: string, value: string) => {
    setAppearance((prev) => ({ ...prev, [key]: value }))

    if (key === "theme") {
      setTheme(value)
    }
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecurity((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Settings saved:", { notifications, appearance, security })
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-white/80">Customize your account preferences</p>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-1">
          <TabsTrigger
            value="notifications"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-[#1A9A32]"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-[#1A9A32]"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="text-white data-[state=active]:bg-black data-[state=active]:text-[#1A9A32]"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-4">
          <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
            <div className="bg-gradient-to-br from-[#074A29]/40 to-[#1A9A32]/30 text-white">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription className="text-white/80">
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-white/70">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange("email")}
                      className="data-[state=checked]:bg-[#1A9A32]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-white/70">Receive notifications in your browser</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange("push")}
                      className="data-[state=checked]:bg-[#1A9A32]"
                    />
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Event Updates</Label>
                      <p className="text-sm text-white/70">Changes to events you're organizing</p>
                    </div>
                    <Switch
                      checked={notifications.eventUpdates}
                      onCheckedChange={() => handleNotificationChange("eventUpdates")}
                      className="data-[state=checked]:bg-[#1A9A32]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Participants</Label>
                      <p className="text-sm text-white/70">When someone registers for your event</p>
                    </div>
                    <Switch
                      checked={notifications.newParticipants}
                      onCheckedChange={() => handleNotificationChange("newParticipants")}
                      className="data-[state=checked]:bg-[#1A9A32]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Task Reminders</Label>
                      <p className="text-sm text-white/70">Reminders for upcoming tasks</p>
                    </div>
                    <Switch
                      checked={notifications.taskReminders}
                      onCheckedChange={() => handleNotificationChange("taskReminders")}
                      className="data-[state=checked]:bg-[#1A9A32]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Budget Alerts</Label>
                      <p className="text-sm text-white/70">Notifications about budget changes</p>
                    </div>
                    <Switch
                      checked={notifications.budgetAlerts}
                      onCheckedChange={() => handleNotificationChange("budgetAlerts")}
                      className="data-[state=checked]:bg-[#1A9A32]"
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
            <div className="bg-gradient-to-br from-[#074A29]/40 to-[#1A9A32]/30 text-white">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription className="text-white/80">Customize how EventIT looks for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border ${
                        appearance.theme === "dark"
                          ? "border-[#1A9A32] bg-[#1A9A32]/20"
                          : "border-white/20 hover:bg-white/5"
                      }`}
                      onClick={() => handleAppearanceChange("theme", "dark")}
                    >
                      <Moon className="h-8 w-8 mb-2 text-[#89CB81]" />
                      <span>Dark</span>
                    </div>
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border ${
                        appearance.theme === "light"
                          ? "border-[#1A9A32] bg-[#1A9A32]/20"
                          : "border-white/20 hover:bg-white/5"
                      }`}
                      onClick={() => handleAppearanceChange("theme", "light")}
                    >
                      <div className="relative">
                        <Sun className="h-8 w-8 mb-2 text-[#FFAD4A]" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFAD4A] rounded-full animate-pulse"></div>
                      </div>
                      <span>Light</span>
                    </div>
                    <div
                      className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border ${
                        appearance.theme === "system"
                          ? "border-[#1A9A32] bg-[#1A9A32]/20"
                          : "border-white/20 hover:bg-white/5"
                      }`}
                      onClick={() => handleAppearanceChange("theme", "system")}
                    >
                      <div className="flex h-8 mb-2">
                        <Sun className="h-8 w-8 text-[#89CB81]" />
                        <Moon className="h-8 w-8 text-[#89CB81]" />
                      </div>
                      <span>System</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Select Language</Label>
                      <Select
                        value={appearance.language}
                        onValueChange={(value) => handleAppearanceChange("language", value)}
                      >
                        <SelectTrigger className="bg-black/50 border-white/20 text-white">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-[#1A9A32]/30">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ro">Romanian</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
            <div className="bg-gradient-to-br from-[#074A29]/40 to-[#1A9A32]/30 text-white">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription className="text-white/80">Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                    <Button className="w-full bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable 2FA</Label>
                      <p className="text-sm text-white/70">Add an extra layer of security to your account</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-[#1A9A32]" />
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Sign Out From All Devices
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button onClick={handleSaveSettings} className="bg-accent hover:bg-accent/90 text-black">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
