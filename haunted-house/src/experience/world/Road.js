import * as THREE from "three";

import {
  fieldZ,
  basementX,
  basementZ,
  step1Z,
  step2Z,
  step3Z,
  roadWidth,
} from "../constants";

export class Road {
  roadRepeatCountX = 1;
  roadRepeatCountZ = 5;

  forwardRoadLength = fieldZ / 2 - basementZ / 2 - step1Z - step2Z - step3Z;
  secondarySideRoadLength = 7;
  secondaryRoadLength = 9;
  roadHeight = 0.1;
  roadSegments = 100;

  roadRotationX = -Math.PI / 2;
  roadPositionY = -0.04;

  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items;
    this.debug = this.experience.debug;

    this.setTextures();
    this.setRoad();
  }

  setTextures() {
    this.textures = {
      map: this.resources.roadColorTexture,
      normalMap: this.resources.roadNormalTexture,
      aoMap: this.resources.roadARMTexture,
      roughnessMap: this.resources.roadARMTexture,
      metalnessMap: this.resources.roadARMTexture,
      bumpMap: this.resources.roadBumpTexture,
      displacementMap: this.resources.roadDisplacementTexture,
    };

    this.resources.roadColorTexture.colorSpace = THREE.SRGBColorSpace;

    for (const texture of Object.values(this.textures)) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(this.roadRepeatCountX, this.roadRepeatCountZ);
    }
  }

  setRoad() {
    this.forwardRoadGeometry = new THREE.PlaneGeometry(
      roadWidth,
      this.forwardRoadLength,
      this.roadSegments,
      this.roadSegments
    );
    this.forwardRoadGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        this.forwardRoadGeometry.attributes.uv.array,
        2
      )
    );

    this.secondarySideRoadGeometry = new THREE.PlaneGeometry(
      roadWidth,
      this.secondarySideRoadLength,
      this.roadSegments,
      this.roadSegments
    );
    this.secondarySideRoadGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        this.secondarySideRoadGeometry.attributes.uv.array,
        2
      )
    );

    this.secondaryRoadGeometry = new THREE.PlaneGeometry(
      roadWidth,
      this.secondaryRoadLength,
      this.roadSegments,
      this.roadSegments
    );
    this.secondaryRoadGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        this.secondaryRoadGeometry.attributes.uv.array,
        2
      )
    );

    this.material = new THREE.MeshStandardMaterial({
      ...this.textures,
      displacementScale: this.roadHeight,
    });

    // Forward road
    this.forwardRoad = new THREE.Mesh(this.forwardRoadGeometry, this.material);

    this.forwardRoad.rotation.x = this.roadRotationX;
    this.forwardRoad.position.y = this.roadPositionY;
    this.forwardRoad.position.z =
      basementZ / 2 + step1Z + step2Z + step3Z + this.forwardRoadLength / 2;

    // Right road
    this.rightRoad = new THREE.Mesh(this.secondaryRoadGeometry, this.material);
    this.rightRoad.rotation.x = this.roadRotationX;
    this.rightRoad.position.y = this.roadPositionY;
    this.rightRoad.position.x = basementX / 2 + 1 + roadWidth / 2;

    // Left road
    this.leftRoad = this.rightRoad.clone();
    this.leftRoad.position.x = -basementX / 2 - 1 - roadWidth / 2;

    // Back road
    this.backRoad = new THREE.Mesh(this.secondaryRoadGeometry, this.material);
    this.backRoad.rotation.x = this.roadRotationX;
    this.backRoad.rotation.z = this.roadRotationX;
    this.backRoad.position.y = this.roadPositionY;
    this.backRoad.position.z = -basementZ / 2 - 1 - roadWidth / 2;

    // Front road
    this.frontRoad = this.backRoad.clone();
    this.frontRoad.position.z = basementZ / 2 + 1 + roadWidth / 2;

    // Shadows
    this.forwardRoad.receiveShadow = true;

    this.rightRoad.receiveShadow = true;
    this.leftRoad.receiveShadow = true;
    this.backRoad.receiveShadow = true;
    this.frontRoad.receiveShadow = true;

    // show
    this.scene.add(
      this.forwardRoad,
      this.rightRoad,
      this.leftRoad,
      this.backRoad,
      this.frontRoad
    );
  }
}
