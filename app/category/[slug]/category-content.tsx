"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from 'react-hot-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  commands: {
    enable: string;
    disable: string;
  };
}

interface CategoryContentProps {
  features: Feature[];
  slug: string;
}

export default function CategoryContent({ features, slug }: CategoryContentProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Registry code copied to clipboard', {
        duration: 2000,
      });
    } catch (err) {
      toast.error('Failed to copy code', {
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
          <h1 className="text-4xl font-bold capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
        </div>
        <div className="grid gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-semibold">
                    {feature.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            Enable Command
                          </h3>
                          <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm">{feature.commands.enable}</code>
                          </pre>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => copyToClipboard(feature.commands.enable)}
                          >
                            Copy to Clipboard
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            Disable Command
                          </h3>
                          <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm">{feature.commands.disable}</code>
                          </pre>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => copyToClipboard(feature.commands.disable)}
                          >
                            Copy to Clipboard
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}