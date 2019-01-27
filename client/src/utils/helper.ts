import {NOTIFY_TYPE, SOCKET_RECONNECT_TIMEOUT, VALID_USERNAME_LIST} from "./consts";
import serverApi from "../modules/serverApi";
import store from "../modules/store";
import notify from "../modules/notify";

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

export async function askForName(msg?: string) : Promise<string> {
    let username = window.prompt(`${msg || 'Enter your name'} (${process.env.username})`);
    if (username) {
        username = username.trim();
        if (VALID_USERNAME_LIST.indexOf(username) !== -1) {
            await serverApi.checkName(username);
            const valid = store.getState('user', 'valid');
             console.log('valid', valid);
            if (valid) {
                return username;
            } else {
                return await askForName('This name is existed, re enter:');
            }
        }
    }
    await askForName();
}

export async function checkOverload() {
    const overload = store.getState('server', 'overload');
    if (overload) {
        notify.notify({
            msg: 'There are already two player here. closing the prev connects...',
            type: NOTIFY_TYPE.ERROR,
            loading: true,
        });
        if (confirm('The server is overloaded, Do you want to close the others connects?')) {
            await serverApi.closeOthersConnection();
            notify.hidden();
            return false;
        } else {
            serverApi.destroy();
            return true;
        }
    }
}

export const fixLimitInterval = (max : number, min : number, val : number) => Math.min(max, Math.max(min, val));

export const fixLimitIntervalLoop = (max : number, min : number, val : number) => {
    const length = max - min;
    const overflowRight = val - max;
    const overflowLeft = min - val;
    if (overflowRight > 0) {
        return val - Math.ceil(overflowRight / length) * length;
    }
    if (overflowLeft > 0) {
        return val + Math.ceil(overflowLeft / length) * length;
    }
    return val;
};

export const fixLimitIntervalReverseLoop = (max : number, min : number, val : number) => {
    const length = max - min;
    const overflowRight = val - max;
    const overflowLeft = min - val;
    let time = 0;
    let newVal = val;
    if (overflowRight > 0) {
        time = Math.ceil(overflowRight / length);
        newVal = val - Math.ceil(overflowRight / length) * length;
    }
    if (overflowLeft > 0) {
        time = Math.ceil(overflowLeft / length);
        newVal = val + Math.ceil(overflowLeft / length) * length;
    }
    if (time % 2 === 0) {
        return newVal;
    }
    return max + min - newVal;
};

export const random = (max : number, min : number) => Math.random() * (max - min) + min;

export const randomInt = (max : number, min : number) => Math.ceil(random(max, min - 1));

export const average = (...array : number[]) : number => array.reduce((s, cur) => s + cur, 0) / array.length;

