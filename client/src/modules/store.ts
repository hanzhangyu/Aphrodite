import bgData from 'assets/json/background.json';
import enemy from 'assets/json/enemy.json';
import { DATA_TYPE } from 'utils/consts'

console.log('bgData', bgData);

const store = {
    get(type: DATA_TYPE) {
        switch (type) {
            case DATA_TYPE.BACKGROUND:
                return bgData;
            default:
                return enemy;
        }
    }
};

export default store;