import WebSocket from 'ws';

import CONFIG from './utils/config';
import logger from './mods/logger';
import decoder from './mods/decoder';
import {DATA_TYPE} from "./utils/consts";

// TODO valid the user
let currentKey = null;

class App {
    constructor() {
        this.logger = logger;

        this.logger.info(CONFIG);
        this.wss = new WebSocket.Server({
            host: CONFIG.host,
            port: CONFIG.port,
            path: CONFIG.path,
            verifyClient: this.verifyClient.bind(this),
        })
            .on('connection', this.onConnection.bind(this))
            .on('close', this.onClose.bind(this));

        setInterval(() => {
            this.logger.error(this.wss.clients.size);
        }, 2000);
    }

    onClose() {
        this.logger.warn('closed');
    }

    onConnection(ws) {
        this.logger.debug('connect');
        ws.on('message', this.onMessage.bind(this, ws));
        if (this.wss.clients.size > 2) {
            return ws.send(decoder.encode(DATA_TYPE.OVERLOAD, true));
        }
        return ws.send(decoder.encode(DATA_TYPE.OVERLOAD, false));
        // ws.send(decoder.encode(DATA_TYPE.HEART_BEAT));
    }

    onMessage(ws, message) {
        const data = decoder.decode(JSON.parse(message));
        this.logger.debug(`Received message => ${message}`);
        this.logger.debug(`Exist clients => ${this.wss.clients.size}`);
        switch (data.code) {
            case DATA_TYPE.CHECK_USERNAME:
                this.logger.debug(`Received name => ${data.msg}`);
                ws.send(decoder.encode(DATA_TYPE.CHECK_USERNAME, true));
                break;
            case DATA_TYPE.OVERLOAD:
                // clear the ws pool
                for (let item of this.wss.clients.values()) {
                    if (item !== ws) {
                        item.send(decoder.encode(DATA_TYPE.CLOSE));
                    }
                }
                ws.send(decoder.encode(DATA_TYPE.OVERLOAD, false));
                console.log(this.wss.clients.size);
                setTimeout(() => {
                    console.info(this.wss.clients.size)
                }, 2000);
                break;
            default:
        }
    }

    verifyClient({origin, req, secure}, cb) {
        const IPAddress = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        this.logger.debug({IPAddress});

        // FIXME

        // this.logger.debug(this.wss.clients.size);
        // if (this.wss.clients.size > 2) {
        //     for (let item of this.wss.clients.values()) {
        //         item.terminate();
        //     }
        // }

        console.log(this.wss.clients.size);

        cb(true);
    }
}

const app = new App();
