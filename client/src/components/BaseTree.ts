import Base from 'components/Base';
import store from 'modules/store';
import {getRad} from 'utils/helper';
import {
    TREE_MAX_BRANCH_DISTANCE,
    TREE_MAX_SPREAD_DEPTH,
    TREE_BRANCH_SPAN_DISTANCE,
    TREE_SPREAD_PROBABILITY,
} from 'utils/consts';

export default class BaseTree extends Base {
    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
        public readonly distance: number,
    ) {
        super(id);

    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.distance, this.height);
        this.ctx.lineWidth = 1 + (Math.random() * TREE_MAX_BRANCH_DISTANCE);
        this.ctx.lineJoin = 'round';

        this.drawBranch(0);
        this.ctx.restore();
    }

    drawBranch(depth: number) {
        if (depth < TREE_MAX_SPREAD_DEPTH) {
            // draw a branch span
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, -(this.height)/TREE_BRANCH_SPAN_DISTANCE);
            this.ctx.fillStyle = 'black';
            this.ctx.stroke();

            // move to the current branch endpoint
            this.ctx.translate(0,-this.height/TREE_BRANCH_SPAN_DISTANCE);

            // set a random rotate for next span
            this.ctx.rotate( (Math.random() - 0.5) * getRad(12));

            if (Math.random() < TREE_SPREAD_PROBABILITY) {
                // (14deg, 30deg)
                const rotateLeft = Math.random() * getRad(13) + getRad(17);
                const rotateRight = Math.random() * getRad(13) + getRad(17);

                // draw left branch
                const scale = Math.random() * 0.1 + 0.7;
                this.ctx.scale(scale, scale);
                this.ctx.save();
                this.ctx.rotate(-rotateLeft);
                this.drawBranch(depth + 1);
                this.ctx.restore();

                // draw right branch
                this.ctx.save();
                this.ctx.rotate(rotateRight);
                this.drawBranch(depth + 1);
                this.ctx.restore();
            } else {
                this.drawBranch(depth);
            }
        } else {
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(0, 0, 50, 50);
            this.ctx.stroke();
        }
    }

    shouldAlive() : boolean {
        return store.isOutOfScreen([[this.distance, 0]]);
    }
}
