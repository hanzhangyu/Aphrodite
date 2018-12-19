/**
 * @file send data & get data & set data to store
 * @analogy reducer
 *
 * need refactor
 */
import Ws from 'classes/Ws';
import store from 'modules/store';
import notify from 'modules/notify';
import {delay} from 'utils/helper';
import {DATA_TYPE, SOCKET_HEART_BEAT_TIMEOUT, SOCKET_RECONNECT_TIMEOUT, NOTIFY_TYPE} from 'utils/consts';

const { ssl, server } = process.env;
let socket: Ws;
let isReconnecting: boolean = false;
let timer: number = 0;
// let lastTs: number = null;

function decode(data: SocketMsg) :  AnyObject {
    return {
        code: data[0],
        msg: data[1],
    };
}

function encode(data: AnyObject) :  SocketMsg {
    return [data.code, data.msg];
}

function resetHeartBeat() {
    // lastTs = Date.now();
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
        console.log('[SOCKET] heart beat');
        send(DATA_TYPE.HEART_BEAT);
    }, SOCKET_HEART_BEAT_TIMEOUT);
}

async function open() {
    try {
        if (!(socket && socket.isOpen)) {
            socket && socket.destroy();
            // TODO get TOKEN
            socket = new Ws(`${ssl ? 'wss' : 'ws'}://${server}`, handleMessage);
            resetHeartBeat();
            await socket.open();
            const name = store.getState('user', 'name');
            if (name) {
                await send(DATA_TYPE.CHECK_USERNAME, name);
            }
            isReconnecting = false;
        }
    } catch (err) {
        // TODO notify module
        console.error('Failed to connect server!', err);
        await delay(SOCKET_RECONNECT_TIMEOUT);
        isReconnecting = true;
        console.log('[SOCKET] reconnecting');
        await open();
    }
}

async function send(code: number, msg?: string | boolean | number) {
    if (isReconnecting && store.getState('destroyed')) return;
    await open();
    resetHeartBeat();

    // TODO split the data of map
    socket.send(encode({code, msg}))
}

function handleMessage(message: string) {
    const data = decode(JSON.parse(message));
    switch (data.code) {
        case DATA_TYPE.CHECK_USERNAME:
            store.setState(data.msg, 'user', 'valid');
            break;
        case DATA_TYPE.OVERLOAD:
            store.setState(!!data.msg, 'server', 'overload');
            break;
        case DATA_TYPE.CLOSE:
            alert('Someone closed you connection, please ask the room creator!');
            store.setState(true, 'destroyed');
            destroy();
            break;
        default:
    }
}

function destroy() {
    window.clearTimeout(timer);
    store.destroy();
    socket.destroy();
    setTimeout(() => {
        if (!(navigator as NavigatorCordova).app) {
            console.warn('[APP EXITED]');
            return; // test in browser
        }
        (navigator as NavigatorCordova).app.exitApp();
    }, 0);
}

export default {
    send,
    open,
    destroy,
}
