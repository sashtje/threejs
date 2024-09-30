import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const baseURL = import.meta.env.BASE_URL;

function getAbsoluteUrl(url) {
  return `${baseURL}${url}`;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);

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
camera.position.z = 6;

const scene = new THREE.Scene();

const fontLoader = new FontLoader();
fontLoader.load(
  getAbsoluteUrl("fonts/helvetiker_regular.typeface.json"),
  (font) => {
    const textSettings = {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 7,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 7,
    };
    const quoteGeometry = new TextGeometry(
      '"Action expresses priorities"',
      textSettings
    );
    const authorGeometry = new TextGeometry("Mahatma Gandhi", textSettings);

    const textMaterial = new THREE.MeshMatcapMaterial({
      side: THREE.DoubleSide,
    });
    textMaterial.matcap = textureLoader.load(
      getAbsoluteUrl(`textures/matcaps/3.png`)
    );
    const quoteText = new THREE.Mesh(quoteGeometry, textMaterial);
    const authorText = new THREE.Mesh(authorGeometry, textMaterial);
    quoteGeometry.center();
    quoteGeometry.translate(0, 1, 0);
    authorGeometry.center();
    authorGeometry.translate(0, -1, 0);

    scene.add(quoteText);
    scene.add(authorText);

    // генерируем разные фигуры вокруг
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const materialsArray = [
      "brick.jpg",
      "denim.jpg",
      "fabric.jpg",
      "plaster.jpg",
      "rocky.jpg",
    ];
    const donutMaterials = materialsArray.map((item) => {
      const donutMaterial = new THREE.MeshMatcapMaterial({
        side: THREE.DoubleSide,
      });
      donutMaterial.map = textureLoader.load(
        getAbsoluteUrl(`textures/ball/${item}`)
      );

      return donutMaterial;
    });

    for (let i = 0; i < 500; i++) {
      const donut = new THREE.Mesh(
        donutGeometry,
        donutMaterials[randomInteger(0, donutMaterials.length - 1)]
      );
      donut.position.x = (Math.random() - 0.5) * 20;
      donut.position.y = (Math.random() - 0.5) * 20;
      donut.position.z = (Math.random() - 0.5) * 20;
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      const scale = Math.random();
      donut.scale.set(scale, scale, scale);
      scene.add(donut);
    }
  }
);

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
