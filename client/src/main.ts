
const canvas= <HTMLCanvasElement> document.getElementById("testCanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx=canvas.getContext("2d");
ctx.rect(20,50,150,100);
ctx.stroke();