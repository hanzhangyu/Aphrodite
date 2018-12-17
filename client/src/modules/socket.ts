/**
 * @file send data & get data & set data to store
 * @analogy reducer
 *
 * need refactor
 */
import Ws from 'classes/Ws';
import store from 'modules/store';
import {delay} from 'utils/helper';
import {AnyObject, SocketMsg, DATA_TYPE, SOCKET_HEART_BEAT_TIMEOUT, SOCKET_RECONNECT_TIMEOUT} from 'utils/consts';

const { ssl, server } = process.env;
let socket: Ws;
let isReconnecting: boolean = false;
let timer: number = 0;
let lastTs: number = null;

function decode(data: SocketMsg) :  AnyObject {
    return data;
}

function encode(data: AnyObject) :  SocketMsg {
    return [data.code, data.msg];
}

function resetHeartBeat() {
    lastTs = Date.now();
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

// function send(data: String) : any;
// function send(data: SocketMsg) : any;
async function send(code: number, msg?: string) {
    if (isReconnecting) return;
    await open();
    resetHeartBeat();

    // TODO split the data of map
    socket.send(encode({code, msg}))
}

function handleMessage(data: any) {
    switch (data[0]) {
        case DATA_TYPE.CHECK_USERNAME:
            store.setState(data[1], 'user', 'valid');
    }
}

export default {
    send,
    open,
}
