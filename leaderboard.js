const div = document.getElementById("leaderboard");
setInterval(() => {
  div.innerText = "Your Points: " + (localStorage.getItem("points") || 0);
}, 3000);
