import Base from 'components/Base';
import BaseTree from 'components/BaseTree';
import FirTree from 'components/FirTree';
import Snow from 'components/Snow';
import House from 'components/House';
import Dragon from 'components/shape/Dragon';
import store from 'modules/store';
import {VALID_USERNAME_LIST, LYRICS} from 'utils/consts';
import {random, randomInt, delay, fixLimitInterval} from 'utils/helper';
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
    private house: House;
    private dragon: Dragon;
    private isReady: boolean;
    private distance: number = 0;
    private snowDensityAccumulation: number = 0;
    private treeDensityAccumulation: number = 0;
    private treeDensityInterval: number = random(3, 0.7);
    private treeMaxFarDistance: number; // FIXME
    private houseAppearDistance: number; // FIXME
    private introDistanceEnd: boolean = false;

    // end
    private endSceneStarted: boolean = false;
    private compensationOffest: number = 0;
    private curOffset: number = 0;
    private speedK: boolean = false;
    private endStartTs: number;

    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
        this.treeMaxFarDistance = store.totalDistance - 300;

        this.houseAppearDistance = store.totalDistance - this.width;
        this.house = new House(store.getNewId(), ctx, store.totalDistance + 350);
        this.dragon = new Dragon(ctx, 0, -220);
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
        this.distance = store.getState('game', 'distance');
        if (!this.isReady) {
            this.isReady = store.getState('game', store.getState('antherPlayerUsername'), 'exist');
            if (!this.isReady) {
                return;
            } else {
                store.getState('antherPlayerUsername') === VALID_USERNAME_LIST[0] && store.playBgm(); // FIXME remove condition
            }
        }
        this.ctx.save();
        this.ctx.translate(-this.distance, this.height);
        this.clear();
        this.dragon.draw();
        this.decorators = this.decorators.filter(decorator => decorator.shouldAlive(this.distance));
        this.calculateSnow();
        if (this.distance < this.treeMaxFarDistance || this.endSceneStarted) {
            this.calculateTree();
        }
        if (this.distance > this.houseAppearDistance) {
            this.house.draw();
        }
        if (this.distance >= store.totalDistance) {
            this.introDistanceEnd || this.riskGem();
        }
        // @ts-ignore
        if (!window.ddd) {
            // @ts-ignore
            window.ddd = this;
        }
        this.decorators.forEach(decorator => {
            decorator.draw();
        });
        if (this.endSceneStarted) {
            this.updateSpeed();
            this.drawLyric();
        }
        this.ctx.restore();
    }

    // fixme risk gem should control by store not the background and the house
    async riskGem() {
        this.introDistanceEnd = true;
        await delay(3000);
        this.house.riskGem();
        this.dragon.start();
        // await delay(2000);
        this.house.hiddenGem();
        // store.setState('Our gemstone was stolen by this dragon', 'game', VALID_USERNAME_LIST[0], 'talk');
        // await delay(2000);
        // store.setState('Go after it! it is running away', 'game', VALID_USERNAME_LIST[0], 'talk');
        // await delay(1000);
        // store.setState('Ok, let`s go', 'game', VALID_USERNAME_LIST[1], 'talk');
        // await delay(1000);
        // store.setState('', 'game', VALID_USERNAME_LIST[0], 'talk');
        // await delay(1000);
        // store.setState('', 'game', VALID_USERNAME_LIST[1], 'talk');
        store.lockControl();
        store.bgm.pause();
        this.startEndScene();
    }

    startEndScene() {
        this.endSceneStarted = true;
        store.endBgm.play();
        this.endStartTs = store.timestamp + 2000;
    }

    updateSpeed() {
        const level = store.endBgm.getLevel();
        let speed = level - 30;
        const avgSpeed = fixLimitInterval(50, 5, speed) / 5;
        store.speed[VALID_USERNAME_LIST[0]] = avgSpeed;
        if (this.compensationOffest <= -100){
            this.speedK = true;
        } else if (this.compensationOffest >= 0) {
            this.speedK = false;
        }
        if (this.speedK) {
            this.curOffset = random(2, 0);
        } else {
            this.curOffset = random(0, -2);
        }
        this.compensationOffest += this.curOffset;
        store.speed[VALID_USERNAME_LIST[1]] = avgSpeed + this.curOffset;
        store.speed.dragon = avgSpeed + 0.1;
    }

    isCrash(component: Base): boolean {
        return false;
    }

    clear() {
        this.ctx.clearRect(this.distance, -this.height, this.width, this.height);
    };

    drawLyric() {
        const curTsSpan = store.timestamp - this.endStartTs;
        const curLyric = LYRICS.find(lyric => lyric.ts >= curTsSpan);
        console.log(curTsSpan);
        this.ctx.fillStyle = '#6061ff';
        this.ctx.font='15px Microsoft YaHei';
        this.ctx.textAlign='right';
        this.ctx.fillText(curLyric.lyc, this.distance + this.width, -20);
    }
}
