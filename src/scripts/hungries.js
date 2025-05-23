import GameObject from './gameObject';
import src from './assets/images/hungry.png'; 

export default class Hungries extends GameObject {
    constructor(canvas, fruits) {
        super(0, 0, src);
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.hungries = [];
        this.fruits = fruits;
        this.generateHungry();
        this.moveHungries();
    }

    generateHungry() {
        console.log("generate Hungry");
        const hungry = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            target: null,
            step: 1,
            fruitsEaten: 0
        };
        this.hungries.push(hungry);
    }

    /**
     * methode pour supprimer un hungry
     * @param {object} hungry 
     */
    removeHungryFromCanvas(hungry) {
        const index = this.hungries.indexOf(hungry);
        if (index > -1) {
            this.hungries.splice(index, 1);
        }
    }

    /**
     * Méthode pour détecter la collision entre deux objets
     * @param {Object} obj1 - Le premier objet
     * @param {Object} obj2 - Le deuxième objet
     * @returns {boolean} - True si une collision est détectée, sinon False
     */
    isCollision2(obj1, obj2) {
        const thisRect = {
            x: obj1.x,
            y: obj1.y,
            width: obj1.width,
            height: obj1.height
        };
    
        const otherRect = {
            x: obj2.x,
            y: obj2.y,
            width: obj2.width,
            height: obj2.height
        };
    
        return (
            thisRect.x < otherRect.x + otherRect.width &&
            thisRect.x + thisRect.width > otherRect.x &&
            thisRect.y < otherRect.y + otherRect.height &&
            thisRect.y + thisRect.height > otherRect.y
        );
    }

    /**
     * Methode pour détecter les fruits autour d'un hungry
     * @param {object} hungry - Le hungry à vérifier
     * @param {number} radius - Le rayon autour du hungry pour chercher des fruits
     * @returns {Array} - Liste des fruits dans le rayon
     */
    getNearbyFruits(hungry, radius) {
        let nearbyFruits = [];
        this.fruits.fruits.forEach(fruit => {
            const dx = fruit.x - hungry.x;
            const dy = fruit.y - hungry.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= radius) {
                nearbyFruits.push(fruit);
            }
        });
        return nearbyFruits;
    }

    /**
     * Méthode principale pour déplacer les 'Hungries' dans le jeu.
     * Les 'Hungries' vont chercher des fruits dans leur périmètre. 
     * Si des fruits sont trouvés, ils se dirigent vers l'un d'eux et l'avalent. 
     * Si aucun fruit n'est proche, ils se dirigent vers le personnage 'Greedy' pour le manger.
     * Lorsqu'un fruit est mangé, il est supprimé de l'écran et le compteur de fruits mangés de ce 'Hungry' est incrémenté.
     * Tous les 7 fruits mangés, un nouveau 'Hungry' est généré.
     * @method moveHungries
     * @param {void} 
     * @returns {void}
     */
    moveHungries() {
        const speed = 3;
        const proximityRadius = 100;

        this.hungries.forEach(hungry => {
            console.log("hungry:", hungry);
            let target = hungry.target;
            if (!target) {
                const nearbyFruits = this.getNearbyFruits(hungry, proximityRadius);
                if (nearbyFruits.length > 0) {
                    // Si des fruits sont trouvés, le 'Hungry' choisit un fruit au hasard
                    target = nearbyFruits[Math.floor(Math.random() * nearbyFruits.length)];                
                } else {
                    // Sinon, il attaque le personnage 'Greedy'
                    target = this.greedy; 
                }
            }
            if (!target) return;

            // Calcul de la direction à prendre pour se déplacer vers la cible
            const dx = target.x - hungry.x;
            const dy = target.y - hungry.y;
            console.log("dx:", dx, "dy:", dy);

            // calcule de distances
            const distance = Math.sqrt(dx * dx + dy * dy);
            const velX = (dx / distance) * speed;
            const velY = (dy / distance) * speed;
            console.log("velX:", velX, "velY:", velY);
    
            hungry.x += velX;
            hungry.y += velY;
    
            // Vérification de la collision avec le fruit
            if (this.isCollision2(hungry, target)) {
                console.log("Collision detected!");

                if (target === this.greedy) {
                    this.greedy.loseLife();
                } else {
                    console.log("Fruit eaten!");

                    this.fruits.removeFruitFromCanvas(target);
                    hungry.fruitsEaten++;
                     console.log("hungry.fruitsEaten:", hungry.fruitsEaten);
                    if (hungry.fruitsEaten % 7 === 0) {
                        this.generateHungry();
                    }
                }
                // Réinitialisation de la cible du hungry
                hungry.target = null;
            }

            // Vérification des bords de l'écran
            if (hungry.x <= 0 || hungry.x >= this.canvas.width) {
                hungry.x -= velX;
            }
            if (hungry.y <= 0 || hungry.y >= this.canvas.height) {
                hungry.y -= velY;
            }
        });
    }     

    targetExists(target) {
        return target && target.x !== undefined && target.y !== undefined;
    }

    draw(context) {
        this.hungries.forEach(hungry => {
            context.drawImage(this.image, hungry.x, hungry.y);
        });
    }
}