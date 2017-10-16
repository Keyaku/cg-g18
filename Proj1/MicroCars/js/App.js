/**
* This is the 'main' JS file. Everything down to globals and runtime happens here.
*/
var renderer, cameraManager, controls;
var gameBoard, raceTrack, car;
var clock = new THREE.Clock(false);

var LocalTextures = new THREE.TextureLoader();
LocalTextures.setPath('textures/');
var RemoteTextures = new THREE.TextureLoader();

/**
* Render method allows system to handle all the rendering.
*/
function render() {
	// Animation and physics updates to all visible PhysicsBody
	var delta = clock.getDelta();
	scene.traverseVisible(function(node) {
		if (node instanceof PhysicsBody) {
			node.update(delta);
		}
	});
	cameraManager.updateFollowCamera(car.mesh.position, car.mesh.getWorldDirection());
	// ThreeJS updates (OrbitControls, renderer)
	controls.update();
	renderer.render(scene, cameraManager.camera);
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
	cameraManager = new CameraManager();
	cameraManager.changeToOrthographic();
	createLights();
	render();

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);

	clock.start();
}
