var camera, scene, renderer;
var table, ball;
var controls;

function createCamera() {
	var screenRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(70, screenRatio, 1, 1000);
	camera.position.set(10, 0, 50);
	//camera.lookAt(scene.position);
	controls = new THREE.OrbitControls(camera);
}

function render() {
	renderer.render(scene, camera);
	controls.update()
	requestAnimationFrame(render);
}

function createScene() {
	scene = new THREE.Scene();
	//scene.add(new THREE.AxisHelper(10));
	var obj = new Tire(0, 0, 0, 0xFFFFFF);
}

function createLights() {
	scene.add(new THREE.AmbientLight(0xffffff, 0.2));
	var lightPoint = new THREE.PointLight(0xffffff, 0);
	lightPoint.position.set(26, 20, -30);
	//scene.add(lightPoint);

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
