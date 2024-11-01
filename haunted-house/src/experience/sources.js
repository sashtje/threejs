import { resourceTypes } from "./constants";

const grassTextures = [
  {
    name: "grassColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/albedo.png",
  },
  {
    name: "grassAmbientOcclusionTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/ao.png",
  },
  {
    name: "grassNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/normal-ogl.png",
  },
  {
    name: "grassRoughnessTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/roughness.png",
  },
  {
    name: "grassDisplacementTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/height.png",
  },
];

const basementTextures = [
  {
    name: "basementColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/basement/albedo.jpg",
  },
  {
    name: "basementARMTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/basement/arm.jpg",
  },
  {
    name: "basementNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/basement/normal.jpg",
  },
  {
    name: "basementBumpTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/basement/bump.jpg",
  },
];

const floorTextures = [
  {
    name: "floorColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/floor/albedo.jpg",
  },
  {
    name: "floorARMTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/floor/arm.jpg",
  },
  {
    name: "floorNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/floor/normal.jpg",
  },
];

const roadTextures = [
  {
    name: "roadColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/road/albedo.jpg",
  },
  {
    name: "roadARMTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/road/arm.jpg",
  },
  {
    name: "roadNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/road/normal.jpg",
  },
  {
    name: "roadDisplacementTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/road/height.jpg",
  },
  {
    name: "roadBumpTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/road/bump.jpg",
  },
];

const wallTextures = [
  {
    name: "wallColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/wall/albedo.jpg",
  },
  {
    name: "wallARMTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/wall/arm.jpg",
  },
  {
    name: "wallNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/wall/normal.jpg",
  },
];

const roofTextures = [
  {
    name: "roofColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/roof/albedo.jpg",
  },
  {
    name: "roofARMTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/roof/arm.jpg",
  },
  {
    name: "roofNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/roof/normal.jpg",
  },
];

const doorTextures = [
  {
    name: "doorColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/albedo.jpg",
  },
  {
    name: "doorAmbientOcclusionTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/ao.jpg",
  },
  {
    name: "doorNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/normal.jpg",
  },
  {
    name: "doorRoughnessTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/roughness.jpg",
  },
  {
    name: "doorDisplacementTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/height.png",
  },
  {
    name: "doorOpacityTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/opacity.jpg",
  },
  {
    name: "doorMetallicTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/door/metallic.jpg",
  },
];

const windowTextures = [
  {
    name: "windowColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/albedo.jpg",
  },
  {
    name: "windowAmbientOcclusionTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/ao.jpg",
  },
  {
    name: "windowNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/normal.jpg",
  },
  {
    name: "windowRoughnessTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/roughness.jpg",
  },
  {
    name: "windowDisplacementTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/height.png",
  },
  {
    name: "windowOpacityTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/opacity.jpg",
  },
  {
    name: "windowMetallicTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/window/metallic.jpg",
  },
];

const fontTextures = [
  {
    name: "matcapTexture",
    type: resourceTypes.TEXTURE,
    path: "matcaps/7.png",
  },
];

const furnitureModels = [
  {
    name: "sofa",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/loungeSofa.glb",
  },
  {
    name: "rugRectangle",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/rugRectangle.glb",
  },
  {
    name: "table",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/table.glb",
  },
  {
    name: "rugSquare",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/rugDoormat.glb",
  },
  {
    name: "pottedPlant",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/pottedPlant.glb",
  },
  {
    name: "lampRoundFloor",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/lampRoundFloor.glb",
  },
  {
    name: "bookcaseClosedDoors",
    type: resourceTypes.GLTF_Model,
    path: "models/furniture/bookcaseClosedDoors.glb",
  },
];

const ghostModels = [
  {
    name: "ghostModel",
    type: resourceTypes.FBX_Model,
    path: "models/ghost/ghost.fbx",
  },
];

const natureModels = [
  {
    name: "treeBranched",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/tree-branched.glb",
  },
  {
    name: "treePyramidal",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/tree-pyramidal.glb",
  },
  {
    name: "treeRound",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/tree-round.glb",
  },
  {
    name: "stone1",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/stone1.glb",
  },
  {
    name: "stone2",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/stone2.glb",
  },
  {
    name: "bush1",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/bush1.glb",
  },
  {
    name: "bush2",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/bush2.glb",
  },
  {
    name: "gravePattern",
    type: resourceTypes.GLTF_Model,
    path: "models/nature/grave.glb",
  },
];

const fonts = [
  {
    name: "font",
    type: resourceTypes.FONT,
    path: "fonts/helvetiker_regular.typeface.json",
  },
];

export default [
  ...grassTextures,
  ...basementTextures,
  ...floorTextures,
  ...roadTextures,
  ...wallTextures,
  ...roofTextures,
  ...doorTextures,
  ...windowTextures,
  ...fontTextures,
  ...furnitureModels,
  ...ghostModels,
  ...natureModels,
  ...fonts,
];
