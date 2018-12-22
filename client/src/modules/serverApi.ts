/**
 * @file get Data from server
 * @analogy action
 */
import {DATA_TYPE, NOTIFY_TYPE} from 'utils/consts';
import socket from 'modules/socket';
import store from 'modules/store';
import notify from 'modules/notify';
import {eventKeyType} from 'utils/decorate';

const serverApi = {
    async init() {
        await socket.open();
    },
    destroy() {
        socket.destroy();
    },
    async checkName(username: string) {
        try {
            notify.notify({
                msg: 'Check you name...',
                loading: true,
            });
            await socket.send(DATA_TYPE.CHECK_USERNAME, username);
            await Promise.race([
                store.listen('user.valid'),
                store.listen('server.overload')
            ]);
            notify.hidden();
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    async closeOthersConnection() {
        try {
            await socket.send(DATA_TYPE.OVERLOAD, true);
            await store.listen('server.overload');
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    async postEvent(event: Array<eventKeyType>, ts: number) {
        try {
            await socket.send(DATA_TYPE.EVENT, [ts, ...event]);
        } catch (err) {
            // TODO re rend and sync the position when the player A does not have the event.
        }
    }
};
export default serverApi;
