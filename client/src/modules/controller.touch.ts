/**
 * @file add event listener and push the control event to controller
 */

import { controllerInterface } from 'utils/decorate';
import { EVENT_TYPE, EVENT_DISABLED } from 'utils/consts';
import { EVENT_TIMEOUT } from 'utils/config';

interface controllerTouchInterface extends controllerInterface {
    paused: boolean;
    ele: HTMLElement,

    handleTouchStart: (el: HTMLElement, key: keyof typeof EVENT_TYPE) => void;
    handleTouchEnd: (el: HTMLElement, key: keyof typeof EVENT_TYPE) => void;
    btnMap: Map<string, HTMLElement>,
    btnTimerMap: Map<string, number>,
}

const touchController: controllerTouchInterface = {
    paused: true,
    ele: document.getElementById('control'),
    eventPipe: null,
    btnMap: new Map(),
    btnTimerMap: new Map(),
    init(controller) {
        this.recover();
        this.eventPipe = controller;
        Object.keys(EVENT_TYPE).forEach(key => {
            const el = document.getElementById(key);
            this.btnMap.set(key, el);
            this.btnTimerMap.set(key, null);
            if (EVENT_DISABLED.has(key)) {
                el.classList.add('disabled');
            } else {
                el.addEventListener('touchstart', this.handleTouchStart.bind(this, el, key), false);
                el.addEventListener('touchend', this.handleTouchEnd.bind(this, el, key), false);
            }
        });
    },
    handleTouchStart(el, key) {
        el.classList.add('active');
        this.eventPipe(key);
        const timer = this.btnTimerMap.get(key);
        if (timer) {
            clearTimeout(timer);
        }
        this.btnTimerMap.set(key, setTimeout(() => {
            this.handleTouchStart(el, key);
        }, EVENT_TIMEOUT[key]));
    },
    handleTouchEnd(el, key) {
        console.log('handleTouchEnd', el, key);
        const timer = this.btnTimerMap.get(key);
        el.classList.remove('active');
        if (!timer) return;
        clearTimeout(timer);
        this.btnTimerMap.delete(key);
    },
    recover() {
        if (!this.paused) return;
        this.paused = false;
        this.ele.classList.remove('hidden');
    },
    pause() {
        if (this.paused) return;
        this.paused = true;
        this.ele.classList.add('hidden');
    },
    destroy() {
        // document.removeEventListener('keydown', this.handleKeyDown);
        this.eventPipe = null;
    },
};

export default touchController;
