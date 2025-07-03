import * as THREE from "three";

const texLoader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1, 10);

function getPlanet({children = [], distance = 0, img = '', size = 1,bumpPath=""}) {
  const orbitGroup = new THREE.Group();
  orbitGroup.rotation.x = Math.random() * Math.PI * 2;

  const path = `./Img/${img}`;
  const bump_path = `./Img/${bumpPath}`;
  const map = texLoader.load(path);
  const planetMat = new THREE.MeshStandardMaterial({
    map,
    bumpMap: texLoader.load(bump_path),
  });
  const planet = new THREE.Mesh(geo, planetMat);
  planet.scale.setScalar(size);

  const startAngle = Math.random() * Math.PI * 2;
  // const startAngle = 100;
  planet.position.x = Math.cos(startAngle) * distance;
  planet.position.z = Math.sin(startAngle) * distance;
  // planet.position.x = distance;

  // const planetRimMat = getFresnelMat({ rimHex: 0xffffff, facingHex: 0x000000 });
  // const planetRimMesh = new THREE.Mesh(geo, planetRimMat);
  // planetRimMesh.scale.setScalar(1.01);
  // planet.add(planetRimMesh);

  children.forEach((child) => {
    child.position.x = Math.cos(startAngle) * distance;
    child.position.z = Math.sin(startAngle) * distance;
    orbitGroup.add(child);
  });

  const rate = Math.random() - 1.0;
  orbitGroup.userData.update = (t) => {
    orbitGroup.rotation.y = t * rate;
    planet.rotation.y -= 0.005;
    children.forEach((child) => {
      child.userData.update?.(t);
    });
  };
  orbitGroup.add(planet);

  return orbitGroup;
}

export default getPlanet;