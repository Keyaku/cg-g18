/**
* edibleObjects is a dictionary with interactable objects such as oranges.
*/
var controls;
var gameBoard, raceTrack, car;
var stats;
var renderer, scene, camera;
var edibleObjects = {};
const frustumSize = 1000;

/**
* This method creates a perspective camera. Switching between perspective and
* orthographic cameras is also possible due to event listeners.
*/
this.createCamera = function() {
	var aspectRatio = window.innerWidth / window.innerHeight;
	if (camera instanceof THREE.PerspectiveCamera) {
		var left	 	= (frustumSize * aspectRatio) / (-2);
		var right 	= (frustumSize * aspectRatio) / 2;
		var top 		= frustumSize / 2;
		var bottom 	= frustumSize / (-2);
		camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 2000 );
		camera.position.x = 0;
		camera.position.y = 1000;
		camera.position.z = 0;
		this.perspective = "Orthographic";
		camera.lookAt(scene.position);
	} else {
		// PerspectiveCamera params: Field of View, Aspect Ratio, Near, Far
		camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1800);
		camera.position.x = -250;
		camera.position.y = 600;
		camera.position.z = -250
		camera.lookAt(scene.position);
		this.perspective = "Perspective";
	}
	controls = new THREE.OrbitControls(camera);
};

/**
* Render method allows system to handle all the rendering.
*/
function render() {
	renderer.render(scene, camera);
	controls.update()
	requestAnimationFrame(render);
}

/*******************************************************************************
* Object Oriented - Helper methods
*******************************************************************************/
/**
* Adds a new edible of type Object3D with subtype Orange or Butter to a dictionary
* whose keys are the desired Object3D name passed as a String
*/
function createEdible(edibleName, x, y, z) {
	if (edibleName.includes('Orange')) {
		edibleObjects[edibleName] = new Orange(edibleName, x, y, z);
	} else {
		edibleObjects[edibleName] = new Butter(x, y, z);
	}
}

function getEdible(edibleName) {
	return edibleObjects[edibleName];
}

function deleteEdible(edibleName) {
	var obj = scene.getObjectByName(edibleName);
	scene.remove(obj);
	delete edibleObjects[edibleName];
}

/*******************************************************************************
* Scene related - Helper methods
*******************************************************************************/
/**
* Instanciates the Scene with Axis & Grid helpers to assist devs with coordinates.
* Generates the board, representing the game world where other Oject3D objects are held.
*	Instanciates and adds edibles to the track which debuff the player when touched
* Object3D of subtype Car to a dictionary
*/
function createScene() {
	var size = 1000;
	var divisions = 100;
	scene = new THREE.Scene();
	// The X axis is red, Y is green and Z is blue.
	// scene.add(new THREE.GridHelper(size, divisions) );
	scene.add(new THREE.AxisHelper(size / 2));
	scene.background = new THREE.Color(0xAEEEEE);
	gameBoard = new Board(0, -10, 0);
	raceTrack = new Track();
	car = new Car(20, 2, -5);
	createEdible('FirstOrange', 200, 5, 40);
	createEdible('SecondOrange', 100, 5, 80);
	createEdible('ThirdOrange', 0, 5, 500);
	/**
	// TODO @Keyaku
	createEdible('FirstButter', 0, 5, 0);
	createEdible('SecondButter', 0, 5, 0);
	createEdible('ThirdButter', 0, 5, 0);
	createEdible('FourthButter', 0, 5, 0);
	createEdible('FifthButter', 0, 5, 0);
	*/
}

/*******************************************************************************
* Light related - Helper methods
*******************************************************************************/

/**
* Adds a soft white light with default intensity to the scene.
*/
function createAmbient() {
	var ambientLight = new THREE.AmbientLight(0x404040);
	ambientLight.name = 'ambientLight';
	scene.add(ambientLight);
}

/**
* A light source positioned directly above the scene, color fades from the sky
* towards the ground. Simulates horizon.
*/
function createHorizon() {
	var horizonLight = new THREE.HemisphereLight(0xFF4444, 0x44FF44, 0.6);
	horizonLight.name = 'horizonLight';
	horizonLight.position.set( 0, frustumSize, 0 );
	scene.add(horizonLight);
}

/**
* A light that uses parallel rays allowing to simulate sunlight, it is the only
* light used here that allows shadow casting.
*/
function createSun() {
	var sunLight = new THREE.DirectionalLight(0xFFFFE0);
	sunLight.name = 'sunLight';
	sunLight.position.x = Math.random()*100 + 800;
	sunLight.position.y = Math.random()*100 + 800;
	sunLight.position.z = Math.random()*100 + 800;
	sunLight.castShadow = true;
	sunLight.shadowCameraVisible = false;
	sunLight.shadowCameraNear = 1;
	sunLight.shadowCameraFar = frustumSize;
	sunLight.shadowCameraLeft = -frustumSize / 2;
	sunLight.shadowCameraRight = frustumSize / 2;
	sunLight.shadowCameraTop = frustumSize / 2;
	sunLight.shadowCameraBottom = -frustumSize / 2;
	sunLight.shadowMapWidth = 1000;
	sunLight.shadowMapHeight = 1000;
	scene.add(sunLight);
}
// Calls all other light instanciating methods
function createLights() {
	createAmbient();
	createHorizon();
	createSun();
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
	renderer.shadowMapEnabled = true;
	document.body.appendChild(renderer.domElement);
	createScene();
	createLights();
	createCamera();
	render();
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', onKeyDown);
}
