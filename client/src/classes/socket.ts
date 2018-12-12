const { string: ssl, string: server } = process.env;

export default class Socket {
    socket: WebSocket;
    isReconnecting: Boolean;

    constructor(public listener: Function) {
        this.socket = null;
        this.isReconnecting = false;
    }

    async open (isReconnecting: Boolean){
        if (this.socket && this.isOpen) return;

        this.socket = new WebSocket(`${ssl ? 'wss' : 'ws'}://${server}`);

        await new Promise((resolve: Function, reject: Function) => {
            this.socket.onmessage = (e) => {
                this.listener();
            };
			this.socket.onopen = () => {
                resolve();
            };
			this.socket.onclose = e => {
				if (isReconnecting) return;
				this.open(true);
			};
			this.socket.onerror = () => {
				reject(new Error('无法建立 websocket 连接，可能是服务器故障，请稍后再试'));
			};
        });
    }

    send(msg: Array<any>) {
        this.socket.send(JSON.stringify(msg));
    }

    desotry() {
        this.socket && this.socket.close(1, "destory");
    }

    get isOpen() {
        return this.socket.readyState === this.socket.OPEN;
    }
}