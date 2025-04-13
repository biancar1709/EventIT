"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, DollarSign, Image, Check, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <p className="text-white/80">Set up your event details, schedule, and more</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                  ${
                    step === currentStep
                      ? "bg-[#1A9A32] text-white"
                      : step < currentStep
                        ? "bg-[#1A9A32]/70 text-white"
                        : "bg-[#1A9A32]/20 text-white/70"
                  }`}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : step}
              </div>
              <span className={`text-sm ${step === currentStep ? "text-white" : "text-white/70"}`}>
                {step === 1 && "Basic Info"}
                {step === 2 && "Schedule"}
                {step === 3 && "Details"}
                {step === 4 && "Review"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-[#1A9A32]/20 h-1 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-[#1A9A32] h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="bg-black border-[#1A9A32]/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl">Basic Information</CardTitle>
            <CardDescription className="text-white/70">Enter the basic details about your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="event-name" className="text-white">
                  Event Name
                </Label>
                <Input
                  id="event-name"
                  placeholder="Enter event name"
                  className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type" className="text-white">
                  Event Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#1A9A32]/30">
                    <SelectItem value="workshop" className="text-white hover:bg-[#1A9A32]/20">
                      Workshop
                    </SelectItem>
                    <SelectItem value="conference" className="text-white hover:bg-[#1A9A32]/20">
                      Conference
                    </SelectItem>
                    <SelectItem value="seminar" className="text-white hover:bg-[#1A9A32]/20">
                      Seminar
                    </SelectItem>
                    <SelectItem value="hackathon" className="text-white hover:bg-[#1A9A32]/20">
                      Hackathon
                    </SelectItem>
                    <SelectItem value="fair" className="text-white hover:bg-[#1A9A32]/20">
                      Fair
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-[#1A9A32]/20">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description" className="text-white">
                Event Description
              </Label>
              <Textarea
                id="event-description"
                placeholder="Describe your event"
                className="min-h-32 bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="organizer-name" className="text-white">
                  Organizer Name
                </Label>
                <Input
                  id="organizer-name"
                  placeholder="Enter organizer name"
                  className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer-email" className="text-white">
                  Organizer Email
                </Label>
                <Input
                  id="organizer-email"
                  type="email"
                  placeholder="Enter organizer email"
                  className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Event Banner</Label>
              <div className="border-2 border-dashed border-[#1A9A32]/30 rounded-lg p-6 flex flex-col items-center justify-center bg-[#074A29]/10">
                <Image className="h-10 w-10 text-[#1A9A32]/70 mb-2" />
                <p className="text-white/70 text-center mb-2">Drag and drop an image here, or click to browse</p>
                <Button variant="outline" className="border-[#1A9A32]/50 text-white hover:bg-[#1A9A32]/20">
                  Upload Image
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextStep} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Schedule */}
      {currentStep === 2 && (
        <Card className="bg-black border-[#1A9A32]/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl">Schedule & Location</CardTitle>
            <CardDescription className="text-white/70">Set when and where your event will take place</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-white">
                  Start Date
                </Label>
                <div className="relative">
                  <Input id="start-date" type="date" className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-white">
                  End Date
                </Label>
                <div className="relative">
                  <Input id="end-date" type="date" className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-white">
                  Start Time
                </Label>
                <div className="relative">
                  <Input id="start-time" type="time" className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white" />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-white">
                  End Time
                </Label>
                <div className="relative">
                  <Input id="end-time" type="time" className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white" />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="multi-day" className="text-white">
                  Multi-day Event
                </Label>
                <Switch id="multi-day" />
              </div>
              <p className="text-white/60 text-sm">
                Enable this if your event spans multiple days with different schedules
              </p>
            </div>

            <Separator className="bg-[#1A9A32]/30 my-4" />

            <div className="space-y-2">
              <Label htmlFor="venue" className="text-white">
                Venue
              </Label>
              <Input
                id="venue"
                placeholder="Enter venue name"
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter venue address"
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="online-event" className="text-white">
                  Online Event
                </Label>
                <Switch id="online-event" />
              </div>
              <p className="text-white/60 text-sm">Enable this if your event will be held online</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-[#1A9A32]/50 text-white hover:bg-[#1A9A32]/20"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={nextStep} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Additional Details */}
      {currentStep === 3 && (
        <Card className="bg-black border-[#1A9A32]/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl">Additional Details</CardTitle>
            <CardDescription className="text-white/70">
              Configure registration, capacity, and other details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-white">
                  Maximum Capacity
                </Label>
                <div className="relative">
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Enter maximum participants"
                    className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                  />
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration-deadline" className="text-white">
                  Registration Deadline
                </Label>
                <div className="relative">
                  <Input
                    id="registration-deadline"
                    type="date"
                    className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-budget" className="text-white">
                Event Budget
              </Label>
              <div className="relative">
                <Input
                  id="event-budget"
                  type="number"
                  placeholder="Enter budget amount"
                  className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white pl-8"
                />
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6E29F]" />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white">Registration Options</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Require Approval</p>
                    <p className="text-white/60 text-sm">Manually approve participant registrations</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Collect Payment</p>
                    <p className="text-white/60 text-sm">Charge participants a registration fee</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Allow Waitlist</p>
                    <p className="text-white/60 text-sm">Create a waitlist when capacity is reached</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-tags" className="text-white">
                Event Tags
              </Label>
              <Input
                id="event-tags"
                placeholder="Enter tags separated by commas"
                className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
              />
              <p className="text-white/60 text-sm">
                Add tags to help categorize your event (e.g., technology, education, networking)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-[#1A9A32]/50 text-white hover:bg-[#1A9A32]/20"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={nextStep} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <Card className="bg-black border-[#1A9A32]/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl">Review & Create</CardTitle>
            <CardDescription className="text-white/70">Review your event details before creating</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-[#074A29]/20 border-[#1A9A32]/50 text-white">
              <AlertCircle className="h-4 w-4 text-[#B6E29F]" />
              <AlertTitle>Almost there!</AlertTitle>
              <AlertDescription>Please review all the information below before creating your event.</AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h3 className="text-[#B6E29F] font-medium mb-2">Basic Information</h3>
                <div className="bg-[#074A29]/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Event Name:</span>
                    <span className="text-white">Tech Workshop 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Event Type:</span>
                    <span className="text-white">Workshop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Organizer:</span>
                    <span className="text-white">John Doe (john@example.com)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[#89CB81] font-medium mb-2">Schedule & Location</h3>
                <div className="bg-[#1A9A32]/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Date:</span>
                    <span className="text-white">March 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Time:</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Venue:</span>
                    <span className="text-white">Main Campus, Building A</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent font-medium mb-2">Additional Details</h3>
                <div className="bg-accent/10 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Maximum Capacity:</span>
                    <span className="text-white">50 participants</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Registration Deadline:</span>
                    <span className="text-white">March 10, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Budget:</span>
                    <span className="text-white">$2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Tags:</span>
                    <span className="text-white">technology, education, workshop</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Switch id="confirm" />
              <Label htmlFor="confirm" className="text-white">
                I confirm that all the information provided is correct
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-[#1A9A32]/50 text-white hover:bg-[#1A9A32]/20"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-black">
              <Check className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
