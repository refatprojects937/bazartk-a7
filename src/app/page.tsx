import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PriceMovers from "@/components/PriceMovers";
import ProductExplorer from "@/components/ProductExplorer";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/products";

const Page = async () => {
  const products = await getProducts();

  return (
    
    <>
      <div >
        <Marquee />
      </div>

      <main>
        <Hero />
        <PriceMovers products={products} />
        <ProductExplorer products={products} />
      </main>

      <Footer />
    </>
  );
};

export default Page;