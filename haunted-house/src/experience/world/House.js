import * as THREE from "three";

import { enableShadowsForGroup } from "../utils/enableShadowsForGroup";
import {
  basementX,
  basementY,
  basementZ,
  grassHeight,
  step1X,
  step1Y,
  step1Z,
  step2X,
  step2Y,
  step2Z,
  step3X,
  step3Y,
  step3Z,
} from "../constants";

export class House {
  houseX = 4;
  houseZ = 4;
  houseY = 2.5;
  floorHeight = 0.1;

  windowSize = 1.5;
  bigWallWidth = this.houseX + 0.2;
  wallDepth = 0.1;

  bottomPartHeight = 0.72;
  rightPartHeight = this.houseY - 2 * this.bottomPartHeight;
  rightPartLength = 1.35;
  bigRightPartLength = 1.45;

  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items;
    this.debug = this.experience.debug;

    this.debugObject = {
      doorLightColor: "#ff7d46",
      floorLampLightColor: "#ffff00",
    };

    this.house = new THREE.Group();
    this.scene.add(this.house);

    this.setBasementAndStairs();
    this.setFloor();
    this.setWalls();
    this.setWindows();
    this.setDoor();
    this.setRoof();
    this.setFurniture();

    this.setDebug();

    //Shadows
    enableShadowsForGroup({
      group: this.house,
      cast: true,
      receive: true,
    });
  }

  setBasementAndStairs() {
    const basementColorTexture = this.resources.basementColorTexture;
    basementColorTexture.colorSpace = THREE.SRGBColorSpace;

    // Basement
    this.concreteMaterial = new THREE.MeshStandardMaterial({
      map: basementColorTexture,
      normalMap: this.resources.basementNormalTexture,
      aoMap: this.resources.basementARMTexture,
      roughnessMap: this.resources.basementARMTexture,
      metalnessMap: this.resources.basementARMTexture,
      bumpMap: this.resources.basementBumpTexture,
    });

    this.basement = new THREE.Mesh(
      new THREE.BoxGeometry(basementX, basementY, basementZ),
      this.concreteMaterial
    );
    this.basement.geometry.attributes.uv2 =
      this.basement.geometry.attributes.uv;
    this.basement.position.y = grassHeight + basementY / 2;

    // Stairs
    this.step1 = new THREE.Mesh(
      new THREE.BoxGeometry(step1X, step1Y, step1Z),
      this.concreteMaterial
    );
    this.step1.geometry.attributes.uv2 = this.step1.geometry.attributes.uv;
    this.step1.position.y = grassHeight + step1Y / 2;
    this.step1.position.z = basementZ / 2 + step1Z / 2;

    this.step2 = new THREE.Mesh(
      new THREE.BoxGeometry(step2X, step2Y, step2Z),
      this.concreteMaterial
    );
    this.step2.geometry.attributes.uv2 = this.step2.geometry.attributes.uv;
    this.step2.position.y = grassHeight + step2Y / 2;
    this.step2.position.z = basementZ / 2 + step1Z + step2Z / 2;

    this.step3 = new THREE.Mesh(
      new THREE.BoxGeometry(step3X, step3Y, step3Z),
      this.concreteMaterial
    );
    this.step3.geometry.attributes.uv2 = this.step3.geometry.attributes.uv;
    this.step3.position.y = grassHeight + step3Y / 2;
    this.step3.position.z = basementZ / 2 + step1Z + step2Z + step3Z / 2;

    // add to scene
    this.house.add(this.basement, this.step1, this.step2, this.step3);
  }

  repeatTexture(texture, countX, countZ, rotation) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(countX, countZ);

    if (rotation) {
      texture.rotation = rotation;
    }
  }

  setFloor() {
    const floorRepeatCount = 4;
    const floorColorTexture = this.resources.floorColorTexture;
    floorColorTexture.colorSpace = THREE.SRGBColorSpace;
    this.repeatTexture(floorColorTexture, floorRepeatCount, floorRepeatCount);

    const floorARMTexture = this.resources.floorARMTexture;
    this.repeatTexture(floorARMTexture, floorRepeatCount, floorRepeatCount);

    const floorNormalTexture = this.resources.floorNormalTexture;
    this.repeatTexture(floorNormalTexture, floorRepeatCount, floorRepeatCount);

    this.floorMaterial = new THREE.MeshStandardMaterial({
      map: floorColorTexture,
      normalMap: floorNormalTexture,
      aoMap: floorARMTexture,
      roughnessMap: floorARMTexture,
      metalnessMap: floorARMTexture,
    });

    this.floor = new THREE.Mesh(
      new THREE.BoxGeometry(this.houseX, this.floorHeight, this.houseZ),
      this.floorMaterial
    );
    this.floor.geometry.attributes.uv2 = this.floor.geometry.attributes.uv;
    this.floor.position.y = grassHeight + basementY + this.floorHeight / 2;

    this.house.add(this.floor);
  }

  setWalls() {
    // Textures
    const wallColorTexture = this.resources.wallColorTexture;
    wallColorTexture.colorSpace = THREE.SRGBColorSpace;
    const wallARMTexture = this.resources.wallARMTexture;
    const wallNormalTexture = this.resources.wallNormalTexture;

    // big
    const wallBigRepeatCountX = 4;
    const wallBigRepeatCountZ = 2.5;

    const wallColorTextureBig = wallColorTexture.clone();
    this.repeatTexture(
      wallColorTextureBig,
      wallBigRepeatCountX,
      wallBigRepeatCountZ
    );

    const wallARMTextureBig = wallARMTexture.clone();
    this.repeatTexture(
      wallARMTextureBig,
      wallBigRepeatCountX,
      wallBigRepeatCountZ
    );

    const wallNormalTextureBig = wallNormalTexture.clone();
    this.repeatTexture(
      wallNormalTextureBig,
      wallBigRepeatCountX,
      wallBigRepeatCountZ
    );

    // small
    const wallSmallRepeatCountX = 4;
    const wallSmallRepeatCountZ = 0.72;

    const wallColorTextureSmall = wallColorTexture.clone();
    this.repeatTexture(
      wallColorTextureSmall,
      wallSmallRepeatCountX,
      wallSmallRepeatCountZ
    );

    const wallARMTextureSmall = wallARMTexture.clone();
    this.repeatTexture(
      wallARMTextureSmall,
      wallSmallRepeatCountX,
      wallSmallRepeatCountZ
    );

    const wallNormalTextureSmall = wallNormalTexture.clone();
    this.repeatTexture(
      wallNormalTextureSmall,
      wallSmallRepeatCountX,
      wallSmallRepeatCountZ
    );

    // Walls
    this.wallMaterial = new THREE.MeshStandardMaterial({
      map: wallColorTexture,
      normalMap: wallNormalTexture,
      aoMap: wallARMTexture,
      roughnessMap: wallARMTexture,
      metalnessMap: wallARMTexture,
    });

    this.wallMaterialBig = new THREE.MeshStandardMaterial({
      map: wallColorTextureBig,
      normalMap: wallNormalTextureBig,
      aoMap: wallARMTextureBig,
      roughnessMap: wallARMTextureBig,
      metalnessMap: wallARMTextureBig,
    });

    this.wallMaterialSmall = new THREE.MeshStandardMaterial({
      map: wallColorTextureSmall,
      normalMap: wallNormalTextureSmall,
      aoMap: wallARMTextureSmall,
      roughnessMap: wallARMTextureSmall,
      metalnessMap: wallARMTextureSmall,
    });

    // wall with door
    this.wallWithDoor = new THREE.Mesh(
      new THREE.BoxGeometry(this.bigWallWidth, this.houseY, this.wallDepth),
      this.wallMaterialBig
    );
    this.wallWithDoor.geometry.attributes.uv2 =
      this.wallWithDoor.geometry.attributes.uv;
    this.wallWithDoor.position.y = grassHeight + basementY + this.houseY / 2;
    this.wallWithDoor.position.z = this.houseZ / 2 + this.wallDepth / 2;

    // right small wall with window
    this.rightSmallWall = new THREE.Group();

    this.bottomPart = new THREE.Mesh(
      new THREE.BoxGeometry(this.wallDepth, this.bottomPartHeight, this.houseZ),
      this.wallMaterialSmall
    );
    this.bottomPart.geometry.attributes.uv2 =
      this.bottomPart.geometry.attributes.uv;
    this.bottomPart.position.y =
      grassHeight + basementY + this.bottomPartHeight / 2;
    this.bottomPart.position.x = this.houseX / 2 + this.wallDepth / 2;

    this.topPart = this.bottomPart.clone();
    this.topPart.position.y =
      grassHeight + basementY + this.houseY - this.bottomPartHeight / 2;

    this.rightPart = new THREE.Mesh(
      new THREE.BoxGeometry(
        this.wallDepth,
        this.rightPartHeight,
        this.rightPartLength
      ),
      this.wallMaterial
    );
    this.rightPart.geometry.attributes.uv2 =
      this.rightPart.geometry.attributes.uv;
    this.rightPart.position.y = grassHeight + basementY + this.houseY / 2;
    this.rightPart.position.x = this.houseX / 2 + this.wallDepth / 2;
    this.rightPart.position.z =
      -this.windowSize / 2 + 0.1 - this.rightPartLength / 2;

    this.leftPart = this.rightPart.clone();
    this.leftPart.position.z =
      this.windowSize / 2 - 0.1 + this.rightPartLength / 2;

    this.rightSmallWall.add(this.bottomPart);
    this.rightSmallWall.add(this.topPart);
    this.rightSmallWall.add(this.rightPart);
    this.rightSmallWall.add(this.leftPart);

    // left small wall with window
    this.leftSmallWall = this.rightSmallWall.clone();
    this.leftSmallWall.rotation.y = -Math.PI;

    // big wall with window
    this.bigWallWithWindow = new THREE.Group();

    this.bigBottomPart = new THREE.Mesh(
      new THREE.BoxGeometry(
        this.houseZ + 0.2,
        this.bottomPartHeight,
        this.wallDepth
      ),
      this.wallMaterialSmall
    );
    this.bigBottomPart.geometry.attributes.uv2 =
      this.bigBottomPart.geometry.attributes.uv;
    this.bigBottomPart.position.y =
      grassHeight + basementY + this.bottomPartHeight / 2;
    this.bigBottomPart.position.z = -this.houseZ / 2 - this.wallDepth / 2;

    this.bigWallWithWindow.add(this.bigBottomPart);

    this.bigTopPart = this.bigBottomPart.clone();
    this.bigTopPart.position.y =
      grassHeight + basementY + this.houseY - this.bottomPartHeight / 2;
    this.bigWallWithWindow.add(this.bigTopPart);

    this.bigRightPart = new THREE.Mesh(
      new THREE.BoxGeometry(
        this.bigRightPartLength,
        this.houseY - 2 * this.bottomPartHeight,
        this.wallDepth
      ),
      this.wallMaterial
    );
    this.bigRightPart.geometry.attributes.uv2 =
      this.bigRightPart.geometry.attributes.uv;
    this.bigRightPart.position.y = grassHeight + basementY + this.houseY / 2;
    this.bigRightPart.position.x =
      -this.windowSize / 2 + 0.1 - this.bigRightPartLength / 2;
    this.bigRightPart.position.z = -this.houseZ / 2 - this.wallDepth / 2;

    this.bigWallWithWindow.add(this.bigRightPart);

    this.bigLeftPart = this.bigRightPart.clone();
    this.bigLeftPart.position.x = -this.bigRightPart.position.x;

    this.bigWallWithWindow.add(this.bigLeftPart);

    // add to scene
    this.house.add(this.wallWithDoor);
    this.house.add(this.rightSmallWall);
    this.house.add(this.leftSmallWall);
    this.house.add(this.bigWallWithWindow);
  }

  setWindows() {
    const windowColorTexture = this.resources.windowColorTexture;
    windowColorTexture.colorSpace = THREE.SRGBColorSpace;

    // Windows
    const opacityRedundantSize = 0.22;

    const windowY =
      this.bottomPart.position.y +
      this.bottomPartHeight / 2 +
      this.windowSize / 2 -
      opacityRedundantSize;

    this.windowGeometry = new THREE.PlaneGeometry(
      this.windowSize,
      this.windowSize,
      100,
      100
    );
    this.windowMaterial = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      map: windowColorTexture,
      transparent: true,
      alphaMap: this.resources.windowOpacityTexture,
      normalMap: this.resources.windowNormalTexture,
      aoMap: this.resources.windowAmbientOcclusionTexture,
      roughnessMap: this.resources.windowRoughnessTexture,
      metalnessMap: this.resources.windowMetallicTexture,
      displacementMap: this.resources.windowDisplacementTexture,
      displacementScale: 0.1,
    });
    this.windowGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        this.windowGeometry.attributes.uv.array,
        2
      )
    );

    this.window1 = new THREE.Mesh(this.windowGeometry, this.windowMaterial);
    this.window1.rotation.y = Math.PI / 2;
    this.window1.position.y = windowY;
    this.window1.position.x = this.houseX / 2;

    this.window2 = this.window1.clone();
    this.window2.rotation.y = -this.window1.rotation.y;
    this.window2.position.x = -this.window1.position.x;

    this.window3 = this.window1.clone();
    this.window3.rotation.y = -Math.PI;
    this.window3.position.z = -this.houseZ / 2;
    this.window3.position.x = 0;

    this.window1.receiveShadow = true;
    this.window2.receiveShadow = true;
    this.window3.receiveShadow = true;

    this.scene.add(this.window1, this.window2, this.window3);
  }

  makeMirroredTexture(texture) {
    // Отражаем текстуру по оси X
    texture.repeat.set(-1, 1);
    texture.center.set(0.5, 0.5);
  }

  setDoor() {
    // Door textures
    const doorColorTexture = this.resources.doorColorTexture;
    doorColorTexture.colorSpace = THREE.SRGBColorSpace;
    const doorNormalTexture = this.resources.doorNormalTexture;
    const doorRoughnessTexture = this.resources.doorRoughnessTexture;
    const doorDisplacementTexture = this.resources.doorDisplacementTexture;
    const doorOpacityTexture = this.resources.doorOpacityTexture;
    const doorAmbientOcclusionTexture =
      this.resources.doorAmbientOcclusionTexture;
    const doorMetallicTexture = this.resources.doorMetallicTexture;

    const doorColorTextureMirrored = doorColorTexture.clone();
    this.makeMirroredTexture(doorColorTextureMirrored);

    const doorNormalTextureMirrored = doorNormalTexture.clone();
    this.makeMirroredTexture(doorNormalTextureMirrored);

    const doorRoughnessTextureMirrored = doorRoughnessTexture.clone();
    this.makeMirroredTexture(doorRoughnessTextureMirrored);

    const doorDisplacementTextureMirrored = doorDisplacementTexture.clone();
    this.makeMirroredTexture(doorDisplacementTextureMirrored);

    const doorOpacityTextureMirrored = doorOpacityTexture.clone();
    this.makeMirroredTexture(doorOpacityTextureMirrored);

    const doorAmbientOcclusionTextureMirrored =
      doorAmbientOcclusionTexture.clone();
    this.makeMirroredTexture(doorAmbientOcclusionTextureMirrored);

    const doorMetallicTextureMirrored = doorMetallicTexture.clone();
    this.makeMirroredTexture(doorMetallicTextureMirrored);

    // Doors
    this.doorGeometry = new THREE.PlaneGeometry(2.2, 2.2, 100, 100);
    // чтобы aoMap заработало
    this.doorGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(this.doorGeometry.attributes.uv.array, 2)
    );

    const materialSettings = {
      transparent: true,
      displacementScale: 0.1,
    };

    // Door outside

    this.door = new THREE.Mesh(
      this.doorGeometry,
      new THREE.MeshStandardMaterial({
        ...materialSettings,
        map: doorColorTexture,
        alphaMap: doorOpacityTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorDisplacementTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetallicTexture,
        roughnessMap: doorRoughnessTexture,
      })
    );

    this.door.position.y = grassHeight + basementY + 1;
    this.door.position.z = this.houseZ / 2 + 0.1;

    this.house.add(this.door);

    // Door inside
    this.insideDoor = new THREE.Mesh(
      this.doorGeometry,
      new THREE.MeshStandardMaterial({
        ...materialSettings,
        map: doorColorTextureMirrored,
        alphaMap: doorOpacityTextureMirrored,
        aoMap: doorAmbientOcclusionTextureMirrored,
        displacementMap: doorDisplacementTextureMirrored,
        normalMap: doorNormalTextureMirrored,
        metalnessMap: doorMetallicTextureMirrored,
        roughnessMap: doorRoughnessTextureMirrored,
      })
    );
    this.insideDoor.rotation.y = -Math.PI;
    this.insideDoor.position.y = this.door.position.y;
    this.insideDoor.position.z = this.houseZ / 2 + 0.05;

    this.house.add(this.insideDoor);

    // Door light
    this.doorLight = new THREE.PointLight(
      this.debugObject.doorLightColor,
      1,
      7
    );
    this.doorLight.position.set(
      0,
      grassHeight + basementY + this.houseY,
      this.houseX / 2 + 0.3
    );

    this.house.add(this.doorLight);

    // Shadows
    this.doorLight.castShadow = true;
  }

  setRoof() {
    // Roof textures
    const countX = 5;
    const countZ = 1.5;
    const textureRotation = -Math.PI / 22;

    const roofColorTexture = this.resources.roofColorTexture;
    roofColorTexture.colorSpace = THREE.SRGBColorSpace;
    this.repeatTexture(roofColorTexture, countX, countZ, textureRotation);

    const roofARMTexture = this.resources.roofARMTexture;
    this.repeatTexture(roofARMTexture, countX, countZ, textureRotation);

    const roofNormalTexture = this.resources.roofNormalTexture;
    this.repeatTexture(roofNormalTexture, countX, countZ, textureRotation);

    // Roof
    const roofHeight = 1.2;

    this.roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.7, roofHeight, 4, 1),
      new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        normalMap: roofNormalTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
      })
    );
    this.roof.rotation.y = Math.PI / 4;
    this.roof.position.y =
      grassHeight + basementY + this.houseY + roofHeight / 2;

    this.house.add(this.roof);
  }

  setFurniture() {
    // Sofa
    const sofaScale = 1.5;
    this.sofa = this.resources.sofa.scene.children[0];
    this.sofa.scale.set(sofaScale, sofaScale, sofaScale);
    this.sofa.rotation.y = Math.PI / 2;
    this.sofa.position.set(-1.3, grassHeight + basementY + this.floorHeight, 0);

    this.house.add(this.sofa);

    // Rectangle rug
    const rugRectangleScale = 1.5;
    this.rugRectangle = this.resources.rugRectangle.scene.children[0];
    this.rugRectangle.scale.set(
      rugRectangleScale,
      rugRectangleScale,
      rugRectangleScale
    );
    this.rugRectangle.rotation.y = Math.PI / 2;
    this.rugRectangle.position.set(
      0.2,
      grassHeight + basementY + this.floorHeight,
      0.5
    );

    this.house.add(this.rugRectangle);

    // Table
    const tableScale = 1.5;
    this.table = this.resources.table.scene.children[0];
    this.table.scale.set(tableScale, tableScale, tableScale);
    this.table.rotation.y = Math.PI / 2;
    this.table.position.set(
      -0.1,
      grassHeight + basementY + this.floorHeight,
      -0.1
    );

    this.house.add(this.table);

    // Doormat
    const rugSquareScale = 3;
    this.rugSquare = this.resources.rugSquare.scene.children[0];
    this.rugSquare.scale.set(rugSquareScale, rugSquareScale, rugSquareScale);
    this.rugSquare.position.set(
      -0.6,
      grassHeight + basementY + this.floorHeight,
      1.95
    );

    this.house.add(this.rugSquare);

    // Potted plants
    const pottedPlantScale = 2;
    this.pottedPlant = this.resources.pottedPlant.scene.children[0];
    this.pottedPlant.scale.set(
      pottedPlantScale,
      pottedPlantScale,
      pottedPlantScale
    );
    this.pottedPlant.position.set(
      1.7,
      grassHeight + basementY + this.floorHeight,
      1.8
    );

    this.house.add(this.pottedPlant);

    this.secondPottedPlant = this.pottedPlant.clone();
    this.secondPottedPlant.position.x = -this.pottedPlant.position.x;

    this.house.add(this.secondPottedPlant);

    // Floor round lamp
    // light
    this.floorLampLight = new THREE.PointLight(
      this.debugObject.floorLampLightColor,
      1,
      1.3
    );
    this.floorLampLight.position.set(0.1, 1.1, -0.1);

    // Shadows
    this.floorLampLight.castShadow = true;

    this.floorLamp = new THREE.Group();

    const lampRoundFloor = this.resources.lampRoundFloor.scene.children[0];
    const lampRoundFloorScale = 1.5;
    lampRoundFloor.scale.set(
      lampRoundFloorScale,
      lampRoundFloorScale,
      lampRoundFloorScale
    );

    this.floorLamp.add(lampRoundFloor);
    this.floorLamp.add(this.floorLampLight);
    this.floorLamp.position.set(
      -1.65,
      grassHeight + basementY + this.floorHeight,
      -1.45
    );

    this.house.add(this.floorLamp);

    // Bookcase closed doors
    const bookcaseClosedDoorsScale = 1.5;
    this.bookcaseClosedDoors =
      this.resources.bookcaseClosedDoors.scene.children[0];
    this.bookcaseClosedDoors.scale.set(
      bookcaseClosedDoorsScale,
      bookcaseClosedDoorsScale,
      bookcaseClosedDoorsScale
    );
    this.bookcaseClosedDoors.rotation.y = -Math.PI / 2;
    this.bookcaseClosedDoors.position.set(
      1.6,
      grassHeight + basementY + this.floorHeight,
      -1.95
    );

    this.house.add(this.bookcaseClosedDoors);
  }

  setDebug() {
    if (!this.debug.active) {
      return;
    }

    const houseFolder = this.debug.gui.addFolder("House");

    houseFolder
      .addColor(this.debugObject, "doorLightColor")
      .onChange(() => {
        this.doorLight.color.set(this.debugObject.doorLightColor);
      })
      .name("Door light color");

    houseFolder
      .addColor(this.debugObject, "floorLampLightColor")
      .onChange(() => {
        this.floorLampLight.color.set(this.debugObject.floorLampLightColor);
      })
      .name("Floor lamp light color");
  }
}
