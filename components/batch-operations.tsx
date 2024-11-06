"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RegistryTweak } from "@/types/registry"
import { Download, Upload, PlayCircle, Search, AlertTriangle, Info, Zap } from "lucide-react"
import { toast } from "sonner"

interface BatchOperationsProps {
  tweaks: RegistryTweak[]
  selectedCategory: string | null
}

export function BatchOperations({ tweaks, selectedCategory }: BatchOperationsProps) {
  const [selectedTweaks, setSelectedTweaks] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTweaks = tweaks.filter(tweak => 
    tweak.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweak.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleExport = () => {
    const selectedTweaksData = tweaks.filter(tweak => selectedTweaks.includes(tweak.id))
    const regContent = "Windows Registry Editor Version 5.00\n\n" + 
      selectedTweaksData
        .map(tweak => tweak.enableCode.replace("Windows Registry Editor Version 5.00\n\n", ""))
        .join("\n\n")
    
    const blob = new Blob([regContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'selected-tweaks.reg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Registry file exported successfully!")
  }

  const handleSelectAll = () => {
    if (selectedTweaks.length === filteredTweaks.length) {
      setSelectedTweaks([])
    } else {
      setSelectedTweaks(filteredTweaks.map(tweak => tweak.id))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlayCircle className="h-4 w-4" />
          Batch Operations
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Batch Operations</DialogTitle>
          <DialogDescription>
            Select multiple tweaks to export or apply them together
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tweaks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedTweaks.length === filteredTweaks.length ? "Deselect All" : "Select All"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={selectedTweaks.length === 0}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export Selected
            </Button>
          </div>

          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="space-y-4">
              {filteredTweaks.map(tweak => (
                <div key={tweak.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={tweak.id}
                    checked={selectedTweaks.includes(tweak.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTweaks([...selectedTweaks, tweak.id])
                      } else {
                        setSelectedTweaks(selectedTweaks.filter(id => id !== tweak.id))
                      }
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={tweak.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tweak.title}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {tweak.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tweak.requiresRestart && (
                        <Badge variant="secondary" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Requires Restart
                        </Badge>
                      )}
                      {tweak.systemImpact && (
                        <Badge 
                          variant={tweak.systemImpact === "high" ? "destructive" : "outline"}
                          className="gap-1"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          {tweak.systemImpact.charAt(0).toUpperCase() + tweak.systemImpact.slice(1)} Impact
                        </Badge>
                      )}
                      {tweak.compatibility && (
                        <Badge variant="outline" className="gap-1">
                          <Info className="h-3 w-3" />
                          {tweak.compatibility}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="gap-1">
                        <Zap className="h-3 w-3" />
                        {tweak.category.charAt(0).toUpperCase() + tweak.category.slice(1)}
                      </Badge>
                    </div>
                    {tweak.warning && (
                      <p className="text-sm text-yellow-500 mt-1">
                        Warning: {tweak.warning}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {filteredTweaks.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No tweaks found matching your search
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}