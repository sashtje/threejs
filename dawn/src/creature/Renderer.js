import * as THREE from "three";

export class Renderer {
  constructor() {
    this.creature = window.creature;
    this.canvas = this.creature.canvas;
    this.sizes = this.creature.sizes;
    this.scene = this.creature.scene;
    this.camera = this.creature.camera;

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

  changeClearColor(newColor) {
    this.renderer.setClearColor(newColor);
  }
}
