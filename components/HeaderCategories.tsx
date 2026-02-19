"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { label: "Men", href: "/products/men" },
  { label: "Women", href: "/products/women" },
  { label: "Children", href: "/products/children" },
  { label: "Shoes", href: "/products/shoes" },
  { label: "Accessory", href: "/products/accessory" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className={`pt-10 px-24 xl:px-6 pb-5 transition duration-300 xs:text-sm sm:pt-6 ${plusJakarta.className}`}
    >
      <div className="flex items-center justify-between relative mb-14">
        {/* Left side - empty link for auth */}
        <Link href="/auth" className="flex items-center gap-1"></Link>

        {/* Center - Logo */}
        <Link
          href="/"
          className="text-[27px] relative -translate-x-8 xs:translate-y-5"
        >
          <span className="font-extrabold">Light</span>
          <span className="font-normal drop-shadow-logo">house</span>
          <div className="absolute -top-[3px] right-[31px] -z-10 h-10 w-10">
            <Image
              src="/sun.png"
              alt="the sun | cosmestic content"
              width={192}
              height={192}
              className="w-full h-full"
              priority
            />
          </div>
        </Link>

        {/* Right - Cart */}
        <Link href="/cart" className="relative">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="text-2xl xs:text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-8 justify-center lg:gap-5 lg:text-sm xs:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.label} className="relative group transition p-1">
                <Link
                  href={link.href}
                  className={`text-base leading-none ${isActive ? "font-bold" : "font-normal"}`}
                >
                  {link.label}
                </Link>
                <div className="absolute bottom-0 left-0 w-0 right-0 m-auto text-transparent bg-[#aaa] h-[3px] text-left opacity-0 group-hover:-z-10 group-hover:opacity-100 group-hover:animate-nav-move"></div>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
