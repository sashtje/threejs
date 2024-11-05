import { Ground } from "./Ground";
import { Sphere } from "./Sphere";

export class World {
  setWorld() {
    this.ground = new Ground();
    this.sphere = new Sphere();
  }
}
