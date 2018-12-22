import Shape from 'components/shape/Shape';
import {SQUARE_SIZE} from 'utils/config';
import {VALID_USERNAME_LIST} from 'utils/consts';

export default class Square extends Shape {
    static readonly username: string = VALID_USERNAME_LIST[1];
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
    ) {
        super(ctx, x, y);

        this.height = SQUARE_SIZE;
        this.width = SQUARE_SIZE;
        this.calculatePointers();
    }

    calculatePointers() {
        const endpointX = this.x + this.width;
        const endpointY = this.y - this.height;
        this.pointers[0] = ([this.x, this.y]);
        this.pointers[1] = ([endpointX, this.y]);
        this.pointers[2] = ([endpointX, endpointY]);
        this.pointers[3] = ([this.x, endpointY]);
    }

}
