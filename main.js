let chart;

async function loadChart(coin) {
  const status = document.getElementById("status");
  status.innerText = "Loading chart...";

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
    );
    const data = await res.json();

    const prices = data.prices.map(p => p[1]);
    const labels = data.prices.map(p =>
      new Date(p[0]).toLocaleDateString()
    );

    if (chart) chart.destroy();

    const ctx = document.getElementById("priceChart").getContext("2d");

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: coin.toUpperCase() + " Price (USD)",
          data: prices,
          borderWidth: 2,
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
      // --- CRYPTO NEWS FEATURE ---
const newsDiv = document.getElementById("news");
const NEWS_API_KEY = "CG-CYH731sjKeHka2Gzp2mWW4DL"; // your API key

async function loadNews() {
  newsDiv.innerHTML = "Loading news...";

  try {
    const res = await fetch(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${NEWS_API_KEY}`
    );
    const data = await res.json();

    if (!data.Data || data.Data.length === 0) {
      newsDiv.innerHTML = "No news available right now.";
      return;
    }

    newsDiv.innerHTML = data.Data.slice(0, 5)
      .map(article => `
        <div class="news-item">
          <a href="${article.url}" target="_blank">
            <strong>${article.title}</strong><br/>
            <small>${article.source} - ${new Date(article.published_on*1000).toLocaleDateString()}</small>
          </a>
        </div>
      `).join("");

  } catch (err) {
    console.error(err);
    newsDiv.innerHTML = "Failed to load news ❌";
  }
}

// load news on page load
loadNews();
    });

    status.innerText = "Chart loaded ✔";

  } catch (err) {
    status.innerText = "Failed to load data ❌";
    console.error(err);
  }
}

document.getElementById("coinSelect").addEventListener("change", e => {
  loadChart(e.target.value);
});

loadChart("bitcoin");
