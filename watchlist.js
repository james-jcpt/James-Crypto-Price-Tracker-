window.renderWatchlist = async function () {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];
  const box = document.getElementById("watchlist");

  if (!list.length) {
    box.innerHTML = "No coins selected";
    return;
  }

  const prices = await Promise.all(
    list.map(id =>
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
        .then(r => r.json())
    )
  );

  box.innerHTML = list.map((id, i) => {
    const price = prices[i][id].usd;
    const insight = AIEngine.analyze(price);
    return `<div>${id.toUpperCase()} — $${price}<br><small>${insight}</small></div>`;
  }).join("");
};

renderWatchlist();
