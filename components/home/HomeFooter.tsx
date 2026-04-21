export default function HomeFooter() {
  return (
    <footer className="bg-[var(--color-subtle-bg)] border-t border-[var(--color-primary)]/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
        <img src="/logov2w.webp" alt="Barril Market" className="h-10 w-auto" />
        <p className="text-[var(--color-muted)] text-xs">
          © 2026 Barril Market · Todos los derechos reservados
        </p>
        <div className="flex gap-6">
          {["Términos", "Privacidad", "Contacto"].map((l) => (
            <span
              key={l}
              className="text-[var(--color-muted)] hover:text-[var(--color-primary)] text-xs transition-colors duration-200 cursor-pointer"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
