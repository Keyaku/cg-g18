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
	var size = 1000;
	var divisions = 100;
	scene = new THREE.Scene();
	// The X axis is red, Y is green and Z is blue.
	// scene.add(new THREE.GridHelper(size, divisions) );
	scene.add(new THREE.AxisHelper(size / 2));
	scene.background = new THREE.Color(0xAEEEEE);
	var table = new Table(0, -1.1, 0, size);
	gameBoard = new Board(0, -1, 0, size);
	raceTrack = new Track();
	car = new Car(20, 2.66, -5);

	// Adding our edibles
	var ediblesY = 5;

	// Adding oranges
	createEdible(Orange, "Orange1", 150, ediblesY, 80);
	createEdible(Orange, "Orange2", -200, ediblesY, -100);
	createEdible(Orange, "Orange3", 0, ediblesY, 50);
	// Adding apples. I mean, butters.
	createEdible(Butter, "Butter1", 100, ediblesY, -100);
	createEdible(Butter, "Butter2", -100, ediblesY, -100);
	createEdible(Butter, "Butter3", 50, ediblesY, 70);
	createEdible(Butter, "Butter4", 150, ediblesY, 90);
	createEdible(Butter, "Butter5", -50, ediblesY, 70);
}
