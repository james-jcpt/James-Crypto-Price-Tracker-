import { auth, db } from './firebase.js';
export let userTier = "Free"; 

firebase.auth().onAuthStateChanged(user => {
  if(user){
    db.ref(`users/${user.uid}/tier`).once('value').then(snapshot=>{
      if(snapshot.val() === "Premium") userTier = "Premium";
    });
  }
});

export function checkAccess(featureTier){
  if(featureTier==="Premium" && userTier!=="Premium"){
    console.log("Upgrade to Premium to access:", featureTier);
    return false;
  }
  return true;
}
