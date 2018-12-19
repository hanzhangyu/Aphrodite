import Shape from 'components/shape/Shape';
import {SQUARE_SIZE} from 'utils/config';
import {VALID_USERNAME_LIST} from 'utils/consts';

export default class Square extends Shape {
    public readonly name: string = VALID_USERNAME_LIST[1];
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
    ) {
        super(ctx, x, y);

        const endpointX = this.x + SQUARE_SIZE;
        const endpointY = this.y + SQUARE_SIZE;
        this.pointers.push([this.x, this.y]);
        this.pointers.push([endpointX, this.y]);
        this.pointers.push([endpointX, endpointY]);
        this.pointers.push([this.x, endpointY]);
    }

}
