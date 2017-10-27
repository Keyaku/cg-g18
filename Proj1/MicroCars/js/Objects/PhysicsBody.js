/*******************************************************************************
*	PhysicsBody classes
* Place where all types of bodies will reside for further implementation
*******************************************************************************/

// Abstract class for physics bodies.
class PhysicsBody extends THREE.Object3D {
	constructor() {
		super();
		this.type = "PhysicsBody";
		this.isPhysicsBody = true;

		this.collisionData = undefined;
		this.bounds = undefined;
		this.heading = new THREE.Vector3();
	}

	// Callback for every frame
	update(delta) { /* do nothing */ }

	/**
	* @method getHeading: Gets the Vector direction where Point A points to Point B.
	* @param b: Object3D of point B
	* @param n: given Vector3 to fill data in. If undefined, function will return a new one
	*/
	getHeading(b, n=undefined) {
		if (n == undefined || !n.isVector3) {
			n = b.getWorldPosition().clone();
		} else {
			n.copy(b.getWorldPosition());
		}
		n.sub(this.getWorldPosition());
		n.set(n.x, 0, 0);
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
		this.isStaticBody = true;
		this.matrixAutoUpdate = false; // Object is static, no update is necessary
	}
}


// Weighted, non-deformable bodies. Use for props
var rigidbodyIteration;
class RigidBody extends PhysicsBody {
	constructor(mass = 1) {
		super();
		this.type = "RigidBody";
		this.isRigidBody = true;
		this.mass = mass;
		this.velocity = 0;

		// Creating event for collision
		this.addEventListener('collided', function (event) {
			// if the colliding body is a StaticBody, bounce against it
			if (event.body.isStaticBody) {
				this.getHeading(event.body, event.body.heading);
				this.velocity = -this.velocity;
			}
			// if the colliding body is a RigidBody, share velocity with this one
			else if (event.body.isRigidBody) {
				this.getHeading(event.body, event.body.heading);
				event.body.velocity = Math.abs(this.velocity);
			}
		});
	}

	update(delta) {
		this.velocity -= FRICTION * this.mass * this.velocity;
		this.translateOnAxis(this.heading, this.velocity);

		if (this.velocity > 0.01) {
			/* FIXME: Since we can't use `this` in traverseVisible() iteration,
				we have to use this kind of practice */
			rigidbodyIteration = this;
			scene.traverseVisible(function (node) {
				if (!node.isPhysicsBody) { return; }
				if (rigidbodyIteration.id == node.id) { return; }
				if (node.isMotionBody) { return; }

				if (rigidbodyIteration.intersects(node)) {
					rigidbodyIteration.dispatchEvent({type: 'collided', body: node});
				}
			});
		}
	}
}


// Bodies that move and can be animated. Useful for cars.
class MotionBody extends PhysicsBody {
	constructor(mass = 1) {
		super();
		this.type = "MotionBody";
		this.isMotionBody = true;
		this.mass = mass;
		this.velocity = 0;

		// Creating event for collision
		this.addEventListener('collided', function (event) {
			// if the colliding body is a RigidBody, share velocity with this one
			if (event.body.isRigidBody) {
				this.getHeading(event.body, event.body.heading);
				event.body.velocity = Math.abs(this.velocity);
			}
		});
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
