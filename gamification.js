window.addPoints = function (pts) {
  let points = Number(localStorage.getItem("points") || 0) + pts;
  localStorage.setItem("points", points);

  let tier = "FREE";
  if (points >= 500) tier = "VIP";
  if (points >= 1500) tier = "MVP";

  localStorage.setItem("tier", tier);
  document.getElementById("vip-status").innerText =
    `Points: ${points} | Rank: ${tier}`;
};

addPoints(0);
