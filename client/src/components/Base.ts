/**
 * @file 画板基类，出此以外的两个辅助类都是超类
 * @constructor
 */

export default class Base {
    isDestory: Boolean

    constructor(
        public readonly id: number,
    ) {
        
    }

    destory() {
        this.isDestory = true;
    };
}