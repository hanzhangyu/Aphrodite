export enum DATA_TYPE {
    BACKGROUND = 0,
    CHARACTER = 1,
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
