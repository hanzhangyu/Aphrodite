import './assets/sass/main.scss';
import 'font-awesome/scss/font-awesome.scss';

import store from './modules/store';

console.log(store);

const canvas= <HTMLCanvasElement> document.getElementById("main");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx=canvas.getContext("2d");
ctx.rect(20,200,150,100);
ctx.strokeStyle="white";
ctx.stroke();
