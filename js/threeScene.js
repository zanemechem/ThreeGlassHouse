//IMPORTS//
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js'

//SCENE//
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2); scene.add(axesHelper);
const loader = new GLTFLoader();

loader.load("meshes/weedplant.glb",function(gltf){
    scene.add(gltf.scene);

}, undefined , function(error){
    console.error(error);
})
//CAMERA//
const camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,.01,1000);


camera.position.set(50, 60,40);
camera.lookAt(0,0,0);

//RENDERER//
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);

const geometry = new THREE.BoxGeometry();
const color1 = new THREE.Color("rgb(255,230,200)");
const material = new THREE.MeshBasicMaterial({color:color1});
const cube = new THREE.Mesh(geometry,material);
const lineMat = new THREE.LineBasicMaterial({color:color1});


const points = [];
points.push(new THREE.Vector3(-10,0,0));
points.push(new THREE.Vector3(0,0,0));
points.push(new THREE.Vector3(10,0,0));
const LineGeo = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(LineGeo,material);

scene.add(cube);
scene.add(line);

function rotateCube(){


    cube.rotation.x += .01;
    cube.rotation.y += .02;


    
}
function animate(){
    requestAnimationFrame(animate);
    rotateCube();
    renderer.render(scene,camera);
}

animate();

