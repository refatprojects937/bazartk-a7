import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { toBn, type Product } from "@/lib/products";

const API = "https://api.abcz.workers.dev/api/bazardor";

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const opts = { next: { revalidate: 300 } };

  const [catRes, prodRes] = await Promise.all([
    fetch(`${API}/categories/${slug}`, opts),
    fetch(`${API}/products`, opts),
  ]);
  if (!catRes.ok || !prodRes.ok) notFound();

  const cat: { nameBn: string; icon: string } = await catRes.json();
  const products = ((await prodRes.json()) as Product[]).filter((p) => p.category === slug);

  return (
    <main className=" container mx-auto rounded-2xl min-h-screen bg-emerald-50 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-gray-500">← হোম</Link>
        <h1 className="mt-2 text-2xl font-bold">{cat.icon} {cat.nameBn}</h1>
        <p className="mb-4 text-sm text-gray-600">মোট {toBn(products.length)}টি পণ্য</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;