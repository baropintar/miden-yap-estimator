// lib/yapEstimator.ts
export function estimateYaps(tweet: string) {
  const text = (tweet || "").toLowerCase();

  let score = 0;
  const hits: string[] = [];

  const keywords: Record<string, number> = {
    miden: 15,
    zk: 12,
    "zk rollup": 14,
    rollup: 10,
    mindshare: 18,
    alpha: 10,
    testnet: 8,
    upgrade: 7,
    privacy: 10,
    proving: 6,
    velocity: 5,
    sequencer: 6,
    dev: 4,
    roadmap: 5,
    release: 6,
    mainnet: 10,
    preview: 4,
  };

  for (const [k, v] of Object.entries(keywords)) {
    if (text.includes(k)) {
      score += v;
      hits.push(k);
    }
  }

  // Length factor
  const lengthScore = Math.min(Math.floor(text.length / 10), 15);
  score += lengthScore;

  // Hashtags & mentions
  const hashtags = (text.match(/#/g) || []).length;
  const mentions = (text.match(/@/g) || []).length;
  score += hashtags * 3;
  score += mentions * 4;

  // Hooks
  const hooks = ["thread", "recap", "breaking", "insight", "insights"];
  for (const h of hooks) {
    if (text.includes(h)) {
      score += 6;
      hits.push(h);
    }
  }

  // clamp
  const yaps = Math.round(Math.min(60, Math.max(2, score)));

  // subscores (simple deterministic proxies 0-100)
  const subscores = {
    relevance: hits.length ? Math.min(100, 40 + hits.length * 12) : 40,
    tone: text.includes("?") || text.includes("why") ? 75 : 55,
    niche: text.includes("zk") || text.includes("rollup") ? 80 : 50,
    hooks: (hashtags > 0 || text.includes("thread")) ? 75 : 50,
    alpha: (text.includes("v0.12") || text.includes("testnet") || text.includes("recap")) ? 80 : 50,
  };

  let category = "Low Mindshare";
  if (yaps >= 15) category = "Moderate Mindshare";
  if (yaps >= 30) category = "High Mindshare";
  if (yaps >= 45) category = "Peak Mindshare";

  return {
    yaps,
    scoreBreakdown: {
      length: lengthScore,
      hashtags,
      mentions,
      keywordHits: hits,
    },
    subscores,
    category,
  };
}
