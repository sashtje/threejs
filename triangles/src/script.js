import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
camera.position.z = 7;

const scene = new THREE.Scene();

const colors = ["yellow", "#00ff00", "#680000", "#068fc1", "#123456"];

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
// старт
const triangleCount = 10;
for (let i = 0; i < triangleCount; i++) {
  // Создание геометрии
  const geometry = new THREE.BufferGeometry();

  const verticesArr = [];
  for (let j = 0; j < 9; j++) {
    verticesArr.push((Math.random() - 0.5) * 5);
  }

  // вершины треугольника
  const vertices = new Float32Array(verticesArr);

  // Добавление вершин в геометрию
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // Создание материала
  const material = new THREE.MeshBasicMaterial({
    color: colors[randomInteger(0, colors.length - 1)],
    // wireframe: true,
    side: THREE.DoubleSide,
  });

  // Создание треугольника (меша)
  const triangle = new THREE.Mesh(geometry, material);

  // Добавление треугольника на сцену
  scene.add(triangle);
}
// стоп

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias для сглаживания рёбер фигуры
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
