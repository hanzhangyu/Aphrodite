import Shape from 'components/shape/Shape';
import {SQUARE_SIZE} from 'utils/config';

export default class Square extends Shape {
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
    ) {
        super(ctx);

        const endpointX = this.x + SQUARE_SIZE;
        const endpointY = this.y + SQUARE_SIZE;
        this.pointers.push([this.x, this.y]);
        this.pointers.push([endpointX, this.y]);
        this.pointers.push([endpointX, endpointY]);
        this.pointers.push([this.x, endpointY]);
    }



}
