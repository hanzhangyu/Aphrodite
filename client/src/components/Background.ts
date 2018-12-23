import Base from 'components/Base';
import BaseTree from 'components/BaseTree';
import FirTree from 'components/FirTree';
import Snow from 'components/Snow';
import store from 'modules/store';
import {DATA_TYPE} from 'utils/consts';
import {random, randomInt} from 'utils/helper';
import {
    SNOW_MAX_SPEED,
    SNOW_MIN_SPEED,
    SNOW_DENSITY,
    SNOW_MAX_SIZE,
    SNOW_MIX_SIZE,
    SNOW_MAX_OPACITY,
    SNOW_MIN_OPACITY,
    FIR_TREE_DENSITY,
    FIR_TREE_DENSITY_UNIT,
    FIR_TREE_MAX_DEPTH,
    FIR_TREE_MIN_DEPTH,
    FIR_TREE_BRANCH_MAX_HEIGHT,
    FIR_TREE_BRANCH_MIN_HEIGHT,
    FIR_TREE_LEAF_MAX_WIDTH,
    FIR_TREE_LEAF_MIN_WIDTH,
    FIR_TREE_LEAF_MAX_HEIGHT,
    FIR_TREE_LEAF_MIN_HEIGHT,
    FIR_TREE_LEAF_DECREMENT_MAX_RATE,
    FIR_TREE_LEAF_DECREMENT_MIN_RATE,
} from 'utils/config';

interface Actor {
    x: number;
    y: number;
}

export default class Background extends Base {
    private decorators: Array<BaseTree | Snow | FirTree> = [];
    private isReady: boolean;
    private distance: number = 0;
    private snowDensityAccumulation: number = 0;
    private treeDensityAccumulation: number = 0;
    private treeDensityInterval: number = random(3, 0.7);

    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    calculateSnow() {
        if (store.timestampSpan > 1000) return;
        this.snowDensityAccumulation += SNOW_DENSITY * store.timestampSpan / 1000;
        if (this.snowDensityAccumulation >= 1) {
            const newSnowNum = Math.floor(this.snowDensityAccumulation);
            this.snowDensityAccumulation = this.snowDensityAccumulation % 1;
            this.decorators = this.decorators.concat(new Array(newSnowNum).fill(undefined).map(() => new Snow(
                store.getNewId(),
                this.ctx,
                random(this.distance + this.width * 2, this.distance - 10),
                -this.height - 10,
                random(SNOW_MAX_SIZE, SNOW_MIX_SIZE),
                random(SNOW_MAX_SPEED, SNOW_MIN_SPEED),
                random(SNOW_MAX_OPACITY, SNOW_MIN_OPACITY),
            )));
        }
    }

    calculateTree() {
        if (this.distance === 0) return;
        const movementSpan = store.getState('game', 'cameraIncrementDistance');
        console.log((FIR_TREE_DENSITY * movementSpan / FIR_TREE_DENSITY_UNIT) * this.treeDensityInterval);
        this.treeDensityAccumulation += (FIR_TREE_DENSITY * movementSpan / FIR_TREE_DENSITY_UNIT) * this.treeDensityInterval;
        if (this.treeDensityAccumulation >= 1) {
            const newTreeNum = Math.floor(this.treeDensityAccumulation);
            this.treeDensityAccumulation = this.treeDensityAccumulation % 1;
            this.treeDensityInterval = random(3, 0.7);
            this.decorators = this.decorators.concat(new Array(newTreeNum).fill(undefined).map(() => {
                const leafWidth = random(FIR_TREE_LEAF_MAX_WIDTH, FIR_TREE_LEAF_MIN_WIDTH);
                return new FirTree(
                    store.getNewId(),
                    this.ctx,
                    this.distance + this.width,
                    randomInt(FIR_TREE_MAX_DEPTH, FIR_TREE_MIN_DEPTH),
                    random(FIR_TREE_BRANCH_MAX_HEIGHT, FIR_TREE_BRANCH_MIN_HEIGHT),
                    leafWidth / 9,
                    random(FIR_TREE_LEAF_MAX_HEIGHT, FIR_TREE_LEAF_MIN_HEIGHT),
                    leafWidth,
                    random(FIR_TREE_LEAF_DECREMENT_MAX_RATE, FIR_TREE_LEAF_DECREMENT_MIN_RATE),
                );
            }));
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
        this.calculateTree();
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
