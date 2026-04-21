import Link from "next/link";
import { ArrowIcon } from "./icons";

export default function BottomCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-surface)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[var(--color-primary)]/8 blur-[100px] rounded-full" />
      <div className="relative max-w-2xl mx-auto text-center px-4">
        <span className="inline-block w-12 h-px bg-[var(--color-primary)] mb-6" />
        <h2
          className="text-[2.5rem] font-bold text-[var(--color-text)] mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Productos artesanales,
          <br />
          experiencias únicas
        </h2>
        <p className="text-[var(--color-muted)] text-base mb-8 leading-relaxed">
          Cada producto en Barril Market es elegido por su calidad, origen y sabor. Descubre lo mejor del mercado gourmet colombiano.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer"
          >
            Explorar tienda completa <ArrowIcon />
          </Link>
          <span className="text-[var(--color-muted)] text-sm">
            o llámanos al{" "}
            <span className="text-[var(--color-primary)]">+57 300 000 0000</span>
          </span>
        </div>
      </div>
    </section>
  );
}
