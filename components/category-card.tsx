"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Category } from "@/lib/registry-data"
import { 
  LucideIcon, 
  Zap, 
  Shield, 
  Layout, 
  Wifi, 
  Gamepad2, 
  Lock,
  HardDrive,
  Battery,
  Settings,
  Accessibility,
  MonitorSmartphone,
  Keyboard,
  MousePointer2,
  Cpu
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  shield: Shield,
  layout: Layout,
  wifi: Wifi,
  "gamepad-2": Gamepad2,
  lock: Lock,
  "hard-drive": HardDrive,
  battery: Battery,
  settings: Settings,
  accessibility: Accessibility,
  "monitor-smartphone": MonitorSmartphone,
  keyboard: Keyboard,
  "mouse-pointer-2": MousePointer2,
  cpu: Cpu
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  isSelected: boolean;
}

export function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  const Icon = iconMap[category.icon]

  return (
    <Card 
      className={`cursor-pointer transition-all hover:scale-105 ${
        isSelected ? 'border-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-5 w-5" />}
          <CardTitle className="text-sm">{category.title}</CardTitle>
        </div>
        <CardDescription className="text-xs">{category.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}