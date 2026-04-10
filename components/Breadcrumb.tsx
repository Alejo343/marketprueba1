import Link from "next/link";

interface BreadcrumbProps {
  category: string; // slug: "cocina-mexicana"
  productName?: string; // nombre real: "Taco Abierto Paquete"
}

// Convierte slug a label legible: "cocina-mexicana" → "Cocina Mexicana"
function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Breadcrumb({ category, productName }: BreadcrumbProps) {
  const categoryLabel = slugToLabel(category);

  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6">
      <Link
        href="/"
        className="hover:text-[var(--color-text-primary)] transition-colors"
      >
        Homepage
      </Link>

      <span className="text-[var(--color-text-tertiary)]">›</span>

      <Link
        href={`/region/${category}`}
        className="hover:text-[var(--color-text-primary)] transition-colors"
      >
        {categoryLabel}
      </Link>

      {productName && (
        <>
          <span className="text-[var(--color-text-tertiary)]">›</span>
          <span className="text-[var(--color-text-primary)] font-medium">
            {productName}
          </span>
        </>
      )}
    </nav>
  );
}
