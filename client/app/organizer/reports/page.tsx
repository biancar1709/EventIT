"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChartIcon, Download, FileText, Calendar, Users, ArrowUpDown, Filter, Printer, Share2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ReportsAnalytics() {
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("year")

  // Sample data for charts
  const attendanceData = [
    { name: "Jan", participants: 120 },
    { name: "Feb", participants: 150 },
    { name: "Mar", participants: 200 },
    { name: "Apr", participants: 180 },
    { name: "May", participants: 250 },
    { name: "Jun", participants: 300 },
    { name: "Jul", participants: 280 },
    { name: "Aug", participants: 220 },
    { name: "Sep", participants: 290 },
    { name: "Oct", participants: 350 },
    { name: "Nov", participants: 380 },
    { name: "Dec", participants: 400 },
  ]

  const eventTypeData = [
    { name: "Workshops", value: 45 },
    { name: "Conferences", value: 20 },
    { name: "Hackathons", value: 15 },
    { name: "Career Fairs", value: 10 },
    { name: "Seminars", value: 10 },
  ]

  const COLORS = ["#1A9A32", "#89CB81", "#B6E29F", "#FFAD4A", "#074A29"]

  const satisfactionData = [
    { name: "Tech Workshop", rating: 4.7 },
    { name: "IT Career Fair", rating: 4.2 },
    { name: "Hackathon", rating: 4.8 },
    { name: "Web Dev Seminar", rating: 4.5 },
    { name: "AI Conference", rating: 4.6 },
  ]

  // Sample data for reports
  const reports = [
    {
      id: 1,
      name: "Annual Event Summary 2024",
      type: "Annual Report",
      date: "Dec 31, 2024",
      status: "Completed",
    },
    {
      id: 2,
      name: "Tech Workshop 2025 - Post Event Analysis",
      type: "Event Report",
      date: "Feb 20, 2025",
      status: "Completed",
    },
    {
      id: 3,
      name: "Q1 2025 Events Performance",
      type: "Quarterly Report",
      date: "Mar 31, 2025",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Participant Demographics Analysis",
      type: "Analytics Report",
      date: "Jan 15, 2025",
      status: "Completed",
    },
    {
      id: 5,
      name: "Budget Utilization Report",
      type: "Financial Report",
      date: "Feb 28, 2025",
      status: "In Progress",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-white/80">Analyze event performance and generate reports</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#1A9A32]/30">
              <SelectItem value="all" className="text-white hover:bg-[#1A9A32]/20">
                All Events
              </SelectItem>
              <SelectItem value="tech-workshop" className="text-white hover:bg-[#1A9A32]/20">
                Tech Workshop 2025
              </SelectItem>
              <SelectItem value="career-fair" className="text-white hover:bg-[#1A9A32]/20">
                IT Career Fair
              </SelectItem>
              <SelectItem value="hackathon" className="text-white hover:bg-[#1A9A32]/20">
                Hackathon Challenge
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
              <SelectValue placeholder="Select Time Period" />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#1A9A32]/30">
              <SelectItem value="month" className="text-white hover:bg-[#1A9A32]/20">
                Last Month
              </SelectItem>
              <SelectItem value="quarter" className="text-white hover:bg-[#1A9A32]/20">
                Last Quarter
              </SelectItem>
              <SelectItem value="year" className="text-white hover:bg-[#1A9A32]/20">
                Last Year
              </SelectItem>
              <SelectItem value="all-time" className="text-white hover:bg-[#1A9A32]/20">
                All Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="bg-[#074A29]/30 mb-4">
          <TabsTrigger
            value="overview"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            Attendance
          </TabsTrigger>
          <TabsTrigger
            value="satisfaction"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            Satisfaction
          </TabsTrigger>
          <TabsTrigger
            value="demographics"
            className="text-white data-[state=active]:bg-[#1A9A32] data-[state=active]:text-white"
          >
            Demographics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black border-[#1A9A32]/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-[#1A9A32]" />
                  Total Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">12</div>
                <p className="text-[#B6E29F] text-sm mt-1">+20% from previous year</p>
              </CardContent>
            </Card>
            <Card className="bg-black border-[#89CB81]/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-[#89CB81]" />
                  Total Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">1,248</div>
                <p className="text-[#89CB81] text-sm mt-1">+15% from previous year</p>
              </CardContent>
            </Card>
            <Card className="bg-black border-accent/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <BarChartIcon className="mr-2 h-5 w-5 text-accent" />
                  Average Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">4.6/5</div>
                <p className="text-accent text-sm mt-1">+0.3 from previous year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black border-[#1A9A32]/30">
            <CardHeader>
              <CardTitle className="text-white">Event Type Distribution</CardTitle>
              <CardDescription className="text-white/70">Breakdown of events by type</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Events",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="bg-black border-[#1A9A32]/30">
            <CardHeader>
              <CardTitle className="text-white">Attendance Trends</CardTitle>
              <CardDescription className="text-white/70">Monthly attendance across all events</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  participants: {
                    label: "Participants",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="participants" fill="var(--color-participants)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black border-[#1A9A32]/30">
              <CardHeader>
                <CardTitle className="text-white">Top Attended Events</CardTitle>
                <CardDescription className="text-white/70">Events with highest participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "IT Career Fair", participants: 120, capacity: 150, percentage: 80 },
                    { name: "Hackathon Challenge", participants: 75, capacity: 80, percentage: 94 },
                    { name: "Tech Workshop 2025", participants: 45, capacity: 50, percentage: 90 },
                    { name: "AI Conference", participants: 150, capacity: 200, percentage: 75 },
                    { name: "Web Development Seminar", participants: 200, capacity: 250, percentage: 80 },
                  ].map((event, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">{event.name}</span>
                        <span className="text-white">
                          {event.participants}/{event.capacity}
                        </span>
                      </div>
                      <Progress
                        value={event.percentage}
                        className="h-2 bg-[#074A29]/30"
                        indicatorClassName={`${
                          event.percentage > 90 ? "bg-accent" : event.percentage > 75 ? "bg-[#89CB81]" : "bg-[#1A9A32]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-[#1A9A32]/30">
              <CardHeader>
                <CardTitle className="text-white">Attendance by Event Type</CardTitle>
                <CardDescription className="text-white/70">Average attendance per event type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    average: {
                      label: "Average Attendance",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Workshops", average: 45 },
                        { name: "Conferences", average: 150 },
                        { name: "Hackathons", average: 75 },
                        { name: "Career Fairs", average: 120 },
                        { name: "Seminars", average: 200 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" stroke="#888" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="average" fill="var(--color-average)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Satisfaction Tab */}
        <TabsContent value="satisfaction" className="space-y-6">
          <Card className="bg-black border-[#1A9A32]/30">
            <CardHeader>
              <CardTitle className="text-white">Event Satisfaction Ratings</CardTitle>
              <CardDescription className="text-white/70">
                Average satisfaction rating per event (out of 5)
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  rating: {
                    label: "Rating",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" domain={[0, 5]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="rating" fill="var(--color-rating)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black border-[#1A9A32]/30">
              <CardHeader>
                <CardTitle className="text-white">Satisfaction Metrics</CardTitle>
                <CardDescription className="text-white/70">Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Content Quality", rating: 4.8, percentage: 96 },
                    { name: "Organization", rating: 4.5, percentage: 90 },
                    { name: "Venue", rating: 4.2, percentage: 84 },
                    { name: "Speakers/Presenters", rating: 4.7, percentage: 94 },
                    { name: "Networking Opportunities", rating: 4.3, percentage: 86 },
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">{metric.name}</span>
                        <span className="text-white">{metric.rating}/5</span>
                      </div>
                      <Progress
                        value={metric.percentage}
                        className="h-2 bg-[#074A29]/30"
                        indicatorClassName={`${
                          metric.percentage > 90
                            ? "bg-[#1A9A32]"
                            : metric.percentage > 80
                              ? "bg-[#89CB81]"
                              : "bg-accent"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-[#1A9A32]/30">
              <CardHeader>
                <CardTitle className="text-white">Feedback Summary</CardTitle>
                <CardDescription className="text-white/70">Common themes from participant feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      theme: "Excellent speakers and content",
                      count: 45,
                      sentiment: "Positive",
                      color: "bg-[#1A9A32]",
                    },
                    {
                      theme: "Well-organized events",
                      count: 38,
                      sentiment: "Positive",
                      color: "bg-[#89CB81]",
                    },
                    {
                      theme: "More networking opportunities needed",
                      count: 22,
                      sentiment: "Improvement",
                      color: "bg-accent",
                    },
                    {
                      theme: "Better venue facilities requested",
                      count: 18,
                      sentiment: "Improvement",
                      color: "bg-accent",
                    },
                    {
                      theme: "Valuable industry insights",
                      count: 32,
                      sentiment: "Positive",
                      color: "bg-[#1A9A32]",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#074A29]/20 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                        <div>
                          <p className="text-white text-sm">{item.theme}</p>
                          <p className="text-white/60 text-xs">{item.sentiment}</p>
                        </div>
                      </div>
                      <Badge className={`${item.color} text-white`}>{item.count} mentions</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black border-[#1A9A32]/30">
              <CardHeader>
                <CardTitle className="text-white">Participant Demographics</CardTitle>
                <CardDescription className="text-white/70">Breakdown by academic year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Students",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "First Year", value: 25 },
                          { name: "Second Year", value: 30 },
                          { name: "Third Year", value: 20 },
                          { name: "Fourth Year", value: 15 },
                          { name: "Graduate", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-black border-[#1A9A32]/30">
              <CardHeader>
                <CardTitle className="text-white">Participant Interests</CardTitle>
                <CardDescription className="text-white/70">Top areas of interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Software Development", percentage: 35 },
                    { name: "Data Science & AI", percentage: 25 },
                    { name: "Cybersecurity", percentage: 15 },
                    { name: "UI/UX Design", percentage: 12 },
                    { name: "Project Management", percentage: 8 },
                    { name: "Other", percentage: 5 },
                  ].map((interest, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">{interest.name}</span>
                        <span className="text-white">{interest.percentage}%</span>
                      </div>
                      <Progress
                        value={interest.percentage}
                        className="h-2 bg-[#074A29]/30"
                        indicatorClassName={COLORS[index % COLORS.length]}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black border-[#1A9A32]/30">
            <CardHeader>
              <CardTitle className="text-white">Attendance Growth</CardTitle>
              <CardDescription className="text-white/70">Year-over-year growth in participation</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  participants: {
                    label: "Participants",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { year: "2020", participants: 450 },
                      { year: "2021", participants: 580 },
                      { year: "2022", participants: 720 },
                      { year: "2023", participants: 950 },
                      { year: "2024", participants: 1100 },
                      { year: "2025", participants: 1248 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#888" />
                    <YAxis stroke="#888" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="participants" stroke="var(--color-participants)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reports List */}
      <Card className="bg-black border-[#1A9A32]/30 mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Generated Reports</CardTitle>
            <CardDescription className="text-white/70">Previously generated reports and analyses</CardDescription>
          </div>
          <Button variant="outline" className="border-[#1A9A32]/50 text-white">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-[#074A29]/20">
              <TableRow className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                <TableHead className="text-white">
                  <div className="flex items-center">
                    Report Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-white">Type</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                  <TableCell className="font-medium text-white">{report.name}</TableCell>
                  <TableCell className="text-white/80">{report.type}</TableCell>
                  <TableCell className="text-white/80">{report.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={report.status === "Completed" ? "bg-[#1A9A32] text-white" : "bg-accent text-black"}
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                        <Printer className="h-4 w-4" />
                        <span className="sr-only">Print</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-[#1A9A32]/30 pt-4">
          <p className="text-white/70 text-sm">Showing 5 of 12 reports</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-[#1A9A32]/50 text-white">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-[#1A9A32]/50 text-white">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
