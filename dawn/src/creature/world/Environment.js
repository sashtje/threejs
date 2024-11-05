import * as THREE from "three";

import { EventEmitter } from "../utils/EventEmitter";

export class Environment extends EventEmitter {
  delayBetween = 2;
  animationHasStarted = false;
  lastTime = null;
  radius = 5;
  x = this.radius;
  y = 0;
  z = 1;
  maxBlueColor = 200;
  maxIntensity = 1;

  constructor() {
    super();

    this.creature = window.creature;
    this.scene = this.creature.scene;
    this.renderer = this.creature.renderer;
    this.time = this.creature.time;
    this.debug = this.creature.debug;

    this.debugObject = {
      ambientLightColor: "#b9d5ff",
      sunLightColor: "#ffffff",
    };

    // Debug
    if (this.debug.active) {
      this.debugLightsFolder = this.debug.gui.addFolder("Lights");
    }

    this.setAmbientLight();
    this.setSunLight();
  }

  setAmbientLight() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(
      this.debugObject.ambientLightColor,
      0.08
    );
    this.scene.add(this.ambientLight);

    // Debug
    if (this.debug.active) {
      this.debugLightsFolder
        .add(this.ambientLight, "intensity")
        .min(0)
        .max(1)
        .step(0.001)
        .name("Ambient light intensity");
      this.debugLightsFolder
        .addColor(this.debugObject, "ambientLightColor")
        .onChange(() => {
          this.ambientLight.color.set(this.debugObject.ambientLightColor);
        })
        .name("Ambient light color");
    }
  }

  setSunLight() {
    // Directional light
    this.sunLight = new THREE.DirectionalLight(
      this.debugObject.sunLightColor,
      0
    );
    this.sunLight.position.set(this.x, this.y, this.z);
    this.scene.add(this.sunLight);

    // Shadows
    this.sunLight.castShadow = true;

    // Debug
    if (this.debug.active) {
      this.debugLightsFolder
        .addColor(this.debugObject, "sunLightColor")
        .onChange(() => {
          this.ambientLight.color.set(this.debugObject.sunLightColor);
        })
        .name("Sun light color");
    }
  }

  update() {
    const speedFactor = this.time.deltaTime / 10;

    if (!this.lastTime && !this.animationHasStarted) {
      this.lastTime = this.time.elapsedTime;
    } else if (
      this.time.elapsedTime - this.lastTime > this.delayBetween ||
      this.animationHasStarted
    ) {
      if (!this.animationHasStarted) {
        this.animationHasStarted = true;
        this.lastTime = null;
        this.x = this.radius;
        this.y = 0;
        this.intensity = 0;
        this.color = 0;
      } else {
        this.x -= speedFactor * 2 * this.radius;

        if (this.x >= 0) {
          this.color += 2 * this.maxBlueColor * speedFactor;
          this.intensity += 2 * this.maxIntensity * speedFactor;
        } else {
          this.color -= 2 * this.maxBlueColor * speedFactor;
          this.intensity -= 2 * this.maxIntensity * speedFactor;
        }

        this.sunLight.intensity = this.intensity;
        this.renderer.changeClearColor(this.getHexColor());

        if (this.x < -this.radius) {
          this.x = -this.radius;
          this.animationHasStarted = false;
          this.sunLight.intensity = 0;
          this.renderer.changeClearColor(0x000000);
        }

        this.y = Math.sqrt(this.radius ** 2 - this.x ** 2);
      }

      this.sunLight.position.set(this.x, this.y, this.z);
    }
  }

  getHexColor() {
    let resultColor;

    if (this.color > this.maxBlueColor) {
      resultColor = this.maxBlueColor;
    } else if (this.color < 0) {
      resultColor = 0;
    } else {
      resultColor = Math.round(this.color);
    }

    return `#0000${resultColor.toString(16).padStart(2, "0")}`;
  }
}
