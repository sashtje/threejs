import {
  BoxGeometry,
  CapsuleGeometry,
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Group,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "lil-gui";

import { animate, animationType } from "./animation/animation";

// GUI
const gui = new GUI({
  width: 300,
  title: "Settings",
  // closeFolders: true,
});
// gui.close();

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

// чтобы пользователь мог настраивать фигуры и т.д.
const settingsObject = {
  bgColor: "#000000",
  type: "Box",
  color: "#28b828",
  animationType: animationType.no,
  edges: true,
  // special settings
  // box
  subdivision: 2,
  boxWidth: 1,
  boxHeight: 1,
  boxDepth: 1,
  // sphere
  sphereRadius: 1,
  sphereWidthSegments: 32,
  sphereHeightSegments: 16,
  // torus
  torusRadius: 1,
  torusTube: 0.3,
  torusRadialSegments: 16,
  torusTubularSegments: 100,
  torusArc: Math.PI * 2,
  // capsule
  capsuleRadius: 1,
  capsuleLength: 1,
  capsuleCapSegments: 4,
  capsuleRadialSegments: 8,
  // cone
  coneRadius: 1,
  coneHeight: 2,
  coneRadialSegments: 32,
  coneHeightSegments: 1,
  coneOpenEnded: false,
};

let figureType = settingsObject.type;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 7;

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: settingsObject.color });
let figure = new Mesh(geometry, material);

// settings
gui
  .addColor(settingsObject, "bgColor")
  .onChange(() => {
    renderer.setClearColor(settingsObject.bgColor);
  })
  .name("background");

const figureConfig = {
  Box: {
    constructor: BoxGeometry,
    args: [
      settingsObject.boxWidth,
      settingsObject.boxHeight,
      settingsObject.boxDepth,
      settingsObject.subdivision,
      settingsObject.subdivision,
      settingsObject.subdivision,
    ],
    settings: [],
  },
  Sphere: {
    constructor: SphereGeometry,
    args: [
      settingsObject.sphereRadius,
      settingsObject.sphereWidthSegments,
      settingsObject.sphereHeightSegments,
    ],
    settings: [],
  },
  Torus: {
    constructor: TorusGeometry,
    args: [
      settingsObject.torusRadius,
      settingsObject.torusTube,
      settingsObject.torusRadialSegments,
      settingsObject.torusTubularSegments,
      settingsObject.torusArc,
    ],
    settings: [],
  },
  Capsule: {
    constructor: CapsuleGeometry,
    args: [
      settingsObject.capsuleRadius,
      settingsObject.capsuleLength,
      settingsObject.capsuleCapSegments,
      settingsObject.capsuleRadialSegments,
    ],
    settings: [],
  },
  Cone: {
    constructor: ConeGeometry,
    args: [
      settingsObject.coneRadius,
      settingsObject.coneHeight,
      settingsObject.coneRadialSegments,
      settingsObject.coneHeightSegments,
      settingsObject.coneOpenEnded,
    ],
    settings: [],
  },
};

const figureSettings = gui.addFolder("Figure");
const specialSettings = gui.addFolder("Special");
const animationSettings = gui.addFolder("Animation");

figureSettings
  .add(settingsObject, "type", Object.keys(figureConfig))
  .onChange((event) => {
    figure.geometry.dispose();

    // вернули специальные для фигур настройки к дефолтным значениям
    specialSettings.reset();

    // спрятали настройки прошлой фигуры
    const prevFigureSettings = figureConfig[figureType].settings;
    prevFigureSettings.forEach((elem) => {
      elem.hide();
    });
    // показали настройки новой фигуры
    const currentFigureConfig = figureConfig[event];
    const newFigureSettings = currentFigureConfig.settings;
    newFigureSettings.forEach((elem) => {
      elem.show();
    });

    figureType = event;

    figure.geometry = new currentFigureConfig.constructor(
      ...currentFigureConfig.args
    );

    edges.geometry = new EdgesGeometry(figure.geometry);
  });

figureSettings.addColor(settingsObject, "color").onChange(() => {
  material.color.set(settingsObject.color);
});

figureSettings.add(material, "wireframe");

// special figure settings (разные настройки для разных фигур)
const boxSettings = figureConfig.Box.settings;
function changeBoxFigure() {
  figure.geometry.dispose();
  figure.geometry = new BoxGeometry(
    settingsObject.boxWidth,
    settingsObject.boxHeight,
    settingsObject.boxDepth,
    settingsObject.subdivision,
    settingsObject.subdivision,
    settingsObject.subdivision
  );
  edges.geometry = new EdgesGeometry(figure.geometry);
}

boxSettings.push(
  specialSettings
    .add(settingsObject, "subdivision")
    .min(1)
    .max(20)
    .step(1)
    .onChange(changeBoxFigure),
  specialSettings
    .add(settingsObject, "boxWidth")
    .min(1)
    .max(5)
    .step(1)
    .onChange(changeBoxFigure)
    .name("width"),
  specialSettings
    .add(settingsObject, "boxHeight")
    .min(1)
    .max(5)
    .step(1)
    .onChange(changeBoxFigure)
    .name("height"),
  specialSettings
    .add(settingsObject, "boxDepth")
    .min(1)
    .max(5)
    .step(1)
    .onChange(changeBoxFigure)
    .name("depth")
);

const sphereSettings = figureConfig.Sphere.settings;
function changeSphereFigure() {
  figure.geometry.dispose();
  figure.geometry = new SphereGeometry(
    settingsObject.sphereRadius,
    settingsObject.sphereWidthSegments,
    settingsObject.sphereHeightSegments
  );
  edges.geometry = new EdgesGeometry(figure.geometry);
}

sphereSettings.push(
  specialSettings
    .add(settingsObject, "sphereRadius")
    .min(1)
    .max(10)
    .step(1)
    .onChange(changeSphereFigure)
    .name("radius")
    .hide(),
  specialSettings
    .add(settingsObject, "sphereWidthSegments")
    .min(3)
    .max(64)
    .step(1)
    .onChange(changeSphereFigure)
    .name("widthSegments")
    .hide(),
  specialSettings
    .add(settingsObject, "sphereHeightSegments")
    .min(2)
    .max(32)
    .step(1)
    .onChange(changeSphereFigure)
    .name("heightSegments")
    .hide()
);

const torusSettings = figureConfig.Torus.settings;
function changeTorusFigure() {
  figure.geometry.dispose();
  figure.geometry = new TorusGeometry(
    settingsObject.torusRadius,
    settingsObject.torusTube,
    settingsObject.torusRadialSegments,
    settingsObject.torusTubularSegments,
    settingsObject.torusArc
  );
  edges.geometry = new EdgesGeometry(figure.geometry);
}

torusSettings.push(
  specialSettings
    .add(settingsObject, "torusRadius")
    .min(1)
    .max(20)
    .step(0.01)
    .onChange(changeTorusFigure)
    .name("radius")
    .hide(),
  specialSettings
    .add(settingsObject, "torusTube")
    .min(0.1)
    .max(10)
    .step(0.01)
    .onChange(changeTorusFigure)
    .name("tube")
    .hide(),
  specialSettings
    .add(settingsObject, "torusRadialSegments")
    .min(2)
    .max(30)
    .step(1)
    .onChange(changeTorusFigure)
    .name("radialSegments")
    .hide(),
  specialSettings
    .add(settingsObject, "torusTubularSegments")
    .min(3)
    .max(200)
    .step(1)
    .onChange(changeTorusFigure)
    .name("tubularSegments")
    .hide(),
  specialSettings
    .add(settingsObject, "torusArc")
    .min(0.1)
    .max(Math.PI * 2)
    .step(0.1)
    .onChange(changeTorusFigure)
    .name("arc")
    .hide()
);

const capsuleSettings = figureConfig.Capsule.settings;
function changeCapsuleFigure() {
  figure.geometry.dispose();
  figure.geometry = new CapsuleGeometry(
    settingsObject.capsuleRadius,
    settingsObject.capsuleLength,
    settingsObject.capsuleCapSegments,
    settingsObject.capsuleRadialSegments
  );
  edges.geometry = new EdgesGeometry(figure.geometry);
}

capsuleSettings.push(
  specialSettings
    .add(settingsObject, "capsuleRadius")
    .min(1)
    .max(20)
    .step(1)
    .onChange(changeCapsuleFigure)
    .name("radius")
    .hide(),
  specialSettings
    .add(settingsObject, "capsuleLength")
    .min(1)
    .max(20)
    .step(1)
    .onChange(changeCapsuleFigure)
    .name("length")
    .hide(),
  specialSettings
    .add(settingsObject, "capsuleCapSegments")
    .min(1)
    .max(32)
    .step(1)
    .onChange(changeCapsuleFigure)
    .name("capSegments")
    .hide(),
  specialSettings
    .add(settingsObject, "capsuleRadialSegments")
    .min(1)
    .max(64)
    .step(1)
    .onChange(changeCapsuleFigure)
    .name("radialSegments")
    .hide()
);

const coneSettings = figureConfig.Cone.settings;
function changeConeFigure() {
  figure.geometry.dispose();
  figure.geometry = new ConeGeometry(
    settingsObject.coneRadius,
    settingsObject.coneHeight,
    settingsObject.coneRadialSegments,
    settingsObject.coneHeightSegments,
    settingsObject.coneOpenEnded
  );
  edges.geometry = new EdgesGeometry(figure.geometry);
}

coneSettings.push(
  specialSettings
    .add(settingsObject, "coneRadius")
    .min(0)
    .max(20)
    .step(0.01)
    .onChange(changeConeFigure)
    .name("radius")
    .hide(),
  specialSettings
    .add(settingsObject, "coneHeight")
    .min(1)
    .max(20)
    .step(0.01)
    .onChange(changeConeFigure)
    .name("height")
    .hide(),
  specialSettings
    .add(settingsObject, "coneRadialSegments")
    .min(3)
    .max(64)
    .step(1)
    .onChange(changeConeFigure)
    .name("radialSegments")
    .hide(),
  specialSettings
    .add(settingsObject, "coneHeightSegments")
    .min(1)
    .max(64)
    .step(1)
    .onChange(changeConeFigure)
    .name("heightSegments")
    .hide(),
  specialSettings
    .add(settingsObject, "coneOpenEnded")
    .onChange(changeConeFigure)
    .name("openEnded")
    .hide()
);

animationSettings
  .add(settingsObject, "animationType", Object.keys(animationType))
  .onChange((event) => {
    settingsObject.animationType = animationType[event];
  })
  .name("type");

// end of settings

const scene = new Scene();

// Создаем геометрию рёбер
const edgesGeometry = new EdgesGeometry(figure.geometry);
// Создаем материал для рёбер
const edgesMaterial = new LineBasicMaterial({ color: 0xffffff });
// Создаем линию для рёбер
const edges = new LineSegments(edgesGeometry, edgesMaterial);

const figureGroup = new Group();
figureGroup.add(figure);
figureGroup.add(edges);
scene.add(figureGroup);

figureSettings.add(settingsObject, "edges").onChange(() => {
  edges.visible = settingsObject.edges;
});

const renderer = new WebGLRenderer({ antialias: true }); // antialias для сглаживания рёбер фигуры
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// размер области для рисования
renderer.setSize(sizes.width, sizes.height);

renderer.setClearColor(settingsObject.bgColor);

// добавили canvas на страницу
const canvas = renderer.domElement;
canvas.classList = "webgl";
document.body.appendChild(canvas);

// для управления камерой при помощи мышки
const controls = new OrbitControls(camera, canvas);
// для плавной анимации
controls.enableDamping = true;

// под капотом у renderer requestAnimationFrame
renderer.setAnimationLoop(() =>
  animate(
    renderer,
    scene,
    camera,
    figureGroup,
    controls,
    settingsObject.animationType
  )
);

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
