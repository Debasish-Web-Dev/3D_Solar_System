import * as THREE from "three";

function getSun() {
  const loader = new THREE.TextureLoader();
  const img = `sunmap.jpg`
  const path = `./Img/${img}`;

  const sunMat = new THREE.MeshStandardMaterial({
    map: loader.load(path),
    bumpMap: loader.load(path),
    bumpScale: 0.1,
    emissive: 0xFF7000,
  });
  const geo = new THREE.IcosahedronGeometry(1, 16);
  const sun = new THREE.Mesh(geo, sunMat);

  const sunLight = new THREE.PointLight(0xFFF2CC, 50);
  sun.add(sunLight);

  return sun;
}

export default getSun;