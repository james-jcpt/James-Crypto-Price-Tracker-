import { switchCoin } from './chart.js';
import { currentCoin } from './data.js';

const freeCoins = ["BTC","ETH","SOL","ADA"]; // Default Free coins

// Create watchlist container
const container = document.createElement("div");
container.id = "freeWatchlist";
container.style.cssText = "display:flex;gap:10px;padding:10px 20px;";
document.body.insertBefore(container, document.querySelector(".chart-container"));

// Add buttons for each free coin
freeCoins.forEach(coin => {
  const btn = document.createElement("button");
  btn.textContent = coin;
  btn.style.cssText = "background:rgba(0,255,255,0.1);border:1px solid #00ffff;color:#00ffff;padding:6px 12px;border-radius:6px;cursor:pointer;";
  
  btn.addEventListener("click", ()=>{
    switchCoin(coin); // Update chart to selected coin
  });
  
  container.appendChild(btn);
});
