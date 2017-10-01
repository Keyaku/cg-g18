class CarPhysics {
	constructor(maxAcc) {
		this.acceleration = 200

		this.currentSpeed = 0
		this.lastTime = 0
		this.lastPosition = new THREE.Vector3(0,0,0)

		//Movement type: Uniformly Accelerated Motion
		//Law of motion: s(t) = s0 + v0*t + 0.5*a*t^2
		//Considering s0 = 0, v0 = 0
		//Updated law of motion: 	s(t) = 0.5*a*t^2 
		//							s(t2) = s(t1) + 0.5*a*(t2^2 - t1^2)
		//Displacement: s(t2) - s(t1) = 0.5*a*(t2^2 - t1^2)
	}


	getDisplacement(time, t2) {
		//Displacement: s(t2) - s(t1) = 0.5*a*(t2^2 - t1^2)
		var t1 = this.lastTime
		var p1 = this.lastPosition
		var dp = 0.5 * this.acceleration * (t2*t2 - t1*t1)
		var dpV3 = new THREE.Vector3(dp, 0, 0)
		dpV3.multiplyScalar(10000000)
		
		this.lastPosition.add(dpV3)
		var scal = 1
		if (dpV3.length() == 0){ 
			scal = 0
			console.log(dp)
		}
		this.lastPosition.multiplyScalar(1.1)
		this.lastTime = t2

//		console.log(this.lastPosition, dpV3)

		return this.lastPosition
	}
}


//Get previous time
//Get last position
//Get new time
//Calculate displacement
//Add displacement to last position
//Save new previous time
//Save new last position