import Base from 'components/Base';
import store from 'modules/store';
import {
    WIND_INTENSITY,
} from 'utils/config';

export default class Snow extends Base {
    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public size: number,
        public speed: number,
        public opacity: number,
    ) {
        super(id);

    }

    draw() {
        this.move();
        this.ctx.save();
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }

    move() {
        const time = store.timestampSpan / 1000;
        this.x += WIND_INTENSITY * time;
        this.y += this.speed * time;
    }

    shouldAlive(distance: number) : boolean {
        return this.x >= distance - 10;
    }
}
