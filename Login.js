
import { setScreen } from "../main.js";

export function renderLogin(start){
 setScreen(`
  <div class="login">
    <h2>SEISMIC</h2>
    <input id="user" placeholder="@username"/>
    <button id="go">START</button>
  </div>
 `);

 document.getElementById("go").onclick=()=>{
  const u=document.getElementById("user").value;
  if(!u)return alert("isi username");
  start(u);
 };
}
