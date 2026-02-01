import { userTier, checkAccess } from './premium.js';
import { db, auth } from './firebase.js';

export function addToPortfolio(coin, quantity){
  const user = auth.currentUser;
  if(!user) return;
  db.ref(`users/${user.uid}/portfolio/${coin}`).set({
    quantity,
    price: window.coinData[coin].price,
    lastUpdated: Date.now()
  });
}

export function getPortfolio(){
  const user = auth.currentUser;
  if(!user) return;

  db.ref(`users/${user.uid}/portfolio`).on('value', snapshot=>{
    const portfolio = snapshot.val() || {};
    let totalValue = 0;
    for(let coin in portfolio){
      const price = window.coinData[coin].price;
      totalValue += portfolio[coin].quantity * price;
    }
    console.log("Portfolio Value: $", totalValue.toFixed(2));
  });
}

if(userTier === "Premium"){
  getPortfolio();
}
