import { Clock } from "three";

function rotationAnimation(figure) {
  figure.rotation.x += 0.01;
  figure.rotation.y += 0.01;
}

const clock = new Clock();

function hoveringAnimation(figure, elapsedTime) {
  figure.position.y = Math.sin(elapsedTime);
}

function circleAnimation(figure, elapsedTime) {
  figure.position.y = Math.sin(elapsedTime);
  figure.position.x = Math.cos(elapsedTime);
}

export function animate(renderer, scene, camera, figure, controls) {
  const elapsedTime = clock.getElapsedTime();
  // rotationAnimation(figure);
  // hoveringAnimation(figure, elapsedTime);
  circleAnimation(figure, elapsedTime);

  controls.update();
  renderer.render(scene, camera);
}
