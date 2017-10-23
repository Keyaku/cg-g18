/**
* @class OrangeWrapper
* @attribute velocity: orange center of mass linear velocity.
* @attribute acceleration: constant value defined by developters.
* @attribute heading: vector that defines the heading of the orange.
* @attribute radius: the orange radius.
* @attribute position: position of this wrapper in world coordinates.
*/
class OrangeWrapper extends MotionBody {
	constructor(orangeName, x, y, z, radius = 5) {
		super(0.140);

		// Adding mesh
		this.concreteOrange = new Orange(orangeName, 0, 0, 0);
		this.velocity = ORANGE_VELOCITY;
		this.acceleration = ORANGE_ACCELERATION;
		this.heading = HEADING_ARRAY[Math.floor((Math.random() * 9))];
		this.radius = radius;
		this.position.set(x, y, z);

		// Setting up scene graph
		this.add(this.concreteOrange);
		scene.add(this);

		return this;
	}

	/**
	* @method update: Recalculates velocity and displacement of this object for the next frame.
	* @param delta: time interval since last clock.getDelta()
	* @var displacement: this object center of mass displacement.
	*/
	update(delta) {
		if (this.velocity < MAX_ORANGE_VELOCITY) {
			this.velocity += ORANGE_ACCELERATION * delta;
		};
		var displacement = this.velocity * delta;
		this.move(this.heading, displacement);
	}

	/**
	* @method move: Trnaslate object according to previously calculated or collision values.
	* @param axis: representing the direction of movement_direction
	* @param distance: far should the orange travel
	* @var colliding:
	*/
	move(axis, distance) {
		var colliding = super.move(axis, distance);
		if (colliding) {
			this.velocity = this.collisionData.velocity;
			this.heading = this.collisionData.heading;
		}
		this.translateOnAxis(this.heading, distance);
		if (objectNeedsRespawn(this.getWorldPosition())) {
			respawnObject(this);
		}
		this.rotate(axis);
		return colliding;
	}

	/**
	* @method rotate: rotates this object around an axis specified by rotationAxis
	* @param axis: current object's direction.
	* @var angularVelocity: speed at which the orange rotates about it's own center in radians.
	* @var rotationAxis: direction vector rotated by 90º, parallel to the ground.
	*/
	rotate(axis) {
		var angularVelocity = (this.velocity / this.radius) * TO_RADIANS;
		var rotationAxis = new THREE.Vector3(axis.x, axis.y, axis.z);
		rotationAxis.applyAxisAngle(Y_AXIS_HEADING, NINETY_DEGREES);
		this.concreteOrange.rotateOnAxis(rotationAxis, angularVelocity);
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
		this.position.set(x, y, z);
		return this;
	}
}

/*******************************************************************************
* OrangeFruit class
*******************************************************************************/

class OrangeFruit extends THREE.Mesh {
	constructor(obj, x, y, z, radius = 5) {
		var material = new THREE.MeshLambertMaterial({color:0xFF9900});
		var geometry = new THREE.SphereGeometry(radius, 15, 15);
		super(geometry, material);
		this.type = 'OrangeFruit';
		this.position.set(x, y, z);

		obj.add(this);
		return this;
	}
}

/*******************************************************************************
* OrangeBranch class
*******************************************************************************/

class OrangeBranch extends THREE.Mesh {
	constructor(obj, x, y, z) {
		var material = new THREE.MeshLambertMaterial({color:0x666633});
		var geometry = new THREE.CylinderGeometry(0.66, 0.33, 4);
		super(geometry, material);
		this.type = 'OrangeBranch';
		this.position.set(x, y + 5, z);

		obj.add(this);
		return this;
	}
}

/*******************************************************************************
* OrangeLeaf class
*******************************************************************************/

class OrangeLeaf extends THREE.Mesh {
	constructor(obj, x, y, z) {
		var leafShape = new THREE.Shape();
		leafShape.moveTo( 0, 0 );
		leafShape.bezierCurveTo( x + 6, y - 6, x + 12, y + 4, x, y );

		var extrudeSettings = { amount: 0.5, bevelEnabled: false };
		var geometry = new THREE.ExtrudeGeometry( leafShape, extrudeSettings );
		var material = new THREE.MeshLambertMaterial({color: 0x009900});

		super(geometry, material);
		this.type = 'OrangeLeaf';
		this.position.set(x, y+6.5, z);

		obj.add(this);
		return this;
	}
}
