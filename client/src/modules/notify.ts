import {NOTIFY_SHOW_TIMEOUT, NOTIFY_FADEOUT_TIMEOUT, NOTIFY_TYPE} from 'utils/consts';

interface notifyInterface {
    timer: number;
    node: HTMLElement;
    show: Function;
    hidden: Function;
    notify: Function;
}

interface notifyParamInterface {
    msg: string;
    loading?: boolean;
    type?: NOTIFY_TYPE;
}

const notify: notifyInterface = {
    timer: null,
    node: document.getElementById('notify'),
    show() {
        this.node.classList.remove('hidden');
        this.node.classList.add('active');
    },
    hidden() {
        this.timer = setTimeout(() => {
            this.node.classList.remove('active');
            this.timer = setTimeout(() => {
                this.node.classList.add('hidden');
                this.timer = null;
            }, NOTIFY_FADEOUT_TIMEOUT);
        }, NOTIFY_SHOW_TIMEOUT);
    },
    notify({msg, loading = false, type = NOTIFY_TYPE.INFO}: notifyParamInterface) {
        this.timer && clearTimeout(this.timer);
        this.show();
        this.node.innerHTML = `<div>${loading ? '<i class="fa fa-spinner" aria-hidden="true"></i>' : ''}<p class="${type}">${msg}</p></div>`;
        if (!loading) {
            this.hidden();
        }
    },
};

// @ts-ignore
window.$notify = notify;
console.log(notify);

export default notify;
