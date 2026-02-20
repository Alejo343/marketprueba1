"use client";

import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiStarburst } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

interface ProductItemProps {
  img: string;
  name: string;
  price: number;
  availability: boolean;
  discount: number;
  brand: string;
  id: string;
  category: string;
}

export default function ProductItem({
  img,
  name,
  price,
  discount,
  availability,
  brand,
  id,
  category,
}: ProductItemProps) {
  const [isLoved, setIsLoved] = useState(false);

  const handleLove = () => {
    setIsLoved(!isLoved);
  };

  const finalPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <li className="bg-[#F6F5F3] dark:bg-[#484848] shadow-md overflow-hidden dark:text-slate-900">
      <div className="relative w-full h-[250px] group">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {discount > 0 && (
          <div className="absolute top-[9px] right-[-47px] text-black bg-primary-color font-medium h-[30px] w-[139px] flex items-center justify-center rotate-[45deg]">
            <p className="text-sm">{discount}%</p>
            <p className="uppercase text-[9px] font-semibold -rotate-90">off</p>
          </div>
        )}

        <Link
          href={`/${category}/${id}`}
          className="absolute opacity-0 transition duration-300 z-10 group-hover:opacity-100 py-2 px-5 border-2 font-normal border-primary-color text-primary-color top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer shadow-md"
        >
          View product
        </Link>

        <div className="absolute opacity-0 transition duration-500 w-full h-full top-0 left-0 bg-black/60 group-hover:opacity-100"></div>
      </div>

      <div className="py-5 px-5 bg-white dark:bg-[#ced2d6] h-[156px] flex flex-col justify-between">
        <div className="mb-[10px] text-sm font-medium uppercase max-lg:text-xs">
          {name}
        </div>

        <div>
          <div className="flex items-center mb-2 ml-[-5px]">
            <div className="flex items-center">
              <TiStarburst className="text-2xl text-[#F6F5F3] dark:text-[#eee]" />
              <BsCheck className="text-lg text-black -translate-x-[21px]" />
            </div>
            <p className="-translate-x-[15px] font-light text-sm capitalize italic text-slate-700 max-lg:text-xs">
              {brand}
            </p>
          </div>

          {availability && (
            <div className="text-right text-sm font-thin max-lg:text-xs">
              ${finalPrice}
            </div>
          )}

          {!availability && (
            <div className="text-right text-sm text-slate-700 italic font-thin max-lg:text-xs">
              Unavailable
            </div>
          )}

          <button
            onClick={handleLove}
            className="flex items-center gap-2 mt-auto"
          >
            {isLoved ? (
              <AiFillHeart className="text-sm text-[#19110B]" />
            ) : (
              <AiOutlineHeart className="text-sm text-[#19110B]" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
