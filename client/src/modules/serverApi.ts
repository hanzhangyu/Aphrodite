/**
 * @file get Data from server
 * @analogy action
 */
import {DATA_TYPE, NOTIFY_TYPE} from 'utils/consts';
import socket from 'modules/socket';
import store from 'modules/store';
import notify from 'modules/notify';

const serverApi = {
    async init() {
        await socket.open();
    },
    async checkName(username: string) {
        try {
            notify.notify({
                msg: 'Check you name...',
                loading: true,
            });
            await socket.send(DATA_TYPE.CHECK_USERNAME, username);
            await store.listen('user.valid');
            notify.hidden();
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }
};
export default serverApi;
