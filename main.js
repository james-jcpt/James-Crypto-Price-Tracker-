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
