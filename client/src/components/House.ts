import Base from 'components/Base';

import {fixLimitIntervalReverseLoop} from 'utils/helper';

const fixLimitIntervalReverseLoopOpacity = fixLimitIntervalReverseLoop.bind(null, 0.9, 0.3);

// const HOUSE_X = 200;
const HOUSE_WIDTH = 250;
const HOUSE_HEIGHT_BASE = 130;
const HOUSE_HEIGHT_RIDGE = 90;
const HOUSE_RIDGE_WIDTH = 10;
const HOUSE_RIDGE_SNOW_WIDTH = 10;
const circleRadius = 24;
const doorWidth = 54;
const doorHeight = 80;
const windowWidth = 60;
const windowHeight = 70;
const windowOffsetRelativeToDoor = 20;
const windowOffsetRelativeToGround = 30;

// TODO cache the constants image data

export default class House extends Base {
    constructor(
        id: number,
        public ctx: CanvasRenderingContext2D,
        public readonly distance: number,
        public opacity: number = 0,
    ) {
        super(id);

    }

    draw() {
        const HOUSE_X = this.distance;
        this.opacity += 0.002;

        this.ctx.save();
        const k = HOUSE_HEIGHT_BASE / (HOUSE_WIDTH / 2);
        const houseCenter = HOUSE_X + HOUSE_WIDTH / 2;

        // house base
        this.ctx.fillStyle = '#271B0F';
        this.ctx.beginPath();
        this.ctx.moveTo(HOUSE_X, 0);
        this.ctx.lineTo(HOUSE_X + HOUSE_WIDTH, 0);
        this.ctx.lineTo(HOUSE_X + HOUSE_WIDTH, -HOUSE_HEIGHT_BASE);
        this.ctx.lineTo(houseCenter, -HOUSE_HEIGHT_RIDGE - HOUSE_HEIGHT_BASE);
        this.ctx.lineTo(HOUSE_X, -HOUSE_HEIGHT_BASE);
        this.ctx.lineTo(HOUSE_X, 0);
        this.ctx.fill();

        // ridge line
        this.ctx.strokeStyle = '#3A3D28';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(HOUSE_X, -HOUSE_HEIGHT_BASE);
        this.ctx.lineTo(HOUSE_X + HOUSE_WIDTH, -HOUSE_HEIGHT_BASE);
        this.ctx.stroke();

        // ridge circle
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        let circleCenterX = HOUSE_X + HOUSE_WIDTH / 2;
        let circleCenterY = -HOUSE_HEIGHT_BASE - HOUSE_HEIGHT_RIDGE / 2 + 5;
        this.ctx.arc(circleCenterX, circleCenterY, circleRadius, 0, 2 * Math.PI);
        this.ctx.lineTo(circleCenterX - circleRadius, circleCenterY);
        this.ctx.moveTo(circleCenterX, circleCenterY - circleRadius);
        this.ctx.lineTo(circleCenterX, circleCenterY + circleRadius);
        this.ctx.stroke();

        // door
        const doorWidthHalf = doorWidth / 2;
        let doorXLeft = circleCenterX - doorWidthHalf;
        let doorXRight = circleCenterX + doorWidthHalf;
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#181815';
        this.ctx.moveTo(doorXLeft, 0);
        this.ctx.lineTo(doorXLeft, -doorHeight);
        this.ctx.lineTo(doorXRight, -doorHeight);
        this.ctx.lineTo(doorXRight, 0);
        this.ctx.stroke();


        // window
        let windowYBottom = -windowOffsetRelativeToGround;
        let windowYTop = -windowOffsetRelativeToGround - windowHeight;
        let windowLeftXLeft = doorXLeft - windowOffsetRelativeToDoor - windowWidth;
        let windowLeftXRight = doorXLeft - windowOffsetRelativeToDoor;
        let windowRightXLeft = doorXRight + windowOffsetRelativeToDoor;
        let windowRightXRight = doorXRight + windowOffsetRelativeToDoor + windowWidth;
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.fillStyle = `rgba(253, 245, 146, ${fixLimitIntervalReverseLoopOpacity(this.opacity)})`;
        this.ctx.moveTo(windowLeftXLeft, windowYBottom);
        this.ctx.lineTo(windowLeftXRight, windowYBottom);
        this.ctx.lineTo(windowLeftXRight, windowYTop);
        this.ctx.lineTo(windowLeftXLeft, windowYTop);
        this.ctx.lineTo(windowLeftXLeft, windowYTop);
        this.ctx.moveTo(windowRightXLeft, windowYBottom);
        this.ctx.lineTo(windowRightXRight, windowYBottom);
        this.ctx.lineTo(windowRightXRight, windowYTop);
        this.ctx.lineTo(windowRightXLeft, windowYTop);
        this.ctx.lineTo(windowRightXLeft, windowYTop);
        this.ctx.fill();

        // window bar
        let lineLeftX = windowLeftXLeft + windowWidth / 3;
        let lineRightX = windowRightXRight - windowWidth / 3;
        this.ctx.strokeStyle = '#271B0F';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(lineLeftX, windowYBottom);
        this.ctx.lineTo(lineLeftX, windowYTop);
        this.ctx.moveTo(lineRightX, windowYBottom);
        this.ctx.lineTo(lineRightX, windowYTop);
        this.ctx.stroke();

        // chimney
        // this.ctx.


        // ridge
        this.ctx.lineJoin = 'miter';
        this.ctx.lineCap = 'butt';
        this.ctx.strokeStyle = '#576b3c';
        this.ctx.lineWidth = HOUSE_RIDGE_WIDTH;
        this.ctx.beginPath();
        this.ctx.moveTo(HOUSE_X - 10, -HOUSE_HEIGHT_BASE + 10 * k - HOUSE_RIDGE_WIDTH);
        this.ctx.lineTo(houseCenter, -HOUSE_HEIGHT_RIDGE - HOUSE_HEIGHT_BASE - HOUSE_RIDGE_WIDTH);
        this.ctx.lineTo(HOUSE_X + HOUSE_WIDTH + 10, -HOUSE_HEIGHT_BASE + 10 * k - HOUSE_RIDGE_WIDTH);

        // snow at ridge
        const snowHeight = HOUSE_RIDGE_WIDTH + HOUSE_RIDGE_SNOW_WIDTH + 2;
        this.ctx.stroke();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = HOUSE_RIDGE_SNOW_WIDTH;
        this.ctx.beginPath();
        this.ctx.moveTo(HOUSE_X - 11, -HOUSE_HEIGHT_BASE + 11 * k - snowHeight);
        this.ctx.lineTo(houseCenter, -HOUSE_HEIGHT_RIDGE - HOUSE_HEIGHT_BASE - snowHeight);
        this.ctx.lineTo(HOUSE_X + HOUSE_WIDTH + 11, -HOUSE_HEIGHT_BASE + 11 * k - snowHeight);
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawBranch(depth: number) {
    }

    shouldAlive(): boolean {
        return true;
    }
}
