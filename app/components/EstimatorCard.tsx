"use client";

import React from "react";

interface Props {
  score: number;
  subscores: {
    relevance: number;
    tone: number;
    niche: number;
    hooks: number;
    alpha: number;
  };
  tweet: string;
}

export default function EstimatorCard({ score, subscores, tweet }: Props) {
  return (
    <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-2xl shadow-xl space-y-5">

      <h2 className="text-xl font-semibold text-orange-400 text-center">
        Estimated Yaps: {score}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <SubScore label="Relevance" value={subscores.relevance} />
        <SubScore label="Tone Fit" value={subscores.tone} />
        <SubScore label="Niche Match" value={subscores.niche} />
        <SubScore label="Engagement Hooks" value={subscores.hooks} />
        <SubScore label="Alpha Level" value={subscores.alpha} />
      </div>

      <div className="bg-black/30 p-4 rounded-xl border border-neutral-700">
        <h3 className="text-sm mb-2 text-neutral-300">Tweet Reviewed:</h3>
        <p className="text-neutral-400 text-sm whitespace-pre-line">{tweet}</p>
      </div>

      <Improvements subscores={subscores} />
    </div>
  );
}

function SubScore({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 bg-black/20 rounded-xl border border-neutral-800">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-lg font-bold text-neutral-200">{value}</p>
    </div>
  );
}


// --- Improvement suggestions ---
function Improvements({
  subscores,
}: {
  subscores: {
    relevance: number;
    tone: number;
    niche: number;
    hooks: number;
    alpha: number;
  };
}) {
  const list: string[] = [];

  if (subscores.relevance < 60)
    list.push("Make the tweet closer to Miden updates or real usage cases.");
  if (subscores.tone < 60)
    list.push("Tone too generic — make it more authentic & less AI-ish.");
  if (subscores.niche < 60)
    list.push("Clarify why this matters to zero-knowledge or rollup enjoyers.");
  if (subscores.hooks < 60)
    list.push("Add a hook (a claim, a question, or a surprising fact).");
  if (subscores.alpha < 60)
    list.push("You can add more alpha — link to spec, PR, or testnet update.");

  return (
    <div className="bg-neutral-900/40 border border-neutral-700 rounded-xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-orange-300">Improvement Tips</h3>

      {list.length === 0 ? (
        <p className="text-neutral-400 text-sm">Looks good — strong yap energy.</p>
      ) : (
        <ul className="list-disc list-inside text-neutral-400 text-sm space-y-1">
          {list.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
