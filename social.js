import { userTier, checkAccess } from './premium.js';
import { db, auth } from './firebase.js';

export function followUser(targetUserId){
  const user = auth.currentUser;
  if(!user) return;
  if(!checkAccess("Premium")) return;
  db.ref(`users/${user.uid}/following`).push(targetUserId);
}

export function leaderboard(){
  if(!checkAccess("Premium")) return;

  db.ref('users').once('value', snapshot=>{
    let leaderboardArray = [];
    snapshot.forEach(userSnap=>{
      const uid = userSnap.key;
      const portfolio = userSnap.val().portfolio || {};
      let totalValue = 0;
      for(let coin in portfolio){
        totalValue += portfolio[coin].quantity * window.coinData[coin].price;
      }
      leaderboardArray.push({uid, totalValue});
    });
    leaderboardArray.sort((a,b)=>b.totalValue - a.totalValue);
    console.log("Leaderboard Top 5:", leaderboardArray.slice(0,5));
  });
}

setInterval(leaderboard, 5000);
