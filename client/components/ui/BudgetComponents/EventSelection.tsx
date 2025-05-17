import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Event } from "@/services/events.service"
import { Check } from "lucide-react"

interface EventSelectionProps {
    events: Event[]
    selectedEvent: Event | null
    total: number
    spent: number
    onEventSelect: (event: Event) => void
}

export function EventSelection({ events, selectedEvent, total, spent, onEventSelect }: EventSelectionProps) {
    return (
        <Card className="bg-black border-[#1A9A32]/30 mb-6">
            <CardHeader>
                <CardTitle className="text-white">Select Event</CardTitle>
                <CardDescription className="text-white/70">Choose an event to manage its budget</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            className={`bg-black cursor-pointer transition-all ${selectedEvent?.id === event.id
                                    ? "border-accent shadow-md shadow-accent/20"
                                    : "border-[#1A9A32]/30 hover:border-[#1A9A32]/60"
                                }`}
                            onClick={() => onEventSelect(event)}
                        >
                            <div
                                className={`p-4 ${selectedEvent?.id === event.id ? "bg-accent/20" : "bg-[#074A29]/20"
                                    } flex justify-between items-center`}
                            >
                                <div>
                                    <h3 className="font-medium text-white">{event.title}</h3>
                                    <p className="text-white/70 text-sm">{new Date(event.date).toLocaleDateString()}</p>
                                    {event.budget ? (
                                        <>
                                            <div className="flex items-center mt-2 text-xs text-white/80">
                                                <span>
                                                    ${spent.toLocaleString()} of ${total.toLocaleString()}
                                                </span>
                                            </div>
                                            <Progress
                                                value={total > 0 ? (spent / total) * 100 : 0}
                                                className="h-1.5 mt-2 bg-[#074A29]/30"
                                            />
                                        </>
                                    ) : (
                                        <div className="mt-2 text-xs text-white/80">
                                            No budget created
                                        </div>
                                    )}
                                </div>
                                {selectedEvent?.id === event.id && (
                                    <div className="bg-accent rounded-full p-1">
                                        <Check className="h-5 w-5 text-black" />
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
} 