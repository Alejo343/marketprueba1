"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Men", slug: "men" },
  { name: "Women", slug: "women" },
  { name: "Children", slug: "children" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessory", slug: "accessory" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#f3f3f3] border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-light tracking-widest">
          <span className="font-medium">Light</span>
          <span className="font-bold relative">
            house
            <span className="absolute -top-1 -right-3 text-yellow-500 text-base">
              ✺
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="flex gap-10 text-sm font-medium">
            {navItems.map((item) => {
              const href = `/products/${item.slug}`;
              const isActive = pathname === href;

              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={`transition-colors ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
