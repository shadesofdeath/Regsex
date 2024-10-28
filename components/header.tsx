import { Monitor, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex gap-2 items-center mr-4">
          <Link href="/" className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <span className="font-bold text-xl">Windows Customizer</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}