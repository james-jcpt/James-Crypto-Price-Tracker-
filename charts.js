import Chart from "https://cdn.jsdelivr.net/npm/chart.js";

window.renderChart = async function (id) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
  );
  const data = await res.json();

  const ctx = document.getElementById("chart").getContext("2d");
  if (window.chart) window.chart.destroy();

  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.prices.map(p => ""),
      datasets: [{ data: data.prices.map(p => p[1]) }]
    }
  });
};
