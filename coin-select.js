import { coins } from "./coins.js";

const list = document.getElementById("coin-list");
const search = document.getElementById("coin-search");

function render(filter = "") {
  list.innerHTML = "";
  coins.filter(c => c.includes(filter)).forEach(c => {
    const div = document.createElement("div");
    div.className = "coin";
    div.innerText = c.toUpperCase();
    div.onclick = () => addToWatchlist(c);
    list.appendChild(div);
  });
}
render();

search.oninput = e => render(e.target.value.toLowerCase());

function addToWatchlist(coin) {
  const w = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!w.includes(coin)) {
    w.push(coin);
    localStorage.setItem("watchlist", JSON.stringify(w));
  }
                             }
