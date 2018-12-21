/**
 * @file add event listener and push the control event to controller
 */

import {controllerInterface} from 'utils/decorate';

enum KET_MAP {
    J =  'shoot',
    K =  'jump',
    L =  'skill',
    ';' =  'ult',
    a =  'left',
    d =  'right',
}

declare type keyMapType = keyof typeof KET_MAP;

interface controllerKeyInterface extends controllerInterface {
    handleKeyDown: (e: KeyboardEvent) => void;
}

const keyController: controllerKeyInterface = {
    eventPipe: null,
    init(controller) {
        this.eventPipe = controller;
        document.addEventListener('keydown', this.handleKeyDown, false);
    },
    handleKeyDown(e) {
        switch (e.key) {
            case 'a':
            case 'd':
            case 'j':
            case 'k':
            case 'l':
            case ';':
                this.eventPipe(KET_MAP[e.key as keyMapType]);
                break;
        }
    },
    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown, false);
        this.eventPipe = null;
    },
};

export default keyController;
