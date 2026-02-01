import { currentCoin } from './data.js';
import { checkAccess } from './premium.js';

function generateFeature(){
  const features = [
    {name:"Basic Indicator", tier:"Free"},
    {name:"AI Trend Signal", tier:"Premium"},
    {name:"Portfolio Risk Score", tier:"Premium"},
    {name:"Social Leaderboard", tier:"Premium"}
  ];
  const f = features[Math.floor(Math.random()*features.length)];
  if(!checkAccess(f.tier)) return;
  console.log("AI Engine generated:", f.name,"-", f.tier);
}
setInterval(generateFeature,5000);
