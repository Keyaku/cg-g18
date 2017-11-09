class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';

		// Preparing abstract Car data
		this.userData.canMoveForward = true;
		this.userData.canMoveBack = true;
		this.userData.colliding = false;

		this.addHeadLigths();

		// Creating mesh
		var carWidth = 20;
		var carLength = 10;
		this.mesh = createCarMesh(carWidth, carLength);
		this.add(this.mesh);

		// Creating Bounds
		/* FIXME: hacked our way through a BoundingSphere for our car */
		var vertices = this.mesh.children[0].geometry.vertices;
		var min = new THREE.Vector3(0, 0, 0);
		var max = new THREE.Vector3(0, 0, 0);
		for (var i = 0; i < vertices.length; i++) {
			var v = vertices[i];
			min.min(v);
			max.max(v);
		}

		var center = max.clone();
		center.sub(min);

		this.bounds = new BoundingSphere(this.mesh, carWidth, center);
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

	addHeadLigths() {
		var targetObject = new THREE.Object3D();
		targetObject.position.set(-50, 10, 4);
		this.add(targetObject);

		var spotLight1 = new THREE.SpotLight( 0xffffff, 5, 200, 45 * TO_RADIANS);
		spotLight1.position.set(0, 5, 0);
		spotLight1.target = targetObject;
		this.add(spotLight1);

		var spotLight2 = new THREE.SpotLight( 0xffffff, 5, 200, 45 * TO_RADIANS);
		spotLight2.position.set(0, 5, 8);
		spotLight2.target = targetObject;
		this.add(spotLight2);

		this.headlights1 = spotLight1;
		this.headlights2 = spotLight2;
	}

	switchHeadlights() {
		// FIXME: FIX THIS CODE
		if (this.headlights1.power != 0) {
			this.headlights1.power = 0;
			this.headlights2.power = 0;
		} else {
			this.headlights1.power = 5 * Math.PI;
			this.headlights2.power = 5 * Math.PI;
		}
	}

	respawn(position=this.userData.initialPosition) {
		game.playerDied();
		this.position.copy(position);
		this.rotation.set(0, 0, 0);
		this.velocity = 0;
	}

	// Our mandatory update() function
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
						car.userData.canMoveForward = false;
					}
					else {
						car.userData.canMoveBack = false;
					}
				}
				// Respawn the car if it's an Orange
				else if (node instanceof OrangeWrapper) {
					car.respawn();
				}
			}
		});

		if (!carCollided) {
			this.userData.colliding = false;
			this.userData.canMoveForward = true;
			this.userData.canMoveBack = true;
		}

		// Handling input
		var left  = Input.is_pressed("ArrowLeft");
		var right = Input.is_pressed("ArrowRight");
		var up    = Input.is_pressed("ArrowUp");
		var down  = Input.is_pressed("ArrowDown");

		if (Input.is_pressed("h")) {
			this.switchHeadlights();
		}

		this.acceleration = 0;
		if (up && !down && this.userData.canMoveForward) {
			this.acceleration = -CAR_ACCELERATION;
		}
		else if (down && !up && this.userData.canMoveBack) {
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
		if (objectNeedsRespawn(this)) {
			this.respawn();
		}
	}
}
