

import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

const LIMIT = 6;

const MoverSection = ({
  title,
  tone,
  items,
}: {
  title: string;
  tone: string;
  items: Product[];
}) => (
  <div>
    <h2 className={`mb-3 text-lg font-bold ${tone}`}>{title}</h2>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </div>
);

const PriceMovers = ({ products }: { products: Product[] }) => {
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, LIMIT);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, LIMIT);

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-3 py-6">
      <MoverSection
        title="▲ আজ দাম বেড়েছে"
        tone="text-red-500"
        items={risers}
      />
      <MoverSection
        title="▼ আজ দাম কমেছে"
        tone="text-green-500"
        items={fallers}
      />
    </section>
  );
};

export default PriceMovers;