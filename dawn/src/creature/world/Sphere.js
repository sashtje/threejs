import * as THREE from "three";

export class Sphere {
  radius = 1;

  constructor({ x, z } = { x: 0, z: 0 }) {
    this.creature = window.creature;
    this.scene = this.creature.scene;
    this.x = x;
    this.z = z;

    this.setSphere();
  }

  setSphere() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius, 32, 32),
      new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
    );
    this.sphere.position.set(this.x, this.radius, this.z);

    this.scene.add(this.sphere);

    // Shadows
    this.sphere.castShadow = true;
  }
}
