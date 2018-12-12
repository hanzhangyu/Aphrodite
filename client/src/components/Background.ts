import Base from 'components/Base';

interface Actor {
    x: number;
    y: number;
}

export default class Background extends Base {
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

    isCrash(component: Base) : Boolean {
        return false;
    }
}