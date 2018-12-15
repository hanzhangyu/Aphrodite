import WebSocket from 'ws';

import CONFIG from './mods/config';
import logger from './mods/logger';

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
            verifyClient: this.verifyClient,
        })
            .on('connection', this.onConnection)
            .on('error', this.onError);
    }

    onError(err) {
        this.logger.error(err);
    }

    onConnection(ws) {
        this.logger.debug('connect');
        ws.on('message', message => {
            this.logger.info(`Received message => ${JSON.parse(message)}`)
        });
        ws.send(JSON.stringify([1, 2, 3, 4, 4]))
    }

    verifyClient({origin, req, secure}, cb) {
        const IPAdress = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        this.logger.debug(IPAdress);
        cb(true);
    }
}

const app = new App();
