import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gsap } from "gsap";

import { CAMERA_Z, SUBDIVISION, DELAY, DURATION } from "./constant";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = CAMERA_Z;

const cubeGeometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  SUBDIVISION,
  SUBDIVISION,
  SUBDIVISION
);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "#444444",
  wireframe: true,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const scene = new THREE.Scene();

cube.position.y = 0.5;

const planeGeometry = new THREE.PlaneGeometry(5, 6);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: "#009688",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// позиция чуть меньше чтобы побороть z-fighting (конфликт глубины)
plane.position.z = -0.52;

function createCubeSurfacePart() {
  const cubePartGeometry = new THREE.PlaneGeometry(1, 1);
  const frontMaterial = new THREE.MeshBasicMaterial({
    color: "#fffae2",
  });
  const backMaterial = new THREE.MeshBasicMaterial({
    color: "#a3ffd7",
  });

  const frontPlane = new THREE.Mesh(cubePartGeometry, frontMaterial);
  const backPlane = new THREE.Mesh(cubePartGeometry, backMaterial);
  backPlane.rotation.y = Math.PI;

  const edgesGeometry = new THREE.EdgesGeometry(cubePartGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: "#000000",
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  const cubeSurfacePartGroup = new THREE.Group();
  cubeSurfacePartGroup.add(frontPlane);
  cubeSurfacePartGroup.add(backPlane);
  cubeSurfacePartGroup.add(edges);

  return cubeSurfacePartGroup;
}

// first
const firstPartGroup = createCubeSurfacePart();
firstPartGroup.position.set(-0.5, 0, 0);

const firstPartPivot = new THREE.Object3D();
firstPartPivot.add(firstPartGroup);
gsap.to(firstPartPivot.rotation, {
  delay: DELAY,
  duration: DURATION,
  x: 0,
  y: Math.PI / 2,
  z: 0,
});

const firstPart = new THREE.Group();
firstPart.add(firstPartPivot);
firstPart.position.set(-0.51, 0.5, -0.51);

// second
const secondPartGroup = createCubeSurfacePart();
secondPartGroup.position.set(0, 0.5, 0);

const secondPartPivot = new THREE.Object3D();
secondPartPivot.add(secondPartGroup);
gsap.to(secondPartPivot.rotation, {
  delay: DELAY + DURATION,
  duration: DURATION,
  x: Math.PI / 2,
  y: 0,
  z: 0,
});

const secondPart = new THREE.Group();
secondPart.add(secondPartPivot);
secondPart.position.set(0, 1.01, -0.51);

// third
const thirdPartGroup = createCubeSurfacePart();
thirdPartGroup.position.set(0.5, 0, 0);

const thirdPartPivot = new THREE.Object3D();
thirdPartPivot.add(thirdPartGroup);
gsap.to(thirdPartPivot.rotation, {
  delay: DELAY + DURATION * 2,
  duration: DURATION,
  x: 0,
  y: -Math.PI / 2,
  z: 0,
});

const thirdPart = new THREE.Group();
thirdPart.add(thirdPartPivot);
thirdPart.position.set(0.51, 0.5, -0.51);

// fourth
const fourthPartGroup = createCubeSurfacePart();
fourthPartGroup.position.set(0, -0.5, 0);

const fourthPartPivot = new THREE.Object3D();
fourthPartPivot.add(fourthPartGroup);

gsap.to(fourthPartPivot.rotation, {
  delay: DELAY + DURATION * 3,
  duration: DURATION,
  x: -Math.PI / 2,
  y: 0,
  z: 0,
});

const fourthPart = new THREE.Group();
fourthPart.add(fourthPartPivot);
fourthPart.position.set(0, -0.01, -0.51);

// fifth
const fifthPartGroup = createCubeSurfacePart();
fifthPartGroup.position.set(0, -1.5, 0);

const fifthNewPivot = new THREE.Object3D();
const fifthNewGroup = new THREE.Group();
const fifthPartPivot = new THREE.Object3D();
fifthPartPivot.add(fifthPartGroup);
gsap.to(fifthPartPivot.rotation, {
  delay: DELAY + DURATION * 3,
  duration: DURATION,
  x: -Math.PI / 2,
  y: 0,
  z: 0,
  onComplete: () => {
    fifthNewPivot.add(fifthPartGroup);
    fifthPartGroup.position.set(0, -0.5, 0);
    gsap.to(fifthNewPivot.rotation, {
      duration: DURATION,
      x: -Math.PI / 2,
      y: 0,
      z: 0,
    });

    fifthNewGroup.add(fifthNewPivot);
    fifthNewGroup.rotation.x = -Math.PI / 2;
    fifthNewGroup.position.set(0, -0.01, 0.51);
  },
});

const fifthPart = new THREE.Group();
fifthPart.add(fifthPartPivot);
fifthPart.position.set(0, -0.01, -0.51);

// sixth
const sixthPart = createCubeSurfacePart();
sixthPart.position.z = -0.51;
sixthPart.position.y = 0.5;

const group = new THREE.Group();
group.add(cube);
group.add(plane);
group.add(firstPart);
group.add(secondPart);
group.add(thirdPart);
group.add(fourthPart);
group.add(fifthPart);
group.add(sixthPart);
group.add(fifthNewPivot);
group.add(fifthNewGroup);
scene.add(group);

group.rotation.x = -Math.PI / 2.5;
group.rotation.z = Math.PI / 7;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
}); // antialias для сглаживания рёбер фигуры
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// размер области для рисования
renderer.setSize(sizes.width, sizes.height);

// добавили canvas на страницу
const canvas = renderer.domElement;
canvas.classList = "webgl";
document.body.appendChild(canvas);

// для управления камерой при помощи мышки
const controls = new OrbitControls(camera, canvas);
// для плавной анимации
controls.enableDamping = true;

// под капотом у renderer requestAnimationFrame
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

// для ресайза
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// для полноэкранного режима
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
