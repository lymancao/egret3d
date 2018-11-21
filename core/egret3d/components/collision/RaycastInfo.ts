namespace egret3d {
    /**
     * 射线检测信息。
     */
    export class RaycastInfo extends paper.BaseRelease<RaycastInfo>  {
        private static readonly _instances: RaycastInfo[] = [];
        /**
         * 创建一个射线检测信息实例。
         */
        public static create() {
            if (this._instances.length > 0) {
                const instance = this._instances.pop()!;
                instance._released = false;
                return instance;
            }

            return new RaycastInfo();
        }

        public backfaceCulling: boolean = true;
        public subMeshIndex: number = -1;
        public triangleIndex: number = -1;
        /**
         * 交点到射线起始点的距离。
         */
        public distance: number = 0.0;
        /**
         * 相交的点。
         */
        public readonly position: Vector3 = Vector3.create();
        /**
         * 相交的 UV 坐标。
         */
        public readonly coord: Vector2 = Vector2.create();
        /**
         * 相交的法线。
         * - 提供法线向量将计算法线。
         */
        public normal: Vector3 | null = null;
        public textureCoordA: Vector2 | null = null;
        public textureCoordB: Vector2 | null = null;
        /**
         * 相交的变换组件。（如果有的话）
         */
        public transform: Transform | null = null;
        /**
         * 相交的碰撞组件。（如果有的话）
         */
        public collider: ICollider | null = null;
        /**
         * 相交的刚体组件。（如果有的话）
         */
        public rigidbody: any | null = null;

        private constructor() {
            super();
        }

        public onClear() {
            this.clear();
        }

        public clear() {
            this.subMeshIndex = -1;
            this.triangleIndex = -1;
            this.distance = 0.0;
            this.position.set(0.0, 0.0, 0.0);
            this.coord.set(0.0, 0.0);
            this.normal = null;
            this.textureCoordA = null;
            this.textureCoordB = null;
            this.transform = null;
            this.collider = null;
            this.rigidbody = null;
        }
    }
}