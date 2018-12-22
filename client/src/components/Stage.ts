import Base from 'components/Base';
import Triangle from 'components/shape/Triangle';
import Square from 'components/shape/Square';
import BaseTree from 'components/BaseTree';
import store from 'modules/store';
import { DATA_TYPE } from 'utils/consts';
import {TREE_BRANCH_SPAN_DISTANCE} from "../utils/config";

export default class Stage extends Base {
    private playerA: Triangle;
    private playerB: Square;
    constructor(
        public readonly id: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(id);
    }

    draw() {
        this.checkEvent();
        this.ctx.save();
        this.ctx.translate(0, this.height);
        this.clear();
        this.drawFog();
        this.playerA.draw();
        this.playerB.draw();
        // TODO clear the old tree and create the new tree
        this.ctx.restore();
    }

    checkEvent() {
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
        store.events.length && console.log('store.events', store.events);
        store.events.length = 0;
    }

    drawFog() {
        this.ctx.save();
        const gradient = this.ctx.createLinearGradient(0, -this.height, 0, this.height);
        gradient.addColorStop(0,"rgba(255,255,255,0.3)");
        gradient.addColorStop(1,"rgba(255,255,255,0)");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, -this.height, this.width, this.height);
        this.ctx.restore();
    }

    createAllPlayer(username: string) {
        const triangle = new Triangle(store.getNewId(), this.ctx, 0, 0);
        const square = new Square(store.getNewId(), this.ctx, 0, 0);
        if (triangle.name === username) {
            this.playerA = triangle;
            this.playerB = square;
        } else {
            this.playerA = square;
            this.playerB = triangle;
        }
    }

    drawLine() {

    }

    isCrash(component: Base) : boolean {
        return false;
    }

    clear() {
        this.ctx.clearRect(0, -this.height, this.width, this.height);
    };
}
