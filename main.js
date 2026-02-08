// ===============================
// JCIPLATFORM PROFESSIONAL MAIN.JS
// ===============================

let chart;
let candleSeries;

const chartContainer = document.getElementById("coinChart");
const topCoinsContainer = document.getElementById("topCoins");
const searchInput = document.getElementById("searchInput");

// ===============================
// CREATE CHART FUNCTION
// ===============================
function createChart() {
  if (chart) {
    chart.remove();
  }

  chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 400,
    layout: {
      backgroundColor: "#0a0a1a",
      textColor: "#ffffff",
    },
    grid: {
      vertLines: { color: "rgba(158,0,255,0.08)" },
      horzLines: { color: "rgba(158,0,255,0.08)" },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: "#9e00ff",
    },
    timeScale: {
      borderColor: "#9e00ff",
      timeVisible: true,
      secondsVisible: false,
    },
  });

  candleSeries = chart.addCandlestickSeries({
    upColor: "#00ff88",
    downColor: "#ff0055",
    borderUpColor: "#00ff88",
    borderDownColor: "#ff0055",
    wickUpColor: "#00ff88",
    wickDownColor: "#ff0055",
  });
}

// ===============================
// LOAD CANDLESTICK DATA
// ===============================
async function loadChart(coinId) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
      alert("No chart data available for this coin.");
      return;
    }

    const formattedData = data.map((item) => ({
      time: item[0] / 1000,
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
    }));

    createChart();
    candleSeries.setData(formattedData);

    // Example markers
    candleSeries.setMarkers([
      {
        time: formattedData[2].time,
        position: "aboveBar",
        color: "red",
        shape: "arrowDown",
        text: "Sell",
      },
      {
        time: formattedData[5].time,
        position: "belowBar",
        color: "green",
        shape: "arrowUp",
        text: "Buy",
      },
    ]);
  } catch (error) {
    console.error("Chart loading error:", error);
    alert("Error loading chart.");
  }
}

// ===============================
// LOAD TOP 20 COINS
// ===============================
async function loadTopCoins() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
    );

    const coins = await response.json();

    topCoinsContainer.innerHTML = "";

    coins.forEach((coin) => {
      const card = document.createElement("div");
      card.className = "coin-card";

      card.innerHTML = `
        <img src="${coin.image}" width="40" />
        <h3>${coin.name}</h3>
        <p>$${coin.current_price.toLocaleString()}</p>
        <p style="color:${
          coin.price_change_percentage_24h >= 0 ? "#00ff88" : "#ff0055"
        }">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      `;

      card.addEventListener("click", () => {
        loadChart(coin.id);
      });

      topCoinsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Top coins error:", error);
  }
}

// ===============================
// SEARCH FUNCTION
// ===============================
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase();

    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      const coins = await response.json();

      const coin = coins.find(
        (c) =>
          c.id === query ||
          c.symbol === query ||
          c.name.toLowerCase() === query
      );

      if (coin) {
        loadChart(coin.id);
      } else {
        alert("Coin not found.");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }
});

// ===============================
// INITIAL LOAD
// ===============================
window.addEventListener("load", () => {
  loadTopCoins();
  loadChart("bitcoin"); // Always show Bitcoin first
});
