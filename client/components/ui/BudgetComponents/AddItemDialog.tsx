import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"

interface AddItemDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    newItem: {
        description: string
        amount: number
        date: string
        cost: number
    }
    onNewItemChange: (item: {
        description: string
        amount: number
        date: string    
        cost: number
    }) => void
    onSubmit: () => void
    categoryName: string
}

export function AddItemDialog({
    isOpen,
    onOpenChange,
    newItem,
    onNewItemChange,
    onSubmit,
    categoryName,
}: AddItemDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-black border-[#1A9A32]/50 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Add Budget Item</DialogTitle>
                    <DialogDescription className="text-white/70">
                        Add a new item to {categoryName}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={newItem.description}
                            onChange={(e) => onNewItemChange({ ...newItem, description: e.target.value })}
                            placeholder="Enter item description"
                            className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={newItem.amount}
                            onChange={(e) => onNewItemChange({ ...newItem, amount: Number(e.target.value) })}
                            placeholder="Enter amount"
                            className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Cost per unit</Label>
                        <Input
                            id="cost"
                            type="number"
                            value={newItem.cost}
                            onChange={(e) => onNewItemChange({ ...newItem, cost: Number(e.target.value) })}
                            placeholder="Enter cost per unit"
                            className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={newItem.date}
                            onChange={(e) => onNewItemChange({ ...newItem, date: e.target.value })}
                            className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} className="bg-[#1A9A32] hover:bg-[#1A9A32]/90 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Item
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 