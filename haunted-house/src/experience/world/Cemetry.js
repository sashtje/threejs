import * as THREE from "three";

import { grassHeight } from "../constants";
import { enableShadowsForGroup } from "../utils/enableShadowsForGroup";

export class Cemetry {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items;
    this.debug = this.experience.debug;

    this.debugObject = {
      gravesCount: 40,
    };

    this.setGraveModel();
    this.setCemetry();
    this.setDebug();
  }

  setGraveModel() {
    // grave model
    const gravePatternScale = 0.3;

    this.gravePattern = this.resources.gravePattern.scene;
    this.gravePattern.scale.set(
      gravePatternScale,
      gravePatternScale,
      gravePatternScale
    );
  }

  setCemetry() {
    this.cemetery = new THREE.Group();

    for (let i = 0; i < this.debugObject.gravesCount; i++) {
      const grave = this.gravePattern.clone();
      const angle = Math.random() * 2 * Math.PI;
      const radius = 6 + Math.random() * 3.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      grave.position.set(x, grassHeight + 0.05, z);

      this.cemetery.add(grave);

      // Shadows
      enableShadowsForGroup({ group: grave, cast: true });
    }

    this.scene.add(this.cemetery);
  }

  destroyCemetry() {
    if (!this.cemetery) {
      return;
    }

    this.scene.remove(this.cemetery);

    this.cemetery.traverse((child) => {
      if (child.isMesh) {
        // free geometry
        child.geometry.dispose();

        // free material
        if (child.material.isMaterial) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              disposeTexture(material);
              material.dispose();
            });
          } else {
            disposeTexture(child.material);
            child.material.dispose();
          }
        }
      }
    });

    function disposeTexture(material) {
      // free textures
      if (material.map) {
        material.map.dispose();
      }
    }
  }

  setDebug() {
    if (!this.debug.active) {
      return;
    }

    const cemetryFolder = this.debug.gui.addFolder("Cemetry");
    cemetryFolder
      .add(this.debugObject, "gravesCount")
      .min(30)
      .max(100)
      .step(1)
      .onFinishChange(() => {
        this.destroyCemetry();

        this.setCemetry();
      });
  }
}
