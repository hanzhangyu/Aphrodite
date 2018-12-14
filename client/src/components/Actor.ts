import Base from 'components/Base';

export default abstract class Tree extends Base {
    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
        public readonly distance: number,
    ) {
        super(id);

    }

    draw() {
    }

    drawBranch(depth: number) {
    }

    shouldAlive() : boolean {
        return true;
    }
}
