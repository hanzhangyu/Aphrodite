// import WebSocket from 'ws';
//
// import envConfig from '../client/env.yml';
//
// const env = process.argv[2] === 'production' ? 'production' : 'development';
// const CURRENT_CONFIG = envConfig[env];
//
// let currentKey = null;
//
// const wss = new WebSocket.Server({
//     host: CURRENT_CONFIG.host,
//     port: CURRENT_CONFIG.port,
//     path: CURRENT_CONFIG.path,
//     verifyClient({origin, req, secure}, cb) {
//         console.log(secure);
//         cb(true);
//     }
// });
//
// wss.on('connection', ws => {
//     console.log('connect');
//     ws.on('message', message => {
//         console.log(`Received message => ${JSON.parse(message)}`)
//     })
//     ws.send('ho!')
// })
