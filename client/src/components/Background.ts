import Base from 'components/Base';
import BaseTree from 'components/BaseTree';
import store from 'modules/store';
import { DATA_TYPE } from 'utils/consts';

interface Actor {
    x: number;
    y: number;
}

export default class Background extends Base {
    private trees: Array<BaseTree> = [];
    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    draw() {
        this.clear();
        this.trees.forEach(tree => {
            tree.draw();
        });
        // TODO clear the old tree and create the new tree
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
