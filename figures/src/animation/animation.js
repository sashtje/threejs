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

function rotationAnimation({ figureGroup }) {
  figureGroup.rotation.x += 0.01;
  figureGroup.rotation.y += 0.01;
}

const clock = new Clock();

function hoveringAnimation({ figureGroup, elapsedTime }) {
  figureGroup.position.y = Math.sin(elapsedTime);
}

function circleAnimation({ figureGroup, elapsedTime }) {
  figureGroup.position.y = Math.sin(elapsedTime);
  figureGroup.position.x = Math.cos(elapsedTime);
}

let prevAnimationType;
let isAnimatingBack = false;
const DURATION = 0.5;

export function animate(
  renderer,
  scene,
  camera,
  figureGroup,
  controls,
  animationType
) {
  if (prevAnimationType !== animationType) {
    prevAnimationType = animationType;
    isAnimatingBack = true;

    // возвращаем фигуру и камеру в исходное положение
    // Анимация позиции фигуры
    gsap.to(figureGroup.position, { duration: DURATION, x: 0, y: 0, z: 0 });
    // Анимация вращения фигуры
    gsap.to(figureGroup.rotation, { duration: DURATION, x: 0, y: 0, z: 0 });
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
    animationConfig[animationType]({ figureGroup, elapsedTime });
  }

  controls.update();
  renderer.render(scene, camera);
}
