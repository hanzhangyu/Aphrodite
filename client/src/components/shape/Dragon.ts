const SHAPE = '! ((&(&*$($,&.)/-.0,4%3"7$;(@/EAA<?:<9;;88573729/7,6(8&;'
    .split("")
    .map((a, i) => a.charCodeAt(0) - 32);

export default class Dragon {
    private scale: number = 1;
    private direction: number = Math.PI / 2;
    private spine: any[] = [];
    private pfloat: number = 0;
    private wingPerpendicular: number = 0;
    private prepare: boolean = false;

    public speed: number = 3;

    constructor(
        public ctx: CanvasRenderingContext2D,
        public gx: number = 100,
        public gy: number = 300,
    ) {

    }

    draw() {
        if (!this.prepare) return;
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.gx += Math.sin(this.direction) * this.speed;
        this.gy += Math.cos(this.direction) * this.speed;

        for (let i = 0; i < 70; i++) {

            if (i) {

                if (!this.pfloat) this.spine[i] = { x: this.gx, y: this.gy }

                let p = this.spine[i - 1],
                    dx = this.spine[i].x - p.x,
                    dy = this.spine[i].y - p.y,
                    d = Math.sqrt(dx * dx + dy * dy),

                    perpendicular = Math.atan(dy / dx) + (dx < 0 ? -1 : 1) * Math.PI / 2;


                let mod;
                if (d > 4) {
                    mod = .5;
                } else if (d > 2) {
                    mod = (d - 2) / 4;
                } else {
                    mod = 0;
                }
                this.spine[i].x -= dx * mod;
                this.spine[i].y -= dy * mod;

                this.spine[i].px = Math.cos(perpendicular);
                this.spine[i].py = Math.sin(perpendicular);

                if (i == 20) {
                    this.wingPerpendicular = perpendicular;
                }

            } else {
                this.spine[i] = { x: this.gx, y: this.gy, px: 0, py: 0 };

            }

        }

        this.ctx.moveTo(this.spine[0].x, this.spine[0].y)

        for (let i = 0; i < 154; i += 2) {
            let index;
            let L;
            if (i < 77) {
                index = i;
                L = 1;
            } else {

                index = 152 - i;
                L = -1;
            }

            let x = SHAPE[index];

            let spineNode = this.spine[SHAPE[index + 1]];

            if (index >= 56) {

                let wobbleIndex = 56 - index;
                let wobble = Math.sin(wobbleIndex / 3 + this.pfloat * 0.1) * wobbleIndex * L;

                x = 20 - index / 4 + wobble;
                spineNode = this.spine[index * 2 - 83];

            } else if (index > 13) {
                x = 4 + (x - 4) * (Math.sin((-x / 2 + this.pfloat) / 25 * this.speed / 4) + 2);
                spineNode.px = Math.cos(this.wingPerpendicular);
                spineNode.py = Math.sin(this.wingPerpendicular);
            }
            this.ctx.lineTo(
                (spineNode.x + x * L * spineNode.px) * this.scale,
                (spineNode.y + x * L * spineNode.py) * this.scale
            );
        }
        this.ctx.fill();
        this.ctx.restore();


        this.pfloat++;
    }

    start() {
        this.prepare = true;
    }
}
