/**
 * @type collect the event and throttle it, then push to the store
 */
import {EVENT_TIMEOUT} from 'utils/config';
import {eventKeyType} from 'utils/decorate';
import store from 'modules/store';
import controllerKey from 'modules/controller.key';
import controllerTouch from 'modules/controller.touch';

class Controller {
    public readonly isTouch: boolean = ('ontouchend' in document);
    private eventLastTime: {
        [key in eventKeyType]: number
    };

    constructor() {
        if (this.isTouch) {
            controllerKey.init(this.onEvent);
        }
        this.eventLastTime = {
            shoot: 0,
            jump: 0,
            skill: 0,
            ult: 0,
            left: 0,
            right: 0,
        }
    }

    onEvent(type: eventKeyType) {
        const now = Date.now();
        if (now - this.eventLastTime[type] > EVENT_TIMEOUT[type]) {
            store.events.push(type);
            this.eventLastTime[type] = now;
        }
    }


}

export default Controller;
