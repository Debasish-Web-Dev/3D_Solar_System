import * as THREE from "three";

function addStar(size = 500) {
  const starGeometry = new THREE.BufferGeometry();
  const startMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 0.1});
  const star = new THREE.Points(starGeometry, startMaterial);

  const startVertices = [];
  for (let i = 0; i < size; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    startVertices.push(x, y, z);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(startVertices, 3))

  return star;
}

export default addStar;