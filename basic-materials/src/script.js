import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GUI } from "lil-gui";

const baseURL = import.meta.env.BASE_URL;

function getAbsoluteUrl(url) {
  return `${baseURL}${url}`;
}

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);

// const colorTexture = textureLoader.load(
//   getAbsoluteUrl("textures/door/color.jpg")
// );

// GUI
const gui = new GUI({
  width: 300,
  title: "Settings",
  closeFolders: true,
});
gui.close();

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

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
camera.position.x = -4;
camera.position.y = 1;

// rainbow sphere
const sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
const rainbowMaterial = new THREE.MeshNormalMaterial({
  flatShading: true,
  side: THREE.DoubleSide,
});
const rainbowSphere = new THREE.Mesh(sphereGeometry, rainbowMaterial);

rainbowSphere.position.x = -2;
rainbowSphere.position.z = -2;

const rainbowSphereSettings = {
  flatShading: true,
};

// matcap torus
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
const matcapMaterial = new THREE.MeshMatcapMaterial({ side: THREE.DoubleSide });
const matcapTorus = new THREE.Mesh(torusGeometry, matcapMaterial);
matcapTorus.position.y = -3;
matcapTorus.rotation.y = -Math.PI / 5;
matcapTorus.rotation.x = -Math.PI / 8;

const matcapValues = [
  "no",
  ...Array.from({ length: 8 }, (_, i) => (i + 1).toString()),
];
const matcapTorusSettings = {
  matcap: matcapValues[0],
};

// metal sphere
const metalMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});
metalMaterial.metalness = 0.7;
metalMaterial.roughness = 0.2;
const metalSphere = new THREE.Mesh(sphereGeometry, metalMaterial);

// mirror plane
const planeGeometry = new THREE.PlaneGeometry(1.5, 1.5, 100, 100);
const mirrorMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});
mirrorMaterial.metalness = 1;
mirrorMaterial.roughness = 0;
const mirror = new THREE.Mesh(planeGeometry, mirrorMaterial);
mirror.position.y = 2.5;
mirror.rotation.y = -Math.PI / 8;

// fabric sphere
const fabricMaterial = new THREE.MeshPhysicalMaterial({
  side: THREE.DoubleSide,
});
fabricMaterial.sheen = 1;
fabricMaterial.sheenRoughness = 0.25;
fabricMaterial.sheenColor.set(1, 1, 1);
const fabricSphere = new THREE.Mesh(sphereGeometry, fabricMaterial);
fabricSphere.position.y = 2.5;
fabricSphere.position.x = 2.5;
fabricSphere.position.z = 1;

const fabricValues = ["fabric.jpg", "denim.jpg", "carpet.jpg"];
fabricMaterial.map = textureLoader.load(
  getAbsoluteUrl(`textures/ball/${fabricValues[0]}`)
);
const fabricSphereSettings = {
  map: fabricValues[0],
};

// amber box
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const amberMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffbf00",
  side: THREE.DoubleSide,
});
const amberBox = new THREE.Mesh(boxGeometry, amberMaterial);

amberMaterial.transmission = 1;
amberMaterial.ior = 1.2;
amberMaterial.thickness = 0.5;

amberBox.position.y = 2.5;
amberBox.position.x = -1.5;
amberBox.position.z = -1.5;
amberBox.rotation.y = Math.PI / 8;

// glass sphere
const glassMaterial = new THREE.MeshPhysicalMaterial({
  side: THREE.DoubleSide,
});
glassMaterial.metalness = 0;
glassMaterial.roughness = 0;
glassMaterial.transmission = 1;
glassMaterial.ior = 1.5;
glassMaterial.thickness = 0.5;
const glassSphere = new THREE.Mesh(sphereGeometry, glassMaterial);
glassSphere.position.x = 2;
glassSphere.position.z = 2;

// soap bubble
const soapBubbleMaterial = new THREE.MeshPhysicalMaterial({
  side: THREE.DoubleSide,
});
soapBubbleMaterial.metalness = 0;
soapBubbleMaterial.roughness = 0;
soapBubbleMaterial.transmission = 1;
soapBubbleMaterial.ior = 1.5;
soapBubbleMaterial.thickness = 0.5;
const soapBubble = new THREE.Mesh(sphereGeometry, soapBubbleMaterial);
soapBubble.position.x = -2.5;
soapBubble.position.y = -2.5;
soapBubble.position.z = -2;

soapBubbleMaterial.iridescence = 1;
soapBubbleMaterial.iridescenceIOR = 1;
soapBubbleMaterial.iridescenceThicknessRange = [100, 800];

// gui settings
const rainbowSphereGUISettings = gui.addFolder("Rainbow sphere");
const matcapTorusGUISettings = gui.addFolder("Matcap torus");
const metalSphereGUISettings = gui.addFolder("Metal sphere");
const mirrorGUISettings = gui.addFolder("Mirror");
const fabricSphereGUISettings = gui.addFolder("Fabric sphere");
const amberBoxGUISettings = gui.addFolder("Amber box");
const glassSphereGUISettings = gui.addFolder("Glass sphere");
const soapBubbleGUISettings = gui.addFolder("Soap bubble");

// rainbow sphere settings
let wireframeRainbowController;
const flatShadingRainbowController = rainbowSphereGUISettings
  .add(rainbowSphereSettings, "flatShading")
  .onChange((value) => {
    if (value) {
      wireframeRainbowController.disable();
    } else {
      wireframeRainbowController.enable();
    }
    rainbowMaterial.flatShading = value;
    rainbowMaterial.needsUpdate = true; // Сообщаем Three.js, что материал нужно обновить
  });

wireframeRainbowController = rainbowSphereGUISettings
  .add(rainbowMaterial, "wireframe")
  .onChange((value) => {
    if (value) {
      flatShadingRainbowController.disable();
    } else {
      flatShadingRainbowController.enable();
    }
    rainbowMaterial.wireframe = value;
  })
  .disable();

// torus matcap material settings
matcapTorusGUISettings
  .add(matcapTorusSettings, "matcap", matcapValues)
  .onChange((value) => {
    if (value === matcapValues[0]) {
      matcapMaterial.matcap = undefined;
    } else {
      matcapMaterial.matcap = textureLoader.load(
        getAbsoluteUrl(`textures/matcaps/${value}.png`)
      );
    }
  });

// metal sphere settings
metalSphereGUISettings
  .add(metalMaterial, "metalness")
  .min(0)
  .max(1)
  .step(0.001);
metalSphereGUISettings
  .add(metalMaterial, "roughness")
  .min(0)
  .max(1)
  .step(0.001);

// mirror settings
mirrorGUISettings.add(mirrorMaterial, "metalness").min(0).max(1).step(0.001);
mirrorGUISettings.add(mirrorMaterial, "roughness").min(0).max(1).step(0.001);

// fabric sphere settings
fabricSphereGUISettings
  .add(fabricSphereSettings, "map", fabricValues)
  .onChange((value) => {
    fabricMaterial.map = textureLoader.load(
      getAbsoluteUrl(`textures/ball/${value}`)
    );
  });
fabricSphereGUISettings.add(fabricMaterial, "sheen").min(0).max(1).step(0.0001);
fabricSphereGUISettings
  .add(fabricMaterial, "sheenRoughness")
  .min(0)
  .max(1)
  .step(0.0001);
fabricSphereGUISettings.addColor(fabricMaterial, "sheenColor");

// amber box settings
amberBoxGUISettings
  .add(amberMaterial, "transmission")
  .min(0)
  .max(1)
  .step(0.0001);
amberBoxGUISettings.add(amberMaterial, "ior").min(1).max(10).step(0.0001);
amberBoxGUISettings.add(amberMaterial, "thickness").min(0).max(1).step(0.0001);

// glass sphere settings
glassSphereGUISettings
  .add(glassMaterial, "transmission")
  .min(0)
  .max(1)
  .step(0.0001);
glassSphereGUISettings.add(glassMaterial, "ior").min(1).max(10).step(0.0001);
glassSphereGUISettings
  .add(glassMaterial, "thickness")
  .min(0)
  .max(1)
  .step(0.0001);

// soap bubble settings
soapBubbleGUISettings
  .add(soapBubbleMaterial, "iridescence")
  .min(0)
  .max(1)
  .step(0.0001);
soapBubbleGUISettings
  .add(soapBubbleMaterial, "iridescenceIOR")
  .min(1)
  .max(2.333)
  .step(0.0001);
soapBubbleGUISettings
  .add(soapBubbleMaterial.iridescenceThicknessRange, "0")
  .min(1)
  .max(1000)
  .step(1);
soapBubbleGUISettings
  .add(soapBubbleMaterial.iridescenceThicknessRange, "1")
  .min(1)
  .max(1000)
  .step(1);

// end of settings

const scene = new THREE.Scene();

const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  getAbsoluteUrl("textures/environmentMap/country-hall.hdr"),
  (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    // задание как фона
    scene.background = environmentMap;
    // чтобы освещение с картинки влияло на фигуры
    scene.environment = environmentMap;

    scene.add(rainbowSphere);
    scene.add(matcapTorus);
    scene.add(metalSphere);
    scene.add(mirror);
    scene.add(fabricSphere);
    scene.add(amberBox);
    scene.add(glassSphere);
    scene.add(soapBubble);
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

const lilGuiPanel = document.querySelector(".lil-gui");
lilGuiPanel.addEventListener("dblclick", (event) => {
  event.stopPropagation();
});
lilGuiPanel.addEventListener("touchend", (event) => {
  event.stopPropagation();
});
window.addEventListener("touchend", () => {
  gui.close();
});
