namespace egret3d {
    /**
     * 平行光组件。
     */
    export class DirectionalLight extends BaseLight {

        public initialize() {
            super.initialize();

            // this.shadow.renderTarget = new GlRenderTarget("DirectionalLightShadow", this.shadow.size, this.shadow.size, true); // TODO
            this.shadow.update = this._updateShadow.bind(this);
        }

        private _updateShadow() {
            const shadow = this.shadow;
            const shadowMatrix = shadow.matrix;
            const shadowCamera = shadow.camera;
            const transform = this.gameObject.transform;
            if (!shadow.renderTarget) {
                const shadowSize = Math.min(shadow.size, renderState.maxTextureSize);
                shadow.renderTarget = RenderTexture.create(
                    {
                        width: shadowSize, height: shadowSize,
                        minFilter: gltf.TextureFilter.Nearest, magFilter: gltf.TextureFilter.Nearest,
                        format: gltf.TextureFormat.RGBA
                    }
                );
            }
            //
            shadowCamera.transform.position.copy(transform.position).update();
            shadowCamera.transform.lookAt(Vector3.ZERO);
            // shadowCamera.transform.rotation.copy(transform.rotation).update();
            // shadowCamera.far = 500;
            // shadowCamera.near = 0.5;
            // shadowCamera.size = 10.0;
            // shadowCamera.opvalue = 0.0;
            // shadowCamera.worldToCameraMatrix = transform.worldToLocalMatrix;
            shadowCamera.projectionMatrix = egret3d.Matrix4.create().fromProjection(shadowCamera.fov, shadow.near, shadow.far, 10.0, 0.0, 1.0, stage.matchFactor).release();
            // matrix * 0.5 + 0.5, after identity, range is 0 ~ 1 instead of -1 ~ 1
            shadowMatrix.set(
                0.5, 0.0, 0.0, 0.5,
                0.0, 0.5, 0.0, 0.5,
                0.0, 0.0, 0.5, 0.5,
                0.0, 0.0, 0.0, 1.0
            );

            shadowMatrix.multiply(shadowCamera.projectionMatrix);
            shadowMatrix.multiply(shadowCamera.worldToCameraMatrix);
        }

        // private _updateShadow(light: DirectionalLight, shadow: LightShadow) {
        // shadow.camera.opvalue = 0.0; // Orthographic camera.
        // shadow.camera.renderTarget = shadow.renderTarget;
        // // shadow.viewPortPixel.set(0, 0, this.shadowSize, this.shadowSize);

        // this._updateShadowMatrix(camera);
        // }
    }
}