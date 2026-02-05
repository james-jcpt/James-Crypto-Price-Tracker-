let prices = [];

setInterval(async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
  const d = await res.json();
  prices.push(d.bitcoin.usd);
  if (prices.length > 20) prices.shift();

  const ctx = document.getElementById("chart").getContext("2d");
  ctx.clearRect(0,0,500,200);
  prices.forEach((p,i) => ctx.fillRect(i*20,200-p/500,10,10));
}, 1000);
