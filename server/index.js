const WebSocket = require('ws')

const wss = new WebSocket.Server({
    host: '0.0.0.0',
    port: 3000
})

wss.on('connection', ws => {
    console.log('connect');
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })
    ws.send('ho!')
})