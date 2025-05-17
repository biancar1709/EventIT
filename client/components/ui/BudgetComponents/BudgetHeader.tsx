import React from "react"

interface BudgetHeaderProps {
    title: string
    description: string
}

export function BudgetHeader({ title, description }: BudgetHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-gradient-to-r from-[#074A29] to-[#1A9A32] p-4 rounded-lg text-white">
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-white/80">{description}</p>
            </div>
        </div>
    )
} 