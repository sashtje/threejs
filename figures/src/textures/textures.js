import { LoadingManager, TextureLoader } from "three";

const baseURL = import.meta.env.BASE_URL;

function getAbsoluteUrl(url) {
  return `${baseURL}${url}`;
}

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
  colorTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/color.jpg")),
  alphaTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/alpha.jpg")),
  heightTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/height.jpg")),
  normalTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/normal.jpg")),
  ambientOcclusionTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/ambientOcclusion.jpg")),
  metalnessTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/metalness.jpg")),
  roughnessTexture: () =>
    textureLoader.load(getAbsoluteUrl("textures/door/roughness.jpg")),
};
