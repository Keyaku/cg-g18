var camera, scene, renderer;
var table, ball

function createCamera() {
	'use strict';
	var screenRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(70, screenRatio, 1, 1000);
	camera.position.set(50, 50, 50);
	camera.lookAt(scene.position);
}

function render() {
	'use strict';
	if (ball.userData.jumping) {
		ball.userData.step += 0.04;
		ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
		ball.position.z = 15 * (Math.cos(ball.userData.step));
	}
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
	table = new Table(0, 0, 0); //Adds a Table (custom object).
	ball = new Ball(0, 0, 15); //Adds a Ball (custom object).
}

function createLights() {
	scene.add(new THREE.AmbientLight(0Xffffff, 0.5));
	var lightPoint = new THREE.PointLight(0Xffffff, 0.5);
	lightPoint.position.set(-30, 50, 0);
	scene.add(lightPoint);
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