import Image from "next/image";
import heroImg from "@/assets/bazar-hero.png";

const MarketBanner = () => {
  return (
    <section className="w-full rounded-xl container mx-auto bg-[#f0f6f0] p-">
      <div className="flex  items-center justify-between overflow-hidden rounded-xl bg-white px-5 py-4 shadow-sm">

        {/* Left Content */}
        <div className="z-10 max-w-[75%]">


          <h2 className="mt-2 text-xl font-bold text-gray-900 md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 md:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম --- বাজার ভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়। পণ্যের সর্বশেষ বাজারদর জানুন।
            সহজেই দেখে নিন চাল, ডাল, তেল, সবজি ও মাছের দাম।
          </p>

          <a
            href="#products"
            className="mt-4 inline-block rounded-md bg-green-700 px-5 py-2 text-xs font-semibold text-white transition hover:bg-green-800"
          >
             সব পন্য দেখুন→
          </a>

        </div>

        {/* Right Illustration */}
        <div className="relative ml-2 flex h-32 w-28 shrink-0 items-end justify-center md:h-40 md:w-40">

         <Image
  src={heroImg}
  alt="ফল ও সবজির ঝুড়ি"
  className="h-full w-full object-contain"
  priority
/>

          

        </div>
      </div>
    </section>
  );
};

export default MarketBanner;
