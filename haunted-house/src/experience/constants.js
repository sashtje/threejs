export const fieldX = 20;
export const fieldZ = 20;
export const grassHeight = 0.05;

export const basementX = 5;
export const basementY = 0.3;
export const basementZ = 5;

export const stepX = 1;

export const step1X = stepX;
export const step1Y = basementY;
export const step1Z = 0.2;

export const step2X = stepX;
export const step2Y = (2 * basementY) / 3;
export const step2Z = 0.2;

export const step3X = stepX;
export const step3Y = basementY / 3;
export const step3Z = 0.2;

export const roadWidth = 1;

export const fogColor = getComputedStyle(
  document.querySelector("body")
).backgroundColor;

export const resourceTypes = {
  TEXTURE: "texture",
  GLTF_Model: "gltfModel",
  FBX_Model: "fbxModel",
  FONT: "font",
};
