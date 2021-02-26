//IMPORTS//
import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";
import { DeviceOrientationControls } from "https://unpkg.com/three/examples/jsm/controls/DeviceOrientationControls.js";
//SCENE//
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
const loader = new GLTFLoader();
scene.background = new THREE.Color(0xdddddd);

var cube = undefined;
var weedModel = undefined;

//LIGHTS//
loader.load("meshes/weedplant_2.glb", (result) => {
  weedModel = result.scene.children[1];
  weedModel.traverse(n =>{
    if(n.isMesh){
      n.castShadow = true;
      n.recieveShadow = true;
      if(n.material.map) n.material.map.anisotrophy = 16;
    }
  })
  scene.add(weedModel);
  weedModel.scale.set(4,4,4);
});
loader.load("meshes/planeToImport.glb", (result) => {
  const model = result.scene.children[1];
  model.traverse(n =>{
    if(n.isMesh){
      n.castShadow = true;
      n.recieveShadow = true;
      if(n.material.map) n.material.map.anisotrophy = 16;
    }
  })
  scene.add(model);
  model.scale.set(4,4,4);
});

const HemiLight = new THREE.HemisphereLight(0xffeeb1,0x080820,4);
scene.add(HemiLight);
const SpotLight = new THREE.SpotLight(0xffa95c,4);
SpotLight.castShadow = true;
SpotLight.shadow.bias = -0.0001;
SpotLight.shadow.mapSize.width = 1024*4;
SpotLight.shadow.mapSize.height = 1024*4;
scene.add(SpotLight);


//RENDERER//
const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.toneMappingExposure = 1.4;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//CAMERA//
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.set(50, 60, 40);
camera.lookAt(0, 0, 0);
const controls = new OrbitControls(camera, renderer.domElement);

init();


function init() {
  loadModels();
  animate();
}

function loadModels() {

//PLANE AND BOX GEO
  const GroundPlane = new THREE.PlaneGeometry(100, 100, 2, 2);
  const box = new THREE.BoxGeometry();

  //COLORS
  const color1 = new THREE.Color(0xffeeb1);

//MATS

  const material = new THREE.MeshBasicMaterial({ color: color1 });
  const litMat = new THREE.MeshPhongMaterial({ color: color1 });

  cube = new THREE.Mesh(box, litMat);
  cube.scale.set(5, 5, 5);
  const lineMat = new THREE.LineBasicMaterial({ color: color1 });

  //make plane
  const plane = new THREE.Mesh(GroundPlane, material);
  plane.recieveShadow = true;
  plane.castShadow = true;
  plane.rotation.x = Math.PI * -0.5;
//GEO TO SCENE
  //scene.add(cube);
  //scene.add(plane);
}





function rotateCube() {

  if (weedModel != undefined){weedModel.rotation.y +=0.005;}
}
function animate() {
  requestAnimationFrame(animate);
  rotateCube();
  SpotLight.position.set(camera.position.x+10,camera.position.y +10,camera.position.z +10);
  
  renderer.render(scene, camera);
}



class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}
