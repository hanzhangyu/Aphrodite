export default class Ws {
    private socket: WebSocket;

    constructor(
        public url: string,
        public listener: Function
    ) {
        this.socket = null;
    }

    async open (){
        if (this.socket && this.isOpen) return;

        this.socket = new WebSocket(this.url);

        await new Promise((resolve: Function, reject: Function) => {
            this.socket.onmessage = e => {
                this.listener(e.data);
            };
			this.socket.onopen = () => {
			    console.log('open');
                resolve();
            };
			this.socket.onclose = e => {
                console.log('closed');
			};
			this.socket.onerror = () => {
				reject(new Error('Can not create the websocket connect. May be a server error, please try again later!'));
			};
        });
    }

    send(msg: SocketMsg) {
        this.socket.send(JSON.stringify(msg));
    }

    destroy() {
        this.socket && this.socket.close(1000, "destroy");
        this.socket = null;
    }

    get isOpen() {
        return this.socket && this.socket.readyState === this.socket.OPEN;
    }
}
