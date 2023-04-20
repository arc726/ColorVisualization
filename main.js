import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 5);
scene.add(camera);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // enable smooth camera movement
controls.dampingFactor = 0.05; // set damping factor
controls.rotateSpeed = 0.5; // set rotate speed

var loader = new GLTFLoader();
loader.load('scene.gltf', function (gltf) {
    gltf.scene.rotation.y = Math.PI / 2; 
    scene.add(gltf.scene);
});

var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // set light direction
scene.add(directionalLight);

scene.background = new THREE.Color(0x999999);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();