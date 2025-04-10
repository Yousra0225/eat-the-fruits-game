import Game from './game.js';
import Greedy from './greedy.js';
import Fruits from './fruits.js';
import Hungries  from './hungries.js';
const init = () => {
    const canvas = document.getElementById("playfield");
    const game = new Game(canvas);

    document.getElementById("stopAndStartGame").addEventListener("click", () => game.animate());

    document.addEventListener('keydown', game.handleKeyDown.bind(game));
    document.addEventListener('keyup', game.handleKeyUp.bind(game));

}

window.addEventListener("load", init);

console.log('Le bundle a été généré');