import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"

interface BudgetOverviewProps {
    total: number
    spent: number
    remaining: number
    eventTitle: string
}

export function BudgetOverview({ total, spent, remaining, eventTitle }: BudgetOverviewProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-black border-[#1A9A32]/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-[#1A9A32]" />
                        Total Budget
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-white">${total?.toLocaleString()}</div>
                    <p className="text-[#B6E29F] text-sm mt-1">Allocated for {eventTitle}</p>
                </CardContent>
            </Card>

            <Card className="bg-black border-accent/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center">
                        <TrendingDown className="mr-2 h-5 w-5 text-accent" />
                        Total Spent
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-white">${spent?.toLocaleString()}</div>
                    <p className="text-accent text-sm mt-1">
                        {total > 0 ? ((spent / total) * 100).toFixed(1) : 0}% of budget used
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-black border-[#1A9A32]/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-[#89CB81]" />
                        Remaining Budget
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={`text-3xl font-bold ${remaining >= 0 ? "text-[#1A9A32]" : "text-red-500"}`}>
                        ${remaining.toLocaleString()}
                    </div>
                    <p className="text-white/70 text-sm mt-1">
                        {remaining >= 0 ? "Available to spend" : "Budget deficit"}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
} 