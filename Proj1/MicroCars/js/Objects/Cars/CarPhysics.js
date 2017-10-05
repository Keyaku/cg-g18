const ROTATION = Math.PI / 16;
const ACCELERATION = 2;
var friction = 0.02;

class CarPhysics {
	constructor(x, y, z, carHeading) {
		this.lastPosition = new THREE.Vector3(x, y, z);

		this.heading = carHeading.clone();
		this.velocity = 0;
		this.forwardAcceleration = ACCELERATION;
		this.decayAcceleration = ACCELERATION / 4;

		this.currentAcceleration = 0;


		//Movement type: Uniformly Accelerated Motion
		//Law of motion: s(t) = s0 + v0*t + 0.5*a*t^2
		//Considering s0 = 0, v0 = 0
		//Updated law of motion: 	s(t) = 0.5*a*t^2
		//							s(t2) = s(t1) + 0.5*a*(t2^2 - t1^2)
		//Displacement: s(t2) - s(t1) = 0.5*a*(t2^2 - t1^2)
	}

	update(delta) {
		this.velocity += this.currentAcceleration * delta - friction*this.velocity;
		var carHeading = this.heading.clone();
		carHeading.multiplyScalar(this.velocity);
		car.mesh.position.add(carHeading);

		//Rotates the heading vector.
		var angle = 0;
		if (car.carControls.left && !car.carControls.right) {
			angle = - ROTATION;
		}
		if (car.carControls.right && !car.carControls.left) {
			angle = ROTATION;
		}
		if (angle != 0) {
			/*Rotation Matrix =
			[cos 	-sin 	0] * [x]
			[sin 	cos 	0] * [z]
			[0		0		1] * [1]
			*/
			var x = this.heading.x, z = this.heading.z
			var cos = Math.cos(angle);
			var sin = Math.sin(angle);
			var xNew = cos * x - sin * z;
			var zNew = sin * x + cos * z;
			this.heading.set(xNew, 0, zNew);
			car.mesh.rotateY(-angle);
		}
	}
}
