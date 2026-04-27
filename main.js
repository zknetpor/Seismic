
import { renderLogin } from "./components/Login.js";
import { startGame } from "./pages/Game.js";

export function setScreen(html){
 document.getElementById("app").innerHTML = html;
}

renderLogin(startGame);
