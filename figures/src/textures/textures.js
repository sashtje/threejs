import { LoadingManager, TextureLoader } from "three";

const loadingManager = new LoadingManager();

const textureLoader = new TextureLoader(loadingManager);

export const textureType = {
  no: "no",
  colorTexture: "colorTexture",
  alphaTexture: "alphaTexture",
  heightTexture: "heightTexture",
  normalTexture: "normalTexture",
  ambientOcclusionTexture: "ambientOcclusionTexture",
  metalnessTexture: "metalnessTexture",
  roughnessTexture: "roughnessTexture",
};

export const textureCollection = {
  colorTexture: () => textureLoader.load("/textures/door/color.jpg"),
  alphaTexture: () => textureLoader.load("/textures/door/alpha.jpg"),
  heightTexture: () => textureLoader.load("/textures/door/height.jpg"),
  normalTexture: () => textureLoader.load("/textures/door/normal.jpg"),
  ambientOcclusionTexture: () =>
    textureLoader.load("/textures/door/ambientOcclusion.jpg"),
  metalnessTexture: () => textureLoader.load("/textures/door/metalness.jpg"),
  roughnessTexture: () => textureLoader.load("/textures/door/roughness.jpg"),
};
