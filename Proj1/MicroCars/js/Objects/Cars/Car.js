class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';

		// Creating mesh
		this.mesh = new CarMesh();
		this.add(this.mesh);

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
		// Handling input
		var left  = Input.is_pressed("ArrowLeft");
		var right = Input.is_pressed("ArrowRight");
		var up    = Input.is_pressed("ArrowUp");
		var down  = Input.is_pressed("ArrowDown");

		this.acceleration = 0;
		if (up && !down) {
			this.acceleration = -CAR_ACCELERATION;
		} else if (down && !up) {
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

		// Handling collisions
		scene.traverseVisible(function(node) {
			if (node == car) { return; }

			if (car.intersects(node)) {
				// Calculate new position

				// Fire the main event
				car.dispatchEvent({type: 'collided', body: node});

				// Stop the car if it's a StaticBody
				if (node instanceof StaticBody) {
					var n = car.getHeading(car, node);
					var angle = car.heading.angleTo(n);

					if (angle < 90 && car.acceleration < 0) {
						car.velocity = 0;
					}
				}

				// Respawn the car if it's an Orange
				if (node instanceof OrangeWrapper) {
					respawnObject(car);
				}
			}
		});

		// Moving our car
		this.move(this.heading, this.velocity);
		if (objectNeedsRespawn(this.getWorldPosition())) {
			respawnObject(this);
		}
	}
}
