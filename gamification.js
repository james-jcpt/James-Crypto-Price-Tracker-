setInterval(() => {
  let p = Number(localStorage.getItem("points")) || 0;
  p++;
  localStorage.setItem("points", p);
  document.getElementById("vip-status").innerText =
    p > 500 ? "MVP 🔥" : p > 100 ? "VIP ⭐" : "FREE";
}, 5000);
