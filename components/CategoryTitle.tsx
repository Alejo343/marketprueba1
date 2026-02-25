"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

interface CategoryTitleProps {
  category: string;
  totalProducts: number;
  displayedProducts: number;
}

export default function CategoryTitle({
  category,
  totalProducts,
  displayedProducts,
}: CategoryTitleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const sortAscendingHandler = () => {
    if (currentSort === "asc") {
      router.push(pathname);
    } else {
      router.push(`${pathname}?sort=asc`);
    }
  };

  const sortDescendingHandler = () => {
    if (currentSort === "desc") {
      router.push(pathname);
    } else {
      router.push(`${pathname}?sort=desc`);
    }
  };

  // Capitalize first letter
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

  // Add 's if not shoes or accessory
  const possessive =
    category !== "shoes" && category !== "accessory" ? "'s " : " ";

  return (
    <div>
      <div
        className="mt-[30px] font-bold text-5xl mb-6 capitalize text-theme
      max-xs:text-4xl
      max-xs:mb-4
      max-xs:mt-[15px]"
      >
        {categoryDisplay}
        {possessive}
        products
      </div>

      <p
        className="text-muted-theme text-base mb-[61px] font-medium
      max-md:text-sm max-md:mb-[20px]
      max-lg:mb-[20px]
      max-xs:text-xs"
      >
        Showing {displayedProducts} products out of {totalProducts} products
      </p>

      <div
        className="text-right text-sm font-semibold uppercase relative text-theme
      max-md:text-xs
      sm:text-right
      max-xs:text-left"
      >
        <p>sorted by:</p>

        <div
          className="absolute top-[-3px] right-[-90px] flex items-center gap-2
        max-md:right-[-50px]
        max-sm:right-[-80px]
        max-xs:right-[180px]"
        >
          <button
            onClick={sortAscendingHandler}
            className={`flex items-center justify-center
          py-1 px-2 bg-surface text-theme transition duration-300
          ${currentSort === "asc" ? "bg-primary-theme" : ""}
          `}
          >
            <FaSortAmountDownAlt className="text-lg max-md:text-sm" />
          </button>

          <button
            onClick={sortDescendingHandler}
            className={`flex items-center justify-center
          py-1 px-2 bg-surface text-theme transition duration-300
          ${currentSort === "desc" ? "bg-primary-theme" : ""}
          `}
          >
            <FaSortAmountDown className="text-lg max-md:text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
