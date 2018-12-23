import Base from 'components/Base';
import BaseTree from 'components/BaseTree';
import Snow from 'components/Snow';
import store from 'modules/store';
import {DATA_TYPE} from 'utils/consts';
import {random} from 'utils/helper';
import {
    SNOW_MAX_SPEED,
    SNOW_MIN_SPEED,
    SNOW_DENSITY,
    SNOW_MAX_SIZE,
    SNOW_MIX_SIZE,
    SNOW_MAX_OPACITY,
    SNOW_MIN_OPACITY,
    WIND_INTENSITY,
} from 'utils/config';

interface Actor {
    x: number;
    y: number;
}

export default class Background extends Base {
    private decorators: Array<BaseTree | Snow> = [];
    private isReady: boolean;
    private distance: number = 0;
    private densityAccumulation: number = 0;

    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    calculateSnow() {
        if (store.timestampSpan > 1000) return;
        this.densityAccumulation += SNOW_DENSITY * store.timestampSpan / 1000;
        if (this.densityAccumulation >= 1) {
            const newSnowNum = Math.floor(this.densityAccumulation);
            this.densityAccumulation = this.densityAccumulation % 1;
            // // TODO create snow.
            this.decorators = this.decorators.concat(new Array(newSnowNum).fill(undefined).map(() => new Snow(
                store.getNewId(),
                this.ctx,
                random(this.distance + this.width + 10, this.distance - 10),
                -this.height - 10,
                random(SNOW_MAX_SIZE, SNOW_MIX_SIZE),
                random(SNOW_MAX_SPEED, SNOW_MIN_SPEED),
                random(SNOW_MAX_OPACITY, SNOW_MIN_OPACITY),
            )));
        }
    }

    draw() {
        if (!this.isReady) {
            this.isReady = store.getState('game', store.getState('antherPlayerUsername'), 'exist');
            if (!this.isReady) {
                return;
            }
        }
        this.ctx.save();
        this.distance = store.getState('game', 'distance');
        this.ctx.translate(-this.distance, this.height);
        this.clear();
        this.decorators = this.decorators.filter(decorator => decorator.shouldAlive(this.distance));
        this.calculateSnow();
        // @ts-ignore
        if (!window.ddd) {
            // @ts-ignore
            window.ddd = this;
        }
        this.decorators.forEach(decorator => {
            decorator.draw();
        });
        this.ctx.restore();
    }

    drawLine() {

    }

    isCrash(component: Base): boolean {
        return false;
    }

    clear() {
        this.ctx.clearRect(this.distance, -this.height, this.width, this.height);
    };
}
