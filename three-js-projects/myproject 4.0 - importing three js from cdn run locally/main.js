<html>
<script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.139.2/build/three.module.js"
      }
    }
  </script>
</html>
  // get canvas
  const myCanvas = document.querySelector('#myCanvas');

  //
  // three js setup
  //

  // load library
  import * as THREE from 'three';
  import { OrbitControls } from 'https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js';
        // import GLTF loader
        import { GLTFLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';
  // set table axis
  const axes = new THREE.AxesHelper();
  
  // GLTF loader class
        const loader = new GLTFLoader();
  
  // Loading model
        var object;
        loader.load( '/dog.glb', function (gltf) {
      object = gltf.scene;
  scene.add( gltf.scene );
      renderer.render(scene,camera);
        }, undefined, function ( error ) {
        console.error( error );} );

  // initliase the scene
  const scene = new THREE.Scene();
  scene.add(axes);

  // initialise the camera
  const camera = new THREE.PerspectiveCamera(
    50,
    myCanvas.offsetWidth / myCanvas.offsetHeight
  );
  camera.position.set(1, 1, 1);
  camera.lookAt(scene.position);

  // initalise the renderer
  const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
  renderer.setClearColor(0xffffff, 1.0); // 背景色
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

  // camera controller settings
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.maxPolarAngle = Math.PI * 0.5;
  orbitControls.minDistance = 0.1;
  orbitControls.maxDistance = 100;
  orbitControls.autoRotate = true; // カメラの自動回転設定
  orbitControls.autoRotateSpeed = 1.0; // カメラの自動回転速度

  // start drawing loop
  renderer.setAnimationLoop(() => {
    // update camera controller
    orbitControls.update();

    // draw
    renderer.render(scene, camera);
  });
