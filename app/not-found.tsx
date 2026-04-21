import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F0E8] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="relative w-full max-w-3xl text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,#C9A84C_0%,transparent_60%)]"
          />

          <p className="font-[family-name:var(--font-inter)] text-xs tracking-[0.4em] uppercase text-[#C9A84C]">
            Error 404
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-7xl sm:text-9xl leading-none bg-linear-to-b from-[#F5F0E8] via-[#C9A84C] to-[#8a6f2a] bg-clip-text text-transparent">
            404
          </h1>

          <div className="mx-auto mt-6 h-px w-24 bg-linear-to-r from-transparent via-[#C9A84C] to-transparent" />

          <h2 className="mt-8 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#F5F0E8]">
            Esta página se ha agotado
          </h2>

          <p className="mt-4 mx-auto max-w-lg text-[#9A8C7A] leading-relaxed">
            La dirección que buscas no existe o fue movida. Mientras tanto, te
            invitamos a explorar nuestra selección de productos y regiones.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#C9A84C] hover:bg-[#B8973D] text-[#080808] font-medium tracking-wide transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#F5F0E8] hover:text-[#C9A84C] font-medium tracking-wide transition-colors"
            >
              Ver productos
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-[#1E1E1E]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8C7A] mb-5">
              Enlaces sugeridos
            </p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
              {[{ href: "/", label: "Inicio" }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 hover:after:w-full after:bg-[#C9A84C] after:transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
