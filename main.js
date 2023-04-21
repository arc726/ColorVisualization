import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var gui = new dat.GUI();
var scene = new THREE.Scene();

var carModel;

var materialParams = {
  color: 0xff0000, 
  metalness: 0.5, 
  roughness: 0.5, 
};

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 5);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05; 
controls.rotateSpeed = 0.5; 

var loader = new GLTFLoader();
loader.load("lotus/scene.gltf", function (gltf) {
  carModel = gltf.scene;
  carModel.rotation.y = Math.PI / 2;
  scene.add(carModel);
});

var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); 
scene.add(directionalLight);

scene.background = new THREE.Color(0x999999);

function updateMaterial() {
  carModel.traverse(function (child) {
    if (child.isMesh) {
      if (child.name.includes("Carpaint_Main") && !child.name.includes("RIM")) {
        child.material.color.set(materialParams.color);
        child.material.metalness = materialParams.metalness;
        child.material.roughness = materialParams.roughness;
      }
    }
  });
  renderer.render(scene, camera);
}

gui.addColor(materialParams, "color").onChange(updateMaterial);
gui.add(materialParams, "metalness", 0, 1).onChange(updateMaterial);
gui.add(materialParams, "roughness", 0, 1).onChange(updateMaterial);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
