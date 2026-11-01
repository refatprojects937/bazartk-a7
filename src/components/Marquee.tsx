import data from "../../public/Dataa.json";

type Product = {
  id: number;
  nameBn: string;
  unit: string;
  today: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const arrow = (dir: string) =>
  dir === "up" ? "▲" : dir === "down" ? "▼" : "▬";

const color = (dir: string) =>
  dir === "up"
    ? "text-red-600"
    : dir === "down"
    ? "text-green-600"
    : "text-gray-500";

const css = `
.mq-viewport { overflow: hidden; flex: 1 1 0%; min-width: 0; }
.mq-track {
  display: flex;
  width: max-content;
  animation: mq-scroll 25s linear infinite;
}
.mq-group { display: flex; flex-shrink: 0; }
.mq-viewport:hover .mq-track { animation-play-state: paused; }
@keyframes mq-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .mq-track { animation-duration: 300s; }
}
`;

const Marquee = () => {
  const products = data as Product[];

  return (
    <div className="bg-cyan-950 px-10">
      <style>{css}</style>

      <div className="flex items-stretch">
        <div className="shrink-0 bg-amber-800 p-2 font-bold text-white">
          সর্বশেষ
        </div>

        <div className="mq-viewport py-2 text-white">
          <div className="mq-track">
            {[0, 1].map((n) => (
              <div className="mq-group" key={n} aria-hidden={n === 1}>
                {products.map((p) => (
                  <span key={p.id} className="mx-5 whitespace-nowrap">
                    {p.nameBn} ৳{toBn(p.today)}/{UNITS[p.unit] ?? p.unit}{" "}
                    <span className={color(p.change.dir)}>
                      {arrow(p.change.dir)} {toBn(Math.abs(p.change.pct))}%
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;