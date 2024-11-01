import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

import { EventEmitter } from "./EventEmitter";
import { getAbsoluteUrl } from "./getAbsoluteUrl";
import { resourceTypes } from "../constants";

const baseURL = import.meta.env.BASE_URL;

export class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      [resourceTypes.TEXTURE]: new THREE.TextureLoader(),
      [resourceTypes.GLTF_Model]: new GLTFLoader(),
      [resourceTypes.FBX_Model]: new FBXLoader(),
      [resourceTypes.FONT]: new FontLoader(),
    };
  }

  startLoading() {
    for (const source of this.sources) {
      const loader = this.loaders[source.type];

      // Warnings
      if (!loader) {
        console.warn(`no suitable loader for "${source.name}" resource`);

        continue;
      }

      loader.load(getAbsoluteUrl(baseURL, source.path), (file) => {
        this.sourceLoaded(source, file);
      });
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
