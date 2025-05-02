import GameObject from "./gameObject";

export default class MobileObject extends GameObject{
    /**
     * Constructor of the Class
     * @param {number} x 
     * @param {number} y 
     * @param {number} speedX 
     * @param {number} speedY 
     */
    constructor(x,y,speedX, speedY){
        super(x,y);
        this.speedX = speedX;
        this.speedY = speedY;
    }

    /**
     * Method to move the object 
     */
    move(canvas){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x <= 0 || this.x + Ball.BALL_WIDTH >= canvas.width){
            this.deltaX = -this.deltaX;
        }
        if(this.y <= 0 || this.y + Ball.BALL_HEIGHT >= canvas.height){
            this.deltaY = -this.deltaY;
        }
    }
}