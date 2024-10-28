import { Monitor, Cpu, Shield, Palette, Terminal, Laptop } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  {
    title: "System Features",
    description: "Enable or disable Windows features like Copilot, Widgets, and more",
    icon: Cpu,
    href: "/category/system-features",
    color: "text-blue-500"
  },
  {
    title: "Privacy & Security",
    description: "Customize Windows privacy settings and security features",
    icon: Shield,
    href: "/category/privacy-security",
    color: "text-red-500"
  },
  {
    title: "UI Customization",
    description: "Modify Windows interface elements and visual features",
    icon: Palette,
    href: "/category/ui-customization",
    color: "text-purple-500"
  },
  {
    title: "Performance",
    description: "Optimize Windows performance and system resources",
    icon: Terminal,
    href: "/category/performance",
    color: "text-green-500"
  },
  {
    title: "Display Settings",
    description: "Customize monitor settings and display features",
    icon: Monitor,
    href: "/category/display",
    color: "text-orange-500"
  },
  {
    title: "Power Management",
    description: "Modify power settings and energy options",
    icon: Laptop,
    href: "/category/power",
    color: "text-yellow-500"
  }
];

export function Categories() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <p className="text-muted-foreground">
          Select a category to view and customize Windows settings
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.title} href={category.href}>
            <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                  <h3 className="font-semibold text-xl">{category.title}</h3>
                </div>
                <p className="mt-4 text-muted-foreground">{category.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}