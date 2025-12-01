"use client";

type Props = {
  value: number;
  label: string;
  max?: number;
};

export default function ProgressBar({ value, label, max = 100 }: Props) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 opacity-80">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-neutral-800 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-orange-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
