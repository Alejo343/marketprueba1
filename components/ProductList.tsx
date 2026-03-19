"use client";

import ProductItem from "./ProductItem";
import ProductEmpty from "./ProductEmpty";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import { ProductVariant } from "@/types";

interface ProductListProps {
  products: ProductVariant[];
  category: string;
  productsPerPage?: number;
}

export default function ProductList({
  products,
  category,
  productsPerPage = 9,
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (products.length === 0) return <ProductEmpty />;

  const maxPage = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = currentPage * productsPerPage;
  const renderedProducts = products.slice(startIndex, endIndex);
  const pageNumbers = Array.from({ length: maxPage }, (_, i) => i + 1);

  const handleClickPagination = (number: number) => {
    setCurrentPage(number);
    window.scrollTo(0, 0);
  };

  const previousPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const nextPageHandler = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const getDiscountPercent = (variant: ProductVariant): number => {
    if (!variant.has_sale || !variant.sale_price) return 0;
    return Math.round(
      ((variant.price - variant.sale_price) / variant.price) * 100,
    );
  };

  return (
    <div>
      <ul className="grid grid-cols-3 gap-x-5 gap-y-[26px] max-md:grid-cols-2 max-md:gap-x-2">
        {renderedProducts.map((variant) => (
          <ProductItem
            key={variant.id}
            productId={variant.product_id}
            name={variant.product?.name ?? "Producto"}
            price={variant.final_price}
            discount={getDiscountPercent(variant)}
            availability={variant.in_stock}
            brand={variant.product?.brand?.name ?? ""}
            img={variant.primary_image?.url ?? "/images/placeholder.png"}
            category={category}
          />
        ))}
      </ul>

      {maxPage > 1 && (
        <div className="flex justify-center">
          <button onClick={previousPageHandler} disabled={currentPage === 1}>
            <AiOutlineLeft className="mt-11 mr-4 text-2xl" />
          </button>
          <ul className="flex items-center gap-4 mt-10">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  className={`py-3 px-5 bg-white shadow-sm rounded-sm ${
                    currentPage === number && "!bg-primary-color"
                  }`}
                  onClick={() => handleClickPagination(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={nextPageHandler} disabled={currentPage === maxPage}>
            <AiOutlineRight className="mt-11 ml-4 text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}
