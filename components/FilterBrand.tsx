"use client";

import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import Accordion from "./Accordion";

interface FilterBrandProps {
  onBrandChange?: (selectedBrands: boolean[]) => void;
  numBalenciaga?: number;
  numLouisVuitton?: number;
  numGucci?: number;
}

export default function FilterBrand({
  onBrandChange,
  numBalenciaga = 0,
  numLouisVuitton = 0,
  numGucci = 0,
}: FilterBrandProps) {
  const [selectedBrands, setSelectedBrands] = useState([false, false, false]);

  const handleSelectBrand = (position: number) => {
    const updatedSelectedBrands = selectedBrands.map((isSelected, index) => {
      if (index === position) {
        return !isSelected;
      } else {
        return isSelected;
      }
    });
    setSelectedBrands(updatedSelectedBrands);
    if (onBrandChange) {
      onBrandChange(updatedSelectedBrands);
    }
  };

  const stylesOptions = [
    {
      id: 1,
      title: "Balenciaga",
      quantity: numBalenciaga,
    },
    {
      id: 2,
      title: "Louis Vuitton",
      quantity: numLouisVuitton,
    },
    {
      id: 3,
      title: "Gucci",
      quantity: numGucci,
    },
  ];

  return (
    <Accordion heading="Brand">
      <div className="p-7">
        {stylesOptions.map((option, position) => {
          const isChecked = selectedBrands[position];

          return (
            <div
              className="flex items-center gap-x-5 mb-[30px] relative max-lg:gap-x-3"
              key={option.id}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id={option.title.toLowerCase()}
                  name="checkboxs"
                  value={option.title.toLowerCase()}
                  className="
                peer appearance-none
                h-[16px] w-[16px]
                rounded-md
                border-2
                border-[var(--color-border)]
                bg-transparent
                transition
                cursor-pointer
                checked:bg-[var(--color-primary)]
                checked:border-[var(--color-primary)]
              "
                  onChange={() => handleSelectBrand(position)}
                  checked={isChecked}
                />

                {/* Check icon */}
                <HiCheck
                  className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                text-sm
                text-white
                opacity-0
                pointer-events-none
                peer-checked:opacity-100
              "
                />
              </div>

              <label
                htmlFor={option.title.toLowerCase()}
                className={`
              flex-1 flex items-center justify-between
              transition relative cursor-pointer
              ${isChecked ? "text-theme font-medium" : "text-muted-theme"}
            `}
              >
                <p>{option.title}</p>
                <p>{option.quantity}</p>
              </label>
            </div>
          );
        })}
      </div>
    </Accordion>
  );
}
