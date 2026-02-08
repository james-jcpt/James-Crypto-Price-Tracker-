const topCoinsContainer = document.getElementById("topCoins");
const searchInput = document.getElementById("searchInput");
let tradingviewWidget;

// ------------------------
// Load Top 20 Coins
// ------------------------
async function loadTopCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
    );
    const coins = await res.json();

    topCoinsContainer.innerHTML = "";

    coins.forEach((coin) => {
      const card = document.createElement("div");
      card.className = "coin-card";
      card.innerHTML = `
        <h3>${coin.name}</h3>
        <p>$${coin.current_price.toLocaleString()}</p>
        <p style="color:${coin.price_change_percentage_24h >= 0 ? "#00ff88" : "#ff0055"}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      `;
      card.onclick = () => loadChart(coin.symbol.toUpperCase() + "USDT");
      topCoinsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Top coins error:", err);
  }
}

function loadChart(symbol = "BTCUSDT") {
  const container = document.getElementById("tradingview_chart_wrapper");

  // -------- Loading TradingView Chart --------
  container.innerHTML = "<p style='text-align:center; color:white; padding:20px;'>Loading TradingView Chart...</p>";

  // Add TradingView widget after tiny delay
  setTimeout(() => {
    try {
      new TradingView.widget({
        width: "100%",
        height: 700, // big chart
        symbol: `BINANCE:${symbol}`,
        interval: "1",
        timezone: "Africa/Lagos",
        theme: "dark",
        style: 1,
        locale: "en",
        toolbar_bg: "#111133",
        enable_publishing: false,
        hide_top_toolbar: false,
        save_image: false,
        container_id: "tradingview_chart_wrapper",
        autosize: true,
      });
    } catch (err) {
      console.warn("TradingView load failed, retrying...");
      setTimeout(() => loadChart(symbol), 2000); // retry automatically
    }
  }, 100); // almost instant
}

// ------------------------
// Search Function
// ------------------------
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let val = searchInput.value.trim().toUpperCase();
    if (!val.endsWith("USDT")) val += "USDT"; // default trading pair
    loadChart(val);
  }
});

// ------------------------
// Initial Load
// ------------------------
window.onload = () => {
  loadTopCoins();
  loadChart("BTCUSDT");
};
