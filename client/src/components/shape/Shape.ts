export default class Shape {
    private pointers: Array<[number, number]>

    constructor(
        public ctx: CanvasRenderingContext2D,
    ) {
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(...this.pointers[0]);
        for (let i = 1; i < this.pointers.length; i++) {
            this.ctx.lineTo(...this.pointers[i]);
        }
        this.ctx.lineTo(...this.pointers[0]);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawLine() {
        
    }

    // isCrash(bg: Background) : Boolean {
    //     return bg.isCrash(this);
    // }

    move(variationX : number = 0, variationY : number = 0) {
        this.pointers.forEach((pointer : [number, number]) => {
            pointer[0] += variationX;
            pointer[1] += variationY;
        })
    }
}