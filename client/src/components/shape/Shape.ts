import {
    PLAYER_JUMP_INIT_SPEED,
    PLAYER_MOVE_INIT_SPEED,
    GRAVITATIONAL_ACCELERATION,
    RESISTANCE_ACCELERATION
} from "utils/config";
import {checkOverload, fixLimitInterval} from "utils/helper";
import store from "modules/store";

const fixLimitIntervalSpeed = fixLimitInterval.bind(null, PLAYER_MOVE_INIT_SPEED, -PLAYER_MOVE_INIT_SPEED);

export default abstract class Shape {
    abstract username: string;
    abstract readonly color: string;
    protected pointers: Array<[number, number]> = [];
    protected totalMoveTs: number = 0; // the left of moving time
    protected movedTs: number = 0;
    public jumping: boolean = false;
    protected speedX: number = 0;
    protected speedY: number = 0;
    protected moveDirection: 1 | -1 = 1;
    public height: number = 0;
    public width: number = 0;
    public isReady: boolean = false;
    public isA: boolean = false;

    protected constructor(
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
    ) {
    }

    move(direction?: 1 | -1) {
        // if (this.jumping) return;
        this.moveDirection = direction;
        this.speedX = fixLimitIntervalSpeed(this.speedX + direction * PLAYER_MOVE_INIT_SPEED);
        this.totalMoveTs = direction * this.speedX / RESISTANCE_ACCELERATION;
        this.movedTs = 0;
        // this.x += direction * PLAYER_SPEED;
    }

    jump() {
        if (this.jumping) return;
        this.jumping = true;
        this.speedY = PLAYER_JUMP_INIT_SPEED;
    }

    calculatePosition() {
        // if (!this.isA) {
        //     const {x, y} = store.getState('game', this.username);
        //     this.x = x;
        //     this.y = y;
        //     this.calculatePointers();
        //     return;
        // }
        const tsSpan = store.timestampSpan / 1000;
        if (this.totalMoveTs) {
            this.movedTs += tsSpan;
        }
        const lastSpeedY = this.speedY;
        let newSpeedY = 0;
        if (this.y < 0 || this.speedY >= 0 ) {
            newSpeedY = this.speedY - GRAVITATIONAL_ACCELERATION * tsSpan;
        }
        const newY = this.y - ((Math.pow(lastSpeedY, 2) - Math.pow(newSpeedY, 2)) / (2 * GRAVITATIONAL_ACCELERATION));
        let lastSpeedX = this.speedX;
        // FIXME
        let newSpeedX;
        let newX;
        if (store.controlLocked) {
            newSpeedX = store.speed[this.username];
            newX = this.x + newSpeedX;
        } else {
            // the ACCELERATION should zero when stopped
            if (this.totalMoveTs <= this.movedTs) {
                newSpeedX = 0;
            } else {
                newSpeedX = this.speedX - this.moveDirection * RESISTANCE_ACCELERATION * tsSpan;
            }
            newX = this.x + this.moveDirection * ((Math.pow(lastSpeedX, 2) - Math.pow(newSpeedX, 2)) / (2 * RESISTANCE_ACCELERATION));
        }

        const [x, y, speedX, speedY] = this.checkCrash(newX, newY, newSpeedX, newSpeedY);
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        if (this.y === 0) {
            this.jumping = false;
        }
        this.calculatePointers();
    }

    abstract calculatePointers(): void;

    // FIXME
    checkCrash(x: number, y: number, speedX: number, speedY: number) {
        const distance = store.getState('game', 'distance');
        const newX = fixLimitInterval(distance + window.innerWidth - this.width, distance, x);
        const newY = fixLimitInterval(0, -innerHeight, y);
        let newSpeedX = speedX;
        let newSpeedY = speedY;
        if (newX !== x) {
            newSpeedX = 0;
            this.totalMoveTs = 0;
        }
        newY !== y && (newSpeedY = 0);
        return [newX, newY, newSpeedX, newSpeedY]
    }

    draw() {
        this.calculatePosition();
        this.ctx.save();
        const {talk} = store.getState('game', this.username);
        this.ctx.fillStyle = this.color;
        if (talk) {
            this.ctx.font='15px Microsoft YaHei';
            this.ctx.textAlign='center';
            this.ctx.fillText(talk,this.x + this.width / 2,this.y - 40);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(...this.pointers[0]);
        for (let i = 1; i < this.pointers.length; i++) {
            this.ctx.lineTo(...this.pointers[i]);
        }
        this.ctx.lineTo(...this.pointers[0]);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawLine() {

    }

    // isCrash(bg: Background) : boolean {
    //     return bg.isCrash(this);
    // }

    // move(variationX : number = 0, variationY : number = 0) {
    //     this.pointers.forEach((pointer : [number, number]) => {
    //         pointer[0] += variationX;
    //         pointer[1] += variationY;
    //     })
    // }
}
