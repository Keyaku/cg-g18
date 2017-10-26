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
		this.heading = new THREE.Vector3();
	}

	// Callback for every frame
	update(delta) { /* do nothing */ }

	// Gets the vector direction where a points to b
	getHeading(a, b, n=undefined) {
		if (n == undefined || !n.isVector3) {
			n = b.getWorldPosition().clone();
		} else {
			n.copy(b.getWorldPosition());
		}
		n.sub(a.getWorldPosition());
		n.setZ(0);
		n.normalize();
		return n;
	}

	// Checks for intersection via a formula
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
		this.velocity -= FRICTION * this.mass * this.velocity;
		this.translateOnAxis(this.heading, this.velocity);
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
				this.getHeading(this, event.body, event.body.heading);
				event.body.velocity = Math.abs(this.velocity);
			}
		});
	}

	update(delta) {
		// TODO for next assignment: fill with gravitational force
	}

	/**
	* @method move: Translate object according to previously calculated or collision values.
	* @param axis: representing the direction of movement_direction
	* @param distance: how far should the body travel
	*/
	move(axis, distance) {
		this.translateOnAxis(axis, distance);
	}
}
