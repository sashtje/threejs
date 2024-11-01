import * as THREE from "three";

import { EventEmitter } from "./EventEmitter";

export class Time extends EventEmitter {
  startTicking() {
    this.clock = new THREE.Clock();

    this.tick();
  }

  tick() {
    this.elapsedTime = this.clock.getElapsedTime();

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
