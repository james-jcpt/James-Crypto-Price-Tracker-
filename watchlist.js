const div = document.getElementById("watchlist");

setInterval(async () => {
  div.innerHTML = "";
  const w = JSON.parse(localStorage.getItem("watchlist")) || [];
  for (const coin of w) {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const data = await res.json();
    div.innerHTML += `<div class="coin">${coin.toUpperCase()}: $${data[coin].usd}</div>`;
  }
}, 1000);
