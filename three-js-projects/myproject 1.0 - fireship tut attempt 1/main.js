// import stylesheet
import './style.css';

// import three js library
import * as THREE from 'three';

// import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* declare/instantiate variable for new scene */
const scene = new THREE.Scene();

// declare/instantiate variable for new cameraa
const camera = new THREE.PerspectiveCamera( 75, window.innerHeight / window.innerWidth, 0.1, 100 )

// declare/instantiate variable for new renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// set pixel ratio to match device - prevent blurring on hi dpi devices
renderer.setPixelRatio(window.devicePixelRatio);
// make it a full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight);
// move camera along z axis to give better perspective when we start adding shapes
camera.position.setZ(30);

renderer.render(scene, camera);

// create a new torus geometry
const geometry = new THREE.TorusGeometry (10, 3, 16, 100);

// crete new basic material
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

//create a mesh by combining geometry and material
const torus = new THREE.Mesh( geometry, material );

//call torus to add it to our scene
scene.add(torus)


// instantiate a new point light
const pointLight = new THREE. PointLight(0xffffff)
// move point light away from centre, setting x y and z values to 5
pointLight.position.set(20,20,20)

// instantiate ambient light
const ambientLight = new THREE. AmbientLight(0xffffff);

// add ambient and point light to scene
scene.add(pointLight, ambientLight)

// instantiate pointlight helper
const lightHelper = new THREE.PointLightHelper(pointLight)
// instantiate grid helper
const gridHelper = new THREE.GridHelper (200, 50);
// add pointlight and grid helper
scene.add( lightHelper, gridHelper )


// instantiate orbit controls class and pass camera and renderer dom element as arguemnts. listen to mouse events and update camera positon accordingly  
const controls = new OrbitControls(camera, renderer.domElement);




//setup recurssive function that calls render method automatically
function animate() {
  // tells the browser we want to create an animation
  // whenever the browser repaints the screen it calls our render method to update the ui. like a game loop in game dev
  requestAnimationFrame( animate );

  // animation actions
  // update rotation along x axis by 0.01 for every animation frame
  torus. rotation.x += 0.01;
  // update rotation along y axis by 0.05 for every animation frame
  torus. rotation.y += 0.005;
  // update rotation along z axis by 0.01 for every animation frame
  torus. rotation.Z += 0.01;

  // call orbit controls updates to make sure changes are reflected in ui
  controls.update();

  renderer.render ( scene, camera );
}

animate()
