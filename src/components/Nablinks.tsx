import Link from "next/link";
import data from "../../public/data.json";

const Nablinks = () => (
  <div className="flex flex-wrap justify-center gap-4">
    {data.map((nav) => (
      <Link
        key={nav.id}
        href={`/category/${nav.slug}`}
        className="hover:text-blue-400"
      >
        {nav.icon} {nav.nameBn}
      </Link>
    ))}
  </div>
);

export default Nablinks;