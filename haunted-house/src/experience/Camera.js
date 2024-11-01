import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { fieldX, fieldZ } from "./constants";

export class Camera {
  constructor() {
    this.experience = window.experience;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    this.setCamera();
    this.setOrbitControls();
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.camera.position.set(9, 2, 8);
    this.scene.add(this.camera);

    // debug
    if (this.debug.active) {
      const cameraFolder = this.debug.gui.addFolder("Camera");

      cameraFolder
        .add(this.camera.position, "x")
        .min(-fieldX)
        .max(fieldX)
        .step(0.001);
      cameraFolder.add(this.camera.position, "y").min(-5).max(5).step(0.001);
      cameraFolder
        .add(this.camera.position, "z")
        .min(-fieldZ)
        .max(fieldZ)
        .step(0.001);
    }
  }

  setOrbitControls() {
    // для управления камерой при помощи мышки
    this.controls = new OrbitControls(this.camera, this.canvas);
    // для плавной анимации
    this.controls.enableDamping = true;
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
