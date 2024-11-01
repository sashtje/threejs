import * as THREE from "three";

import { fogColor } from "../constants";

import { EventEmitter } from "../utils/EventEmitter";

export class Environment extends EventEmitter {
  constructor() {
    super();

    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.debugObject = {
      fogColor,
      ambientLightColor: "#b9d5ff",
      moonLightColor: "#b9d5ff",
    };

    this.setFog();
    this.setLights();
  }

  setFog() {
    this.fog = new THREE.Fog(fogColor, 1, 15);
    this.scene.fog = this.fog;

    if (this.debug.active) {
      const fogFolder = this.debug.gui.addFolder("Fog");
      fogFolder
        .addColor(this.debugObject, "fogColor")
        .onChange(() => {
          this.fog.color.set(this.debugObject.fogColor);

          this.trigger("fogColorChange", [this.debugObject.fogColor]);
        })
        .name("Fog color");
    }
  }

  setLights() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(
      this.debugObject.ambientLightColor,
      0.03
    );
    this.scene.add(this.ambientLight);

    // Directional light
    this.moonLight = new THREE.DirectionalLight(
      this.debugObject.moonLightColor,
      0.03
    );
    this.moonLight.position.set(4, 5, -2);
    this.scene.add(this.moonLight);

    // Shadows
    this.moonLight.castShadow = true;

    // Debug
    if (this.debug.active) {
      const lightsFolder = this.debug.gui.addFolder("Lights");

      lightsFolder
        .add(this.ambientLight, "intensity")
        .min(0)
        .max(1)
        .step(0.001)
        .name("Ambient light intensity");
      lightsFolder
        .addColor(this.debugObject, "ambientLightColor")
        .onChange(() => {
          this.ambientLight.color.set(this.debugObject.ambientLightColor);
        })
        .name("Ambient light color");

      lightsFolder
        .add(this.moonLight, "intensity")
        .min(0)
        .max(1)
        .step(0.001)
        .name("Moon light intensity");
      lightsFolder
        .addColor(this.debugObject, "moonLightColor")
        .onChange(() => {
          this.moonLight.color.set(this.debugObject.moonLightColor);
        })
        .name("Moon light color");
    }
  }
}
