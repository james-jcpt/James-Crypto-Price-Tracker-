import { coinData, currentCoin } from './data.js';
const ctx = document.getElementById("marketChart").getContext("2d");
const priceEl = document.getElementById("price");
const changeEl = document.getElementById("change");
const moodEl = document.getElementById("mood");

let prices = [], labels = [];
let basePrice = coinData[currentCoin].price;

// Simulate initial data
for(let i=0;i<200;i++){ prices.push(basePrice + Math.random()*200); labels.push(""); }

const chart = new Chart(ctx,{
  type:"line",
  data:{ labels, datasets:[{ data:prices, borderColor:"#00ffff", borderWidth:2, tension:0.5, pointRadius:0, fill:true, backgroundColor:"rgba(0,255,255,.2)"}]},
  options:{ responsive:true, maintainAspectRatio:false, animation:false, plugins:{legend:{display:false}}, scales:{x:{display:false},y:{ticks:{color:"#00ffff"},grid:{color:"rgba(0,255,255,.12)"}}} }
});

export function switchCoin(symbol){
  basePrice = coinData[symbol].price;
  prices = prices.map(()=>basePrice + Math.random()*200);
}

setInterval(()=>{
  prices.shift();
  let move = (Math.random()-0.5)*150;
  basePrice += move;
  prices.push(basePrice);
  priceEl.textContent=`$${basePrice.toFixed(2)}`;
  changeEl.textContent=(move>=0?"+":"")+move.toFixed(2)+"$";
  moodEl.textContent = move>=0?"Bullish":"Bearish";
  chart.update();
},500);
