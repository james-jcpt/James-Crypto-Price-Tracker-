window.AI = price => {
  if (price > 50000) return "Bullish 🚀";
  if (price < 20000) return "Risk ⚠️";
  return "Stable";
};
