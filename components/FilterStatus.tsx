"use client";

import React, { useMemo, useState } from "react";
import Accordion from "./Accordion";

interface FilterStatusProps {
  onStatusChange?: (status: string) => void;
  numSaleOff?: number;
  numLimited?: number;
  numLoved?: number;
}

export default function FilterStatus({
  onStatusChange,
  numSaleOff = 0,
  numLimited = 0,
  numLoved = 0,
}: FilterStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState("no filter");

  const selectStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value;
    setSelectedStatus(status);
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  const categoryOptions = useMemo(() => {
    return [
      {
        id: 1,
        title: "Sale-off",
        quantity: numSaleOff,
      },
      {
        id: 2,
        title: "Limited",
        quantity: numLimited,
      },
      {
        id: 3,
        title: "Loved",
        quantity: numLoved,
      },
      {
        id: 4,
        title: "No filter",
        quantity: "",
      },
    ];
  }, [numSaleOff, numLimited, numLoved]);

  return (
    <Accordion heading="Status">
      <div className="px-6 pt-3 pb-5 mb-5">
        {categoryOptions.map((option) => (
          <div
            className="flex items-center gap-x-5 mb-[30px] relative max-lg:gap-x-3"
            key={option.id}
          >
            <div className="relative w-[18px] h-[18px]">
              <input
                onChange={selectStatusHandler}
                type="radio"
                id={option.title.toLowerCase()}
                name="category"
                value={option.title.toLowerCase()}
                className={`appearance-none h-full w-full rounded-full border-2 transition ${
                  selectedStatus === option.title.toLowerCase()
                    ? "border-primary-color"
                    : "border-gray-600"
                }
                max-lg:h-[15px] max-lg:w-[15px]`}
              />
              {selectedStatus === option.title.toLowerCase() && (
                <div
                  className="absolute h-3 w-3 rounded-full bg-primary-color top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                max-lg:h-[10px] max-lg:w-[10px] max-lg:-translate-x-[6px] max-lg:-translate-y-[6.5px]"
                ></div>
              )}
            </div>

            <label
              htmlFor={option.title.toLowerCase()}
              className={`flex-1 flex items-center justify-between text-gray-600 transition relative cursor-pointer ${
                selectedStatus === option.title.toLowerCase() &&
                "!text-black !font-medium"
              }`}
            >
              <p>{option.title}</p>
              <p>{option.quantity}</p>
            </label>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
