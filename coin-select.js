document.addEventListener("click", e => {
  const coin = e.target.closest(".coin-card");
  if (!coin) return;

  const id = coin.dataset.id;
  let list = JSON.parse(localStorage.getItem("watchlist")) || [];
  let tier = localStorage.getItem("tier") || "FREE";

  const limit = tier === "FREE" ? 3 : 50;

  if (list.includes(id)) return alert("Already added");
  if (list.length >= limit) return alert("Upgrade to Premium");

  list.push(id);
  localStorage.setItem("watchlist", JSON.stringify(list));

  addPoints(10);
  renderWatchlist();
  renderChart(id);
});
