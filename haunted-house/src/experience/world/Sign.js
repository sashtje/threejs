import * as THREE from "three";

import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

import { roadWidth, basementZ } from "../constants";
import { enableShadowsForGroup } from "../utils/enableShadowsForGroup";

export class Sign {
  stickWidth = 0.09;
  stickHeight = 1;
  stickDepth = 0.05;

  boardWidth = 1;
  boardHeight = 0.5;
  boardDepth = this.stickDepth;

  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items;
    this.debug = this.experience.debug;

    this.debugObject = {
      signColor: "#ffd285",
    };

    this.setSign();
  }

  setSign() {
    this.sign = new THREE.Group();

    // stick
    this.stickGeometry = new THREE.BoxGeometry(
      this.stickWidth,
      this.stickHeight,
      this.stickDepth
    );
    this.signMaterial = new THREE.MeshStandardMaterial({
      color: this.debugObject.signColor,
    });
    this.stick = new THREE.Mesh(this.stickGeometry, this.signMaterial);

    // board
    this.boardGroup = new THREE.Group();
    this.boardGeometry = new THREE.BoxGeometry(
      this.boardWidth,
      this.boardHeight,
      this.boardDepth
    );
    this.board = new THREE.Mesh(this.boardGeometry, this.signMaterial);

    this.boardGroup.position.set(
      0,
      this.stickHeight / 2 - this.boardHeight / 2,
      this.stickDepth
    );

    this.sign.position.set(
      roadWidth + this.stickWidth,
      this.stickHeight / 2,
      basementZ / 2 + 2 * roadWidth + this.stickDepth + 0.5
    );

    this.textGeometry = new TextGeometry("Haunted house", {
      font: this.resources.font,
      size: 0.07,
      depth: 0.002,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.002,
      bevelOffset: 0,
      bevelSegments: 4,
    });
    this.textGeometry.center();
    this.fontMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.resources.matcapTexture,
    });
    this.text = new THREE.Mesh(this.textGeometry, this.fontMaterial);
    this.text.position.z = 0.03;

    // add to scene
    this.sign.add(this.stick);
    this.sign.add(this.boardGroup);

    this.boardGroup.add(this.board);
    this.boardGroup.add(this.text);

    this.scene.add(this.sign);

    // Shadows
    enableShadowsForGroup({
      group: this.sign,
      cast: true,
      receive: true,
    });

    // Debug
    if (this.debug.active) {
      const signFolder = this.debug.gui.addFolder("Sign");

      signFolder
        .addColor(this.debugObject, "signColor")
        .onChange(() => {
          this.signMaterial.color.set(this.debugObject.signColor);
        })
        .name("Color");
    }
  }
}
