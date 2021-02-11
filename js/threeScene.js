//IMPORTS//
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js'

//SCENE//
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2); scene.add(axesHelper);
const loader = new GLTFLoader();

loader.load( 'meshes/weedplant.glb', function( gltf ) {

    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) { node.castShadow = true; node.recieveShadow = true;
        node.scale.set(4,4,4);}

    } );

    scene.add( gltf.scene );

} );
//CAMERA//
const camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,.01,1000);


camera.position.set(50, 60,40);
camera.lookAt(0,0,0);

//LIGHTS//

const c_brightWhite = 0xFFFFFF;
const ambientIntensity = .4;
const directIntensity = 3;

const light = new THREE.DirectionalLight(c_brightWhite,directIntensity);
const amli = new THREE.AmbientLight(c_brightWhite,ambientIntensity);
light.position.set(20, 40, 20);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);
scene.add(light.target)
scene.add(amli);

const camerahelper =  new THREE.CameraHelper(light.shadow.camera);
scene.add(camerahelper);
//RENDERER//
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);
const GroundPlane = new THREE.PlaneGeometry(100,100,2,2);
const box = new THREE.BoxGeometry();
const color1 = new THREE.Color("rgb(255,230,255)");
const material = new THREE.MeshBasicMaterial({color:color1});
const litMat = new THREE.MeshPhongMaterial({color:color1});

const cube = new THREE.Mesh(box,litMat);
cube.scale.set(5,5,5);
const lineMat = new THREE.LineBasicMaterial({color:color1});


const plane = new THREE.Mesh(GroundPlane,litMat);
plane.recieveShadow = true;
plane.castShadow = true;
plane.rotation.x = Math.PI * -.5;
const points = [];
points.push(new THREE.Vector3(-10,0,0));
points.push(new THREE.Vector3(0,0,0));
points.push(new THREE.Vector3(10,0,0));
const LineGeo = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(LineGeo,material);

scene.add(cube);
scene.add(line);
scene.add(plane);

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

<<<<<<< HEAD

			import * as THREE from 'https://unpkg.com/three/build/three.module.js';

			import { DeviceOrientationControls } from 'https://unpkg.com/three/examples/jsm/controls/DeviceOrientationControls.js';

			let camera, scene, renderer, controls;


        checkGyroscope();
				init();
				animate();



			function init() {



				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

				controls = new DeviceOrientationControls( camera );

				scene = new THREE.Scene();

				const geometry = new THREE.SphereGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				const material = new THREE.MeshBasicMaterial( {
					map: new THREE.TextureLoader().load( 'textures/panotest.jpg' )
				} );

				const mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				const helperGeometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
				const helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
				const helper = new THREE.Mesh( helperGeometry, helperMaterial );
				scene.add( helper );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize );


			}

			function animate() {

				window.requestAnimationFrame( animate );

				controls.update();
				renderer.render( scene, camera );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

      function checkGyroscope(){
        var gyroPresent = false;
        window.addEventListener("devicemotion", function(event){
          if(event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)
              gyroPresent = true;
      });
      }
=======
>>>>>>> parent of 39b70b7 (a04)
