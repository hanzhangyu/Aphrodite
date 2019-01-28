import {cloneDeep} from 'lodash';
import bgData from 'assets/json/background.json';
import enemy from 'assets/json/enemy.json';
import Controller from 'classes/Controller';
import BgAudio from 'classes/BgAudio';
import Background from 'components/Background';
import Stage from 'components/Stage';
import {eventKeyType} from 'utils/decorate';
import {DATA_TYPE, SOCKET_FETCH_TIMEOUT, VALID_USERNAME_LIST} from 'utils/consts';
import {delay} from 'utils/helper';
import bgMusic from 'assets/medias/bgm.mp3';
import endBgMusic from 'assets/medias/waybackhome.mp3';

const mediaEle = new Audio(bgMusic);
mediaEle.loop = true;

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
    antherPlayerUsername: '',
    server,
    game: {
        distance: 0,
        cameraIncrementDistance: 0,
        [VALID_USERNAME_LIST[0]]: {
            exist: false,
            talk: '',
            x: 0,
            y: 0,
        },
        [VALID_USERNAME_LIST[1]]: {
            exist: false,
            talk: '',
            x: 0,
            y: 0,
        }
    },
    context,
};

class Store {
    private state: object;
    private listener: ListenerObject;
    private isDestroy: boolean;
    private lastId: number;
    public controlLocked: boolean = false;
    public timestamp: number;
    public timestampSpan: number;
    public totalDistance: number = 0; // FIXME
    public readonly events: Array<eventKeyType> = [];
    public readonly bgm: HTMLAudioElement = mediaEle;
    public readonly endBgm: BgAudio = new BgAudio(endBgMusic);
    public readonly eventsPlayerB: Array<{ts: number, events: Array<eventKeyType>}> = [];
    public controller: Controller;
    public bg: Background;
    public stage: Stage;
    public speed = {
        [VALID_USERNAME_LIST[0]]: 0,
        [VALID_USERNAME_LIST[1]]: 0,
        dragon: 3,
    };

    constructor() {
        this.state = cloneDeep(INIT_STORE_DATA);
        this.listener = {};
        this.isDestroy = false;
        this.lastId = 0;
        this.timestamp = 0;
        this.timestampSpan = 0;
        // this.bgm.load();
        this.endBgm.load();
    }

    async playBgm() {
        return Promise.race([
            delay(3000),
            this.bgm.play(),
        ]);
    }

    updateTime() {
        const now = Date.now();
        this.timestampSpan = now - this.timestamp;
        this.timestamp = now;
    }

    getNewId() : number {
        return this.lastId++;
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
        this.controller = null;
        this.bg = null;
        this.stage = null;
    }

    resetState() {
        this.state = cloneDeep(INIT_STORE_DATA);
    }

    lockControl() {
        this.controlLocked = true;
        this.totalDistance = 99999;
    }
}

export default new Store();
