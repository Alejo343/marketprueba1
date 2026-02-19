import Link from "next/link";

interface BreadcrumbProps {
  category: string;
}

export default function Breadcrumb({ category }: BreadcrumbProps) {
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-black transition-colors">
        Homepage
      </Link>
      <span>&gt;</span>
      <span className="text-black">{categoryDisplay}'s Product</span>
    </nav>
  );
}
