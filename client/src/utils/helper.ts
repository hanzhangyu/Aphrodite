import {SOCKET_RECONNECT_TIMEOUT} from "./consts";

export function getRad(angle: number) : number {
    return angle * Math.PI / 180;
}

export function delay(timeout: number) : Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    })
}
