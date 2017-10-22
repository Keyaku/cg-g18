class OrangeWrapper extends MotionBody {
	constructor(orangeName, x, y, z, radius = 5) {
		super(0.140);
		this.concreteOrange = new Orange(orangeName, 0, 0, 0);
		this.position.set(x, y, z);
		this.add(this.concreteOrange);
		scene.add(this);
		return this;
	}

	/** update
	* @param delta: time value
	* @var radius: the orange radius
	* @var velocity: orange center of mass velocity
	* @var movement_direction: vector that defines the heading of the orange
	* @var rotation_vector: copy of movement_direction vector rotated by 90º,
	* parallel to the ground about which the orange rotates with a known angular_velocity.
	* @var displacement: orange center of mass displacement
	* @var angular_velocity: speed at which the orange rotates about it's own center
	* @var theta: angular_velocity in radians per second.
	*/
	update(delta) {
		var radius = this.concreteOrange.radius;
		var velocity = 20 // this.collisionData.velocity;
		var movement_direction = X_AXIS_HEADING // this.collisionData.direction;
		var rotation_vector = new THREE.Vector3(movement_direction.x, movement_direction.y, movement_direction.z);
		var displacement = velocity * delta;
		var angular_velocity = velocity / radius;

		var theta = (angular_velocity / (radius/2)) * TO_RADIANS;
		this.move(movement_direction, displacement);
				rotation_vector.applyAxisAngle(Y_AXIS_HEADING, NINETY_DEGREES);
		this.concreteOrange.rotateOnAxis(rotation_vector, theta);

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

class Orange extends THREE.Object3D {
	constructor(orangeName, x, y, z, radius = 5) {
		super();
		var orangeFruit = new OrangeFruit(this, x, y, z, radius);
		var orangeBranch = new OrangeBranch(this, x, y, z);
		this.type = 'Orange';
		this.name = orangeName;
		this.radius = radius;
		this.position.set(x, y, z);
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
