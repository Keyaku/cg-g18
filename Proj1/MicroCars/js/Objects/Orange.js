class OrangeWrapper extends MotionBody {
	constructor(orangeName, x, y, z, radius = 5) {

	}
	
	update(delta) {
		var angular_velocity = 5 / this.radius;								// var angular_velocity = this.collisionData.velocity / this.radius;
		var movement_direction = new THREE.Vector3(1, 0, 0); 	// var movement_direction = this.collisionData.direction;
		var x = movement_direction.x;
		var y = movement_direction.y;
		var z = movement_direction.z;
		var rotation_vector = new THREE.Vector3(x, y, z)

		var translation = 15 * delta;
		this.translateOnAxis(movement_direction, translation);
		// rotation_vector.applyAxisAngle(Y_AXIS_HEADING, theta);
		// NOTE: Axis deve ser perpendicular ao movimento e paralelo ao chão
		// this.rotateOnAxis(rotation_vector, theta);
	}

	move(axis, distance) {
		var colliding = super.move(axis, distance);
		this.translateOnAxis(axis, distance);
		return colliding;
	}
}

/*******************************************************************************
* Concrete Orange class
*******************************************************************************/

class Orange extends MotionBody {
	constructor(orangeName, x, y, z, radius = 5) {
		super(0.140);
		var orangeFruit = new OrangeFruit(this, x, y, z, radius);
		var orangeBranch = new OrangeBranch(this, x, y, z);
		this.type = 'Orange';
		this.name = orangeName;
		this.radius = radius;
		this.position.set(x, y, z);
		scene.add(this);
		return this;
	}
}

/*******************************************************************************
* OrangeFruit class
*******************************************************************************/

class OrangeFruit {
	constructor(obj, x, y, z, radius = 5) {
		this.type = 'OrangeFruit';
		this.mesh = new THREE.Object3D();
		var material = new THREE.MeshLambertMaterial({color:0xFF9900});
		var geometry = new THREE.SphereGeometry(radius, 15, 15);
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh.add(mesh);
		this.mesh.position.set(x, y, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

/*******************************************************************************
* OrangeBranch class
*******************************************************************************/

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

/*******************************************************************************
* OrangeLeaf class
*******************************************************************************/

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
