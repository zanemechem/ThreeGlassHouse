

			import * as THREE from '../node_modules/three/build/three.module.js';

			import { DeviceOrientationControls } from '../node_modules/three/examples/jsm/controls/DeviceOrientationControls.js';

			let camera, scene, renderer, controls;

			const startButton = document.getElementById( 'startButton' );


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
					map: new THREE.TextureLoader().load( '../textures/panotest.jpg' )
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

		