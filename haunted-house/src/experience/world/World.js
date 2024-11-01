import { Ground } from "./Ground";
import { Road } from "./Road";
import { House } from "./House";
import { Sign } from "./Sign";
import { Ghosts } from "./Ghosts";
import { Nature } from "./Nature";
import { Cemetry } from "./Cemetry";

export class World {
  setWorld() {
    this.ground = new Ground();
    this.road = new Road();

    this.house = new House();

    this.sign = new Sign();
    this.ghosts = new Ghosts();
    this.nature = new Nature();
    this.cemetry = new Cemetry();
  }

  update() {
    this.ghosts.ghostsUpdate();
  }
}
