const ROTATION = Math.PI / 16;
const ACCELERATION = 2;
var friction = 0.02;

class CarPhysics {
	constructor(carHeading) {
		this.heading = carHeading.clone();
		this.velocity = 0;
		this.currentAcceleration = 0;
		this.forwardAcceleration = ACCELERATION;
		this.decayAcceleration = ACCELERATION / 4;
		this.carControls = {
			forward:  false,
			backward: false,
			left:     false,
			right:    false
		};
	}

	update(delta) {
		this.velocity += this.currentAcceleration * delta - friction * this.velocity;
		var carHeading = this.heading.clone();
		carHeading.multiplyScalar(this.velocity);
		car.mesh.position.add(carHeading);

		//Rotates the heading vector.
		var angle = 0;
		if (this.carControls.left && !this.carControls.right) {
			angle = - ROTATION;
		}
		if (this.carControls.right && !this.carControls.left) {
			angle = ROTATION;
		}
		if (angle != 0 && Math.abs(this.velocity) > 0.02) {
			/*Rotation Matrix =
			[cos 	-sin 	0] * [x]
			[sin 	cos 	0] * [z]
			[0		0		1] * [1]
			*/
			var x = this.heading.x, z = this.heading.z
			var cos = Math.cos(angle), sin = Math.sin(angle);
			var xNew = cos * x - sin * z, zNew = sin * x + cos * z;
			this.heading.set(xNew, 0, zNew);
			car.mesh.rotateY(-angle);
		}
	}
}
