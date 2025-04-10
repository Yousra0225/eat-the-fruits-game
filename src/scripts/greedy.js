import GameObject from './gameObject';
import KeyManager from './keyManager';
import src from './assets/images/greedy.png'

export default class Greedy extends GameObject {
    static INITIAL_LIVES = 3;
    static SCORE_PER_FRUIT = 100;
    static STEP_SIZE = 5;

    /**
     * Constructeur de la class Greedy
     * @param canvas {HtmlCanvasElement} : le canvas dans lequel le greedy sera dessiner */
    constructor(canvas) {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        super(x, y, src);
        this.lives = Greedy.INITIAL_LIVES;
        this.score =0;
        //this.keyManager = new KeyManager();
    }

    loseLife() {
        this.lives--;
        if (this.lives <= 0) {
            console.log("Game over!");
        }else{
            this.removeLifeImage(); 
        }
    }

    removeLifeImage() {
        const lifeImages = document.querySelectorAll("#lifes img");
        lifeImages[lifeImages.length - this.lives].style.display = "none";
    }

    scoreGain(){
        this.score=this.score + Greedy.SCORE_PER_FRUIT;
        this.updateScore();
    }

    /**
     * Methode pour deplacer le greedy vers la gauche
     */
    moveLeft() {
        this.x = this.x - Greedy.STEP_SIZE;
    }
    /**
     * Methode pour deplacer le greedy vers la droite
     */
    moveRight() {
        this.x = this.x + Greedy.STEP_SIZE;
    }

    /**
     * Methode pour deplacer le greedy vers le haut
     */
    moveUp(){
        this.y-=Greedy.STEP_SIZE;
    }

    /**
     * Methode pour deplacer le greedy vers le bas
     */
    moveDown(){
        this.y+=Greedy.STEP_SIZE;
    }

    /**
     * Methode pour deplacer le greedy
     * @param {HtmlCanvasElement} canvas le canvas dans lequel le greedy sera deplacer 
     */
    move(canvas) {
        console.log("test passed");              // déplace sans sortir des limites de *box*
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x + Greedy.STEP_SIZE));
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y + Greedy.STEP_SIZE));
     }

     /**
      * Methode pour mettre à jour le score
      */
     updateScore(){
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
     }


}