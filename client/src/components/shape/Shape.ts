import {PLAYER_JUMP_INIT_SPEED, PLAYER_SPEED} from "utils/config";
import {GRAVITATIONAL_ACCELERATION} from "utils/consts";

export default abstract class Shape {
    protected pointers: Array<[number, number]> = [];
    public jumping: boolean = false;
    public vectorY: number = 0;
    public height: number = 0;
    public width: number = 0;

    protected constructor(
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
    ) {
    }

    move(direction?: 1 | -1) {
        this.x += direction * PLAYER_SPEED;
    }

    jump() {
        if (this.jumping) return;
        this.jumping = true;
        this.vectorY = PLAYER_JUMP_INIT_SPEED;
    }

    calculateJump(tsSpan: number) {
        const lastVectorY = this.vectorY;
        const newVectorY = this.vectorY - GRAVITATIONAL_ACCELERATION * tsSpan;
        const newY =  this.y -((Math.pow(lastVectorY, 2) - Math.pow(this.vectorY, 2)) / (2 * GRAVITATIONAL_ACCELERATION));
        // TODO check
        // const pointer = [a, b];
        // if (isCrash) {
        //     if (this.vectorY > 0) {
        //         this.y = b;
        //     } else {
        //         this.y = b + this.height;
        //     }
        // }
        this.vectorY = newVectorY;
        this.y = newY;
    }

    abstract calculatePointers(): void;

    checkCrash() {

    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.moveTo(...this.pointers[0]);
        for (let i = 1; i < this.pointers.length; i++) {
            this.ctx.lineTo(...this.pointers[i]);
        }
        this.ctx.lineTo(...this.pointers[0]);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawLine() {

    }

    // isCrash(bg: Background) : boolean {
    //     return bg.isCrash(this);
    // }

    // move(variationX : number = 0, variationY : number = 0) {
    //     this.pointers.forEach((pointer : [number, number]) => {
    //         pointer[0] += variationX;
    //         pointer[1] += variationY;
    //     })
    // }
}
