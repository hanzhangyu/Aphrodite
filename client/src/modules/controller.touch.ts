/**
 * @file add event listener and push the control event to controller
 */

import {controllerInterface} from 'utils/decorate';

interface controllerTouchInterface extends controllerInterface {
    handleKeyDown: (e: KeyboardEvent) => void;
    eventMap: Map<string, Function>,
}

const touchController: controllerTouchInterface = {
    eventPipe: null,
    eventMap: new Map([
        // ['touchstart', ]
    ]),
    init(controller) {
        this.eventPipe = controller;
        // TODO bind event
        // document.getElementById('move_left').addEventListener('touchstart', this.handleKeyDown);
        // document.getElementById('move_left').addEventListener('touchend', this.handleKeyDown);
        // document.getElementById('move_right').addEventListener('touchstart', this.handleKeyDown);
        // document.getElementById('move_right').addEventListener('touchend', this.handleKeyDown);
    },
    handleKeyDown(e) {
        console.log(e.keyCode)
    },
    destroy() {
        // document.removeEventListener('keydown', this.handleKeyDown);
        this.eventPipe = null;
    },
};

export default touchController;
