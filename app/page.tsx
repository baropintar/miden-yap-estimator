// app/page.tsx
"use client";

import { useState } from "react";
import EstimatorCard from "./components/EstimatorCard";
import { estimateYaps } from "../lib/yapEstimator";

export default function Home() {
  const [tweet, setTweet] = useState("");
  const [result, setResult] = useState<null | any>(null);

  const handleEstimate = () => {
    if (!tweet.trim()) return setResult(null);
    const data = estimateYaps(tweet);
    setResult(data);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/midenn.jfif')" }}
    >
      <div className="bg-black/50 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-neutral-800">
        <h1 className="text-3xl font-bold text-center mb-2 text-orange-300">
          Miden Yap Estimator
        </h1>

        <p className="text-center text-neutral-300 mb-6">
          Predict your yap potential based on mindshare signals.
        </p>

        <textarea
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="Paste your tweet here..."
          className="w-full p-4 rounded-xl bg-neutral-900/70 border border-neutral-700 text-neutral-200 outline-none resize-none h-32"
        />

        <button
          onClick={handleEstimate}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 rounded-xl"
        >
          Estimate Yaps
        </button>

        {result && (
          <div className="mt-6">
            <EstimatorCard
              score={result.yaps}
              subscores={result.subscores}
              tweet={tweet}
            />
          </div>
        )}

        <p className="text-neutral-400 text-center text-sm mt-6">
          Built for CT • Powered by Miden Mindshare
        </p>
      </div>
    </div>
  );
}
