import { EventEmitter } from "./EventEmitter";

export class Sizes extends EventEmitter {
  constructor() {
    super();

    this.init();

    // Resize event
    window.addEventListener("resize", () => {
      this.init();

      this.trigger("resize");
    });
  }

  init() {
    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
