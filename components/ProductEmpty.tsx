"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductEmpty() {
  const router = useRouter();

  const goHomepageHandler = () => {
    router.push("/products/men");
  };

  return (
    <div className="text-center">
      <div className="mb-8 mt-32 flex justify-center">
        <Image
          src="/images/hangerEmpty.png"
          alt="Empty products"
          width={300}
          height={300}
          className="object-cover"
          priority
        />
      </div>
      <h2 className="text-3xl text-gray-600 mb-16 font-bold">
        This hanger is empty :(
      </h2>
      <button
        onClick={goHomepageHandler}
        className="px-5 py-3 border-2 border-primary-color rounded-sm text-black hover:bg-[#fecd48] transition"
      >
        This button is useless but you gonna click anyway :)
      </button>
    </div>
  );
}
