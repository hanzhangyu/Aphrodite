import Base from 'components/Base';
import Triangle from 'components/shape/Triangle';
import Square from 'components/shape/Square';
import BaseTree from 'components/BaseTree';
import { DATA_TYPE } from 'utils/consts';

export default class Stage extends Base {
    private playerA: Triangle;
    private playerB: Square;
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
        this.playerA = new Triangle(2, ctx, 0, 0,);
        this.playerB = new Square(2, ctx, 0, 0,);
    }

    draw() {
        this.clear();
        this.drawFog();
        this.playerA.draw();
        // TODO clear the old tree and create the new tree
    }

    drawFog() {
        this.ctx.save();
        const gradient = this.ctx.createLinearGradient(0, this.height, 0, 0);
        gradient.addColorStop(0,"rgba(255,255,255,0.4)");
        gradient.addColorStop(1,"rgba(255,255,255,0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.restore();
    }

    drawLine() {

    }

    isCrash(component: Base) : boolean {
        return false;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
}
