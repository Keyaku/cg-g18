const ROTATION = Math.PI / 16;
const ACCELERATION = 2;
const TURN_ASSIST = ACCELERATION / 10;
const AXIS_HEADING = new THREE.Vector3(1); // Move only along the X axis
var friction = 0.02;

class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';
		this.mesh = new CarMesh(x, y, z);
		this.velocity = 0;
		this.forwardAcceleration = ACCELERATION;
		this.decayAcceleration = ACCELERATION / 4;

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
		this.velocity += acceleration * delta - friction * this.velocity;
		this.move(AXIS_HEADING, this.velocity);

		//Rotates the mesh
		var angle = 0;
		if (left && !right) {
			angle = ROTATION;
		}
		if (right && !left) {
			angle = -ROTATION;
		}
		if (angle != 0) {
			angle *= Math.abs(this.velocity) * TURN_ASSIST;
			this.mesh.rotateY(angle);
		}

		cameraManager.updateFollowCamera(this.mesh.position, angle, AXIS_HEADING);
	}

	move(axis, distance) {
		// TODO: Proper motion with Vector3 that points to the next location?
		var colliding = super.move(axis, distance);
		this.mesh.translateOnAxis(axis, distance);
		return colliding;
	}
}
