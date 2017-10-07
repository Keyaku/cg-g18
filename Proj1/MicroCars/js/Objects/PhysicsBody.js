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

// Weighted, non-deformable bodies (useful for Edibles and other props)
class RigidBody extends PhysicsBody {
	constructor() {
		super();
		this.mass = 1;
	}

	update(delta) {
		// TODO for next assignment: fill with gravitational force
	}
}

// Bodies that move and can be animated (useful for cars)
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
