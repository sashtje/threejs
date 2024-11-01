import { grassHeight } from "../constants";
import { enableShadowsForGroup } from "../utils/enableShadowsForGroup";

export class Nature {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items;

    this.setNature();
  }

  setNature() {
    const objectsWithShadows = [];

    // Trees
    // tree branched
    const treeBranchedScale = 0.5;

    this.treeBranched = this.resources.treeBranched.scene;
    this.treeBranched.scale.set(
      treeBranchedScale,
      treeBranchedScale,
      treeBranchedScale
    );
    this.treeBranched.position.set(-3, grassHeight, -3.5);

    this.scene.add(this.treeBranched);
    objectsWithShadows.push(this.treeBranched);

    // tree pyramidal
    const treePyramidalScale = 0.4;

    this.treePyramidal = this.resources.treePyramidal.scene;
    this.treePyramidal.scale.set(
      treePyramidalScale,
      treePyramidalScale,
      treePyramidalScale
    );
    this.treePyramidal.position.set(-3, 0, 5);

    this.scene.add(this.treePyramidal);
    objectsWithShadows.push(this.treePyramidal);

    // tree round
    const treeRoundScale = 0.4;

    this.treeRound = this.resources.treeRound.scene;
    this.treeRound.scale.set(treeRoundScale, treeRoundScale, treeRoundScale);
    this.treeRound.position.set(5, 0, -1);

    this.scene.add(this.treeRound);
    objectsWithShadows.push(this.treeRound);

    // Stones
    const stoneScale = 0.4;

    // stone model 1
    this.stone1 = this.resources.stone1.scene;
    this.stone1.scale.set(stoneScale, stoneScale, stoneScale);
    this.stone1.position.set(3, 0.25, 5);
    this.stone1.rotation.y = Math.PI;

    this.scene.add(this.stone1);
    objectsWithShadows.push(this.stone1);

    // stone model 2
    this.stone2 = this.resources.stone2.scene;
    this.stone2.scale.set(stoneScale, stoneScale, stoneScale);
    this.stone2.position.set(-5, 0.25, -3);

    this.scene.add(this.stone2);
    objectsWithShadows.push(this.stone2);

    // Bushes
    // bush model 1
    const bush1Scale = 0.7;

    this.bush1 = this.resources.bush1.scene;
    this.bush1.scale.set(bush1Scale, bush1Scale, bush1Scale);
    this.bush1.position.set(1, 0.15, -3.2);
    this.bush1.rotation.y = -Math.PI / 2;

    this.scene.add(this.bush1);
    objectsWithShadows.push(this.bush1);

    // bush model 2
    const bush2Scale = 0.6;

    this.bush2 = this.resources.bush2.scene;
    this.bush2.scale.set(bush2Scale, bush2Scale, bush2Scale);
    this.bush2.position.set(1.5, 0.2, 3.2);
    this.bush2.rotation.y = -Math.PI / 2;

    this.scene.add(this.bush2);
    objectsWithShadows.push(this.bush2);

    // Shadows
    for (const obj of objectsWithShadows) {
      enableShadowsForGroup({
        group: obj,
        cast: true,
        receive: true,
      });
    }
  }
}
