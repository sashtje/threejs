import * as THREE from "three";

import { Debug } from "./utils/Debug";
import { Sizes } from "./utils/Sizes";
import { Time } from "./utils/Time";
import { Resources } from "./utils/Resources";

import { Environment } from "./world/Environment";
import { World } from "./world/World";

import { Camera } from "./Camera";
import { Renderer } from "./Renderer";

import sources from "./sources";

export class Creature {
  hasStarted = false;

  constructor(canvas) {
    window.creature = this;

    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.environment = new Environment();
    this.world = new World();

    this.setEventListeners();
  }

  setEventListeners() {
    // resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // time tick event
    this.time.on("tick", () => {
      this.update();
    });

    // resources are ready
    this.resources.on("ready", () => {
      this.start();
    });

    // для полноэкранного режима
    window.addEventListener("dblclick", () => {
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (!fullscreenElement) {
        if (this.canvas.requestFullscreen) {
          this.canvas.requestFullscreen();
        } else if (this.canvas.webkitRequestFullscreen) {
          this.canvas.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.environment.update();
    this.renderer.update();

    if (this.hasStarted) {
      this.hasStarted = false;

      this.preloader = document.querySelector(".preloader");
      this.preloader.classList.add("preloader_disabled");
      this.canvas.classList.add("webgl_shown");

      this.preloader.addEventListener("transitionend", () => {
        this.preloader.style.display = "none";
      });
    }
  }

  start() {
    this.hasStarted = true;

    this.world.setWorld();
    this.time.startTicking();
  }
}
