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
firstPartPivot.position.set(-0.51, 0.5, -0.51);

// second
const secondPartGroup = createCubeSurfacePart();
secondPartGroup.position.set(0, 0.5, 0);

const secondPartPivot = new THREE.Object3D();
secondPartPivot.add(secondPartGroup);
secondPartPivot.position.set(0, 1.01, -0.51);

// third
const thirdPartGroup = createCubeSurfacePart();
thirdPartGroup.position.set(0.5, 0, 0);

const thirdPartPivot = new THREE.Object3D();
thirdPartPivot.add(thirdPartGroup);
thirdPartPivot.position.set(0.51, 0.5, -0.51);

// fourth
const fourthPartGroup = createCubeSurfacePart();
fourthPartGroup.position.set(0, -0.5, 0);

const fourthPartPivot = new THREE.Object3D();
fourthPartPivot.add(fourthPartGroup);
fourthPartPivot.position.set(0, -0.01, -0.51);

// fifth
const fifthPartGroup = createCubeSurfacePart();
fifthPartGroup.position.set(0, -1.5, 0);

const fifthPartPivot = new THREE.Object3D();
fifthPartPivot.add(fifthPartGroup);
fifthPartPivot.position.set(0, -0.01, -0.51);

// sixth
const sixthPart = createCubeSurfacePart();
sixthPart.position.z = -0.51;
sixthPart.position.y = 0.5;

const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

// animation forward
timeline
  .to(firstPartPivot.rotation, {
    duration: DURATION,
    y: Math.PI / 2,
  })
  .to(
    secondPartPivot.rotation,
    {
      duration: DURATION,
      x: Math.PI / 2,
    },
    ">"
  )
  .to(
    thirdPartPivot.rotation,
    {
      duration: DURATION,
      y: -Math.PI / 2,
    },
    ">"
  )
  .to(
    fourthPartPivot.rotation,
    {
      duration: DURATION,
      x: -Math.PI / 2,
    },
    ">"
  )
  .to(
    fifthPartPivot.rotation,
    {
      duration: DURATION,
      x: -Math.PI / 2,
      onComplete: () => {
        fifthPartGroup.position.set(0, -0.5, 0);
        fifthPartPivot.position.set(0, 0, 0.51);
      },
    },
    "<"
  )
  .to(
    fifthPartPivot.rotation,
    {
      duration: DURATION,
      x: -Math.PI,
    },
    ">"
  );

// animation backward
timeline
  .to(fifthPartPivot.rotation, {
    delay: DELAY,
    duration: DURATION,
    x: -Math.PI / 2,
    onComplete: () => {
      fifthPartGroup.position.set(0, -1.5, 0);
      fifthPartPivot.position.set(0, -0.01, -0.51);
    },
  })
  .to(
    fifthPartPivot.rotation,
    {
      duration: DURATION,
      x: 0,
    },
    ">"
  )
  .to(
    fourthPartPivot.rotation,
    {
      duration: DURATION,
      x: 0,
    },
    "<"
  )
  .to(
    thirdPartPivot.rotation,
    {
      duration: DURATION,
      y: 0,
    },
    ">"
  )
  .to(
    secondPartPivot.rotation,
    {
      duration: DURATION,
      x: 0,
    },
    ">"
  )
  .to(
    firstPartPivot.rotation,
    {
      duration: DURATION,
      y: 0,
    },
    ">"
  );

const group = new THREE.Group();
group.add(cube);
group.add(plane);
group.add(firstPartPivot);
group.add(secondPartPivot);
group.add(thirdPartPivot);
group.add(fourthPartPivot);
group.add(fifthPartPivot);
group.add(sixthPart);
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
