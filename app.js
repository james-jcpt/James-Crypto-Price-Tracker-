const cryptoList = ["bitcoin","ethereum","tether","binancecoin","cardano"];
const grid = document.getElementById("crypto-grid");
const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

async function fetchCrypto() {
  grid.innerHTML = "Loading...";
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoList.join(",")}&sparkline=true`);
    const data = await res.json();
    grid.innerHTML = "";
    
    data.forEach(coin => {
      const card = document.createElement("div");
      card.className = "crypto-card";

      const changeClass = coin.price_change_percentage_24h >= 0 ? "green" : "red";

      card.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}">
        <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
        <p class="crypto-price">$${coin.current_price.toLocaleString()}</p>
        <p class="crypto-change ${changeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</p>
        <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
        <canvas id="chart-${coin.id}" height="80"></canvas>
      `;

      grid.appendChild(card);

      // Draw sparkline
      const ctx = document.getElementById(`chart-${coin.id}`).getContext("2d");
      new Chart(ctx, {
        type:"line",
        data:{
          labels:["-6h","-5h","-4h","-3h","-2h","-1h","Now"],
          datasets:[{
            label: coin.name,
            data: coin.sparkline_in_7d?.price?.slice(-7) || [0,0,0,0,0,0,0],
            borderColor: "#1f75fe",
            backgroundColor: "rgba(31,117,254,0.2)",
            fill:true,
            tension:0.3
          }]
        },
        options:{
          responsive:true,
          plugins:{legend:{display:false}},
          scales:{x:{display:false},y:{display:false}}
        }
      });
    });

  } catch(err) {
    grid.innerHTML = "Error loading data";
    console.error(err);
  }
}

// Auto-refresh every 30 seconds
fetchCrypto();
setInterval(fetchCrypto, 30000);
