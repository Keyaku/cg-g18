/*******************************************************************************
* Scene related - Helper methods
*******************************************************************************/
var scene;

/**
* Instanciates the Scene with Axis & Grid helpers to assist devs with coordinates.
* Generates the board, representing the game world where other Oject3D objects are held.
*	Instanciates and adds edibles to the track which debuff the player when touched
* Object3D of subtype Car to a dictionary
*/
function createScene() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper(HALF_BOARD_WIDTH));
	scene.background = new THREE.Color(0xAEEEEE);

	var size = BOARD_WIDTH;
	var divisions = BOARD_WIDTH / 10;
	// The X axis is red, Y is green and Z is blue.
	var table = new Table(0, -1.1, 0, size);
	gameBoard = new Board(0, -1, 0, size);
	raceTrack = new Track(45);

	// Adding oranges
	createEdible(OrangeWrapper, "Orange1", 150, 0, 80);
	createEdible(OrangeWrapper, "Orange2", -200, 0, -100);
	createEdible(OrangeWrapper, "Orange3", 0, 0, 50);
	// Adding apples. I mean, butters.
	createEdible(Butter, "Butter1", 100, 0, -100);
	createEdible(Butter, "Butter2", -100, 0, -100);
	createEdible(Butter, "Butter3", 50, 0, 70);
	createEdible(Butter, "Butter4", 150, 0, 90);
	createEdible(Butter, "Butter5", -50, 0, 70);
}

function reloadScene() {
	// Setting Car
	if (car == undefined) {
		car = new Car(100, 0, -325);
		var camera = cameraManager.cameras[3];
		cameraManager.attachCameraTo(camera, car);
		camera.position.set(40, 30, 2); // FIXME: fix Car's position, THEN come back here and remove this line
		camera.lookAt(car.bounds.position); // FIXME
	}
	else {
		car.position.set(100, 0, -325);
		car.rotation.set(0, 0, 0);
		car.velocity = 0;
	}

	// Setting Track
	raceTrack.resetTorus();

	// Setting Oranges
	var oranges = ['Orange1', 'Orange2', 'Orange3'];
	for (var i = 0; i < oranges.length; i++) {
		var name = oranges[i]
		var obj = getEdible(name)
		var heading;
		obj.visible = false;
		var x = Math.random() < 0.5 ? -1 : 1;
		var z = Math.random() < 0.5 ? -1 : 1;
		var maskDirection = Math.random();
		var vector = generateSpawnLocation();
		vector.setY(obj.bounds.radius);
		if (0 <= maskDirection && maskDirection < 0.33) {
			heading = new THREE.Vector3(x, 0, z);
		} else if (0.33 <= maskDirection && maskDirection < 0.66){
			heading = new THREE.Vector3(x, 0, 0);
		} else {
			heading = new THREE.Vector3(0, 0, z);
		}
		obj.velocity = ORANGE_VELOCITY
		obj.position.copy(vector);
		obj.mesh.rotation.set(0, 0, 0);
		obj.heading = heading.normalize();
		obj.visible = true;
	}
}
