class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';

		// Creating mesh
		this.mesh = new CarMesh();
		this.add(this.mesh);

		this.canMoveForward = true;
		this.canMoveBack = true;
		this.colliding = false;

		// Creating Bounds
		/* FIXME: hacked our way through a BoundingSphere for our car */
		var vertices = this.mesh.children[0].geometry.vertices
		var min = new THREE.Vector3(0, 0, 0);
		var max = new THREE.Vector3(0, 0, 0);
		for (var i = 0; i < vertices.length; i++) {
			var v = vertices[i];
			min.min(v);
			max.max(v);
		}
		var radius = 0.6 * Math.max((max.x-min.x), (max.y-min.y), (max.z-min.z))

		var center = max.clone();
		center.sub(min);
		center.divideScalar(2);
		center.multiplyScalar(0.5);

		this.bounds = new BoundingSphere(this.mesh, radius, center);
		/* FIXME: attempt to remove the code above later */

		this.add(this.bounds);

		// Positioning the car
		this.heading = X_AXIS_HEADING.clone();
		this.acceleration = 0;
		this.position.set(x, y, z);
		this.userData.initialPosition = this.position.clone();

		// Adding to scene graph
		scene.add(this);
	}

	update(delta) {
		var carCollided = false;
		// Handling collisions
		scene.traverseVisible(function(node) {
			if (node == car) { return; }

			if (car.intersects(node)) {
				// Calculate new position

				// Fire the main event
				car.dispatchEvent({type: 'collided', body: node});

				// Stop the car if it's a StaticBody
				if (node instanceof StaticBody) {
					carCollided = true;
					car.velocity = 0;
					var xx = node.position.x - car.position.x;
					var zz = node.position.z - car.position.z;
					var vectorCarToButter = new THREE.Vector3(xx, 0, zz);
					vectorCarToButter.normalize();
					
					//The world direction vector is rotated 90º because it point right.
					var heading = car.getWorldDirection();
					var rotatedX = Math.cos(NINETY_DEGREES) * heading.x - Math.sin(NINETY_DEGREES) * heading.z;
					var rotatedZ = Math.sin(NINETY_DEGREES) * heading.x + Math.cos(NINETY_DEGREES) * heading.z;
					var carHeading = new THREE.Vector3(rotatedX, 0, rotatedZ);
					var angleCarButter = carHeading.angleTo(vectorCarToButter) * TO_DEGREES;
					
					if (angleCarButter < 90) {
						car.canMoveForward = false;
					}
					else {
						car.canMoveBack = false;
					}
				}
				// Respawn the car if it's an Orange
				else if (node instanceof OrangeWrapper) {
					respawnObject(car);
				}
			}
		});

		if (!carCollided) {
			car.colliding = false;
			car.canMoveForward = true;
			car.canMoveBack = true;
		}

		// Handling input
		var left  = Input.is_pressed("ArrowLeft");
		var right = Input.is_pressed("ArrowRight");
		var up    = Input.is_pressed("ArrowUp");
		var down  = Input.is_pressed("ArrowDown");

		this.acceleration = 0;
		//console.log(car.canMoveForward)
		if (up && !down && car.canMoveForward) {
			this.acceleration = -CAR_ACCELERATION;
		} 
		else if (down && !up && car.canMoveBack) {
			this.acceleration = CAR_ACCELERATION;
		}

		// Updating car motion
		this.velocity += this.acceleration * delta - FRICTION * this.mass * this.velocity;

		// Rotates the mesh
		var angle = 0;
		if (left && !right) {
			angle = WHEEL_ROTATION;
		}
		if (right && !left) {
			angle = -WHEEL_ROTATION;
		}
		if (angle != 0) {
			angle *= Math.abs(this.velocity) * TURN_ASSIST;
			this.rotateY(angle);
		}		

		// Moving our car
		this.move(this.heading, this.velocity);
		if (objectNeedsRespawn(this.getWorldPosition())) {
			respawnObject(this);
		}
	}
}
