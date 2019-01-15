import Base from 'components/Base';
import Triangle from 'components/shape/Triangle';
import Square from 'components/shape/Square';
import BaseTree from 'components/BaseTree';
import store from 'modules/store';
import {DATA_TYPE, VALID_USERNAME_LIST} from 'utils/consts';
import {TREE_BRANCH_SPAN_DISTANCE} from "../utils/config";
import serverApi from "../modules/serverApi";

export default class Stage extends Base {
    private playerA: Triangle;
    private playerB: Square;
    private distance: number = 0;
    // private cameraIncrementDistance: number = 0;

    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    draw() {
        this.checkCamera();
        this.checkEvent();
        this.ctx.save();
        this.distance = store.getState('game', 'distance');
        this.ctx.translate(-this.distance, this.height);
        this.clear();
        this.drawFog();
        this.playerA.draw();
        if (this.playerB.isReady) {
            this.playerB.draw();
        } else if (store.getState('game', this.playerB.username, 'exist')) {
            this.playerB.isReady = true;
        }
        // TODO clear the old tree and create the new tree
        this.ctx.restore();
    }

    checkCamera() {
        const currentDistance = store.getState('game', 'distance');
        if (this.isCameraLocked(currentDistance)) return;
        const maxCameraDistance = this.width / 2 + store.getState('game', 'distance'); // move camera when player movement beyond the half of camera
        let cameraIncrementDistance = Math.max(0, this.playerA.x - maxCameraDistance, this.playerB.x - maxCameraDistance); // get the maximum of movement
        let cameraExpected = currentDistance + cameraIncrementDistance;
        cameraExpected += Math.min(0, this.playerA.x - cameraExpected, this.playerB.x - cameraExpected); // lock camera when the other player is in the left
        cameraIncrementDistance = Math.max(0, cameraExpected - currentDistance); // FIXME lock go back
        if (cameraIncrementDistance > 0) { // FIXME can not go back
            store.setState(cameraExpected, 'game', 'distance');
        }
        // this.cameraIncrementDistance = cameraIncrementDistance;
        store.setState(cameraIncrementDistance, 'game', 'cameraIncrementDistance');
    }

    isCameraLocked(distance: number) {
        return !this.playerB.isReady || distance >= store.totalDistance;
    }

    checkEvent() {
        if (store.events.length > 0) {
            serverApi.postEvent(store.events.slice(), store.timestamp);
            store.events.forEach(event => {
                switch (event) {
                    case 'left':
                    case 'right':
                        this.playerA.move(event === 'left' ? -1 : 1);
                        break;
                    case 'jump':
                        this.playerA.jump();
                        break;
                    default:
                }
            });
            store.events.length = 0;
        }

        if (store.eventsPlayerB.length > 0) {
            // make sure the event queue is execute currently
            store.eventsPlayerB.sort((a, b) => a.ts - b.ts);
            let startTs = store.eventsPlayerB[0].ts;
            store.eventsPlayerB.forEach(({ts, events}) => {
                setTimeout(() => {
                    events.forEach(event => {
                        switch (event) {
                            case 'left':
                            case 'right':
                                this.playerB.move(event === 'left' ? -1 : 1);
                                break;
                            case 'jump':
                                this.playerB.jump();
                                break;
                            default:
                        }
                    })
                }, ts - startTs);
            });
            store.eventsPlayerB.length = 0;
        }
    }

    drawFog() {
        this.ctx.save();
        const gradient = this.ctx.createLinearGradient(this.distance, -this.height, this.distance, this.height);
        gradient.addColorStop(0, "rgba(255,255,255,0.3)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(this.distance, -this.height, this.width, this.height);
        this.ctx.restore();
    }

    createAllPlayer(username: string) {
        const triangle = new Triangle(store.getNewId(), this.ctx, 0, 0);
        const square = new Square(store.getNewId(), this.ctx, 0, 0);
        if (triangle.username === username) {
            this.playerA = triangle;
            this.playerB = square;
        } else {
            this.playerA = square;
            this.playerB = triangle;
        }
        this.playerA.isReady = true;
        this.playerA.isA = true;
        store.setState(this.playerB.username, 'antherPlayerUsername');
    }

    drawLine() {

    }

    isCrash(component: Base): boolean {
        return false;
    }

    clear() {
        this.ctx.clearRect(this.distance, -this.height, this.width, this.height);
    };

    destroy() {
        this.playerA = null;
        this.playerB = null;
    }
}
