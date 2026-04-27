
import { createDeck, shuffle } from "../utils/deck.js";

let state;

export function startGame(username){
 const deck = shuffle(createDeck());

 state={
  user:username,
  stock:deck,
  waste:[],
  tableau:[[],[],[],[],[],[],[]],
  foundation:[[],[],[],[]],
  score:0,
  selected:null
 };

 deal();
 render();
}

function deal(){
 for(let i=0;i<7;i++){
  for(let j=0;j<=i;j++){
   const c=state.stock.pop();
   c.faceUp=j===i;
   state.tableau[i].push(c);
  }
 }
}

function render(){
 document.getElementById("app").innerHTML=`
  <h2>SEISMIC - ${state.user}</h2>
  <div>Score: ${state.score}</div>
  <button id="draw">Draw</button>
  <div class="board">
   ${state.tableau.map((col,i)=>`
    <div class="column">
     ${col.map((c,idx)=>`
      <div class="card ${c.faceUp?'':'back'}"
       data-col="${i}" data-idx="${idx}">
       ${c.faceUp?c.rank+c.suit:''}
      </div>
     `).join('')}
    </div>
   `).join('')}
  </div>
 `;

 document.getElementById("draw").onclick=draw;

 bind();
}

function bind(){
 document.querySelectorAll(".card").forEach(el=>{
  el.onclick=()=>{
   const col=el.dataset.col;
   const idx=el.dataset.idx;
   const card=state.tableau[col][idx];
   if(!card.faceUp)return;

   if(!state.selected){
    state.selected={col,idx};
    el.style.border="2px solid red";
   }else{
    move(state.selected,{col,idx});
    state.selected=null;
    render();
   }
  };
 });
}

function isRed(s){return s==="♥"||s==="♦"}

function canMove(a,b){
 if(!b)return a.rank==="K";
 const order=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
 return order.indexOf(a.rank)===order.indexOf(b.rank)-1 &&
        isRed(a.suit)!==isRed(b.suit);
}

function move(from,to){
 const moving=state.tableau[from.col].slice(from.idx);
 const target=state.tableau[to.col];
 const last=target[target.length-1];

 if(canMove(moving[0],last)){
  state.tableau[from.col]=state.tableau[from.col].slice(0,from.idx);
  target.push(...moving);

  const prev=state.tableau[from.col].slice(-1)[0];
  if(prev)prev.faceUp=true;

  state.score+=10;
 }
}

function draw(){
 if(state.stock.length===0){
  state.stock=state.waste.reverse();
  state.waste=[];
 }else{
  const c=state.stock.pop();
  c.faceUp=true;
  state.waste.push(c);
  state.score+=1;
 }
 render();
}
