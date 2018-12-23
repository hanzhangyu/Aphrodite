/**
 * @file Fire Tree like the christmas tree
 */
import Base from 'components/Base';
import store from 'modules/store';
import {
    FIR_TREE_GROW_UP_SPEED,
} from 'utils/config';

export default class FirTree extends Base{
    private currentGrowUpLength: number = 0;
    private scale: number = 1;

    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public depth: number,
        public branchHeight: number,
        public branchWidth: number,
        public leafHeight: number,
        public leafWidth: number,
        public decrementRate: number,
    ) {
        super(id);
    }

    draw() {
        this.scale = 1;
        this.currentGrowUpLength += FIR_TREE_GROW_UP_SPEED * store.timestampSpan / 1000;
        this.ctx.save();
        this.ctx.fillStyle='rgba(255,255,255,0.95)';
        this.ctx.translate(this.x, 0);
        this.ctx.fillRect(0, -this.branchHeight, this.branchWidth, 100);
        this.ctx.translate(this.branchWidth/2, 0);
        this.drawLeaf(0, this.branchHeight * 2, this.branchHeight);
        this.ctx.restore();
    }
    drawLeaf(depth: number, lastHeight: number, totalHeight: number) {
        if (depth < this.depth) {
            const overflowLength = totalHeight - this.currentGrowUpLength;
            const halfWidth = this.leafWidth / 2;
            const leafStartPosition = lastHeight * 0.5;
            this.ctx.translate(0, -leafStartPosition);
            if (overflowLength > 0) {
                this.ctx.scale(1, 1 - (overflowLength / leafStartPosition));
            }
            this.ctx.scale(this.decrementRate,this.decrementRate);
            this.scale = this.scale * this.decrementRate;
            this.ctx.beginPath();
            this.ctx.moveTo(-halfWidth, 0);
            this.ctx.lineTo(halfWidth, 0);
            this.ctx.lineTo(0, -this.leafHeight);
            this.ctx.lineTo(-halfWidth, 0);
            this.ctx.fill();
            if (overflowLength <= 0) {
                this.drawLeaf(depth + 1, this.leafHeight, totalHeight + leafStartPosition * this.scale);
            }
        }
    }

    shouldAlive(distance: number) : boolean {
        return this.x >= distance - 200;
    }
}
