/**
* This is the 'main' JS file. Everything down to globals and runtime happens here.
*/
var renderer, controls;
var gameBoard, raceTrack, car;
var clock = new THREE.Clock(false);

var LocalTextures = new THREE.TextureLoader();
LocalTextures.setPath('textures/');
var RemoteTextures = new THREE.TextureLoader();

const TO_RADIANS = Math.PI / 180;
const TO_DEGREES = 180 / Math.PI;

/**
* Render method allows system to handle all the rendering.
*/
function render() {
	var delta = clock.getDelta();
	car.update(delta);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/**
* Init method calls various methods, createScene adds the custom object's meshes
* to the scene, the following methods add the light sources and the camera. The
* render method initiates a routine that enables automatic refreshing of frames.
* Finally, init also allows for some user interaction and flexibility on how
* objects are displayed on the scene.
*/
function init() {
	'use strict';
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// Background color
	renderer.setClearColor(0x6698FF, 1);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);
	createScene();
	createLights();
	createCamera();
	render();

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);

	clock.start();
}
