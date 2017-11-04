var camera, controls, scene, renderer;
var table, ball;

function addBumper() {
	var geometry = new BumperGeometry(50, 10, 10);
	var material = new THREE.MeshLambertMaterial( {color: 0xFFFF000});
	var bumper = new THREE.Mesh(geometry, material);
	bumper.position.set(0, 60, 0);
	scene.add(bumper);
}

function createCamera() {
	'use strict';

	var screenRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(70, screenRatio, 1, 1000);
	camera.position.set(50, 50, 50);
	camera.lookAt(scene.position);
	controls = new THREE.OrbitControls(camera);
	controls.enableKeys = false;
}

function render() {
	'use strict';

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));

	var ambientLight = new THREE.AmbientLight(0x404040);
	ambientLight.name = 'ambientLight';
	scene.add(ambientLight);

	addBumper();
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene(); //Adds the custom objects' meshes.
	createCamera(); //Adds the camera.
	render(); //Renders the scene.

	//Adds event handlers.
	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
}
