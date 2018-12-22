import './assets/sass/main.scss';
import 'font-awesome/scss/font-awesome.scss';

import Background from 'components/Background';
import Stage from 'components/Stage';
import store from 'modules/store';
import api from 'modules/serverApi';
import Controller from 'classes/Controller';
import {CANVAS_TYPE, DATA_TYPE, GAME_STATUS, NOTIFY_TYPE, VALID_USERNAME_LIST} from 'utils/consts';
import {askForName, checkOverload} from 'utils/helper';
import serverApi from "./modules/serverApi";
import notify from "./modules/notify";
import socket from "./modules/socket";
import Triangle from "./components/shape/Triangle";

//@ts-ignore
window.store = store;

// init the canvas element
initCanvas(CANVAS_TYPE.TYPE_STAGE);
initCanvas(CANVAS_TYPE.TYPE_BG);
function initCanvas(type: CANVAS_TYPE) {
    const c = <HTMLCanvasElement> document.getElementById(type + 'Canvas');
    store.setState(c.getContext('2d'), 'context', type);

    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

store.bg = new Background(0, store.getState('context', CANVAS_TYPE.TYPE_BG));
store.stage = new Stage(0, store.getState('context', CANVAS_TYPE.TYPE_STAGE));

serverApi.init().then(async () => {
    // const username = await askForName();
    //FIXME remove start
    let username = '123';
    if (localStorage.getItem('test') === '123') {
        username = '321';
    }
    localStorage.setItem('test', username);
    //FIXME remove end
    const overload = await checkOverload();
    if (overload || store.getState('destroyed')) return;
    store.setState(username, 'user', 'name');
    store.controller = new Controller();
    store.stage.createPlayer(username, 'A');
    window.requestAnimationFrame(game);
});

function game() {
    store.updateTime();
    store.bg.draw();
    store.stage.draw();
    switch (store.getState('status')) {
        case GAME_STATUS.WAIT:
            // TODO wait for anther player
            break;
        case GAME_STATUS.GAME:
            break;
        default:
    }

    window.requestAnimationFrame(game);
}

