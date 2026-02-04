import { coins } from './coins.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-firestore.js";

const listDiv = document.getElementById("coin-list");
const searchInput = document.getElementById("coin-search");

function renderCoins(filter = "") {
  listDiv.innerHTML = "";
  coins.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())).forEach(c => {
    const div = document.createElement("div");
    div.classList.add("coin-card");
    div.dataset.id = c.id;
    div.innerText = c.name;
    listDiv.appendChild(div);
  });
}
renderCoins();

searchInput.addEventListener("input", e => renderCoins(e.target.value));

document.addEventListener("click", async e => {
  const coin = e.target.closest(".coin-card");
  if (!coin || !window.currentUser) return;
  const id = coin.dataset.id;
  const userRef = doc(window.firebaseDB, "users", window.currentUser.uid);
  const docSnap = await getDoc(userRef);
  const data = docSnap.exists() ? docSnap.data() : { watchlist: [], tier: "FREE" };
  const list = data.watchlist || [];
  const limit = data.tier === "FREE" ? 3 : 50;

  if (list.includes(id)) return alert("Already added");
  if (list.length >= limit) return alert("Upgrade to Premium");

  list.push(id);
  await setDoc(userRef, { watchlist: list }, { merge: true });
  localStorage.setItem("watchlist", JSON.stringify(list));
  addPoints(10);
  renderWatchlist();
});
