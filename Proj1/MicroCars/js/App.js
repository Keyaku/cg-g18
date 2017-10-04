/**
* This is the 'main' JS file. Everything down to globals and runtime happens here.
*/
var renderer, controls;
var gameBoard, raceTrack, car;
var clock = new THREE.Clock()

var TextureLoader = new THREE.TextureLoader();
TextureLoader.setPath('textures/');

/**
* Render method allows system to handle all the rendering.
*/
function render() {
	//Gets how much time has passed since the clock started.
	//var time = clock.getElapsedTime()
	//Gets how much time has passed since the last frame.
	//var delta = clock.getDelta()
	//Calculates how much the car needs to move.
	//var v = car.carPhysics.getDisplacement(time, delta)
	//Moves the car.
	//car.mesh.position.set(v.x, 0, v.z)

	renderer.render(scene, camera);
	controls.update()
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
}
