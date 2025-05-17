"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Edit, Save, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@itfest.org",
    role: "Event Organizer",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the profile data to your backend
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Organizer Profile</h1>
          <p className="text-white/80">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="mt-4 md:mt-0 bg-accent hover:bg-accent/90 text-black">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={handleSave} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Card className="overflow-hidden bg-black border-[#1A9A32]/50">
        <div className="bg-gradient-to-br from-[#074A29]/40 to-[#1A9A32]/30 text-white">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription className="text-white/80">Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={`${profile.firstName} ${profile.lastName}`} />
                <AvatarFallback className="bg-[#1A9A32]/30 text-white text-2xl">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white/80">
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white font-medium">{profile.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white/80">
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white font-medium">{profile.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[#89CB81]" />
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    ) : (
                      <span className="text-white">{profile.email}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Role</Label>
                  <div>
                    <Badge className="bg-accent text-black">{profile.role}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
