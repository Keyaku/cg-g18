/*******************************************************************************
*	PhysicsBody classes
* Place where all types of bodies will reside for further implementation
*******************************************************************************/

// Abstract class for physics bodies.
class PhysicsBody extends THREE.Object3D {
	constructor() {
		super();
	}

	update(delta) { /* do nothing */ }
}

// Complately static, non-moving objects. Useful for Butters
class StaticBody extends PhysicsBody {
	constructor() {
		super();
	}
}


// Weighted, non-deformable bodies. Useful for Oranges and other props
class RigidBody extends PhysicsBody {
	constructor() {
		super();
		this.mass = 1;
	}

	update(delta) {
		// TODO for next assignment: fill with gravitational force
	}
}

// Bodies that move and can be animated. Useful for cars.
class MotionBody extends PhysicsBody {
	constructor() {
		super();
		this.collisionData = undefined;
	}

	update(delta) {
		// TODO for next assignment: fill with gravitational force
	}

	move(axis, distance) {
		var colliding = PhysicsServer.testCollisions(this.matrixWorld, axis, distance, this.collisionData);

		if (colliding) {
			// TODO for next assignment: fill collision data
		}

		return colliding;
	}
}
