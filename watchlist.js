import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-firestore.js";

export async function renderWatchlist() {
  if (!window.currentUser) return;
  const userRef = doc(window.firebaseDB, "users", window.currentUser.uid);
  const docSnap = await getDoc(userRef);
  const list = docSnap.exists() ? docSnap.data().watchlist || [] : [];

  const box = document.getElementById("watchlist");
  if (!list.length) return box.innerHTML = "No coins selected";

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
}

renderWatchlist();
