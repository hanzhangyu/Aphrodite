import Socket from 'classes/socket';

interface SocketMsg {
    code: number;
    msg: string;

}

let socket: Socket;

function decode(data: SocketMsg) : SocketMsg {
    return data;
}

function encode(data: SocketMsg) : SocketMsg {
    return data;
}

function send(data: String) : any;
function send(data: SocketMsg) : any;
function send(data) {
    if (!socket) {
        socket = new Socket();
    }
    
    if (typeof data === 'string') {
        socket.send(encode({
            code: 0,
            msg: data,
        }))
    } else {
        socket.send(encode(data))
    }
}

export default {
    send,
}