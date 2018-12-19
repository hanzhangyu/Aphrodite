import Base from 'components/Base';
import Triangle from 'components/shape/Triangle';
import Square from 'components/shape/Square';
import store from 'modules/store';
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

    createAllPlayer(username: string) {
        const triangle = new Triangle(store.getNewId(), this.ctx, 0, 0);
        const square = new Square(store.getNewId(), this.ctx, 0, 0);
        if (triangle.name === username) {
            this.playerA = triangle;
            this.playerB = square;
        } else {
            this.playerA = square;
            this.playerB = triangle;
        }
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
