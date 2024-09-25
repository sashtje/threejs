import { Clock } from "three";
import { gsap } from "gsap";

export const animationType = {
  no: "no",
  rotation: "rotation",
  hovering: "hovering",
  circle: "circle",
};

const animationConfig = {
  rotation: rotationAnimation,
  hovering: hoveringAnimation,
  circle: circleAnimation,
};

function rotationAnimation({ figure }) {
  figure.rotation.x += 0.01;
  figure.rotation.y += 0.01;
}

const clock = new Clock();

function hoveringAnimation({ figure, elapsedTime }) {
  figure.position.y = Math.sin(elapsedTime);
}

function circleAnimation({ figure, elapsedTime }) {
  figure.position.y = Math.sin(elapsedTime);
  figure.position.x = Math.cos(elapsedTime);
}

let prevAnimationType;
let isAnimatingBack = false;
const DURATION = 0.5;

export function animate(
  renderer,
  scene,
  camera,
  figure,
  controls,
  animationType
) {
  if (prevAnimationType !== animationType) {
    prevAnimationType = animationType;
    isAnimatingBack = true;

    // возвращаем фигуру и камеру в исходное положение
    // Анимация позиции фигуры
    gsap.to(figure.position, { duration: DURATION, x: 0, y: 0, z: 0 });
    // Анимация вращения фигуры
    gsap.to(figure.rotation, { duration: DURATION, x: 0, y: 0, z: 0 });
    // Анимация позиции камеры
    gsap.to(camera.position, { duration: DURATION, x: 0, y: 0, z: 7 });
    // Анимация цели OrbitControls
    gsap.to(controls.target, {
      duration: DURATION,
      x: 0,
      y: 0,
      z: 0,
      onUpdate: () => {
        controls.update();
        isAnimatingBack = false;
      },
    });
  }

  const elapsedTime = clock.getElapsedTime();
  if (animationConfig[animationType] && !isAnimatingBack) {
    animationConfig[animationType]({ figure, elapsedTime });
  }

  controls.update();
  renderer.render(scene, camera);
}
