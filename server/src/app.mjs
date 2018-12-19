import WebSocket from 'ws';

import CONFIG from './utils/config';
import logger from './mods/logger';
import decoder from './mods/decoder';
import {DATA_TYPE} from "./utils/consts";

const VALID_USERNAME_LIST = CONFIG.username.split('|');
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
            this.logger.error(Array.from(this.wss.clients).map(ws => ws.username));
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
        // return ws.send(decoder.encode(DATA_TYPE.OVERLOAD, false));
        // ws.send(decoder.encode(DATA_TYPE.HEART_BEAT));
    }

    onMessage(ws, message) {
        const data = decoder.decode(JSON.parse(message));
        this.logger.debug(`Received message => ${message}`);
        this.logger.debug(`Exist clients => ${this.wss.clients.size}`);
        switch (data.code) {
            case DATA_TYPE.CHECK_USERNAME:
                this.logger.debug(`Received name => ${data.msg}`);
                // TODO refactor use room id && cookie
                ws.username = data.msg;
                let isValid = VALID_USERNAME_LIST.indexOf(ws.username) >= 0;
                if (isValid) {
                    for (let item of this.wss.clients.values()) {
                        if (item !== ws && item.username === ws.username) {
                            isValid = false;
                            break;
                        }
                    }
                }
                ws.send(decoder.encode(DATA_TYPE.CHECK_USERNAME, isValid));
                break;
            case DATA_TYPE.OVERLOAD:
                // clear the ws pool
                for (let item of this.wss.clients.values()) {
                    if (item !== ws) {
                        item.send(decoder.encode(DATA_TYPE.CLOSE));
                    }
                }
                ws.send(decoder.encode(DATA_TYPE.OVERLOAD, false));
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
