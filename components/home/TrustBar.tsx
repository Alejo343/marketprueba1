import { ShieldIcon, GiftIcon, RefreshIcon } from "./icons";

const trustItems = [
  { icon: <ShieldIcon />, title: "Calidad garantizada", desc: "Productos seleccionados y certificados" },
  { icon: <RefreshIcon />, title: "Devoluciones fáciles", desc: "30 días sin preguntas" },
  { icon: <GiftIcon />, title: "Empaques premium", desc: "Ideal para regalos corporativos" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-[var(--color-primary)]/10 bg-[var(--color-subtle-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4">
              <span className="text-[var(--color-primary)] shrink-0">{item.icon}</span>
              <div>
                <p className="text-[var(--color-text)] text-sm font-semibold">{item.title}</p>
                <p className="text-[var(--color-muted)] text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
