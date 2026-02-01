const cryptoList = ["bitcoin", "ethereum", "tether", "binancecoin"];
const cryptoSection = document.getElementById("crypto-list");

async function fetchCryptoData() {
  cryptoSection.innerHTML = "Loading prices...";
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoList.join(",")}`);
    const data = await res.json();
    
    cryptoSection.innerHTML = "";
    
    data.forEach(coin => {
      const card = document.createElement("div");
      card.className = "crypto-card";
      card.innerHTML = `
        <h3>${coin.name}</h3>
        <p>Price: $${coin.current_price.toLocaleString()}</p>
        <p>Change 24h: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
      `;
      cryptoSection.appendChild(card);
    });
    
    drawCharts(data);
  } catch(err) {
    cryptoSection.innerHTML = "Error loading data";
    console.error(err);
  }
}

function drawCharts(data) {
  const chartsSection = document.getElementById("charts");
  chartsSection.innerHTML = "";
  
  data.forEach(coin => {
    const canvas = document.createElement("canvas");
    chartsSection.appendChild(canvas);

    new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: ["-6h", "-5h", "-4h", "-3h", "-2h", "-1h", "Now"],
        datasets: [{
          label: coin.name,
          data: coin.sparkline_in_7d.price.slice(-7),
          borderColor: "#1f75fe",
          backgroundColor: "rgba(31,117,254,0.2)"
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  });
}

// Fetch every 1 minute
fetchCryptoData();
setInterval(fetchCryptoData, 60000);
