import Link from "next/link";
import { formatPct, formatPrice, unitLabel, type Product } from "@/lib/products";

const BADGE_STYLES = {
  up: "bg-red-50 text-red-700",
  down: "bg-green-50 text-green-700",
  flat: "bg-gray-100 text-gray-600",
} as const;

const BADGE_SIGN = { up: "▲", down: "▼", flat: "—" } as const;

const BADGE_LABEL = {
  up: "দাম বেড়েছে",
  down: "দাম কমেছে",
  flat: "দাম অপরিবর্তিত",
} as const;

const ProductCard = ({ product }: { product: Product }) => {
  const { nameBn, image, unit, today, change } = product;

  return (
    <Link href={`/products/${product.id}`} className="block transition-shadow hover:shadow-md">
    <article className="rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">
          {image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{nameBn}</h3>
          <p className="text-xs text-gray-500">{unitLabel(unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(today)} টাকা</p>
        </div>

        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${BADGE_STYLES[change.dir]}`}
          aria-label={BADGE_LABEL[change.dir]}
        >
          {BADGE_SIGN[change.dir]} {formatPct(change.pct)}%
        </span>
      </div>
    </article></Link>
  );
};

export default ProductCard;