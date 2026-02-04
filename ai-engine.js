window.AIEngine = {
  analyze(price) {
    if (price > 50000) return "Strong bullish momentum";
    if (price < 20000) return "High volatility risk";
    return "Market consolidating";
  }
};
