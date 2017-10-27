/*******************************************************************************
* Car variables
*******************************************************************************/
const CAR_ACCELERATION = 2;
const MAX_ORANGE_VELOCITY = 200;
const ORANGE_VELOCITY = 20;
const ORANGE_ACCELERATION = 2;
const TURN_ASSIST = CAR_ACCELERATION / 32;
const WHEEL_ROTATION = Math.PI / 8;
/*******************************************************************************
* Board variables
*******************************************************************************/
const BOARD_WIDTH = 1000;
const BOARD_LENGHT = 1000;
const HALF_BOARD_WIDTH  = BOARD_WIDTH  >> 1;
const HALF_BOARD_LENGHT = BOARD_LENGHT >> 1;
const FRICTION = 0.02;
const EDIBLES_Y = 15;
/*******************************************************************************
* Directional variables
*******************************************************************************/
const X_AXIS_HEADING = new THREE.Vector3(1, 0, 0);
const Y_AXIS_HEADING = new THREE.Vector3(0, 1, 0);
const Z_AXIS_HEADING = new THREE.Vector3(0, 0, 1);
const MX_AXIS_HEADING = new THREE.Vector3(-1, 0, 0);
const MZ_AXIS_HEADING = new THREE.Vector3(0, 0, -1);
const XPZP_AXIS_HEADING = new THREE.Vector3(1, 0, 1).normalize();
const XPZM_AXIS_HEADING = new THREE.Vector3(-1, 0, -1).normalize();
const XMZP_AXIS_HEADING = new THREE.Vector3(-1, 0, 1).normalize();
const XMZM_AXIS_HEADING = new THREE.Vector3(-1, 0, 1).normalize();
const HEADING_ARRAY = [ X_AXIS_HEADING, Z_AXIS_HEADING,
                        MX_AXIS_HEADING, MZ_AXIS_HEADING,
                        XPZP_AXIS_HEADING, XPZM_AXIS_HEADING,
                        XMZP_AXIS_HEADING, XMZM_AXIS_HEADING ];
/*******************************************************************************
* Trignometric variables
*******************************************************************************/
const TO_DEGREES = 180 / Math.PI;
const TO_RADIANS = Math.PI / 180;
const NINETY_DEGREES = Math.PI / 2;
const THREE_HUNDRED_SIXTY_DEGREES = 2 * Math.PI;
/*******************************************************************************
* Lighting variables
*******************************************************************************/
const POINT_LIGHT_INTENSITY = 10;

/*******************************************************************************
* Helper methods
*******************************************************************************/

/**
* @method createMaterials Creates the appropriate materials for a given mesh
* @param mesh: The mesh to associate the materials with
* @param parameters: THREE.Material parameters
*/
function createMaterials(mesh, parameters={}) {
	addMaterials(
		mesh,
		new THREE.MeshLambertMaterial(parameters),
		new THREE.MeshPhongMaterial(parameters)
	)
}

/**
* @method addMaterials Adds the given materials to a given mesh
* @param mesh: The mesh to associate the materials with
* @param lambertMaterial:
* @param phongMaterial:
*/
function addMaterials(mesh, lambertMaterial, phongMaterial) {
	mesh.material        = lambertMaterial;
	mesh.lambertMaterial = lambertMaterial;
	mesh.phongMaterial   = phongMaterial;
}

/**
* objectNeedsRespawn verifies if an object is within the boundaries of the board
* @param x: x position of the object subject to verification.
* @param z: z position of the object subject to verification.
* @return: Boolean value True if orange is outside of the board. False otherwise
*/
function objectNeedsRespawn(vector) {
	var x = vector.x;
	var z = vector.z;
	return x <= -HALF_BOARD_WIDTH  || x >= HALF_BOARD_WIDTH ||
		z <= -HALF_BOARD_LENGHT || z >= HALF_BOARD_LENGHT;
}

/** generateSpawnLocation(min, max)
@param min: used to calculate a random coordinate in inverval [min, max]
@param max: used to calculate a random coordinate in inverval [min, max]
@var signX: defines if x coordinate is positive or negative
@var signZ: defines if z coordinate is positive or negative
@var x: X coordinate (value calculated randomly based on min-max values)
@var y: Y coordiante (default is 0 - orange stay on top of the board at all times)
@var z: Z coordinate (value calculated randomly based on min-max values)
@return: Vector3D that defines a new spawn location after orange falls from the table.
*/
function generateSpawnLocation(min = 0, max = HALF_BOARD_WIDTH) {
	var signX = Math.random() < 0.5 ? -1 : 1;
	var signZ = Math.random() < 0.5 ? -1 : 1;
	var x = Math.floor(Math.random() * (max - min + 1)) + min;
	var z = Math.floor(Math.random() * (max - min + 1)) + min;
	var spawnLocation = new THREE.Vector3(x, EDIBLES_Y, z);
	return spawnLocation;
}

/** respawnObject(spawnLocation, axis, distance)
* @param obj: object that is being respawned
* @param distance: How far should the orange travel after respawning
*/
function respawnObject(obj) {
	if (obj.type == 'Car') {
		obj.position.copy(obj.userData.initialPosition);
		obj.rotation.set(0, 0, 0);
		obj.velocity = 0;
		return;
	}


	var heading;

	obj.visible = false;

	var x = Math.random() < 0.5 ? -1 : 1;
	var z = Math.random() < 0.5 ? -1 : 1;
	var maskDirection = Math.random();
	var vector = generateSpawnLocation();

	if (maskDirection >= 0 && maskDirection < 0.33) {
		heading = new THREE.Vector3(x, 0, z);
	} else if (maskDirection >= 0.33 && maskDirection < 0.66){
		heading = new THREE.Vector3(x, 0, 0);
	} else {
		heading = new THREE.Vector3(0, 0, z);
	}

	setTimeout(function() {
		obj.position.set(vector.x, vector.y, vector.z);
		obj.concreteOrange.rotation.set(0, 0, 0);
		obj.concreteOrange.position.set(0,0,0);
		obj.heading = heading.normalize();
		obj.visible = true;
	}, 1000);

}
