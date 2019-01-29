import Shape from 'components/shape/Shape';
import {SQUARE_SIZE, TRIANGLE_SIZE} from 'utils/config';
import {VALID_USERNAME_LIST} from "../../utils/consts";

export default class Triangle extends Shape {
    public readonly username: string = VALID_USERNAME_LIST[0];
    public readonly color: string = '#3daaff';
    public readonly talkPositionOffset: number = 40;
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
    ) {
        super(ctx, x, y);

        this.height = TRIANGLE_SIZE / 2;
        this.width = SQUARE_SIZE;
        this.calculatePointers();
    }

    calculatePointers() {
        this.pointers[0] = ([this.x, this.y]);
        this.pointers[1] = ([this.x + this.width, this.y]);
        this.pointers[2] = ([this.x + this.width / 2, this.y - this.height]);
    }



}
