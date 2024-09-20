import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new Scene();
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

const renderer = new WebGLRenderer();
// размер области для рисования
renderer.setSize(sizes.width, sizes.height);
// под капотом у renderer requestAnimationFrame
renderer.setAnimationLoop(animate);
// добавили canvas на страницу
renderer.domElement.classList = "webgl";
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
