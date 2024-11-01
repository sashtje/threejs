import * as THREE from "three";

import { fieldX, fieldZ, grassHeight } from "../constants";

export class Ground {
  grassRepeatCount = 8;
  groundSegments = 500;

  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items;

    this.setTextures();
    this.setGround();
  }

  setTextures() {
    this.textures = {
      map: this.resources.grassColorTexture,
      normalMap: this.resources.grassNormalTexture,
      aoMap: this.resources.grassAmbientOcclusionTexture,
      roughnessMap: this.resources.grassRoughnessTexture,
      displacementMap: this.resources.grassDisplacementTexture,
    };

    this.resources.grassColorTexture.colorSpace = THREE.SRGBColorSpace;

    for (const texture of Object.values(this.textures)) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(this.grassRepeatCount, this.grassRepeatCount);
    }
  }

  setGround() {
    this.geometry = new THREE.PlaneGeometry(
      fieldX,
      fieldZ,
      this.groundSegments,
      this.groundSegments
    );
    this.material = new THREE.MeshStandardMaterial({
      ...this.textures,
      displacementScale: grassHeight,
    });

    this.ground = new THREE.Mesh(this.geometry, this.material);

    this.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.scene.add(this.ground);

    // Shadows
    this.ground.receiveShadow = true;
  }
}
