import { registryCommands } from "@/lib/registry-data";
import CategoryContent from "./category-content";

export function generateStaticParams() {
  return Object.keys(registryCommands).map((slug) => ({
    slug: slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const features = registryCommands[params.slug as keyof typeof registryCommands] || [];
  
  return <CategoryContent features={features} slug={params.slug} />;
}