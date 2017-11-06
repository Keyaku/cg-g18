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
function createCarMesh(carWidth, carLength) {
	var pneuWidth = 2;
	var geometry = new WheelGeometry(3, pneuWidth);
	var material = new THREE.MeshLambertMaterial( {color: 0x001111});
	var wheel1 = new THREE.Mesh(geometry, material);
	var wheel2 = new THREE.Mesh(geometry, material);
	var wheel3 = new THREE.Mesh(geometry, material);
	var wheel4 = new THREE.Mesh(geometry, material);
	wheel1.position.set(0, 5, 0);
	wheel2.position.set(0, 5, carLength + pneuWidth);
	wheel3.position.set(carWidth, 5, 0);
	wheel4.position.set(carWidth, 5, carLength + pneuWidth);
	
	var bodyGeometry = new CarBody(carWidth, carLength);

	var geometry = new CarBody(carWidth, carLength);
	var material = new THREE.MeshBasicMaterial({color : 0xff0000});
	var carBody = new THREE.Mesh(geometry, material);
	
	var geometry = new BumperGeometry(10, 3, 3);
	var material = new THREE.MeshPhongMaterial( {color: 0xFFFF000});
	var bumper = new THREE.Mesh(geometry, material);
	bumper.rotation.set(0, -3.14/2, 0);
	bumper.position.set(0, 5, 5);


	var singleGeometry = new THREE.Geometry();
	wheel1.updateMatrix();
	wheel2.updateMatrix();
	wheel3.updateMatrix();
	wheel4.updateMatrix();
	carBody.updateMatrix();
	bumper.updateMatrix();
	singleGeometry.merge(wheel1.geometry, wheel1.matrix);
	singleGeometry.merge(wheel2.geometry, wheel2.matrix);
	singleGeometry.merge(wheel3.geometry, wheel3.matrix);
	singleGeometry.merge(wheel4.geometry, wheel4.matrix);
	singleGeometry.merge(carBody.geometry, carBody.matrix);
	singleGeometry.merge(bumper.geometry, bumper.matrix);
	var material = new THREE.MeshPhongMaterial({color: 0xFF0000});
	var mesh = new THREE.Mesh(singleGeometry, material);
	mesh.position.set(0, 0, 0)
	return mesh;

}
function bumperTest() {
	//var geometry = new BumperGeometry(50, 10, 10);
	//var material = new THREE.MeshPhongMaterial( {color: 0xFFFF000});
	//var bumper = new THREE.Mesh(geometry, material);
	//bumper.position.set(0, 40, 30);
	//scene.add(bumper);
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
	
	bumperTest();
	var carWidth = 20;
	var carLength = 10;
	var mesh = createCarMesh(carWidth, carLength);
	car = new Car(20, 2.66, -5, mesh);

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
