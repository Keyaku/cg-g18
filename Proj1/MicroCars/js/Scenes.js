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
	gameBoard = new Board(0, -3.5, 0);
	raceTrack = new Track();
	car = new Car(20, 2.66, -5);
	createEdible("FirstOrange", 150, 5, 80);
	createEdible("SecondOrange", -200, 5, -100);
	createEdible("ThirdOrange", 0, 5, 50);
	/**
	// TODO @Keyaku
	createEdible('FirstButter', 0, 5, 0);
	createEdible('SecondButter', 0, 5, 0);
	createEdible('ThirdButter', 0, 5, 0);
	createEdible('FourthButter', 0, 5, 0);
	createEdible('FifthButter', 0, 5, 0);
	*/
}
