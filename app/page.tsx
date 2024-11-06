'use client';

import { useState } from 'react';
import { categories, tweaks } from '@/lib/registry-data';
import { SearchBar } from '@/components/search-bar';
import { CategoryCard } from '@/components/category-card';
import { TweakCard } from '@/components/tweak-card';
import { ThemeToggle } from '@/components/theme-toggle';
import { AboutSection } from '@/components/about-section';
import { BatchOperations } from '@/components/batch-operations';
import { Button } from '@/components/ui/button';
import { Info, Filter, SortAsc, Grid2X2, List } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'impact'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTweaks = tweaks
    .filter((tweak) => {
      const matchesCategory = selectedCategory
        ? tweak.category === selectedCategory
        : true;
      const matchesSearch =
        tweak.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tweak.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        const impactOrder = { high: 3, medium: 2, low: 1, undefined: 0 };
        return (
          impactOrder[b.systemImpact || 'undefined'] -
          impactOrder[a.systemImpact || 'undefined']
        );
      }
    });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Regsex
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAbout(!showAbout)}
              className="hover:bg-primary/20"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <BatchOperations
              tweaks={tweaks}
              selectedCategory={selectedCategory}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort by Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('impact')}>
                  <Filter className="mr-2 h-4 w-4" />
                  Sort by Impact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid2X2 className="h-4 w-4" />
              )}
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {showAbout && (
          <div className="mb-8">
            <AboutSection />
          </div>
        )}

        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="mb-8 rounded-lg border">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() =>
                  setSelectedCategory(
                    category.id === selectedCategory ? null : category.id
                  )
                }
                isSelected={category.id === selectedCategory}
              />
            ))}
          </div>
        </div>

        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
          }
        >
          {filteredTweaks.map((tweak) => (
            <TweakCard key={tweak.id} tweak={tweak} viewMode={viewMode} />
          ))}
          {filteredTweaks.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <p className="text-muted-foreground">
                No tweaks found. Try adjusting your search or category
                selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}