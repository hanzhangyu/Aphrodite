import Controller from 'classes/Controller';
import {EVENT_TYPE} from 'utils/consts';

export interface controllerInterface {
    eventPipe: Controller['onEvent'];
    init: (eventPipe: Controller['onEvent']) => void;
    destroy: () => void;
    recover: () => void;
    pause: () => void;
}

export declare type eventKeyType = keyof typeof EVENT_TYPE;

// export interface clearInterface {
//     clear(): void;
// }
//
// export function clear(constructor: Function) {
//     constructor.prototype.clear = function() {
//         this.ctx.clearRect(0, 0, this.width, this.height);
//     }
// }
