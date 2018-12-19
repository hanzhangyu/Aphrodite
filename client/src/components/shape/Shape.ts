import {PLAYER_JUMP_INIT_SPEED, PLAYER_SPEED, GRAVITATIONAL_ACCELERATION} from "../../utils/config";

export default class Shape {
    protected pointers: Array<[number, number]> = [];
    public jumping: boolean = false;
    public vectorY: number = 0;

    constructor(
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
        this.vectorY = this.vectorY - GRAVITATIONAL_ACCELERATION * tsSpan;
        this.y += (Math.pow(lastVectorY, 2) - Math.pow(this.vectorY, 2)) / (2 * GRAVITATIONAL_ACCELERATION);
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
