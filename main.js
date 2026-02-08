// ---------------------
// Fetch Top 20 Coins
// ---------------------
async function loadTopCoins() {
  const topCoinsContainer = document.getElementById("topCoins");

  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false");
    const coins = await response.json();

    topCoinsContainer.innerHTML = "";
    coins.forEach(coin => {
      const coinDiv = document.createElement("div");
      coinDiv.innerHTML = `
        <strong>${coin.name}</strong>
        <p>$${coin.current_price.toLocaleString()}</p>
        <p style="color:${coin.price_change_percentage_24h >=0 ? 'limegreen' : 'red'}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      `;
      coinDiv.addEventListener("click", () => loadChart(coin.symbol.toUpperCase() + "USDT"));
      topCoinsContainer.appendChild(coinDiv);
    });

  } catch (err) {
    console.error("Top coins error:", err);
  }
}

// ---------------------
// Load TradingView Chart
// ---------------------
function loadChart(symbol = "BTCUSDT") {
  const container = document.getElementById("tradingview_chart_wrapper");

  // -------- Loading TradingView Chart --------
  container.innerHTML = "<p style='text-align:center; color:white; padding:20px;'>Loading TradingView Chart...</p>";

  setTimeout(() => {
    try {
      new TradingView.widget({
        width: "100%",
        height: 700,
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
  }, 100);
}

// ---------------------
// Initial Load
// ---------------------
loadTopCoins();
loadChart();
