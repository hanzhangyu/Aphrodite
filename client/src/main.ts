import './assets/sass/main.scss';
import 'font-awesome/scss/font-awesome.scss';

import Background from 'components/Background';
import Stage from 'components/Stage';
import store from 'modules/store';
import api from 'modules/serverApi';
import {CANVAS_TYPE, GAME_STATUS} from 'utils/consts';
import serverApi from "./modules/serverApi";

// init the canvas element
initCanvas(CANVAS_TYPE.TYPE_STAGE);
initCanvas(CANVAS_TYPE.TYPE_BG);
function initCanvas(type: CANVAS_TYPE) {
    const c = <HTMLCanvasElement> document.getElementById(type + 'Canvas');
    store.setState(c.getContext('2d'), 'context', type);

    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

const bg = new Background(0, store.getState('context', CANVAS_TYPE.TYPE_BG));
const stage = new Stage(0, store.getState('context', CANVAS_TYPE.TYPE_STAGE));

const validUsernameList = process.env.username.split('|');
async function askForName(msg?: string) {
    let username = window.prompt(`${msg || 'Enter your name'} (${process.env.username})`);
    if (username || true) {
        username = username.trim();
        if (validUsernameList.indexOf(username) !== -1 || true) {
            const valid = await serverApi.checkName(username);
            if (valid) {
                store.setState(username, 'user', 'name');
            } else {
                await askForName('This name is existed, re enter:');
            }
            return;
        }
    }
    await askForName();
}

serverApi.init().then(async () => {
    await askForName();
    window.requestAnimationFrame(game);
});

function game() {
    store.setState(Date.now(), 'timestamp');
    bg.draw();
    stage.draw();
    switch (store.getState('status')) {
        case GAME_STATUS.INIT:
            // TODO ask for name
            break;
        case GAME_STATUS.WAIT:
            // TODO wait for anther player
            break;
        case GAME_STATUS.GAME:
            break;
        default:
    }

    window.requestAnimationFrame(game);
}

