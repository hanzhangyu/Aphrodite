/**
 * @file send data
 */
import Socket from 'classes/socket';

interface SocketMsg {
    code: number;
    msg: string;

}

let socket: Socket;

function decode(data: [number, string]) :  SocketMsg {
    return {
        code: data[0],
        msg: data[1],
    };
}

function encode(data: SocketMsg) :  [number, string] {
    return [data.code, data.msg];
}

function init() {
    // if (!socket) {
        // socket = new Socket(console.log);
    // }
    // TODO open socket
}

// function send(data: String) : any;
// function send(data: SocketMsg) : any;
function send(code: number, msg: string) {
    // if (!socket) {
    //     socket = new Socket(console.log);
    // }

    // socket.send(encode({code, msg}))
    // TODO send
}

export default {
    send,
    init,
}