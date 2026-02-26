"use client";

import Accordion from "./Accordion";
import { useEffect, useRef, useState } from "react";

const GAP = 500;
export const MAX_PRICE = 4000;

interface PriceRangeProps {
  onPriceChange?: (min: number, max: number) => void;
  initialMin?: number;
  initialMax?: number;
  resultCount?: number;
}

export default function PriceRange({
  onPriceChange,
  initialMin = 0,
  initialMax = 4000,
  resultCount = 0,
}: PriceRangeProps) {
  const [minInput, setMinInput] = useState(initialMin.toString());
  const [maxInput, setMaxInput] = useState(initialMax.toString());
  const progressRef = useRef<HTMLDivElement>(null);

  const updateMinAndProgress = (value: string) => {
    setMinInput(value);
    const percent = (+value / MAX_PRICE) * 100;
    if (progressRef.current) {
      progressRef.current.style.left = percent + "%";
    }
  };

  const updateMaxAndProgress = (value: string) => {
    setMaxInput(value);
    const percent = 100 - (+value / MAX_PRICE) * 100;
    if (progressRef.current) {
      progressRef.current.style.right = percent + "%";
    }
  };

  useEffect(() => {
    updateMinAndProgress(initialMin.toString());
    updateMaxAndProgress(initialMax.toString());
  }, [initialMin, initialMax]);

  const handleChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "min-range") {
      const newValue = e.target.value;
      if (+maxInput - +newValue >= GAP) {
        updateMinAndProgress(newValue);
      } else {
        updateMinAndProgress((+maxInput - GAP).toString());
      }
    } else {
      const newValue = e.target.value;
      if (+newValue - +minInput >= GAP) {
        updateMaxAndProgress(newValue);
      } else {
        updateMaxAndProgress((+minInput + GAP).toString());
      }
    }
  };

  const handleFilter = () => {
    if (onPriceChange) {
      onPriceChange(+minInput, +maxInput);
    }
  };

  return (
    <Accordion heading="Price">
      <div className="px-6 py-3 pb-5 mb-5 shadow-sm bg-surface text-theme">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 max-lg:gap-1">
            <span className="text-sm text-muted-theme">From</span>
            <div className="text-center select-none font-semibold text-lg max-w-[66px] max-lg:text-sm">
              ${minInput}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-theme">To</span>
            <div className="text-center select-none font-semibold text-lg max-w-[66px] max-lg:text-sm">
              ${maxInput}
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="h-[5px] bg-border-theme rounded-md relative">
          <div
            className="h-[5px] absolute bg-primary-theme rounded-md"
            ref={progressRef}
          ></div>
        </div>

        <div className="relative">
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step="100"
            name="min-range"
            value={minInput}
            onChange={handleChangeSlider}
            className="range-slider"
          />

          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step="100"
            name="max-range"
            onChange={handleChangeSlider}
            value={maxInput}
            className="range-slider"
          />
        </div>

        <div className="text-center mb-6">
          <button
            onClick={handleFilter}
            className="mt-8 border-2 border-theme py-3 px-5
          hover:border-primary-theme
          transition active:translate-y-[1px]"
          >
            <p className="text-theme">Apply filter</p>
          </button>
        </div>

        <div className="max-lg:text-sm text-muted-theme">
          <span>Result: </span>
          <span className="text-theme font-medium">{resultCount} products</span>
        </div>
      </div>
    </Accordion>
  );
}
