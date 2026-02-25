import Link from "next/link";

interface BreadcrumbProps {
  category: string;
}

export default function Breadcrumb({ category }: BreadcrumbProps) {
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-theme mb-4">
      <Link href="/" className="hover:text-theme transition-colors">
        Homepage
      </Link>
      <span>&gt;</span>
      <span className="text-theme">{categoryDisplay}'s Product</span>
    </nav>
  );
}
