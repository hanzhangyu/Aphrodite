import * as Test  from './components/Test';

try {
    const canvas= <HTMLCanvasElement> document.getElementById("testCanvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const ctx=canvas.getContext("2d");
    ctx.rect(20,50,150,100);
    ctx.stroke();
    const a = new Test.SomeClass();

    const { string: ssl, string: server } = process.env;
    const socket = new WebSocket(`${ssl ? 'wss' : 'ws'}://${server}`);
    socket.onmessage = e => {
        alert('onmessage');
    };
    socket.onopen = () => {
        alert('open');
    }
    socket.onclose = () => {
        alert('close');
    }
    socket.onerror = (e) => {
        alert(JSON.stringify(e));
    }
} catch (err) {
    alert(JSON.stringify(err))
}