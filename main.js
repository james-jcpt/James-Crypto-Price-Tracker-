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
      coinDiv.addEventListener("click", () => {
  loadChart(coin.symbol);
});

topCoinsContainer.appendChild(coinDiv);

  } catch (err) {
    console.error("Top coins error:", err);
  }
}

// ---------------------
// Load TradingView Chart
// ---------------------
function loadChart(symbol = "BTC") {
  const container = document.getElementById("tradingview_chart_wrap");

  // Clear old chart
  container.innerHTML = "";

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const upperSymbol = symbol.toUpperCase();

  const possibleSymbols = [
    `CRYPTO:${upperSymbol}USD`,
    `CRYPTO:${upperSymbol}USDT`,
    `BINANCE:${upperSymbol}USDT`,
    `COINBASE:${upperSymbol}USD`
  ];

  let index = 0;

  function tryNextSymbol() {
    if (index >= possibleSymbols.length) {
      container.innerHTML =
        "<p style='color:red;text-align:center;'>Chart not available for this coin.</p>";
      return;
    }

    const currentSymbol = possibleSymbols[index];
    index++;

    try {
      new TradingView.widget({
        width: "100%",
        height: window.innerWidth < 768 ? 400 : 700, // mobile responsive
        symbol: currentSymbol,
        interval: "1",
        timezone: userTimezone, // auto detect real timezone
        theme: "dark",
        style: 1,
        locale: "en",
        toolbar_bg: "#111133",
        enable_publishing: false,
        hide_top_toolbar: false,
        save_image: false,
        container_id: "tradingview_chart_wrap",
        autosize: true,
      });
    } catch (err) {
      tryNextSymbol();
    }
  }

  tryNextSymbol();
}


// ---------------------
// Initial Load
// ---------------------
loadTopCoins();
loadChart();
