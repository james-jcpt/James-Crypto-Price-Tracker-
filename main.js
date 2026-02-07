const topCoinsContainer = document.getElementById("topCoinsContainer");
const searchInput = document.getElementById("searchInput");
const chartTitle = document.getElementById("chartTitle");
const coinChartCtx = document.getElementById("coinChart").getContext("2d");
const binanceReferral = document.getElementById("binanceReferral");
const adsContainer = document.getElementById("adsContainer");

let coinChart;

// Sample sponsored news (replace with real sponsors later)
const sponsoredNews = [
  { title: "Crypto Exchange Promo", url: "https://example.com" },
  { title: "New Token Launch", url: "https://example2.com" }
];

// Populate sponsored news
adsContainer.innerHTML = sponsoredNews
  .map(ad => `<div class="ad-card"><a href="${ad.url}" target="_blank">${ad.title}</a></div>`)
  .join("");

// Fetch top 20 coins from CoinGecko
async function fetchTopCoins() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1");
    const coins = await res.json();
    displayTopCoins(coins);
  } catch (err) {
    topCoinsContainer.innerHTML = "Error loading top coins.";
    console.error(err);
  }
}

function displayTopCoins(coins) {
  topCoinsContainer.innerHTML = coins.map(coin => `
    <div class="coin-card" data-id="${coin.id}">
      <img src="${coin.image}" alt="${coin.name}">
      <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
      <p>Price: $${coin.current_price.toLocaleString()}</p>
      <p>24h: <span style="color:${coin.price_change_percentage_24h >=0 ? '#0f0' : '#f00'}">
      ${coin.price_change_percentage_24h.toFixed(2)}%</span></p>
      <a href="https://www.binance.com/referral/earn-together/refer2earn-usdc/claim?hl=en&ref=GRO_28502_O0D2L&utm_source=default" target="_blank" class="trade-button">Trade on Binance — Earn Together</a>
    </div>
  `).join("");

  // Add click event for chart update
  document.querySelectorAll(".coin-card").forEach(card => {
    card.addEventListener("click", () => {
      const coinId = card.getAttribute("data-id");
      loadChart(coinId);
      chartTitle.textContent = `${card.querySelector("h3").textContent} - 7 Day Chart`;
    });
  });
}

// Load chart for selected coin (Premium Neon Version)
async function loadChart(coinId) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
    const data = await res.json();

    const labels = data.prices.map(p => {
      const date = new Date(p[0]);
      return `${date.getMonth()+1}/${date.getDate()}`;
    });

    const prices = data.prices.map(p => p[1]);

    if (coinChart) coinChart.destroy();

    coinChart = new Chart(coinChartCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Price (USD)',
          data: prices,
          borderColor: '#9e00ff',          // neon purple line
          backgroundColor: 'rgba(158,0,255,0.2)', // soft gradient fill
          borderWidth: 3,
          pointRadius: 3,
          pointBackgroundColor: '#fff',
          tension: 0.4,                    // smooth curve
          fill: true,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          shadowColor: '#9e00ff'
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#6a00f4',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#9e00ff',
            borderWidth:

// Search functionality
searchInput.addEventListener("keypconst query = searchInput.value.toLowerCase();
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${query}`);
      const coin = await res.json();
      chartTitle.textContent = `${coin.name} - 7 Day Chart`;
      loadChart(coin.id);
    } catch (err) {
      alert("Coin not found. Try symbol or name (e.g., bitcoin).");
      console.error(err);
    }
  }
});

// Initial load
fetchTopCoins();
