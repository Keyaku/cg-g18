/**
* edibleObjects is a dictionary with interactable objects such as oranges.
*/
var edibleObjects = {};
var board, track, car;
var renderer, scene, camera, controls;

/**
* This method creates a perspective camera. Switching between perspective and
* orthographic cameras is also possible due to event listeners.
*/
this.createCamera = function() {
	if (camera instanceof THREE.PerspectiveCamera) {
		// OrthographicCamera params: Left, Right, Top, Bottom, Near, Far
		// FIXME @FranciscoKlogan
		camera = new THREE.OrthographicCamera( - window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, - window.innerHeight / 2, 0.01, 1250);
		camera.position.x = 0;
		camera.position.y = 1200;
		camera.position.z = 0;
		camera.lookAt(scene.position);
		this.perspective = "Orthographic";
		controls = new THREE.OrbitControls(camera);
	} else {
		// PerspectiveCamera params: Field of View, Aspect Ratio, Near, Far
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1800);
		camera.position.x = -150;
		camera.position.y = 200;
		camera.position.z = -150;
		camera.lookAt(scene.position);
		this.perspective = "Perspective";
		controls = new THREE.OrbitControls(camera);
	}
};

/**
* Self calling method that allows the rendering to be handled by the system.
*/
function render() {
	renderer.render(scene, camera);
	controls.update()
	requestAnimationFrame(render);
}

/**
* Create scene instanciates the board, the track, the car and several other
* objects as scene graph.
*/
function createScene() {
	scene = new THREE.Scene();
	// The X axis is red, Y is green and Z is blue.
	scene.add(new THREE.AxisHelper(600));
	board = new Board(0, -10, 0);
	track = new Track();
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
* Helper methods
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

/**
* TODO on a later date, the current lightning was copy&pasted from the example
* of the first class.
*/
function createLights() {
	var sunLight = new THREE.DirectionalLight(0xffffff, 1);
	var hemisphereLight = new THREE.HemisphereLight( 0xAEEEEE, 0xFFFFFF, 0.6 );
	sunLight.position.set(0, 0, 600).normalize();
	hemisphereLight.position.set( 0, 500, 0 );
	scene.add(new THREE.AmbientLight(0xFFFFFF, 0.2));
	scene.add(sunLight);
	scene.add(hemisphereLight);
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
	document.body.appendChild(renderer.domElement);
	createScene();
	createLights();
	createCamera();
	render();
	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
}
