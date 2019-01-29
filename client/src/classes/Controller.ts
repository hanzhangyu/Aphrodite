/**
 * @type collect the event and throttle it, then push to the store
 */
import {cloneDeep} from 'lodash';
import {EVENT_TIMEOUT} from 'utils/config';
import {eventKeyType} from 'utils/decorate';
import store from 'modules/store';
import controllerKey from 'modules/controller.key';
import controllerTouch from 'modules/controller.touch';

const isTouch: boolean = ('ontouchend' in document); // FIXME && false
const currentController = isTouch ? controllerTouch : controllerKey;

const INIT_TIME = {
    shoot: 0,
    jump: 0,
    skill: 0,
    ult: 0,
    left: 0,
    right: 0,
};

class Controller {
    private readonly currentController = currentController;
    private eventLastTime: {
        [key in eventKeyType]: number
    };

    constructor() {
        this.currentController.init(this.onEvent.bind(this));
        this.eventLastTime = cloneDeep(INIT_TIME);
    }

    pause() {
        this.currentController.pause();
    }

    recover() {
        this.currentController.recover();
    }

    onEvent(type: eventKeyType) {
        const now = Date.now();
        if (now - this.eventLastTime[type] > EVENT_TIMEOUT[type]) {
            store.events.push(type);
            this.eventLastTime[type] = now;
        }
    }

    destroy() {
        this.eventLastTime = cloneDeep(INIT_TIME);
        this.currentController.destroy();
    }


}

export default Controller;
