var renderer, scene, camera, controls
var board, track, car

function createCamera() {
	var screenRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(70, screenRatio, 1, 5000);
	camera.position.set(10, 500, 50);
	camera.lookAt(scene.position);
	controls = new THREE.OrbitControls(camera);
}

function render() {
	renderer.render(scene, camera);
	controls.update()
	requestAnimationFrame(render);
}

function createScene() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
	
	board = new Board(0, -5, 0) //Adds the Table
	track = new Track() //Adds the Race Track
	car = new Car1(0, 2, 0) //Add the Car
}

function createLights() {
	scene.add(new THREE.AmbientLight(0xffffff, 0.2));
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(0, 4, 10).normalize();
	scene.add(light);
}

function init() {
	'use strict';
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene(); //Adds the custom objects' meshes.
	createLights(); //Adds the lights.
	createCamera(); //Adds the camera.
	render(); //Renders the scene.
	//Adds event handlers.
	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
}
