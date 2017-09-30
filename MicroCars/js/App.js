var renderer, scene, camera, controls
var board, track, car

/**
* This method creates a perspective camera. Switching between perspective and
* orthographic cameras is also possible due to event listeners.
*/
this.createCamera = function() {
	if (camera instanceof THREE.PerspectiveCamera) {
		// OrthographicCamera params: Left, Right, Top, Bottom, Near, Far
		camera = new THREE.OrthographicCamera( window.innerWidth / - 16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / - 16, 1, 500 );
		camera.position.x = 600;
		camera.position.y = 50;
		camera.position.z = 600;
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
	scene.add(new THREE.AxisHelper(10));
	board = new Board(0, -10, 0)
	track = new Track()
	car = new Car(20, 2, -5)
}

/**
* TODO on a later date, the current lightning was copy&pasted from the example
* of the first class.
*/
function createLights() {
	scene.add(new THREE.AmbientLight(0xffffff, 0.2));
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(0, 4, 10).normalize();
	scene.add(light);
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
