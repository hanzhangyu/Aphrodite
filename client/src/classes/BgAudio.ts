import {average} from "utils/helper";

export default class AnalysisAudio {
    private source: AudioBufferSourceNode = null;
    private analyser: AnalyserNode = null;
    private data: Uint8Array = null;
    public end: boolean = false;

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
        this.source.onended = () => {
            this.end = true;
        };
        this.source.connect(this.analyser);
        // connect analyser to actual audio-rendering device
        this.analyser.connect(atx.destination);
        // put the audio buffer to analyser through source
        this.source.buffer = buffer;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
    }

    play() {
        this.source.start(0); // test with offset 200
    }

    updateData() {
        this.analyser.getByteFrequencyData(this.data);
    }

    getLevel() {
        this.updateData();
        return average(...this.data);
    }
}
