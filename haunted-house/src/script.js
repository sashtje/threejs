import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import GUI from "lil-gui";

import { getAbsoluteUrl } from "./utils/getAbsoluteUrl";

const GUI_HASH = "#debug";
const hash = window.location.hash;

const baseURL = import.meta.env.BASE_URL;

// Debug
const gui = new GUI({
  width: 300,
  title: "Settings",
  closeFolders: true,
});

const debugObject = {
  // Models
  signColor: "#ffd285",
  ghostLightColor: "#ffff00",
  ghostLight2Color: "#ff00ff",
  customGhostLightColor: "#00ffff",

  // Fog
  fogColor: "#262837",

  // Lights
  ambientLightColor: "#b9d5ff",
  moonLightColor: "#b9d5ff",
  doorLightColor: "#ff7d46",
};

const lilGuiPanel = document.querySelector(".lil-gui");
lilGuiPanel.addEventListener("dblclick", (event) => {
  event.stopPropagation();
});
lilGuiPanel.addEventListener("touchend", (event) => {
  event.stopPropagation();
});
window.addEventListener("touchend", () => {
  gui.close();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "h" && hash === GUI_HASH) {
    gui.show(gui._hidden);
  }
});

const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

// Textures
const textureLoader = new THREE.TextureLoader();

// Grass textures
const grassColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/grass/albedo.png")
);
const grassAmbientOcclusionTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/grass/ao.png")
);
const grassNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/grass/normal-ogl.png")
);
const grassRoughnessTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/grass/roughness.png")
);
const grassDisplacementTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/grass/height.png")
);

// Повторить текстуру 10x10 раз по поверхности
const grassRepeatCount = 8;
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassColorTexture.repeat.set(grassRepeatCount, grassRepeatCount);
grassColorTexture.colorSpace = THREE.SRGBColorSpace;

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.repeat.set(grassRepeatCount, grassRepeatCount);

grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.repeat.set(grassRepeatCount, grassRepeatCount);

grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.repeat.set(grassRepeatCount, grassRepeatCount);

grassDisplacementTexture.wrapS = THREE.RepeatWrapping;
grassDisplacementTexture.wrapT = THREE.RepeatWrapping;
grassDisplacementTexture.repeat.set(grassRepeatCount, grassRepeatCount);

// Basement textures
const basementColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/basement/albedo.jpg")
);
const basementARMTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/basement/arm.jpg")
);
const basementNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/basement/normal.jpg")
);
const basementBumpTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/basement/bump.jpg")
);

basementColorTexture.colorSpace = THREE.SRGBColorSpace;

// Floor textures
const floorColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/floor/albedo.jpg")
);
const floorARMTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/floor/arm.jpg")
);
const floorNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/floor/normal.jpg")
);

const floorRepeatCount = 4;
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.repeat.set(floorRepeatCount, floorRepeatCount);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.repeat.set(floorRepeatCount, floorRepeatCount);

floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.repeat.set(floorRepeatCount, floorRepeatCount);

// Road textures
const roadColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/road/albedo.jpg")
);
const roadARMTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/road/arm.jpg")
);
const roadNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/road/normal.jpg")
);
const roadDisplacementTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/road/height.jpg")
);
const roadBumpTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/road/bump.jpg")
);

const roadRepeatCountX = 1;
const roadRepeatCountZ = 5;
roadColorTexture.colorSpace = THREE.SRGBColorSpace;
roadColorTexture.wrapS = THREE.RepeatWrapping;
roadColorTexture.wrapT = THREE.RepeatWrapping;
roadColorTexture.repeat.set(roadRepeatCountX, roadRepeatCountZ);

roadARMTexture.wrapS = THREE.RepeatWrapping;
roadARMTexture.wrapT = THREE.RepeatWrapping;
roadARMTexture.repeat.set(roadRepeatCountX, roadRepeatCountZ);

roadNormalTexture.wrapS = THREE.RepeatWrapping;
roadNormalTexture.wrapT = THREE.RepeatWrapping;
roadNormalTexture.repeat.set(roadRepeatCountX, roadRepeatCountZ);

roadDisplacementTexture.wrapS = THREE.RepeatWrapping;
roadDisplacementTexture.wrapT = THREE.RepeatWrapping;
roadDisplacementTexture.repeat.set(roadRepeatCountX, roadRepeatCountZ);

roadBumpTexture.wrapS = THREE.RepeatWrapping;
roadBumpTexture.wrapT = THREE.RepeatWrapping;
roadBumpTexture.repeat.set(roadRepeatCountX, roadRepeatCountZ);

// Wall textures
const wallColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/wall/albedo.jpg")
);
const wallARMTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/wall/arm.jpg")
);
const wallNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/wall/normal.jpg")
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const wallBigRepeatCountX = 4;
const wallBigRepeatCountZ = 2.5;
const wallColorTextureBig = wallColorTexture.clone();

wallColorTextureBig.wrapS = THREE.RepeatWrapping;
wallColorTextureBig.wrapT = THREE.RepeatWrapping;
wallColorTextureBig.repeat.set(wallBigRepeatCountX, wallBigRepeatCountZ);

const wallARMTextureBig = wallARMTexture.clone();

wallARMTextureBig.wrapS = THREE.RepeatWrapping;
wallARMTextureBig.wrapT = THREE.RepeatWrapping;
wallARMTextureBig.repeat.set(wallBigRepeatCountX, wallBigRepeatCountZ);

const wallNormalTextureBig = wallNormalTexture.clone();

wallNormalTextureBig.wrapS = THREE.RepeatWrapping;
wallNormalTextureBig.wrapT = THREE.RepeatWrapping;
wallNormalTextureBig.repeat.set(wallBigRepeatCountX, wallBigRepeatCountZ);

const wallSmallRepeatCountX = 4;
const wallSmallRepeatCountZ = 0.72;
const wallColorTextureSmall = wallColorTexture.clone();

wallColorTextureSmall.wrapS = THREE.RepeatWrapping;
wallColorTextureSmall.wrapT = THREE.RepeatWrapping;
wallColorTextureSmall.repeat.set(wallSmallRepeatCountX, wallSmallRepeatCountZ);

const wallARMTextureSmall = wallARMTexture.clone();

wallARMTextureSmall.wrapS = THREE.RepeatWrapping;
wallARMTextureSmall.wrapT = THREE.RepeatWrapping;
wallARMTextureSmall.repeat.set(wallSmallRepeatCountX, wallSmallRepeatCountZ);

const wallNormalTextureSmall = wallNormalTexture.clone();

wallNormalTextureSmall.wrapS = THREE.RepeatWrapping;
wallNormalTextureSmall.wrapT = THREE.RepeatWrapping;
wallNormalTextureSmall.repeat.set(wallSmallRepeatCountX, wallSmallRepeatCountZ);

// Roof textures
const roofColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/roof/albedo.jpg")
);
const roofARMTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/roof/arm.jpg")
);
const roofNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/roof/normal.jpg")
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapT = THREE.RepeatWrapping;
roofColorTexture.repeat.set(5, 1.5);
roofColorTexture.rotation = -Math.PI / 22;

roofARMTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapT = THREE.RepeatWrapping;
roofARMTexture.repeat.set(5, 1.5);
roofARMTexture.rotation = -Math.PI / 22;

roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapT = THREE.RepeatWrapping;
roofNormalTexture.repeat.set(5, 1.5);
roofNormalTexture.rotation = -Math.PI / 22;

// Door textures
const doorColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/albedo.jpg")
);
const doorAmbientOcclusionTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/ao.jpg")
);
const doorNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/normal.jpg")
);
const doorRoughnessTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/roughness.jpg")
);
const doorDisplacementTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/height.png")
);
const doorOpacityTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/opacity.jpg")
);
const doorMetallicTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/door/metallic.jpg")
);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const doorColorTextureMirrored = doorColorTexture.clone();
// Отражаем текстуру по оси X
doorColorTextureMirrored.repeat.set(-1, 1);
doorColorTextureMirrored.center.set(0.5, 0.5);

const doorNormalTextureMirrored = doorNormalTexture.clone();
doorNormalTextureMirrored.repeat.set(-1, 1);
doorNormalTextureMirrored.center.set(0.5, 0.5);

const doorRoughnessTextureMirrored = doorRoughnessTexture.clone();
doorRoughnessTextureMirrored.repeat.set(-1, 1);
doorRoughnessTextureMirrored.center.set(0.5, 0.5);

const doorDisplacementTextureMirrored = doorDisplacementTexture.clone();
doorDisplacementTextureMirrored.repeat.set(-1, 1);
doorDisplacementTextureMirrored.center.set(0.5, 0.5);

const doorOpacityTextureMirrored = doorOpacityTexture.clone();
doorOpacityTextureMirrored.repeat.set(-1, 1);
doorOpacityTextureMirrored.center.set(0.5, 0.5);

const doorAmbientOcclusionTextureMirrored = doorAmbientOcclusionTexture.clone();
doorAmbientOcclusionTextureMirrored.repeat.set(-1, 1);
doorAmbientOcclusionTextureMirrored.center.set(0.5, 0.5);

const doorMetallicTextureMirrored = doorMetallicTexture.clone();
doorMetallicTextureMirrored.repeat.set(-1, 1);
doorMetallicTextureMirrored.center.set(0.5, 0.5);

// Window textures
const windowColorTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/albedo.jpg")
);
const windowAmbientOcclusionTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/ao.jpg")
);
const windowNormalTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/normal.jpg")
);
const windowRoughnessTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/roughness.jpg")
);
const windowDisplacementTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/height.png")
);
const windowOpacityTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/opacity.jpg")
);
const windowMetallicTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "textures/window/metallic.jpg")
);

windowColorTexture.colorSpace = THREE.SRGBColorSpace;

// Other loaders
const gltfLoader = new GLTFLoader();
const fbxLoader = new FBXLoader();
const fontLoader = new FontLoader();

const matcapTexture = textureLoader.load(
  getAbsoluteUrl(baseURL, "matcaps/7.png")
);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Objects
const objectsFolder = gui.addFolder("Models");

// Ground
const grassHeight = 0.05;
const fieldX = 20;
const fieldZ = 20;

const groundGeometry = new THREE.PlaneGeometry(fieldX, fieldZ, 500, 500);
const groundMaterial = new THREE.MeshStandardMaterial({
  map: grassColorTexture,
  normalMap: grassNormalTexture,
  aoMap: grassAmbientOcclusionTexture,
  roughnessMap: grassRoughnessTexture,
  displacementMap: grassDisplacementTexture,
  displacementScale: grassHeight,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(ground.geometry.attributes.uv.array, 2)
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// House
const house = new THREE.Group();
scene.add(house);

// Basement
const basementX = 5;
const basementY = 0.3;
const basementZ = 5;

const concreteMaterial = new THREE.MeshStandardMaterial({
  map: basementColorTexture,
  normalMap: basementNormalTexture,
  aoMap: basementARMTexture,
  roughnessMap: basementARMTexture,
  metalnessMap: basementARMTexture,
  bumpMap: basementBumpTexture,
});

const basement = new THREE.Mesh(
  new THREE.BoxGeometry(basementX, basementY, basementZ),
  concreteMaterial
);
basement.geometry.attributes.uv2 = basement.geometry.attributes.uv;
basement.position.y = grassHeight + basementY / 2;
basement.receiveShadow = true;
basement.castShadow = true;
house.add(basement);

// Stairs
const stepX = 1;

const step1X = stepX;
const step1Y = basementY;
const step1Z = 0.2;

const step1 = new THREE.Mesh(
  new THREE.BoxGeometry(step1X, step1Y, step1Z),
  concreteMaterial
);
step1.geometry.attributes.uv2 = step1.geometry.attributes.uv;
step1.position.y = grassHeight + step1Y / 2;
step1.position.z = basementZ / 2 + step1Z / 2;
step1.receiveShadow = true;
step1.castShadow = true;
house.add(step1);

const step2X = stepX;
const step2Y = (2 * basementY) / 3;
const step2Z = 0.2;

const step2 = new THREE.Mesh(
  new THREE.BoxGeometry(step2X, step2Y, step2Z),
  concreteMaterial
);
step2.geometry.attributes.uv2 = step2.geometry.attributes.uv;
step2.position.y = grassHeight + step2Y / 2;
step2.position.z = basementZ / 2 + step1Z + step2Z / 2;
step2.receiveShadow = true;
step2.castShadow = true;
house.add(step2);

const step3X = stepX;
const step3Y = basementY / 3;
const step3Z = 0.2;

const step3 = new THREE.Mesh(
  new THREE.BoxGeometry(step3X, step3Y, step3Z),
  concreteMaterial
);
step3.geometry.attributes.uv2 = step3.geometry.attributes.uv;
step3.position.y = grassHeight + step3Y / 2;
step3.position.z = basementZ / 2 + step1Z + step2Z + step3Z / 2;
step3.receiveShadow = true;
step3.castShadow = true;
house.add(step3);

// Road
const roadWidth = 1;
const roadLength = fieldZ / 2 - basementZ / 2 - step1Z - step2Z - step3Z;
const roadHeight = 0.1;

const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength, 100, 100);
const roadMaterial = new THREE.MeshStandardMaterial({
  map: roadColorTexture,
  normalMap: roadNormalTexture,
  aoMap: roadARMTexture,
  roughnessMap: roadARMTexture,
  metalnessMap: roadARMTexture,
  bumpMap: roadBumpTexture,
  displacementMap: roadDisplacementTexture,
  displacementScale: roadHeight,
});
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(road.geometry.attributes.uv.array, 2)
);
road.rotation.x = -Math.PI / 2;
road.position.y = -0.04;
road.position.z = basementZ / 2 + step1Z + step2Z + step3Z + roadLength / 2;
road.receiveShadow = true;
scene.add(road);

// road right
const roadRightLength = 7;

const roadRightGeometry = new THREE.PlaneGeometry(
  roadWidth,
  roadRightLength,
  100,
  100
);
const roadRight = new THREE.Mesh(roadRightGeometry, roadMaterial);
roadRight.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roadRight.geometry.attributes.uv.array, 2)
);
roadRight.rotation.x = -Math.PI / 2;
roadRight.position.y = -0.04;
roadRight.position.x = basementX / 2 + 1 + roadWidth / 2;
roadRight.receiveShadow = true;
scene.add(roadRight);

// road left
const roadLeft = new THREE.Mesh(roadRightGeometry, roadMaterial);
roadLeft.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roadLeft.geometry.attributes.uv.array, 2)
);
roadLeft.rotation.x = -Math.PI / 2;
roadLeft.position.y = -0.04;
roadLeft.position.x = -basementX / 2 - 1 - roadWidth / 2;
roadLeft.receiveShadow = true;
scene.add(roadLeft);

// road back
const roadBackGeometry = new THREE.PlaneGeometry(
  roadWidth,
  roadRightLength + 2,
  100,
  100
);
const roadBack = new THREE.Mesh(roadBackGeometry, roadMaterial);
roadBack.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roadBack.geometry.attributes.uv.array, 2)
);
roadBack.rotation.x = -Math.PI / 2;
roadBack.rotation.z = -Math.PI / 2;
roadBack.position.y = -0.04;
roadBack.position.z = -basementZ / 2 - 1 - roadWidth / 2;
roadBack.receiveShadow = true;
scene.add(roadBack);

// road front
const roadFront = new THREE.Mesh(roadBackGeometry, roadMaterial);
roadFront.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roadFront.geometry.attributes.uv.array, 2)
);
roadFront.rotation.x = -Math.PI / 2;
roadFront.rotation.z = -Math.PI / 2;
roadFront.position.y = -0.04;
roadFront.position.z = basementZ / 2 + 1 + roadWidth / 2;
roadFront.receiveShadow = true;
scene.add(roadFront);

//Floor
const houseX = 4;
const houseZ = 4;
const houseY = 2.5;
const floorHeight = 0.1;

const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorColorTexture,
  normalMap: floorNormalTexture,
  aoMap: floorARMTexture,
  roughnessMap: floorARMTexture,
  metalnessMap: floorARMTexture,
});

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(houseX, floorHeight, houseZ),
  floorMaterial
);
floor.geometry.attributes.uv2 = floor.geometry.attributes.uv;
floor.position.y = grassHeight + basementY + floorHeight / 2;
floor.receiveShadow = true;
house.add(floor);

// Walls
const windowSize = 1.5;
const bigWallWidth = houseX + 0.2;
const wallDepth = 0.1;

const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallColorTexture,
  normalMap: wallNormalTexture,
  aoMap: wallARMTexture,
  roughnessMap: wallARMTexture,
  metalnessMap: wallARMTexture,
});

const wallMaterialBig = new THREE.MeshStandardMaterial({
  map: wallColorTextureBig,
  normalMap: wallNormalTextureBig,
  aoMap: wallARMTextureBig,
  roughnessMap: wallARMTextureBig,
  metalnessMap: wallARMTextureBig,
});

const wallMaterialSmall = new THREE.MeshStandardMaterial({
  map: wallColorTextureSmall,
  normalMap: wallNormalTextureSmall,
  aoMap: wallARMTextureSmall,
  roughnessMap: wallARMTextureSmall,
  metalnessMap: wallARMTextureSmall,
});

const wallWithDoor = new THREE.Mesh(
  new THREE.BoxGeometry(bigWallWidth, houseY, wallDepth),
  wallMaterialBig
);
wallWithDoor.geometry.attributes.uv2 = wallWithDoor.geometry.attributes.uv;
wallWithDoor.position.y = grassHeight + basementY + houseY / 2;
wallWithDoor.position.z = houseZ / 2 + wallDepth / 2;
wallWithDoor.receiveShadow = true;
wallWithDoor.castShadow = true;
house.add(wallWithDoor);

// right small wall with window

const smallWall = new THREE.Group();
house.add(smallWall);

const bottomPartHeight = 0.72;

const bottomPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, bottomPartHeight, houseZ),
  wallMaterialSmall
);
bottomPart.geometry.attributes.uv2 = bottomPart.geometry.attributes.uv;
bottomPart.position.y = grassHeight + basementY + bottomPartHeight / 2;
bottomPart.position.x = houseX / 2 + wallDepth / 2;
smallWall.add(bottomPart);

const topPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, bottomPartHeight, houseZ),
  wallMaterialSmall
);
topPart.geometry.attributes.uv2 = topPart.geometry.attributes.uv;
topPart.position.y = grassHeight + basementY + houseY - bottomPartHeight / 2;
topPart.position.x = houseX / 2 + wallDepth / 2;
smallWall.add(topPart);

const rightPartHeight = houseY - 2 * bottomPartHeight;
const rightPartLength = 1.35;
const rightPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, rightPartHeight, rightPartLength),
  wallMaterial
);
rightPart.geometry.attributes.uv2 = rightPart.geometry.attributes.uv;
rightPart.position.y = grassHeight + basementY + houseY / 2;
rightPart.position.x = houseX / 2 + wallDepth / 2;
rightPart.position.z = -windowSize / 2 + 0.1 - rightPartLength / 2;
smallWall.add(rightPart);

const leftPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, rightPartHeight, rightPartLength),
  wallMaterial
);
leftPart.geometry.attributes.uv2 = leftPart.geometry.attributes.uv;
leftPart.position.y = grassHeight + basementY + houseY / 2;
leftPart.position.x = houseX / 2 + wallDepth / 2;
leftPart.position.z = windowSize / 2 - 0.1 + rightPartLength / 2;
smallWall.add(leftPart);

// left small wall with window
const leftSmallWall = new THREE.Group();
house.add(leftSmallWall);

const leftBottomPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, bottomPartHeight, houseZ),
  wallMaterialSmall
);
leftBottomPart.geometry.attributes.uv2 = leftBottomPart.geometry.attributes.uv;
leftBottomPart.position.y = grassHeight + basementY + bottomPartHeight / 2;
leftBottomPart.position.x = -houseX / 2 - wallDepth / 2;
leftSmallWall.add(leftBottomPart);

const leftTopPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, bottomPartHeight, houseZ),
  wallMaterialSmall
);
leftTopPart.geometry.attributes.uv2 = leftTopPart.geometry.attributes.uv;
leftTopPart.position.y =
  grassHeight + basementY + houseY - bottomPartHeight / 2;
leftTopPart.position.x = -houseX / 2 - wallDepth / 2;
leftSmallWall.add(leftTopPart);

const leftRightPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, rightPartHeight, rightPartLength),
  wallMaterial
);
leftRightPart.geometry.attributes.uv2 = leftRightPart.geometry.attributes.uv;
leftRightPart.position.y = grassHeight + basementY + houseY / 2;
leftRightPart.position.x = -houseX / 2 - wallDepth / 2;
leftRightPart.position.z = -windowSize / 2 + 0.1 - rightPartLength / 2;
leftSmallWall.add(leftRightPart);

const leftLeftPart = new THREE.Mesh(
  new THREE.BoxGeometry(wallDepth, rightPartHeight, rightPartLength),
  wallMaterial
);
leftLeftPart.geometry.attributes.uv2 = leftLeftPart.geometry.attributes.uv;
leftLeftPart.position.y = grassHeight + basementY + houseY / 2;
leftLeftPart.position.x = -houseX / 2 - wallDepth / 2;
leftLeftPart.position.z = windowSize / 2 - 0.1 + rightPartLength / 2;
leftSmallWall.add(leftLeftPart);

// big wall with window
const bigWallWithWindow = new THREE.Group();
house.add(bigWallWithWindow);

const bigBottomPart = new THREE.Mesh(
  new THREE.BoxGeometry(houseZ + 0.2, bottomPartHeight, wallDepth),
  wallMaterialSmall
);
bigBottomPart.geometry.attributes.uv2 = bigBottomPart.geometry.attributes.uv;
bigBottomPart.position.y = grassHeight + basementY + bottomPartHeight / 2;
bigBottomPart.position.z = -houseZ / 2 - wallDepth / 2;
smallWall.add(bigBottomPart);

const bigTopPart = new THREE.Mesh(
  new THREE.BoxGeometry(houseZ + 0.2, bottomPartHeight, wallDepth),
  wallMaterialSmall
);
bigTopPart.geometry.attributes.uv2 = bigTopPart.geometry.attributes.uv;
bigTopPart.position.y = grassHeight + basementY + houseY - bottomPartHeight / 2;
bigTopPart.position.z = -houseZ / 2 - wallDepth / 2;
smallWall.add(bigTopPart);

const bigRightPartLength = 1.45;
const bigRightPart = new THREE.Mesh(
  new THREE.BoxGeometry(
    bigRightPartLength,
    houseY - 2 * bottomPartHeight,
    wallDepth
  ),
  wallMaterial
);
bigRightPart.geometry.attributes.uv2 = bigRightPart.geometry.attributes.uv;
bigRightPart.position.y = grassHeight + basementY + houseY / 2;
bigRightPart.position.x = -windowSize / 2 + 0.1 - bigRightPartLength / 2;
bigRightPart.position.z = -houseZ / 2 - wallDepth / 2;
smallWall.add(bigRightPart);

const bigLeftPart = new THREE.Mesh(
  new THREE.BoxGeometry(
    bigRightPartLength,
    houseY - 2 * bottomPartHeight,
    wallDepth
  ),
  wallMaterial
);
bigLeftPart.geometry.attributes.uv2 = bigLeftPart.geometry.attributes.uv;
bigLeftPart.position.y = grassHeight + basementY + houseY / 2;
bigLeftPart.position.x = -bigRightPart.position.x;
bigLeftPart.position.z = -houseZ / 2 - wallDepth / 2;
smallWall.add(bigLeftPart);

// Windows
const opacityRedundantSize = 0.22;

const windowY =
  bottomPart.position.y +
  bottomPartHeight / 2 +
  windowSize / 2 -
  opacityRedundantSize;

const windowGeometry = new THREE.PlaneGeometry(
  windowSize,
  windowSize,
  100,
  100
);
const windowMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: windowColorTexture,
  transparent: true,
  alphaMap: windowOpacityTexture,
  normalMap: windowNormalTexture,
  aoMap: windowAmbientOcclusionTexture,
  roughnessMap: windowRoughnessTexture,
  metalnessMap: windowMetallicTexture,
  displacementMap: windowDisplacementTexture,
  displacementScale: 0.1,
});
windowGeometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(windowGeometry.attributes.uv.array, 2)
);
const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.rotation.y = Math.PI / 2;
window1.position.y = windowY;
window1.position.x = houseX / 2;

const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
window2.rotation.y = -Math.PI / 2;
window2.position.y = windowY;
window2.position.x = -houseX / 2;

const window3 = new THREE.Mesh(windowGeometry, windowMaterial);
window3.rotation.y = -Math.PI;
window3.position.y = windowY;
window3.position.z = -houseZ / 2;

window1.receiveShadow = true;
window2.receiveShadow = true;
window3.receiveShadow = true;

scene.add(window1, window2, window3);

// Door
const door = new THREE.Mesh(
  // для лучшей детализации и объема добавили больше сегментов в геометрии
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorOpacityTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorDisplacementTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetallicTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
// чтобы aoMap заработало
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = grassHeight + basementY + 1;
door.position.z = houseZ / 2 + 0.1;
house.add(door);

// door inside
const insideDoor = new THREE.Mesh(
  // для лучшей детализации и объема добавили больше сегментов в геометрии
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTextureMirrored,
    transparent: true,
    alphaMap: doorOpacityTextureMirrored,
    aoMap: doorAmbientOcclusionTextureMirrored,
    displacementMap: doorDisplacementTextureMirrored,
    displacementScale: 0.1,
    normalMap: doorNormalTextureMirrored,
    metalnessMap: doorMetallicTextureMirrored,
    roughnessMap: doorRoughnessTextureMirrored,
  })
);
// чтобы aoMap заработало
insideDoor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(insideDoor.geometry.attributes.uv.array, 2)
);
insideDoor.rotation.y = -Math.PI;
insideDoor.position.y = grassHeight + basementY + 1;
insideDoor.position.z = houseZ / 2 + 0.05;
house.add(insideDoor);

// Roof
const roofHeight = 1.2;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.7, roofHeight, 4, 1),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    normalMap: roofNormalTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
  })
);
roof.rotation.y = Math.PI / 4;
roof.position.y = grassHeight + basementY + houseY + roofHeight / 2;
house.add(roof);

// models inside house
gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/loungeSofa.glb"),
  (gltf) => {
    const sofa = gltf.scene.children[0];
    sofa.scale.set(1.5, 1.5, 1.5);
    sofa.rotation.y = Math.PI / 2;
    sofa.position.set(-1.3, grassHeight + basementY + floorHeight, 0);
    scene.add(sofa);

    enableShadowsForGroup({ group: sofa, receive: true, cast: true });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/rugRectangle.glb"),
  (gltf) => {
    const rugRectangle = gltf.scene.children[0];
    rugRectangle.scale.set(1.5, 1.5, 1.5);
    rugRectangle.rotation.y = Math.PI / 2;
    rugRectangle.position.set(0.2, grassHeight + basementY + floorHeight, 0.5);
    scene.add(rugRectangle);

    enableShadowsForGroup({ group: rugRectangle, receive: true, cast: true });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/table.glb"),
  (gltf) => {
    const table = gltf.scene.children[0];
    table.scale.set(1.5, 1.5, 1.5);
    table.rotation.y = Math.PI / 2;
    table.position.set(-0.1, grassHeight + basementY + floorHeight, -0.1);
    scene.add(table);

    enableShadowsForGroup({ group: table, receive: true, cast: true });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/rugDoormat.glb"),
  (gltf) => {
    const rugSquare = gltf.scene.children[0];
    rugSquare.scale.set(3, 3, 3);
    rugSquare.position.set(-0.6, grassHeight + basementY + floorHeight, 1.95);
    scene.add(rugSquare);

    enableShadowsForGroup({ group: rugSquare, receive: true, cast: true });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/pottedPlant.glb"),
  (gltf) => {
    const pottedPlant = gltf.scene.children[0];
    pottedPlant.scale.set(2, 2, 2);
    pottedPlant.position.set(1.7, grassHeight + basementY + floorHeight, 1.8);
    scene.add(pottedPlant);

    const secondPottedPlant = pottedPlant.clone();
    secondPottedPlant.position.set(
      -1.7,
      grassHeight + basementY + floorHeight,
      1.8
    );
    scene.add(secondPottedPlant);

    enableShadowsForGroup({ group: pottedPlant, receive: true, cast: true });
    enableShadowsForGroup({
      group: secondPottedPlant,
      receive: true,
      cast: true,
    });
  }
);

// floor lamp light
const floorLampLight = new THREE.PointLight("#ffff00", 1, 1.3);
floorLampLight.position.set(0.1, 1.1, -0.1);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/lampRoundFloor.glb"),
  (gltf) => {
    const floorLamp = new THREE.Group();

    const lampRoundFloor = gltf.scene.children[0];
    const scaleStrength = 1.5;
    lampRoundFloor.scale.set(scaleStrength, scaleStrength, scaleStrength);

    floorLamp.add(lampRoundFloor);
    floorLamp.add(floorLampLight);
    floorLamp.position.set(-1.65, grassHeight + basementY + floorHeight, -1.45);
    scene.add(floorLamp);

    enableShadowsForGroup({ group: floorLamp, receive: true, cast: true });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/furniture/bookcaseClosedDoors.glb"),
  (gltf) => {
    const bookcaseClosedDoors = gltf.scene.children[0];
    const scaleStrength = 1.5;
    bookcaseClosedDoors.scale.set(scaleStrength, scaleStrength, scaleStrength);
    bookcaseClosedDoors.rotation.y = -Math.PI / 2;
    bookcaseClosedDoors.position.set(
      1.6,
      grassHeight + basementY + floorHeight,
      -1.95
    );
    scene.add(bookcaseClosedDoors);

    enableShadowsForGroup({
      group: bookcaseClosedDoors,
      receive: true,
      cast: true,
    });
  }
);

// Ghost
let ghost;
let ghost2;

objectsFolder
  .addColor(debugObject, "signColor")
  .onChange(() => {
    signMaterial.color.set(debugObject.signColor);
  })
  .name("Sign color");

const ghostLight = new THREE.PointLight(debugObject.ghostLightColor, 2, 3);
ghostLight.position.set(0, 0.8, 0);

const ghostLight2 = new THREE.PointLight(debugObject.ghostLight2Color, 2, 3);
ghostLight2.position.set(0, 0.8, 0);

objectsFolder
  .addColor(debugObject, "ghostLightColor")
  .onChange(() => {
    ghostLight.color.set(debugObject.ghostLightColor);
  })
  .name("Ghost light color");

objectsFolder
  .addColor(debugObject, "ghostLight2Color")
  .onChange(() => {
    ghostLight2.color.set(debugObject.ghostLight2Color);
  })
  .name("Ghost on the roof light color");

fbxLoader.load(getAbsoluteUrl(baseURL, "models/ghost/ghost.fbx"), (fbx) => {
  ghost = new THREE.Group();
  fbx.scale.set(0.001, 0.001, 0.001);
  fbx.position.set(0, grassHeight, 0);

  const ghostModel2 = fbx.clone();

  ghost.add(fbx);

  ghost.add(ghostLight);

  scene.add(ghost);
  setRandomPosition(ghost);

  enableShadowsForGroup({
    group: ghost,
    cast: true,
  });

  // ghost2
  ghost2 = new THREE.Group();
  ghost2.add(ghostModel2);
  ghost2.add(ghostLight2);

  scene.add(ghost2);

  enableShadowsForGroup({
    group: ghost2,
    cast: true,
  });
});

// new ghost
const customGhost = new THREE.Group();

const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
const bodyMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0xffffff,
  transparent: true,
  opacity: 0.6,
});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
customGhost.add(body);
customGhost.scale.set(0.5, 0.5, 0.5);
customGhost.position.set(-5, -2, 1);

const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeLeft.position.set(-0.25, 0.3, 0.85);
eyeRight.position.set(0.25, 0.3, 0.85);
customGhost.add(eyeLeft);
customGhost.add(eyeRight);

const customGhostLight = new THREE.PointLight(
  debugObject.customGhostLightColor,
  3,
  5
);
customGhost.add(customGhostLight);

scene.add(customGhost);

objectsFolder
  .addColor(debugObject, "customGhostLightColor")
  .onChange(() => {
    customGhostLight.color.set(debugObject.customGhostLightColor);
  })
  .name("Sphere ghost light color");

// Sign
const sign = new THREE.Group();
scene.add(sign);

const stickWidth = 0.09;
const stickHeight = 1;
const stickDepth = 0.05;

const boardWidth = 1;
const boardHeight = 0.5;
const boardDepth = stickDepth;

const stickGeometry = new THREE.BoxGeometry(
  stickWidth,
  stickHeight,
  stickDepth
);
const signMaterial = new THREE.MeshStandardMaterial({
  color: debugObject.signColor,
});
const stick = new THREE.Mesh(stickGeometry, signMaterial);
sign.add(stick);

objectsFolder
  .addColor(debugObject, "signColor")
  .onChange(() => {
    signMaterial.color.set(debugObject.signColor);
  })
  .name("Sign color");

const boardGroup = new THREE.Group();
const boardGeometry = new THREE.BoxGeometry(
  boardWidth,
  boardHeight,
  boardDepth
);
const board = new THREE.Mesh(boardGeometry, signMaterial);
boardGroup.add(board);
sign.add(boardGroup);
boardGroup.position.set(0, stickHeight / 2 - boardHeight / 2, stickDepth);

sign.position.set(
  roadWidth + stickWidth,
  stickHeight / 2,
  basementZ / 2 + 2 * roadWidth + stickDepth + 0.5
);

fontLoader.load(
  getAbsoluteUrl(baseURL, "fonts/helvetiker_regular.typeface.json"),
  (font) => {
    const textGeometry = new TextGeometry("Haunted house", {
      font: font,
      size: 0.07,
      depth: 0.002,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.002,
      bevelOffset: 0,
      bevelSegments: 4,
    });
    textGeometry.center();
    const material = new THREE.MeshMatcapMaterial();
    material.matcap = matcapTexture;
    const text = new THREE.Mesh(textGeometry, material);
    text.position.z = 0.03;

    boardGroup.add(text);
  }
);

enableShadowsForGroup({
  group: sign,
  cast: true,
  receive: true,
});

// Trees
gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/nature/tree-branched.glb"),
  (gltf) => {
    const treeBranched = gltf.scene;
    treeBranched.scale.set(0.5, 0.5, 0.5);
    treeBranched.position.set(-3, grassHeight, -3.5);
    scene.add(treeBranched);

    enableShadowsForGroup({
      group: treeBranched,
      cast: true,
      receive: true,
    });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/nature/tree-pyramidal.glb"),
  (gltf) => {
    const treePyramidal = gltf.scene;
    treePyramidal.scale.set(0.4, 0.4, 0.4);
    treePyramidal.position.set(-3, grassHeight, 5);
    scene.add(treePyramidal);

    enableShadowsForGroup({
      group: treePyramidal,
      cast: true,
      receive: true,
    });
  }
);

gltfLoader.load(
  getAbsoluteUrl(baseURL, "models/nature/tree-round.glb"),
  (gltf) => {
    const treeRound = gltf.scene;
    treeRound.scale.set(0.4, 0.4, 0.4);
    treeRound.position.set(5, grassHeight, -1);
    scene.add(treeRound);

    enableShadowsForGroup({
      group: treeRound,
      cast: true,
      receive: true,
    });
  }
);

// Stones
gltfLoader.load(getAbsoluteUrl(baseURL, "models/nature/stone1.glb"), (gltf) => {
  const stone1 = gltf.scene;
  stone1.scale.set(0.4, 0.4, 0.4);
  stone1.position.set(3, 0.25, 5);
  stone1.rotation.y = Math.PI;
  scene.add(stone1);

  enableShadowsForGroup({
    group: stone1,
    cast: true,
    receive: true,
  });
});

gltfLoader.load(getAbsoluteUrl(baseURL, "models/nature/stone2.glb"), (gltf) => {
  const stone2 = gltf.scene;
  stone2.scale.set(0.4, 0.4, 0.4);
  stone2.position.set(-5, 0.25, -3);
  scene.add(stone2);

  enableShadowsForGroup({
    group: stone2,
    cast: true,
    receive: true,
  });
});

// Bushes
gltfLoader.load(getAbsoluteUrl(baseURL, "models/nature/bush1.glb"), (gltf) => {
  const bush1 = gltf.scene;
  bush1.scale.set(0.7, 0.7, 0.7);
  bush1.position.set(1, 0.15, -3.2);
  bush1.rotation.y = -Math.PI / 2;
  scene.add(bush1);

  enableShadowsForGroup({
    group: bush1,
    cast: true,
    receive: true,
  });
});

gltfLoader.load(getAbsoluteUrl(baseURL, "models/nature/bush2.glb"), (gltf) => {
  const bush2 = gltf.scene;
  bush2.scale.set(0.6, 0.6, 0.6);
  bush2.position.set(1.5, 0.2, 3.2);
  bush2.rotation.y = -Math.PI / 2;
  scene.add(bush2);

  enableShadowsForGroup({
    group: bush2,
    cast: true,
    receive: true,
  });
});

// Graves
gltfLoader.load(getAbsoluteUrl(baseURL, "models/nature/grave.glb"), (gltf) => {
  const gravePattern = gltf.scene;
  gravePattern.scale.set(0.3, 0.3, 0.3);
  const cemetery = new THREE.Group();
  const gravesCount = 40;

  for (let i = 0; i < gravesCount; i++) {
    const grave = gravePattern.clone();

    const angle = Math.random() * 2 * Math.PI;
    const radius = 6 + Math.random() * 3.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    grave.position.set(x, grassHeight + 0.05, z);
    cemetery.add(grave);

    enableShadowsForGroup({ group: grave, cast: true });
  }

  scene.add(cemetery);
});

// Fog
const fogFolder = gui.addFolder("Fog");

const fog = new THREE.Fog(debugObject.fogColor, 1, 15);
scene.fog = fog;
fogFolder
  .addColor(debugObject, "fogColor")
  .onChange(() => {
    fog.color.set(debugObject.fogColor);
    renderer.setClearColor(debugObject.fogColor);
  })
  .name("Fog color");

// Lights

const lightsFolder = gui.addFolder("Lights");

// Ambient light
const ambientLight = new THREE.AmbientLight(
  debugObject.ambientLightColor,
  0.03
);
scene.add(ambientLight);

lightsFolder
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Ambient light intensity");
lightsFolder
  .addColor(debugObject, "ambientLightColor")
  .onChange(() => {
    ambientLight.color.set(debugObject.ambientLightColor);
  })
  .name("Ambient light color");

// Directional light
const moonLight = new THREE.DirectionalLight(debugObject.moonLightColor, 0.03);
moonLight.position.set(4, 5, -2);
lightsFolder
  .add(moonLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Moon light intensity");
lightsFolder
  .addColor(debugObject, "moonLightColor")
  .onChange(() => {
    moonLight.color.set(debugObject.moonLightColor);
  })
  .name("Moon light color");
scene.add(moonLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, grassHeight + basementY + houseY, houseX / 2 + 0.3);
house.add(doorLight);

lightsFolder
  .addColor(debugObject, "doorLightColor")
  .onChange(() => {
    doorLight.color.set(debugObject.doorLightColor);
  })
  .name("Door light color");

// Camera
const cameraFolder = gui.addFolder("Camera");
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(9, 2, 8);
scene.add(camera);

cameraFolder.add(camera.position, "x").min(-fieldX).max(fieldX).step(0.001);
cameraFolder.add(camera.position, "y").min(-5).max(5).step(0.001);
cameraFolder.add(camera.position, "z").min(-fieldZ).max(fieldZ).step(0.001);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// размер области для рисования
renderer.setSize(sizes.width, sizes.height);
// вместо черного фона теперь будет фон тумана (цвет такой же как у тумана)
renderer.setClearColor(debugObject.fogColor);

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
floorLampLight.castShadow = true;
ghostLight.castShadow = true;

ground.receiveShadow = true;
enableShadowsForGroup({
  group: house,
  cast: true,
  receive: true,
});

function enableShadowsForGroup({ group, receive, cast }) {
  group.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = Boolean(cast);
      child.receiveShadow = Boolean(receive);
    }
  });
}

// для управления камерой при помощи мышки
const controls = new OrbitControls(camera, canvas);
// для плавной анимации
controls.enableDamping = true;

// под капотом у renderer requestAnimationFrame
const clock = new THREE.Clock();

let ghostWasAbove = false;
let customGhostWasAbove = false;

renderer.setAnimationLoop(() => {
  const elapsedTime = clock.getElapsedTime();

  // Animate ghost
  if (ghost) {
    ghost.position.y = Math.sin(elapsedTime * 0.5) * 2;
    ghost.rotation.y += Math.sin(elapsedTime * 0.5) * 0.01;

    if (!ghostWasAbove && ghost.position.y > 0) {
      ghostWasAbove = true;
    }
    if (ghost.position.y < -1.8) {
      if (ghostWasAbove) {
        setRandomPosition(ghost);
        setRandomAngle(ghost);

        ghostWasAbove = false;
      }
    }
  }
  if (ghost2) {
    ghost2.position.y = 4.5 + Math.sin(elapsedTime) * 0.5;

    ghost2.lookAt(camera.position);
  }

  // Animate custom ghost
  customGhost.position.y = Math.sin(elapsedTime) * 2;
  customGhost.rotation.y += Math.sin(elapsedTime * 0.5) * 0.01;
  bodyMaterial.opacity = 0.5 + 0.2 * Math.sin(elapsedTime * 2);
  customGhost.lookAt(camera.position);

  if (!customGhostWasAbove && customGhost.position.y > 0) {
    customGhostWasAbove = true;
  }
  if (customGhost.position.y < -1.8) {
    if (customGhostWasAbove) {
      setRandomPosition(customGhost);
      setRandomAngle(customGhost);

      customGhostWasAbove = false;
    }
  }

  controls.update();
  renderer.render(scene, camera);
});

// для ресайза
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// для полноэкранного режима
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

function setRandomPosition(obj) {
  obj.position.set(
    (Math.random() - 0.5) * fieldX,
    -2,
    (Math.random() - 0.5) * fieldZ
  );
}

function setRandomAngle(obj) {
  obj.rotation.y = Math.random() * 2 * Math.PI;
}
