import {LETTER} from 'utils/consts';

class Marquee {
    private node = document.getElementById('marquee');
    private letter = LETTER.map((letter: string) => `<p>${letter}</p>`).join('');
    constructor() {
    }

    init() {
        this.node.innerHTML = this.letter;
        this.node.classList.remove('hidden');
        this.node.style.animationDuration = '180s';
        this.node.style.animationPlayState = 'running';
    }

    destory() {
        this.node.innerHTML = 'this.letter';
        this.node.classList.add('hidden');
        this.node.style.animationPlayState = 'pause';
    }
}


export default new Marquee();
