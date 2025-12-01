export function evaluateTweet(text: string) {
  const t = text.toLowerCase();

  // --- SCORING ---

  // 1. Relevance (0–25)
  let relevance = 0;
  const relKeywords = [
    "miden", "zk", "rollup", "client", "privacy",
    "testnet", "v0.12", "prove", "proof", "l2"
  ];

  relKeywords.forEach((k) => {
    if (t.includes(k)) relevance += 4;
  });
  relevance = Math.min(25, relevance);

  // 2. Tone (0–20)
  let tone = 10;
  if (t.includes("alpha")) tone += 5;
  if (t.includes("update") || t.includes("release")) tone += 5;
  if (t.includes("shitcoin") || t.includes("rekt")) tone -= 6;
  tone = Math.max(0, Math.min(20, tone));

  // 3. Niche Fit (0–20)
  let niche = 5;
  if (t.includes("zk")) niche += 8;
  if (t.includes("rollup") || t.includes("client")) niche += 7;
  niche = Math.min(20, niche);

  // 4. Engagement Hooks (0–20)
  let hooks = 0;
  if (text.length > 120) hooks += 5;
  if (text.includes("?")) hooks += 4;
  if (text.includes("why") || text.includes("how")) hooks += 5;
  if (t.includes("here's") || t.includes("thread")) hooks += 6;
  hooks = Math.min(20, hooks);

  // 5. Alpha Level (0–15)
  let alpha = 0;
  if (t.includes("testnet") || t.includes("upgrade")) alpha += 7;
  if (t.includes("v0.12")) alpha += 5;
  if (t.includes("recap") || t.includes("insight")) alpha += 4;
  alpha = Math.min(15, alpha);

  // TOTAL
  const score = relevance + tone + niche + hooks + alpha;

  // RESULT RANGE
  let result = "0–8 YAP";
  if (score >= 85) result = "35–50 YAP";
  else if (score >= 70) result = "25–35 YAP";
  else if (score >= 55) result = "15–25 YAP";
  else if (score >= 40) result = "8–15 YAP";

  return {
    score,
    result,
    breakdown: { relevance, tone, niche, hooks, alpha }
  };
}
