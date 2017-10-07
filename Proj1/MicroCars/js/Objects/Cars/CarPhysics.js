const ROTATION = Math.PI / 16;
const ACCELERATION = 2;
const TURN_ASSIST = ACCELERATION / 10;
const AXIS_HEADING = new THREE.Vector3(1); // Move only along the X axis
var friction = 0.02;

class CarPhysics {
	constructor() {
		this.velocity = 0;
		this.currentAcceleration = 0;
		this.forwardAcceleration = ACCELERATION;
		this.decayAcceleration = ACCELERATION / 4;
		this.controls = {
			forward:  false,
			backward: false,
			left:     false,
			right:    false
		};
	}

	update(delta) {
		this.velocity += this.currentAcceleration * delta - friction * this.velocity;
		car.mesh.translateOnAxis(AXIS_HEADING, this.velocity);

		//Rotates the mesh
		var angle = 0;
		if (this.controls.left && !this.controls.right) {
			angle = - ROTATION;
		}
		if (this.controls.right && !this.controls.left) {
			angle = ROTATION;
		}
		if (angle != 0) {
			angle *= Math.abs(this.velocity) * TURN_ASSIST;
			car.mesh.rotateY(-angle);
		}
	}
}
