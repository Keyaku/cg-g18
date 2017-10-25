/*******************************************************************************
*	PhysicsBody classes
* Place where all types of bodies will reside for further implementation
*******************************************************************************/

// Abstract class for physics bodies.
class PhysicsBody extends THREE.Object3D {
	constructor() {
		super();
		this.type = "PhysicsBody";

		this.collisionData = undefined;
		this.bounds = undefined;
	}

	// Callback for every frame
	update(delta) { /* do nothing */ }

	intersects(body) {
		if (!(body instanceof PhysicsBody)) { return false; }
		if (this.bounds == undefined || body.bounds == undefined) {
			return false;
		}

		return this.bounds.intersects(body.bounds)
	}
}


// Complately static, non-moving objects. Useful for Butters
class StaticBody extends PhysicsBody {
	constructor() {
		super();
		this.type = "StaticBody";
		this.matrixAutoUpdate = false; // Object is static, no update is necessary
	}
}


// Weighted, non-deformable bodies. Use for props
class RigidBody extends PhysicsBody {
	constructor(mass = 1) {
		super();
		this.type = "RigidBody";
		this.mass = mass;
		this.velocity = 0;
	}

	update(delta) {
		// TODO for next assignment: fill with gravitational force
	}
}


// Bodies that move and can be animated. Useful for cars.
class MotionBody extends PhysicsBody {
	constructor(mass = 1) {
		super();
		this.type = "MotionBody";
		this.mass = mass;
		this.velocity = 0;

		// Creating event for collision
		this.addEventListener('collided', function(event) {
			if (event.body instanceof RigidBody) {
				// FIXME: apply proper physics to both bodies (when applied)
				event.body.velocity = this.velocity;
			}
		});
	}

	update(delta) {
		// TODO for next assignment: fill with gravitational force
	}

	move(axis, distance) {
		// TODO: remove this?
	}
}
