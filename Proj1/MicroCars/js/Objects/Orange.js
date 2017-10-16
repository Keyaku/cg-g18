class OrangeLeaf {
	constructor(obj, x, y, z) {
		this.type = 'OrangeLeaf';
		this.mesh = new THREE.Object3D();
		var leafShape = new THREE.Shape();
		leafShape.moveTo( 0, 0 );
		leafShape.bezierCurveTo( x + 6, y - 6, x + 12, y + 4, x, y );
		var extrudeSettings = { amount: 0.5, bevelEnabled: false };
		var geometry = new THREE.ExtrudeGeometry( leafShape, extrudeSettings );
		var material = new THREE.MeshLambertMaterial({color: 0x009900});
		var mesh = new THREE.Mesh( geometry, material );
		this.mesh.add(mesh);
		this.mesh.position.set(x, y+6.5, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

class OrangeBranch {
	constructor(obj, x, y, z) {
		this.type = 'OrangeBranch';
		this.mesh = new THREE.Object3D();
		var material = new THREE.MeshLambertMaterial({color:0x666633});
		var geometry = new THREE.CylinderGeometry(0.66, 0.33, 4);
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh.add(mesh);
		this.mesh.position.set(x, y + 5, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

class OrangeFruit {
	constructor(obj, x, y, z) {
		this.type = 'OrangeFruit';
		this.mesh = new THREE.Object3D();
		var material = new THREE.MeshLambertMaterial({color:0xFF9900});
		var geometry = new THREE.SphereGeometry(5, 15, 15);
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh.add(mesh);
		this.mesh.position.set(x, y, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

class Orange extends PhysicsBody {
	constructor(orangeName, x, y, z) {
		// Instanciates a new orange with mass 140g
		super(0.140);
		this.type = 'Orange';
		this.mesh = new THREE.Object3D();
		this.mesh.name = orangeName
		var orangeFruit = new OrangeFruit(this.mesh, x, y, z);
		var orangeBranch = new OrangeBranch(this.mesh, x, y, z);
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
		return this.mesh;
	}

	update(delta) {
		// TODO Everything
		// movement is done along the X axis, on top of the board
		var axisDirection = THREE.Vector3(1, 0, 0);
		var objectMass = 0 			// TODO Get mass of the object that collided with the orange or orange collided with
		var velocity = 0
		this.rotation.z += 0.01;
		this.rotation.x += 0.01;
		// Updating Orange motion
	}


	move(axis, distance) {
		// TODO: Proper motion with Vector3 that points to the next location?
		var colliding = super.move(axis, distance);
		this.mesh.translateOnAxis(axis, distance);
		return colliding;
	}


	/**
	* orangeNeedsRespawn verifies if <this> orange is within the boundaries of the board
	* @return: Boolean value True if orange is outside of the board. False otherwise
	*/
	orangeNeedsRespawn() {
		// NOTE: This code might not work because the orange is not in board coordinates but in scene coordinates
		var x = this.mesh.position.x;
		var z = this.mesh.position.z;
			return true;
		} else {
			return false;
		}
	}

	/** respawnOrange(spawnLocation, axis, distance)
	@param spawnLocation: Vector3D that represents the respawn point on the board
	@param axis: Axis along which the orange should move after respawning
	@param distance: How far should the orange travel after respawning
	@return: null
	*/
	respawnOrange(spawnLocation, axis, distance) {
		this.mesh.position.set(spawnLocation);
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
	generateSpawnLocation(min, max) {
		var signX = Math.random() < 0.5 ? -1 : 1;
		var signZ = Math.random() < 0.5 ? -1 : 1;
		var x = Math.floor(Math.random() * (max - min + 1)) + min;
		var y = 0;
		var z = Math.floor(Math.random() * (max - min + 1)) + min;
		var spawnLocation = new THREE.Vector3(x, y, z);
		return spawnLocation;
	}
}
