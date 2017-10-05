class CarPhysics {
	constructor(x, y, z, carHeading) {
		this.lastTime = 0;
		this.lastPosition = new THREE.Vector3(x, y, z);

		this.heading = new THREE.Vector3(carHeading.x, carHeading.y, carHeading.z);
		this.initialVelocity = new THREE.Vector3(0, 0, 0);
		this.forwardAcceleration = 50;
		this.decayAcceleration = 3;

		this.currenAcceleration = 0;

		


		//Movement type: Uniformly Accelerated Motion
		//Law of motion: s(t) = s0 + v0*t + 0.5*a*t^2
		//Considering s0 = 0, v0 = 0
		//Updated law of motion: 	s(t) = 0.5*a*t^2 
		//							s(t2) = s(t1) + 0.5*a*(t2^2 - t1^2)
		//Displacement: s(t2) - s(t1) = 0.5*a*(t2^2 - t1^2)
	}

	update(time, delta) {
		var displacement = 0.5 * this.currenAcceleration * (time * time - this.lastTime * this.lastTime);
		var carPosition = car.mesh.position;
		var carHeading = this.heading.clone();
		carHeading.multiplyScalar(displacement);
		carPosition.add(carHeading);
		car.mesh.position.set(carPosition.x, carPosition.y, carPosition.z);
		this.lastTime = time;

		if (car.carControls.left == 1) {
			//Rotates the heading vector.
			var angle = - Math.PI / 16;
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
			this.heading = new THREE.Vector3(xNew, 0, zNew);
			car.mesh.rotation.set(0, car.mesh.rotation.y - angle, 0);
		}

		if (car.carControls.rigth == 1) {
				//Rotates the heading vector.
			var angle = Math.PI / 16;
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
			this.heading = new THREE.Vector3(xNew, 0, zNew);
			car.mesh.rotation.set(0, car.mesh.rotation.y - angle, 0);
		}


		/*
		var displacement = 0.5 * this.currenAcceleration * (time * time - this.lastTime * this.lastTime);
		var carHeading = this.heading.clone();
		carHeading.multiplyScalar(displacement);
		var carPosition = new THREE.Vector3(this.lastPosition.x, this.lastPosition.y, this.lastPosition.z);
		car.mesh.position.set(carPosition.x + carHeading.x, carPosition.y + carHeading.y, carPosition.z + carHeading.z);
		
		this.lastPosition = (carPosition.x + carHeading.x, carPosition.y + carHeading.y, carPosition.z + carHeading.z);
		
		this.lastTime = time
		*/
	}
}
