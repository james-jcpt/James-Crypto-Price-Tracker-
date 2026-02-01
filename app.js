const cryptoList = ["bitcoin","ethereum","tether","binancecoin","cardano","solana","dogecoin"];
const tableBody = document.querySelector("#crypto-table tbody");
const moversGrid = document.getElementById("movers-grid");
const toggleBtn = document.getElementById("toggle-theme");
const searchInput = document.getElementById("search-input");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Fetch crypto data
async function fetchCrypto() {
  tableBody.innerHTML = "Loading...";
  moversGrid.innerHTML = "";

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoList.join(",")}&sparkline=true`
    );
    const data = await res.json();

    // Top Movers
    const sortedByChange = [...data].sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h);
    const topGainers = sortedByChange.slice(0,3);
    const topLosers = sortedByChange.slice(-3).reverse();

    [...topGainers, ...topLosers].forEach(coin => {
      const div = document.createElement("div");
      div.className="crypto-card";
      const changeClass = coin.price_change_percentage_24h>=0?"green":"red";
      div.innerHTML=`
        <img src="${coin.image}" alt="${coin.name}">
        <div class="crypto-name">${coin.name}</div>
        <div class="crypto-price">$${coin.current_price.toLocaleString()}</div>
        <div class="crypto-change ${changeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</div>
      `;
      moversGrid.appendChild(div);
    });

    // Crypto Table
    tableBody.innerHTML = "";
    data.forEach(coin=>{
      const tr = document.createElement("tr");
      const changeClass = coin.price_change_percentage_24h>=0?"green":"red";
      tr.innerHTML = `
        <td><img src="${coin.image}" alt="${coin.name}" width="25"> ${coin.name} (${coin.symbol.toUpperCase()})</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td class="${changeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>$${(coin.current_price * 1).toLocaleString()}</td>
        <td><canvas id="spark-${coin.id}" class="sparkline"></canvas></td>
      `;
      tableBody.appendChild(tr);

      // Sparkline
      const ctx = document.getElementById(`spark-${coin.id}`).getContext("2d");
      new Chart(ctx,{
        type:"line",
        data:{
          labels:["-6h","-5h","-4h","-3h","-2h","-1h","Now"],
          datasets:[{
            label:coin.name,
            data:coin.sparkline_in_7d?.price?.slice(-7) || [0,0,0,0,0,0,0],
            borderColor: coin.price_change_percentage_24h>=0?"var(--green)":"var(--red)",
            backgroundColor:"rgba(31,117,254,0.1)",
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

  } catch(err){
    tableBody.innerHTML="Error loading data";
    console.error(err);
  }
}

// Search filter
searchInput.addEventListener("input", ()=>{
  const term = searchInput.value.toLowerCase();
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach(row=>{
    const name = row.cells[0].innerText.toLowerCase();
    row.style.display = name.includes(term)?"table-row":"none";
  });
});

// Auto-refresh every 30 sec
fetchCrypto();
setInterval(fetchCrypto,30000);
