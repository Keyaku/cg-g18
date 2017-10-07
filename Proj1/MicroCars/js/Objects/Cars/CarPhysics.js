const ROTATION = Math.PI / 16;
const ACCELERATION = 2;
const TURN_ASSIST = ACCELERATION / 10;
const AXIS_HEADING = new THREE.Vector3(1); // Move only along the X axis
var friction = 0.02;

class CarPhysics {
	constructor() {
		this.velocity = 0;
		this.forwardAcceleration = ACCELERATION;
		this.decayAcceleration = ACCELERATION / 4;
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
		car.mesh.translateOnAxis(AXIS_HEADING, this.velocity);

		//Rotates the mesh
		var angle = 0;
		if (left && !right) {
			angle = - ROTATION;
		}
		if (right && !left) {
			angle = ROTATION;
		}
		if (angle != 0) {
			angle *= Math.abs(this.velocity) * TURN_ASSIST;
			car.mesh.rotateY(-angle);
		}
	}
}
