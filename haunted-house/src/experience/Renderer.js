import * as THREE from "three";

import { fogColor } from "./constants";

export class Renderer {
  constructor() {
    this.experience = window.experience;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // размер области для рисования
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // вместо черного фона теперь будет фон тумана
    this.renderer.setClearColor(fogColor);

    // Shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.renderer.render(this.scene, this.camera.camera);
  }

  changeClearColor(newFogColor) {
    this.renderer.setClearColor(newFogColor);
  }
}
