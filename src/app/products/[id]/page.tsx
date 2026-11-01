import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPct, formatPrice, unitLabel, type Product } from "@/lib/products";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) notFound();
  const p: Product = await res.json();

  return (
    <main className="min-h-screen bg-emerald-50 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-2xl space-y-4">
        <Link href="/#products" className="text-sm text-gray-500">← সব পণ্য</Link>

        <div className="flex items-center justify-between rounded-2xl border bg-white p-5">
          <div>
            <h1 className="text-2xl font-bold">{p.image} {p.nameBn}</h1>
            <p className="text-sm text-gray-500">{p.categoryNameBn} · {unitLabel(p.unit)}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatPrice(p.today)} টাকা</p>
            <p className="text-sm">{p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"} {formatPct(p.change.pct)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          {[["গতকাল", p.yesterday], ["গত সপ্তাহ", p.lastWeek], ["গত মাস", p.lastMonth]].map(([l, v]) => (
            <div key={l} className="rounded-xl border bg-white p-3">
              <p className="text-gray-500">{l}</p>
              <p className="font-bold">{formatPrice(+v)} টাকা</p>
            </div>
          ))}
        </div>

        <ul className="divide-y rounded-2xl border bg-white text-sm">
          {p.markets.map((m) => (
            <li key={m.market} className="flex justify-between p-3">
              <span>{m.market}, {m.division}</span>
              <span className="font-medium">{formatPrice(m.min)}–{formatPrice(m.max)} টাকা</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ProductPage;