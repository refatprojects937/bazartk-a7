"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { toBn, type Product } from "@/lib/products";

type SortKey = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const sorters: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  default: null,
  "price-asc": (a, b) => a.today - b.today,
  "price-desc": (a, b) => b.today - a.today,
};

const ProductExplorer = ({ products }: { products: Product[] }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("default");

  const categories = useMemo(() => {
    const seen = new Map<string, { name: string; icon: string }>();
    products.forEach((p) => {
      if (!seen.has(p.category)) {
        seen.set(p.category, { name: p.categoryNameBn, icon: p.categoryIcon });
      }
    });
    return Array.from(seen, ([slug, v]) => ({ slug, ...v }));
  }, [products]);

  const visible = useMemo(() => {
    const q = query.trim();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (q === "" || p.nameBn.includes(q))
    );
    const sorter = sorters[sort];
    return sorter ? [...list].sort(sorter) : list;
  }, [products, query, category, sort]);

  const chipClass = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
      active
        ? "border-emerald-700 bg-emerald-700 text-white"
        : "border-gray-300 bg-white text-gray-700 hover:border-emerald-600"
    }`;

  return (
    <section
      id="products"
      className="mx-auto w-full max-w-5xl scroll-mt-4 px-3 py-6"
    >
      <h2 className="mb-4 text-xl font-bold text-shadow-black">সব পণ্য</h2>

      {/* Search + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="পণ্যের নাম খুঁজুন..."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:max-w-xs"
        />

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-semibold">
            সাজান
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={chipClass(category === "all")}
        >
          সব
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setCategory(c.slug)}
            className={chipClass(category === c.slug)}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <p
        className="mt-4 text-sm text-gray-600 text-shadow-black"
        aria-live="polite"
      >
        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-gray-400 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
          কোনো পণ্য পাওয়া যায়নি। অন্য নাম বা ক্যাটাগরি দিয়ে খুঁজুন।
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductExplorer;