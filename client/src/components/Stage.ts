import Base from 'components/Base';
import BaseTree from 'components/BaseTree';
import { DATA_TYPE } from 'utils/consts';

interface Actor {
    x: number;
    y: number;
}

export default class Stage extends Base {
    private trees: Array<BaseTree>;
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    draw() {
        this.drawFog();
        this.trees.forEach(tree => {
            tree.draw();
        });
        // TODO clear the old tree and create the new tree
    }

    drawFog() {
        const gradient = this.ctx.createLinearGradient(0, this.height, 0, 0);
        gradient.addColorStop(0,"rgba(255,255,255,0.4)");
        gradient.addColorStop(1,"rgba(255,255,255,0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawLine() {

    }

    isCrash(component: Base) : boolean {
        return false;
    }
}
