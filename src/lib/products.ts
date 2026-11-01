export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

export async function getProducts(): Promise<Product[]> {
  // 5 মিনিট পর পর নতুন ডেটা আনবে (no-store ব্যবহার করলে prerender error আসে)
  const res = await fetch(API_URL, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  return res.json();
}

export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const formatPrice = (n: number) => n.toLocaleString("bn-BD");

export const formatPct = (pct: number) => toBn(Math.abs(pct).toFixed(1));

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const unitLabel = (unit: string) => UNIT_LABELS[unit] ?? `প্রতি ${unit}`;