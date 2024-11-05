import { resourceTypes } from "./constants";

const grassTextures = [
  {
    name: "grassColorTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/albedo.jpg",
  },
  {
    name: "grassAmbientOcclusionTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/ao.jpg",
  },
  {
    name: "grassNormalTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/normal.jpg",
  },
  {
    name: "grassRoughnessTexture",
    type: resourceTypes.TEXTURE,
    path: "textures/grass/roughness.jpg",
  },
];

export default [...grassTextures];
