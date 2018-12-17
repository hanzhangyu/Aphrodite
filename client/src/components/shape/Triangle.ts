import Shape from 'components/shape/Shape';
import {TRIANGLE_SIZE} from 'utils/config';

export default class Triangle extends Shape {
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
    ) {
        super(ctx);

        this.pointers.push([this.x, this.y]);
        this.pointers.push([this.x + TRIANGLE_SIZE, this.y]);
        this.pointers.push([this.x, this.y + TRIANGLE_SIZE / 2]);
    }



}
