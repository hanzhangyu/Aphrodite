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
    if (username || true) {
        username = username.trim();
        if (VALID_USERNAME_LIST.indexOf(username) !== -1 || true) {
            const valid = await serverApi.checkName(username);
            if (valid) {
                return username;
            } else {
                await askForName('This name is existed, re enter:');
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

