import Shape from 'components/shape/Shape';
import {SQUARE_SIZE, TRIANGLE_SIZE} from 'utils/config';
import {VALID_USERNAME_LIST} from "../../utils/consts";

export default class Triangle extends Shape {
    public readonly name: string = VALID_USERNAME_LIST[0];
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
    ) {
        super(ctx, x, y);

        this.height = TRIANGLE_SIZE / 2;
        this.width = SQUARE_SIZE;
    }

    calculatePointers() {
        this.pointers.push([this.x, this.y]);
        this.pointers.push([this.x + this.width, this.y]);
        this.pointers.push([this.x, this.y - this.height]);
    }



}
