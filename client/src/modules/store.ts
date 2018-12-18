import {cloneDeep} from 'lodash';
import bgData from 'assets/json/background.json';
import enemy from 'assets/json/enemy.json';
import {DATA_TYPE, SOCKET_FETCH_TIMEOUT} from 'utils/consts';

const context: { [key: string]: CanvasRenderingContext2D } = {};
const user: {
    valid: boolean;
    name: string;
} = {valid: false, name: null};
const server: {
    overload: boolean;
} = {overload: false};
const INIT_STORE_DATA = {
    destroyed: false,
    user,
    server,
    distance: 0,
    context,
};

class Store {
    private state: object;
    private listener: ListenerObject;
    private isDestroy: boolean;

    constructor() {
        this.state = cloneDeep(INIT_STORE_DATA);
        this.listener = {};
        this.isDestroy = false;
    }

    getState(...keys: string[]) {
        return keys.reduce((obj: AnyObject, key: string) => obj[key], this.state)
    }

    setState(value: any, ...keys: string[]) {
        keys.reduce((obj: AnyObject, key: string, index: number) => {
            if (index !== keys.length - 1) {
                return obj[key];
            }
            obj[key] = value;
            return value;
        }, this.state);

        const keyName = keys.join('.');
        const listeners = this.listener[keyName];
        if (listeners && listeners.length > 0) {
            listeners.forEach(listener => {
                listener(value);
            });
            listeners.length = 0;
        }

        if (keyName === 'timestamp') return;
        console.log('[STATE SET]', keyName, value);
    }

    listen(key: string) {
        return new Promise((resolve, reject) => {
            if (!this.listener[key]) {
                this.listener[key] = [];
            }

            this.listener[key].push(resolve);
            setTimeout(() => {
                if (this.isDestroy) return;
                const index = this.listener[key].indexOf(resolve);
                if (index >= 0) {
                    this.listener[key].splice(index, 1);
                    reject(new Error('timeout'));
                }
                console.log('[STORE LISTENERS]', this.listener);
            }, SOCKET_FETCH_TIMEOUT)
        })
    }

    destroy() {
        this.isDestroy = true;
        this.state = cloneDeep(INIT_STORE_DATA);
        this.listener = {};
    }

    isOutOfScreen(pointers: [[number, number]]): boolean {
        // TODO calculate the current distance span
        return pointers.every((pointer) => {
            return true
        })
    }

    resetState() {
        this.state = cloneDeep(INIT_STORE_DATA);
    }
}

export default new Store();
