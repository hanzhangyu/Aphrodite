import {average} from "utils/helper";

export default class AnalysisAudio {
    private source: AudioBufferSourceNode = null;
    private analyser: AnalyserNode = null;
    private data: Uint8Array = null;

    constructor(
        public url: string,
    ) {

    }

    async load() {
        const atx = new AudioContext();
        const arrayBuffer = await fetch(this.url).then(res => res.arrayBuffer());
        const buffer = await atx.decodeAudioData(arrayBuffer);
        this.analyser = atx.createAnalyser();
        this.source = atx.createBufferSource();
        this.source.connect(this.analyser);
        // connect analyser to actual audio-rendering device
        this.analyser.connect(atx.destination);
        // put the audio buffer to analyser through source
        this.source.buffer = buffer;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
    }

    play() {
        this.source.start(0);
    }

    updateData() {
        this.analyser.getByteFrequencyData(this.data);
    }

    getLevel() {
        this.updateData();
        return average(...this.data);
    }
}
