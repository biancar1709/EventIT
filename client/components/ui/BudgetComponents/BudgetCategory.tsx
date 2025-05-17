import React from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart, Calendar, ChevronDown, FileText, MoreHorizontal, PlusCircle } from "lucide-react"
import { BudgetCategory as BudgetCategoryType, BudgetItem } from "@/services/budget.service"

interface BudgetCategoryProps {
    category: BudgetCategoryType
    onAddItem: (category: BudgetCategoryType) => void
    onUpdateItemStatus: (categoryId: number, itemId: number, status: "Pending" | "Approved" | "Rejected") => void
    onDeleteItem: (categoryId: number, itemId: number) => void
}

export function BudgetCategory({ category, onAddItem, onUpdateItemStatus, onDeleteItem }: BudgetCategoryProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-[#1A9A32] text-white"
            case "Pending":
                return "bg-[#89CB81] text-black"
            case "Rejected":
                return "bg-red-500 text-white"
            default:
                return "bg-white/20 text-white"
        }
    }

    return (
        <Collapsible className="bg-black border border-[#1A9A32]/30 rounded-lg overflow-hidden mb-4">
            <CollapsibleTrigger className="w-full">
                <div className="bg-gradient-to-r from-[#074A29]/40 to-[#1A9A32]/30 p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`rounded-full p-2 bg-[#1A9A32]/20 mr-3`}>
                            <BarChart className={`h-5 w-5 ${category.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-medium text-white">{category.name}</h3>
                    </div>
                    <ChevronDown className="h-5 w-5 text-white transition-transform ui-open:rotate-180" />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-[#89CB81]">Items</h4>
                        <Button
                            size="sm"
                            onClick={() => onAddItem(category)}
                            className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white"
                        >
                            <PlusCircle className="mr-2 h-3 w-3" />
                            Add Item
                        </Button>
                    </div>
                    <div className="bg-[#074A29]/10 rounded-lg overflow-hidden">
                        {category.BudgetItems && category.BudgetItems.length > 0 ? (
                            <Table>
                                <TableHeader className="bg-[#074A29]/20">
                                    <TableRow className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                                        <TableHead className="text-white">Description</TableHead>
                                        <TableHead className="text-white text-right">Amount</TableHead>
                                        <TableHead className="text-white">Date</TableHead>
                                        <TableHead className="text-white">Status</TableHead>
                                        <TableHead className="text-white text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {category.BudgetItems.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-[#1A9A32]/10 border-b-[#1A9A32]/30">
                                            <TableCell className="font-medium text-white">{item.description}</TableCell>
                                            <TableCell className="text-right text-accent">
                                                ${item.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-white/80">
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-3 w-3 text-[#B6E29F]" />
                                                    {new Date(item.date).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-[#1A9A32]/20">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-black border-[#1A9A32]/50">
                                                        <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
                                                        <DropdownMenuItem
                                                            className="text-white hover:bg-[#1A9A32]/20"
                                                            onClick={() => onUpdateItemStatus(category.id, item.id, "Approved")}
                                                        >
                                                            Approve
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-white hover:bg-[#1A9A32]/20"
                                                            onClick={() => onUpdateItemStatus(category.id, item.id, "Rejected")}
                                                        >
                                                            Reject
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-[#1A9A32]/30" />
                                                        <DropdownMenuItem
                                                            className="text-red-500 hover:bg-red-500/10"
                                                            onClick={() => onDeleteItem(category.id, item.id)}
                                                        >
                                                            Delete Item
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8">
                                <div className="flex flex-col items-center justify-center text-white/70">
                                    <div className="mb-2">
                                        <FileText className="h-8 w-8 text-[#1A9A32]/50" />
                                    </div>
                                    <p className="mb-2">No items in this category yet</p>
                                    <Button
                                        size="sm"
                                        onClick={() => onAddItem(category)}
                                        className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white"
                                    >
                                        <PlusCircle className="mr-2 h-3 w-3" />
                                        Add First Item
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
} 