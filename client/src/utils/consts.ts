export enum DATA_TYPE {
    HEART_BEAT = 0,
    CHECK_USERNAME = 1,
    BACKGROUND = 122,
    CHARACTER = 222,
}

export enum BG_TYPE {
    TREE = 0,
    OBSTACLE = 1,
}

export enum CANVAS_TYPE {
    TYPE_STAGE = 'stage', // like character, bullet, barrier
    TYPE_BG = 'bg', // the background does not affect to user
}

export enum GAME_STATUS {
    INIT = 0,
    WAIT = 1,
    GAME = 2,
}

export interface AnyObject {
    [key: string]: any
}
export interface ListenerObject {
    [key: string]: Array<{ (data: any): void }>
}

export interface SocketMsg {
    [index: number]: number;
}

export const SOCKET_HEART_BEAT_TIMEOUT = 10000;
export const SOCKET_RECONNECT_TIMEOUT = 5000;
export const SOCKET_FETCH_TIMEOUT = 3000;

export const NOTIFY_SHOW_TIMEOUT = 300;
export const NOTIFY_FADEOUT_TIMEOUT = 3000;
export enum NOTIFY_TYPE {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success',
}
