
export default class GameObject {
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src= imageSrc;
    }
 
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    isCollision(otherObject) {
        if (!otherObject || !otherObject.image) {
            return false;
        }
        const thisRect = {
            x: this.x,
            y: this.y,
            width: this.image.width,
            height: this.image.height
        };

        const otherRect = {
            x: otherObject.x,
            y: otherObject.y,
            width: otherObject.image.width,
            height: otherObject.image.height
        };

        return (
            thisRect.x < otherRect.x + otherRect.width &&
            thisRect.x + thisRect.width > otherRect.x &&
            thisRect.y < otherRect.y + otherRect.height &&
            thisRect.y + thisRect.height > otherRect.y
        );
    }
    
}
 