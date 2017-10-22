class Car extends MotionBody {
	constructor(x=0, y=0, z=0) {
		super();
		this.type = 'Car';

		// Creating mesh
		this.mesh = new CarMesh();
		this.add(this.mesh);

		var vertices = this.mesh.children[0].geometry.vertices
		var xmin = 0, xmax = 0, ymin = 0, ymax = 0, zmin = 0, zmax = 0;
		for (var vI = 0; vI < vertices.length; vI++) {
			var k = vertices[vI];
			if (k.x < xmin) { xmin = k.x; }
			if (k.y < ymin) { ymin = k.y; }
			if (k.z < zmin) { zmin = k.z; }
			if (k.x > xmax) { xmax = k.x; }
			if (k.y > ymax) { ymax = k.y; }
			if (k.z > zmax) { zmax = k.z; }
		}
		var xcenter = 0.5 * (xmax - xmin) / 2;
		var ycenter = 0.5 * (ymax - ymin) / 2;
		var zcenter = 0.5 * (zmax - zmin) / 2;

		var radius = 0.6 * Math.max(0.5*(xmax-xmin), 0.5*(ymax-ymin), 0.5*(zmax-zmin))
		var geometry = new THREE.SphereGeometry(radius, 10, 10);
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
		var sphere = new THREE.Mesh( geometry, material );
		sphere.position.set(xcenter, ycenter, zcenter)
		this.add( sphere );
		
		// Creating Bounds
		//this.bb = new BoundingSphere(this.mesh);
		//this.add(this.bb);

		// Adding our own data
		this.velocity = 0;
		this.forwardAcceleration = CAR_ACCELERATION;

		// Positioning the car
		this.position.set(x, y, z);

		// Adding to scene graph
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
		this.velocity += acceleration * delta - FRICTION * this.velocity;
		this.move(X_AXIS_HEADING, this.velocity);

		//Rotates the mesh
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
	}

	move(axis, distance) {
		// TODO: Proper motion with Vector3 that points to the next location?
		var colliding = super.move(axis, distance);
		this.translateOnAxis(axis, distance);
		return colliding;
	}
}
