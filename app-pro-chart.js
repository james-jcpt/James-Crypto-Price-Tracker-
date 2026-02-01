// ====== Professional Multi-Coin Live Chart ======
const chartCanvas = document.getElementById("main-chart").getContext("2d");
const coinSelect = document.getElementById("coin");
let proChart;
let chartData = [];
let chartLabels = Array(50).fill("");

async function fetchCoinPrice(coinId) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`);
    const data = await res.json();
    return data[0].current_price;
  } catch(err) {
    console.error("Coin fetch error:", err);
    return null;
  }
}

async function updateChart() {
  const coinId = coinSelect.value;
  const price = await fetchCoinPrice(coinId);
  if(price === null) return;

  if(chartData.length >= 50) chartData.shift();
  chartData.push(price);

  const gain = chartData.length > 1 ? chartData[chartData.length-1] >= chartData[chartData.length-2] : true;
  const lineColor = gain ? "#00ff99" : "#ff4c4c";

  if(!proChart){
    proChart = new Chart(chartCanvas,{
      type:"line",
      data:{
        labels: chartLabels,
        datasets:[{
          label: coinId,
          data: chartData,
          borderColor: lineColor,
          backgroundColor: chartCanvas.createLinearGradient(0,0,0,400),
          fill:true,
          tension:0.4,
          borderWidth:2,
          pointRadius:0
        }]
      },
      options:{
        responsive:true,
        animation:{duration:400},
        plugins:{legend:{display:false}, tooltip:{enabled:true}},
        scales:{
          x:{display:false},
          y:{grid:{color:"rgba(255,255,255,0.1)"}}
        }
      }
    });

    // Gradient fill
    const gradient = chartCanvas.createLinearGradient(0,0,0,400);
    gradient.addColorStop(0,"rgba(0,255,224,0.3)");
    gradient.addColorStop(1,"rgba(0,0,0,0)");
    proChart.data.datasets[0].backgroundColor = gradient;
    proChart.update();
  } else {
    proChart.data.datasets[0].data = chartData;
    proChart.data.datasets[0].borderColor = lineColor;
    proChart.update();
  }
}

// Auto-update every 3s
updateChart();
setInterval(updateChart,3000);

// Change coin dynamically
coinSelect.addEventListener("change", ()=>{
  chartData = []; // reset data when switching coin
});
