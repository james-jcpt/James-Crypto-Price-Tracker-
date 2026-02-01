import { userTier, checkAccess } from './premium.js';
import { db, auth } from './firebase.js';

export function addAlert(coin, priceTarget){
  if(!checkAccess("Premium")) return;

  const userId = auth.currentUser.uid;
  db.ref(`users/${userId}/alerts`).push({
    coin,
    priceTarget,
    createdAt: Date.now()
  });
}

setInterval(()=>{
  const user = auth.currentUser;
  if(!user) return;
  db.ref(`users/${user.uid}/alerts`).once('value', snapshot=>{
    snapshot.forEach(alertSnap=>{
      const alert = alertSnap.val();
      const currentPrice = window.coinData[alert.coin].price;
      if(currentPrice >= alert.priceTarget){
        console.log(`ALERT! ${alert.coin} reached $${alert.priceTarget}`);
      }
    });
  });
},2000);
