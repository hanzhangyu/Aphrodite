import Base from 'components/Base';
import Background from 'components/Background';

export default class Character extends Base {
    private x: number = 0;
    private y: number = 0;
    private pointers: Array<[number, number]>

    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    draw() {

    }

    drawLine() {
        
    }

    isCrash(bg: Background) : Boolean {
        return bg.isCrash(this);
    }

    move(variationX : number = 0, variationY : number = 0) {
        this.x += variationX;
        this.y += variationY;
        this.pointers.forEach((pointer : [number, number]) => {
            pointer[0] += variationX;
            pointer[1] += variationY;
        })
    }
}