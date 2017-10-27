/**
* @class OrangeWrapper
* @attribute velocity: orange center of mass linear velocity.
* @attribute acceleration: constant value defined by developters.
* @attribute heading: vector that defines the heading of the orange.
* @attribute radius: the orange radius.
* @attribute position: position of this wrapper in world coordinates.
*/
class OrangeWrapper extends MotionBody {
	constructor(orangeName, x, y, z, radius = 15) {
		super(0.140);

		// Adding mesh
		this.concreteOrange = new Orange(orangeName, 0, 0, 0);
		this.velocity = ORANGE_VELOCITY;
		this.acceleration = ORANGE_ACCELERATION;
		this.heading = HEADING_ARRAY[Math.floor((Math.random() * HEADING_ARRAY.length))];
		this.radius = radius;
		this.position.set(x, y, z);

		// Adding BoundingSphere
		this.bounds = new BoundingSphere(this.concreteOrange, radius);
		this.add(this.bounds);

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
		var distance = this.velocity * delta;
		this.move(this.heading, distance);
		if (objectNeedsRespawn(this.getWorldPosition())) {
			respawnObject(this);
		}
		this.rotate(this.heading);
	}

	/**
	* @method rotate: rotates this object around an axis specified by rotationAxis
	* @param axis: current object's direction.
	* @var angularVelocity: speed at which the orange rotates about it's own center in radians.
	* @var rotationAxis: direction vector rotated by 90º, parallel to the ground.
	*/
	rotate(axis) {
		var angularVelocity = (this.velocity / this.radius) * TO_RADIANS;
		var rotationAxis = axis.clone();
		rotationAxis.applyAxisAngle(Y_AXIS_HEADING, NINETY_DEGREES);
		this.concreteOrange.rotateOnAxis(rotationAxis, angularVelocity);
	}
}
/*******************************************************************************
* Concrete Orange class
*******************************************************************************/

class Orange extends THREE.Object3D {
	constructor(orangeName, x, y, z, radius = 15) {
		super();
		this.type = 'Orange';
		this.name = orangeName;

		this.orangeFruit = new OrangeFruit(this, x, y, z, radius);
		this.orangeBranch = new OrangeBranch(this, x, y, z);
		this.position.set(x, y, z);
		return this;
	}
}

/*******************************************************************************
* OrangeFruit class
*******************************************************************************/

class OrangeFruit extends THREE.Mesh {
	constructor(obj, x, y, z, radius = 15) {
		var geometry = new THREE.SphereGeometry(radius, 15, 15);

		super(geometry);
		this.type = 'OrangeFruit';
		createMaterials(this, {color:0xFF9900});

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
		var geometry = new THREE.CylinderGeometry(2, 1, 8);

		super(geometry);
		this.type = 'OrangeBranch';
		createMaterials(this, {color:0x666633});

		this.position.set(x, y + 15, z);

		obj.add(this);
		return this;
	}
}
