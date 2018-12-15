import bgData from 'assets/json/background.json';
import enemy from 'assets/json/enemy.json';
import {DATA_TYPE} from 'utils/consts';

console.log('bgData', bgData);

const store = {
    data: {
        user: {},
        distance: 0,
    },
    getState(type: DATA_TYPE) {
        switch (type) {
            case DATA_TYPE.BACKGROUND:
                return bgData;
            default:
                return enemy;
        }
    },
    isOutOfScreen(pointers: [[number, number]]): boolean {
        // TODO calculate the current distance span
        return pointers.every((pointer) => {
            return true
        })
    }
};

export default store;
