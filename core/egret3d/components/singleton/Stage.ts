namespace egret3d {
    /**
     * 舞台组件。
     */
    export class Stage extends paper.SingletonComponent {
        public static onResize: signals.Signal = new signals.Signal();

        public rotated: boolean = false;

        private readonly _screenSize: egret3d.ISize = { w: 1024, h: 1024 };
        private readonly _size: egret3d.ISize = { w: 1024, h: 1024 };
        private readonly _viewport: egret3d.IRectangle = { x: 0, y: 0, w: 0, h: 0 };

        private _updateViewport() {
            const screenSize = this._screenSize;
            const size = this._size;
            const viewport = this._viewport;
            viewport.w = Math.ceil(size.w);

            if (this.rotated = size.w > size.h ? screenSize.h > screenSize.w : screenSize.w > screenSize.h) {
                viewport.h = Math.ceil(viewport.w / screenSize.h * screenSize.w);
            }
            else {
                viewport.h = Math.ceil(viewport.w / screenSize.w * screenSize.h);
            }
        }

        public initialize(config: { size: Readonly<ISize>, screenSize: Readonly<ISize> }) {
            super.initialize();

            stage = this;

            this._size.w = config.size.w;
            this._size.h = config.size.h;
            this._screenSize.w = config.screenSize.w;
            this._screenSize.h = config.screenSize.h;
            this._updateViewport();
        }
        /**
         * 屏幕尺寸。
         */
        public get screenSize(): Readonly<egret3d.ISize> {
            return this._screenSize;
        }
        public set screenSize(value: Readonly<egret3d.ISize>) {
            this._screenSize.w = value.w;
            this._screenSize.h = value.h;
            this._updateViewport();

            Stage.onResize.dispatch(this);
        }
        /**
         * 渲染尺寸。
         */
        public get size(): Readonly<egret3d.ISize> {
            return this._size;
        }
        public set size(value: Readonly<egret3d.ISize>) {
            this._size.w = value.w;
            this._size.h = value.h;
            this._updateViewport();

            Stage.onResize.dispatch(this);
        }
        /**
         * 渲染视口。
         */
        public get viewport(): Readonly<egret3d.IRectangle> {
            return this._viewport;
        }

        /**
         * @deprecated
         */
        public get screenViewport() {
            return this._viewport;
        }
    }
    /**
     * @deprecated
     */
    export let stage: Stage = null!;
}
