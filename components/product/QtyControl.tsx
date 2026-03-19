"use client";

interface QtyControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QtyControl({
  value,
  onChange,
  min = 1,
  max,
}: QtyControlProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center border border-[var(--color-border-secondary)] rounded-lg overflow-hidden w-fit">
      <button
        onClick={decrease}
        disabled={value <= min}
        className="w-9 h-9 flex items-center justify-center bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-medium text-[var(--color-text-primary)]">
        {value}
      </span>
      <button
        onClick={increase}
        disabled={max !== undefined && value >= max}
        className="w-9 h-9 flex items-center justify-center bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
