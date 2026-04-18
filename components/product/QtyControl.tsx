"use client";

interface QtyControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QtyControl({ value, onChange, min = 1, max }: QtyControlProps) {
  return (
    <div className="flex items-center bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden h-12">
      <button
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        className="w-10 h-full flex items-center justify-center text-[#9A8C7A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-lg font-light"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold text-[#F5F0E8]">{value}</span>
      <button
        onClick={() => (max === undefined || value < max) && onChange(value + 1)}
        disabled={max !== undefined && value >= max}
        className="w-10 h-full flex items-center justify-center text-[#9A8C7A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-lg font-light"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
