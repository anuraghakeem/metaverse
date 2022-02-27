import * as THREE from "three";

import keyInput from "./keyinput.js";
import connect from "./Connect.js";

connect.then(() => {
  // console. log("hi");
});

import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040);
const dLight = new THREE.DirectionalLight(0xffffff, 0.5);

light.add(dLight);
scene.add(light);

const geometry = new THREE.BoxGeometry(50, 0.1, 50);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(geometry, material);

scene.add(ground);
camera.position.set(5, 15, 15);

// const boxGeometry = new THREE.BoxGeometry(2, 4, 2);
// const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);

// box.position.set(-2, 2, 8);
// scene.add(box);

function animate() {
  requestAnimationFrame(animate);

  if (keyInput.isPressed(38)) {
    camera.position.y += 0.05;
    camera.position.x += 0.05;
  }
  if (keyInput.isPressed(40)) {
    camera.position.y -= 0.05;
    camera.position.x -= 0.05;
  }

  camera.lookAt(ground.position);
  renderer.render(scene, camera);
}

animate();

connect.then((result) => {
  // console.log(result);
  result.buildings.forEach( (b, index) => {
    if (index <= result.supply) {
      const boxGeometry = new THREE.BoxGeometry(b.w, b.h, b.d);
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(b.x, b.y, b.z);
       scene.add(box);
   }
  });
});
