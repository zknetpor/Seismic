
const suits=["♠","♥","♣","♦"];
const ranks=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

export function createDeck(){
 let d=[];
 suits.forEach(s=>ranks.forEach(r=>d.push({suit:s,rank:r})));
 return d;
}

export function shuffle(d){
 return d.sort(()=>Math.random()-0.5);
}
