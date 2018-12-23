/**
 * @file 画板基类，出此以外的两个辅助类都是超类
 * @constructor
 */

export default abstract class Base {
    protected readonly width: number;
    protected readonly height: number;
    public isDestroy: boolean;

    protected constructor(
        public readonly id: number,
    ) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    destroy() {
        this.isDestroy = true;
    };

    shouldAlive(distance: number) : boolean {
        return true;
    }
}
