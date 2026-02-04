const board = document.getElementById("leaderboard");
const points = Number(localStorage.getItem("points") || 0);

board.innerHTML = `
#1 You — ${points} pts<br>
#2 TraderX — 980 pts<br>
#3 AlphaWhale — 870 pts
`;
