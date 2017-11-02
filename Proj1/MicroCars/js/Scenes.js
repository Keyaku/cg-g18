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
function wheelTest() {
	var geometry = new WheelGeometry(50, 10);
	var material = new THREE.MeshLambertMaterial( {color: 0xFFFF000});
	var wheel = new THREE.Mesh(geometry, material);
	wheel.position.set(0, 60, 0);
	scene.add(wheel);
}
function createScene() {
	var size = BOARD_WIDTH;
	var divisions = BOARD_WIDTH / 10;
	scene = new THREE.Scene();
	// The X axis is red, Y is green and Z is blue.
	// scene.add(new THREE.GridHelper(size, divisions) );
	scene.add(new THREE.AxesHelper(HALF_BOARD_WIDTH));
	scene.background = new THREE.Color(0xAEEEEE);
	var table = new Table(0, -1.1, 0, size);
	gameBoard = new Board(0, -1, 0, size);
	raceTrack = new Track();
	car = new Car(20, 2.66, -5);
	// wheelTest();
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
