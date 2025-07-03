import * as THREE from "three";
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import getPlanet from './src/Planet.js'
import getSun from './src/Sun.js'
import addStar from './src/Stars.js'

const w = window.innerWidth;
const h = window.innerHeight;

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
// camera.position.z = 500;
const cameraDistance = 6;
let useAnimatedCamera = true;

//renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
// THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

//3d control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//light
const hemiLight = new THREE.DirectionalLight(0x0099ff, 1);
hemiLight.position.set(0, 1, 0);
scene.add(hemiLight);

// stars
const stars = addStar(2000);
scene.add(stars);

//solar system
const solarSystem = new THREE.Group();
solarSystem.userData.update = (t) => {
  solarSystem.children.forEach((child) => {
    child.userData.update?.(t);
  });
};
scene.add(solarSystem);

//sun
const sun = getSun();
solarSystem.add(sun);

//mercury
const mercury = getPlanet({size: 0.1, distance: 1.25, img: "mercury.png"});
solarSystem.add(mercury);

//venus
const venus = getPlanet({size: 0.2, distance: 1.65, img: "venus.png"});
solarSystem.add(venus);

//moon
const moon = getPlanet({size: 0.08, distance: 0.6, img: "moon.png", bumpPath: "moonbump4k.jpg"});
solarSystem.add(moon);
//earth
const earth = getPlanet({
  children: [moon],
  size: 0.225,
  distance: 2.1,
  img: '00_earthmap1k.jpg',
  bumpPath: "01_earthbump1k.jpg"
});
solarSystem.add(earth);

//mars
const mars = getPlanet({size: 0.15, distance: 2.45, img: 'mars.png'});
solarSystem.add(mars);

//jupiter
const jupiter = getPlanet({size: 0.5, distance: 2.95, img: 'jupiter.png'});
solarSystem.add(jupiter);

//saturn
const sRingGeo = new THREE.TorusGeometry(0.6, 0.15, 8, 64);
const sRingMat = new THREE.MeshStandardMaterial();
const saturnRing = new THREE.Mesh(sRingGeo, sRingMat);
saturnRing.scale.z = 0.1;
const saturn = getPlanet({children: [saturnRing], size: 0.35, distance: 3.55, img: 'saturn.png'});
solarSystem.add(saturn);

//uranus
const uranus = getPlanet({children: [], size: 0.3, distance: 4.05, img: 'uranus.png'});
solarSystem.add(uranus);

//neptune
const neptune = getPlanet({size: 0.3, distance: 4.55, img: 'neptune.png'});
solarSystem.add(neptune);

function animate(t = 0) {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0002;
  let time = t * 0.0005;
  solarSystem.userData.update(time);
  renderer.render(scene, camera);
  if (useAnimatedCamera) {
    let time = t * 0.0002;
    camera.position.x = Math.cos(time * 0.9) * cameraDistance;
    camera.position.y = Math.cos(time * 0.9) * 2;
    camera.position.z = Math.sin(time * 0.9) * cameraDistance;
    camera.lookAt(0, 0, 0);
  } else {
    controls.update();
  }
  document.addEventListener('mousedown', () => {
    useAnimatedCamera = false;
  });
  document.addEventListener('dblclick', () => {
    useAnimatedCamera = true;
  });
}

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
window.addEventListener('resize', handleWindowResize, false);