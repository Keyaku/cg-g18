class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';
		this.mesh = new CarMesh(x, y, z);
		this.velocity = 0;
		this.forwardAcceleration = CAR_ACCELERATION;
		this.decayAcceleration = CAR_ACCELERATION / 4;

		this.add(this.mesh);
		scene.add(this);
	}

	update(delta) {
		var left  = Input.is_pressed("ArrowLeft");
		var right = Input.is_pressed("ArrowRight");
		var up    = Input.is_pressed("ArrowUp");
		var down  = Input.is_pressed("ArrowDown");

		var acceleration = 0;
		if (up && !down) {
			acceleration = -this.forwardAcceleration;
		} else if (down && !up) {
			acceleration = this.forwardAcceleration;
		}

		// Updating car motion
		this.velocity += acceleration * delta - FRICTION * this.velocity;
		this.move(X_AXIS_HEADING, this.velocity);

		//Rotates the mesh
		var angle = 0;
		if (left && !right) {
			angle = WHEEL_ROTATION;
		}
		if (right && !left) {
			angle = -WHEEL_ROTATION;
		}
		if (angle != 0) {
			angle *= Math.abs(this.velocity) * TURN_ASSIST;
			this.mesh.rotateY(angle);
		}
	}

	move(axis, distance) {
		// TODO: Proper motion with Vector3 that points to the next location?
		var colliding = super.move(axis, distance);
		this.mesh.translateOnAxis(axis, distance);
		return colliding;
	}
}
