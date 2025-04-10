import GameObject from './gameObject';
import ananas   from './assets/images/ananas.png';
import pomme from './assets/images/pomme.png';
import citron from  './assets/images/citron.png';


export default class Fruits extends GameObject {
    constructor(canvas,greedy){
        super(0, 0, ''); 
        this.canvas =canvas ;
        this.context = canvas.getContext("2d");
        this.images=[ananas,pomme,citron];
        this.fruits = [];
        this.greedy = greedy;
        this.generateFruits();
    }

    /**
     * Méthode pour générer des fruits à intervalles réguliers
     */
    generateFruits() {
        setInterval(() => {
            this.aleaImage();
        }, 1000);
    }

    aleaImage() {
        console.log("aleaImage appeler");
        const randomIndex = Math.floor(Math.random() * this.images.length);
        const fruit = {
            x : Math.random() * this.canvas.width,
            y :  Math.random() * this.canvas.height,
            image : new Image(),
            time : Date.now()
        };
        fruit.image.src=this.images[randomIndex];
        this.fruits.push(fruit);
    }

    removeExpiredFruits() {
        const currentTime = Date.now();
        this.fruits = this.fruits.filter(fruit => {
            return currentTime - fruit.time < 8000;
        });
    }

    removeFruitFromCanvas(fruit) {
        const index = this.fruits.indexOf(fruit);
        if (index > -1) {
            this.fruits.splice(index, 1);
        }
    }


    draw(context) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.removeExpiredFruits();
        this.fruits.forEach(fruit =>{
            this.context.drawImage(fruit.image, fruit.x, fruit.y);
        });
    }
}