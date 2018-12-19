import Shape from 'components/shape/Shape';
import {TRIANGLE_SIZE} from 'utils/config';
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

        this.pointers.push([this.x, this.y]);
        this.pointers.push([this.x + TRIANGLE_SIZE, this.y]);
        this.pointers.push([this.x, this.y + TRIANGLE_SIZE / 2]);
    }



}
