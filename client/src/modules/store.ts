import {cloneDeep} from 'lodash';
import bgData from 'assets/json/background.json';
import enemy from 'assets/json/enemy.json';
import {DATA_TYPE, AnyObject} from 'utils/consts';

const context : {[key: string]: CanvasRenderingContext2D} = {};
const INIT_STORE_DATA = {
    user: {},
    distance: 0,
    context,
};

class Store {
    private state: object;

    constructor() {
        this.state = cloneDeep(INIT_STORE_DATA);
    }

    // getState(type: DATA_TYPE) {
    //     switch (type) {
    //         case DATA_TYPE.BACKGROUND:
    //             return bgData;
    //         default:
    //             return enemy;
    //     }
    // }
    getState(...keys : string[]) {
        return keys.reduce((obj: AnyObject, key: string) => obj[key], this.state)
    }
    setState(value: any, ...keys: string[]) {
        return keys.reduce((obj: AnyObject, key: string, index: number) => {
            if (index !== keys.length - 1) {
                return obj[key];
            }
            obj[key] = value;
            return value;
        }, this.state);
    }
    isOutOfScreen(pointers: [[number, number]]): boolean {
        // TODO calculate the current distance span
        return pointers.every((pointer) => {
            return true
        })
    }
}

export default new Store();
