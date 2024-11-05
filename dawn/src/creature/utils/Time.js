import * as THREE from "three";

import { EventEmitter } from "./EventEmitter";

export class Time extends EventEmitter {
  startTicking() {
    this.clock = new THREE.Clock();

    this.elapsedTime = this.clock.getElapsedTime();
    this.prevTickTime = 0;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    this.elapsedTime = this.clock.getElapsedTime();
    this.deltaTime = this.elapsedTime - this.prevTickTime;
    this.prevTickTime = this.elapsedTime;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
