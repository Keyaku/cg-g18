/**
* This is the 'main' JS file. Everything down to globals and runtime happens here.
*/
var renderer, cameraManager, controls;
var lightManager;
var game, gameBoard, raceTrack, car;
var pauseText, gameoverText;
var clock = new THREE.Clock(false);

var LocalTextures = new THREE.TextureLoader();
LocalTextures.setPath('textures/');
var RemoteTextures = new THREE.TextureLoader();

/**
* Render method allows system to handle all the rendering.
*/
function render() {
	// Updating camera projections and light calculations
	cameraManager.update();
	lightManager.update();

	// ThreeJS updates (OrbitControls, renderer)
	controls.update();
	renderer.render(scene, cameraManager.getCurrentCamera());
}

/**
* Animate updates all necessary data, and calls the rendering logic
*/
function animate() {
	// Animation and physics updates to all visible PhysicsBody
	var delta = clock.getDelta();

	if (!game.is_paused) {
		scene.traverseVisible(function(node) {
			if (node instanceof PhysicsBody) {
				node.update(delta);
			}
		});
	}

	render(); // Rendering

	cleanQueue(); // Freeing queued Object3D from scene

	// Requesting a call to this function
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
	game = new Game(5);
	cameraManager = new CameraManager();
	lightManager = new LightManager();
	render();

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keydown', Input.press.bind(Input));
	window.addEventListener('keyup', onKeyUp);
	window.addEventListener('keyup', Input.release.bind(Input));

	// Starting at the appropriate camera angle depending on the device
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		cameraManager.changeToPerspectiveFollow();
	} else {
		cameraManager.changeToOrthographic();
	}

	clock.start();
}
