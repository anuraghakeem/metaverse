import * as THREE from "three";


import keyInput from "./KeyInput.js";
import connect from "./Connect.js";

import anurag from './anurag.png'
import abhay from './abhay.png'
import abhinav from './abhinav.png'
import anshika from './anshika.png'
import apoorv from './apoorv.png'
import deghpreet from './deghpreet.png'
import jess from './jess.png'
import jivraj from './jivraj.png'

const imageList =[
  jess,
  abhay,
  anurag,
  abhinav,
  anshika,
  apoorv,
  deghpreet,
  jivraj
]
const openSeaURL =[
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641666534577274881',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641667634088902657',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641668733600530433',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641674231158669313',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641673131647041537',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641669833112158209',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641672032135413761',
  'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/104206034018960734157227822297469707953732132324313266366585641675330670297089'
]

// custom global variables
var targetList = [];
var projector, mouse = { x: 0, y: 0 };

import {FirstPersonControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/FirstPersonControls.js';

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
camera.position.set(-9, 4, 8);
// camera.position.set(5, 15, 15);

// const boxGeometry = new THREE.BoxGeometry(2, 4, 2);
// const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);

// box.position.set(-2, 2, 8);
// scene.add(box);
const viewerGeometry = new THREE.BoxGeometry(2, 2, 2);
const viwerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const viewer = new THREE.Mesh(viewerGeometry, viwerMaterial);

viewer.position.set(-2, 1, 8);
scene.add(viewer);


// when the mouse moves, call the given function
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

connect.then((result) => {
  // console.log(result);
  result.buildings.forEach( (b, index) => {
    if (index <= result.supply) {
      const jeffTexture = new THREE.TextureLoader().load(imageList[index-1]);
      const boxGeometry = new THREE.BoxGeometry(b.w, b.h, b.d);
      // const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      // const box = new THREE.Mesh(boxGeometry, boxMaterial);
      const box = new THREE.Mesh(
                  boxGeometry, 
                  new THREE.MeshBasicMaterial({ map: jeffTexture })
                  );
      box.position.set(b.x, b.y, b.z);
      box.userData = { URL: openSeaURL[index-1]};
      targetList.push(box);
      scene.add(box);
   }
  });
});

function onDocumentMouseDown(event){
  console.log('clicked')
  // update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	// projector.unprojectVector( vector, camera );
  vector.unproject(camera)
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( targetList );
	
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		console.log("Hit @ " + toString( intersects[0].point ) );
		console.log("Hit @ ", intersects[0].object.userData.URL );
    window.open(intersects[0].object.userData.URL, '_blank').focus();
		// change the color of the closest face.
		// intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
		// intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	}
}


function animate() {
  // initialize object to perform world/screen calculations
  // projector = new THREE.Projector();
  requestAnimationFrame(animate);

  if (keyInput.isPressed(38)) {
    // camera.position.y += 0.05;
    // camera.position.x += 0.05;
    camera.position.x += 0.05;
    viewer.position.x += 0.05;
  }
  if (keyInput.isPressed(40)) {
    // camera.position.y -= 0.05;
    // camera.position.x -= 0.05;
    camera.position.x -= 0.05;
    viewer.position.x -= 0.05;
  }

  if(keyInput.isPressed(37)){ // left arrow key
		// camera.rotation.y -= (Math.PI*0.02);
		// camera.rotation.y -= 0.1;
		// viewer.rotation.y -= 0.1;
		// camera.rotation.x -= 0.1;
		// camera.rotation.z -= 0.1;
    // scene.rotateOnAxis(new THREE.Vector3( 0,1,0), -0.02)
    // camera.position.z -= 0.05;
    camera.position.z -= 0.05;
    viewer.position.z -= 0.05;
	}
	if(keyInput.isPressed(39)){ // right arrow key
		// camera.rotation.y += 0.02;
    // camera.position.z += 0.05;
    camera.position.z += 0.05;
    viewer.position.z += 0.05;
	}

  // camera.lookAt(ground.position);
  camera.lookAt(viewer.position);
  renderer.render(scene, camera);
}

animate();

