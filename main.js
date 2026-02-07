// ===== JCIPLATFORM MAIN.JS =====

// Global chart variable
let chart, candleSeries;

// Chart container
const coinChartDiv = document.getElementById('coinChart');

// Top 20 coins container
const topCoinsDiv = document.getElementById('topCoins'); // Make sure you have a div for top coins

// Search input
const searchInput = document.getElementById('searchInput');

// ========== Load Top 20 Coins ==========
async function loadTopCoins() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1');
    const coins = await res.json();

    topCoinsDiv.innerHTML = '';
    coins.forEach(coin => {
      const coinCard = document.createElement('div');
      coinCard.className = 'coin-card';
      coinCard.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}" width="30">
        <span>${coin.name} (${coin.symbol.toUpperCase()})</span>
        <span>$${coin.current_price.toLocaleString()}</span>
        <button onclick="loadChart('${coin.id}')">View Chart</button>
      `;
      topCoinsDiv.appendChild(coinCard);
    });
  } catch (err) {
    console.error('Error loading top coins:', err);
  }
}

// ========== Load Coin Chart ==========
async function loadChart(coinId) {
  try {
    // Fetch OHLC data (7 days)
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`);
    const data = await res.json(); // [[timestamp, open, high, low, close], ...]

    const formattedData = data.map(d => ({
      time: Math.floor(d[0] / 1000), // TradingView uses seconds
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4]
    }));

    // Remove old chart
    if (chart) chart.remove();

    // Create new chart
    chart = LightweightCharts.createChart(coinChartDiv, {
      width: coinChartDiv.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#0a0a1a',
        textColor: '#fff',
      },
      grid: {
        vertLines: { color: 'rgba(158,0,255,0.1)' },
        horzLines: { color: 'rgba(158,0,255,0.1)' }
      },
      crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
      priceScale: { borderColor: '#9e00ff' },
      timeScale: { borderColor: '#9e00ff', timeVisible: true, secondsVisible: false }
    });

    candleSeries = chart.addCandlestickSeries({
      upColor: '#00ff88',
      downColor: '#ff0055',
      borderVisible: true,
      wickUpColor: '#00ff88',
      wickDownColor: '#ff0055',
    });

    candleSeries.setData(formattedData);

    // Example Buy/Sell markers (replace with dynamic later)
    candleSeries.setMarkers([
      { time: formattedData[2].time, position: 'aboveBar', color: 'red', shape: 'arrowDown', text: 'Sell' },
      { time: formattedData[5].time, position: 'belowBar', color: 'green', shape: 'arrowUp', text: 'Buy' },
    ]);

  } catch (err) {
    console.error('Error loading candlestick chart:', err);
  }
}

// ========== Search Coin ==========
searchInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.toLowerCase();
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
      const coins = await res.json();
      const coin = coins.find(c => c.id === query || c.symbol === query || c.name.toLowerCase() === query);
      if (coin) {
        loadChart(coin.id);
      } else {
        alert('Coin not found!');
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  }
});

// ========== Initial Load ==========
loadTopCoins();
