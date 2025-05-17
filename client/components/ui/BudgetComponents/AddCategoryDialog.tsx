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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

interface AddCategoryDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    newCategory: {
        name: string
        icon: string
        iconColor: string
    }
    onNewCategoryChange: (category: { name: string; icon: string; iconColor: string }) => void
    onSubmit: () => void
    eventTitle: string
}

export function AddCategoryDialog({
    isOpen,
    onOpenChange,
    newCategory,
    onNewCategoryChange,
    onSubmit,
    eventTitle,
}: AddCategoryDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-black border-[#1A9A32]/50 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Add Budget Category</DialogTitle>
                    <DialogDescription className="text-white/70">
                        Create a new budget category for {eventTitle}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                            id="categoryName"
                            value={newCategory.name}
                            onChange={(e) => onNewCategoryChange({ ...newCategory, name: e.target.value })}
                            placeholder="Enter category name"
                            className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="categoryIcon">Icon</Label>
                        <Select
                            value={newCategory.icon}
                            onValueChange={(value) => onNewCategoryChange({ ...newCategory, icon: value })}
                        >
                            <SelectTrigger className="bg-[#074A29]/20 border-[#1A9A32]/30 text-white">
                                <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#1A9A32]/30">
                                <SelectItem value="BarChart" className="text-white hover:bg-[#1A9A32]/20">
                                    Chart
                                </SelectItem>
                                <SelectItem value="Coffee" className="text-white hover:bg-[#1A9A32]/20">
                                    Food & Drinks
                                </SelectItem>
                                <SelectItem value="Users" className="text-white hover:bg-[#1A9A32]/20">
                                    People
                                </SelectItem>
                                <SelectItem value="MapPin" className="text-white hover:bg-[#1A9A32]/20">
                                    Location
                                </SelectItem>
                            </SelectContent>
                        </Select>
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
                        Add Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 