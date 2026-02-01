import { canSearchCoin } from './premium.js';
import { switchCoin } from './chart.js';

const searchInput = document.createElement("input");
searchInput.id = "coinSearch";
searchInput.placeholder = "Search coin (Premium)";
searchInput.style.cssText = "flex:1;padding:6px 12px;border-radius:6px;border:1px solid #00ffff;background:rgba(0,255,255,0.05);color:#00ffff;";

const searchBtn = document.createElement("button");
searchBtn.id = "searchBtn";
searchBtn.textContent = "Search";
searchBtn.style.cssText = "background:#00ffcc;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-weight:bold;";

const container = document.createElement("div");
container.className = "search-container";
container.style.cssText = "display:flex;gap:8px;padding:10px 20px;";
container.append(searchInput, searchBtn);

document.body.insertBefore(container, document.querySelector(".chart-container"));

searchBtn.addEventListener("click", ()=>{
  const coin = searchInput.value.toUpperCase();
  if(!canSearchCoin()) return;

  if(window.coinData[coin]){
    switchCoin(coin);
  } else {
    console.log("Coin not found in database");
  }
});
