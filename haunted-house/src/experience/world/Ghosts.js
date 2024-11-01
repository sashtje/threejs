import * as THREE from "three";

import { fieldX, fieldZ, grassHeight } from "../constants";
import { enableShadowsForGroup } from "../utils/enableShadowsForGroup";

export class Ghosts {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.camera;
    this.time = this.experience.time;
    this.resources = this.experience.resources.items;
    this.debug = this.experience.debug;

    this.debugObject = {
      ghostLightColor: "#ffff00",
      ghostOnTheRoofLightColor: "#ff00ff",
      roundGhostLightColor: "#00ffff",
    };

    this.animationSettings = {
      ghostWasAbove: false,
      roundGhostWasAbove: false,
    };
    this.setGhost();
    this.setGhostOnTheRoof();
    this.setRoundGhost();
    this.setDebug();
  }

  setGhost() {
    this.ghostLight = new THREE.PointLight(
      this.debugObject.ghostLightColor,
      2,
      3
    );
    this.ghostLight.position.set(0, 0.8, 0);

    this.ghostModel = this.resources.ghostModel;
    const ghostModelScale = 0.001;
    this.ghostModel.scale.set(
      ghostModelScale,
      ghostModelScale,
      ghostModelScale
    );
    this.ghostModel.position.set(0, grassHeight, 0);

    this.ghost = new THREE.Group();
    this.ghost.add(this.ghostModel);
    this.ghost.add(this.ghostLight);

    this.scene.add(this.ghost);
    this.setRandomPosition(this.ghost);

    // Shadows
    enableShadowsForGroup({
      group: this.ghost,
      cast: true,
    });
    this.ghostLight.castShadow = true;
  }

  setGhostOnTheRoof() {
    this.ghostOnTheRoofLight = new THREE.PointLight(
      this.debugObject.ghostOnTheRoofLightColor,
      2,
      3
    );
    this.ghostOnTheRoofLight.position.set(0, 0.8, 0);

    this.ghostOnTheRoofModel = this.ghostModel.clone();

    this.ghostOnTheRoof = new THREE.Group();
    this.ghostOnTheRoof.add(this.ghostOnTheRoofModel);
    this.ghostOnTheRoof.add(this.ghostOnTheRoofLight);

    this.scene.add(this.ghostOnTheRoof);

    // Shadows
    enableShadowsForGroup({
      group: this.ghostOnTheRoof,
      cast: true,
    });
    this.ghostOnTheRoofLight.castShadow = true;
  }

  setRoundGhost() {
    const roundGhostScale = 0.5;
    this.roundGhost = new THREE.Group();

    // body
    this.bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    this.bodyMaterial = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    this.body = new THREE.Mesh(this.bodyGeometry, this.bodyMaterial);

    // eyes
    this.eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    this.eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    this.eyeLeft = new THREE.Mesh(this.eyeGeometry, this.eyeMaterial);
    this.eyeRight = new THREE.Mesh(this.eyeGeometry, this.eyeMaterial);

    this.eyeLeft.position.set(-0.25, 0.3, 0.85);
    this.eyeRight.position.set(0.25, 0.3, 0.85);

    // light
    this.roundGhostLight = new THREE.PointLight(
      this.debugObject.roundGhostLightColor,
      3,
      5
    );

    // add to roundGhost
    this.roundGhost.add(this.body);
    this.roundGhost.add(this.eyeLeft);
    this.roundGhost.add(this.eyeRight);
    this.roundGhost.add(this.roundGhostLight);

    this.roundGhost.scale.set(
      roundGhostScale,
      roundGhostScale,
      roundGhostScale
    );
    this.setRandomPosition(this.roundGhost);

    this.scene.add(this.roundGhost);
  }

  setDebug() {
    if (!this.debug.active) {
      return;
    }

    const ghostsFolder = this.debug.gui.addFolder("Ghosts");

    ghostsFolder
      .addColor(this.debugObject, "ghostLightColor")
      .onChange(() => {
        this.ghostLight.color.set(this.debugObject.ghostLightColor);
      })
      .name("Ghost light color");

    ghostsFolder
      .addColor(this.debugObject, "ghostOnTheRoofLightColor")
      .onChange(() => {
        this.ghostOnTheRoofLight.color.set(
          this.debugObject.ghostOnTheRoofLightColor
        );
      })
      .name("Ghost on the roof light color");

    ghostsFolder
      .addColor(this.debugObject, "roundGhostLightColor")
      .onChange(() => {
        this.roundGhostLight.color.set(this.debugObject.roundGhostLightColor);
      })
      .name("Round ghost light color");
  }

  ghostsUpdate() {
    this.elapsedTime = this.time.elapsedTime;

    if (this.ghostOnTheRoof) {
      this.ghostOnTheRoof.position.y = 4.5 + Math.sin(this.elapsedTime) * 0.5;

      this.ghostOnTheRoof.lookAt(this.camera.position);
    }

    this.animateGhost(this.ghost, 0.5, "ghostWasAbove");
    this.animateGhost(this.roundGhost, 1, "roundGhostWasAbove");

    // addition to roundGhost animation
    this.bodyMaterial.opacity = 0.5 + 0.2 * Math.sin(this.elapsedTime * 2);
    this.roundGhost.lookAt(this.camera.position);
  }

  animateGhost(ghost, ghostPositionSpeed, ghostWasAbove) {
    if (ghost) {
      ghost.position.y = Math.sin(this.elapsedTime * ghostPositionSpeed) * 2;
      ghost.rotation.y += Math.sin(this.elapsedTime * 0.5) * 0.01;

      if (!this.animationSettings[ghostWasAbove] && ghost.position.y > 0) {
        this.animationSettings[ghostWasAbove] = true;
      }

      if (ghost.position.y < -1.8) {
        if (this.animationSettings[ghostWasAbove]) {
          this.setRandomPosition(ghost);
          this.setRandomAngle(ghost);

          this.animationSettings[ghostWasAbove] = false;
        }
      }
    }
  }

  setRandomPosition(obj) {
    obj.position.set(
      (Math.random() - 0.5) * fieldX,
      -2,
      (Math.random() - 0.5) * fieldZ
    );
  }

  setRandomAngle(obj) {
    obj.rotation.y = Math.random() * 2 * Math.PI;
  }
}
