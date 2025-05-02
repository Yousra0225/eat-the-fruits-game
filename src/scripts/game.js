import Greedy from './greedy';
import Fruits from './fruits';
import Hungries from './hungries';
import KeyManager from './keyManager';


export default class Game {
    /**
     * Constructeur de la classe Game
     * @param {HTMLCanvasElement} canvas : le canvas dans lequel le jeu sera afficher
     */
    constructor(canvas) {

        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.greedy = new Greedy(canvas);
        this.fruits = new Fruits(canvas,this.greedy);
        this.hungries = new Hungries(canvas,this.fruits);
        this.animationFrame = null;
        this.animationRunning = false;
        // gestionnaire de touches
        this.keyManager = new KeyManager();
    }

    /**
     * Methode pour initialiser le canvas et dessiner tout les éléments du jeu
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fruits.draw(this.context);
        this.greedy.draw(this.context);
        console.log("dessin");
        this.hungries.draw(this.context); 
        
    }

    /**
     * Methode pour lancer l'animation du jeu 
     */
    animate() {
        const animateGreedy = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.handleKeyActions();
            this.hungries.moveHungries();
            this.draw();
            this.checkCollisions();
            
            this.animationFrame = window.requestAnimationFrame(animateGreedy);
        };

        if (this.animationRunning) {
            window.cancelAnimationFrame(this.animationFrame);
            this.animationRunning = false;
        } else {
            animateGreedy();
            this.animationRunning = true;
        }
    }

    checkCollisions() {
        //greedy / fruits
        this.fruits.fruits.forEach(fruit => {
            if (this.greedy.isCollision(fruit)) {
                this.greedy.scoreGain(); 
                this.fruits.removeFruitFromCanvas(fruit);
            }
        });
    
        // hungries / fruits 
        /*this.hungries.hungries.forEach(hungry => {
            this.fruits.fruits.forEach(fruit => {
                if (hungry.isCollision(fruit)) {
                    this.fruits.removeFruitFromCanvas(fruit);
                    hungry.fruitsEaten++;
                }
            });
        });*/

        // greedy / hungry
        this.hungries.hungries.forEach(hungry => {
            if (this.greedy.isCollision(hungry)) {
                this.greedy.loseLife();
                this.hungries.removeHungryFromCanvas(hungry); 
            }
        });
    }

    isCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }

    startAndStop() {
        const animateGame = () => {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.draw();
          this.checkCollisions();

          this.animationFrame = window.requestAnimationFrame(animateGame);
        };
      
        if (this.animationRunning) {
          window.cancelAnimationFrame(this.animationFrame);
          this.animationRunning = false;
        } else {
          animateGame();
          this.animationRunning = true;
        }
      }
    

    /**
     * Gère l'évenement lorque une touche est pressée
     * @param {KeyboardEvent} event 
     */
    handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            this.keyManager.upPressed(); 
            break;
        case 'ArrowDown':
            this.keyManager.downPressed(); 
            break;
        case 'ArrowLeft':
            this.keyManager.leftPressed(); 
            break;
        case 'ArrowRight':
            this.keyManager.rightPressed();
            break;
        default:
            break; 
        }
    }

    /**
     * Methode pour gérer l'evenement lorsque la touche est relachée 
     * @param {KeyboardEvent} event evenement de pression 
     * @returns 
     */
    handleKeyUp(event) {
        switch (event.key) {
            case "ArrowLeft":
                this.keyManager.leftReleased();
                break;
            case "ArrowRight":
                this.keyManager.rightReleased();
                break;
            case "ArrowUp":
                this.keyManager.upReleased();
                break;
            case "ArrowDown":
                this.keyManager.downReleased();
                break;
            default:
                return;
        }
    }

    /**
     * Methode pour gérer les action à appliquer lorsque une touche est pressée,
     *  et donc deplacer le greedy dans le sens correspondant 
     */
    handleKeyActions() {
        if (this.keyManager.left) {
            this.greedy.moveLeft();
        }
        if (this.keyManager.right) {
            this.greedy.moveRight();
        }
        if (this.keyManager.up) {
            this.greedy.moveUp();
        }
        if (this.keyManager.down) {
            this.greedy.moveDown();
        }
    }
   
}