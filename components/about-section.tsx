'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Twitter, AlertTriangle, Info, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function AboutSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>About Windows Registry Tweaks</CardTitle>
        <CardDescription>
          A collection of useful Windows registry tweaks to enhance your system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          This tool provides a curated collection of Windows registry tweaks to
          help you optimize your system&apos;s performance, enhance privacy,
          customize the user interface, and improve network settings. Each tweak
          comes with detailed information and can be easily applied or reverted.
        </p>

        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Important Safety Notes
          </h3>
          <ul className="list-none space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500/10 p-1 rounded">1</span>
              Always create a system restore point before applying any registry
              tweaks
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500/10 p-1 rounded">2</span>
              Some tweaks may require a system restart to take effect
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500/10 p-1 rounded">3</span>
              Pay attention to compatibility badges and warning messages
            </li>
          </ul>
        </div>

        <Separator />
        <div className="flex space-x-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="h-4 w-4" />
            View on GitHub
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Twitter className="h-4 w-4" />
            Follow Updates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
