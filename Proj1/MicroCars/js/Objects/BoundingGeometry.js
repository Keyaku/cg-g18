/*******************************************************************************
*	Bounding Geometry classes
* Attaches a bounding box to a given mesh with option to toggle visibility or not
*******************************************************************************/

/*
**	BoundingGeometry
** Abstract class for BoundingGeometries.
** Do NOT instance one directly.
*/
class BoundingGeometry extends THREE.Mesh {
	constructor(mesh) {
		super();
		this.type = "BoundingGeometry";
		this.visible = false;

		this.material = new THREE.MeshBasicMaterial({wireframe:true});
		this.scale.copy(mesh.scale);
		return this;
	}

	// Lifesavers
	toggleVisibility() {
		this.visible = !this.visible;
	}

	// Self mesh-altering methods
	setFromMesh(obj, min=new THREE.Vector3(), max=new THREE.Vector3(1)) {
		var vertices;
		// Checking mesh's own geometry (if available)
		if (obj.geometry != undefined) {
			vertices = obj.geometry.vertices;
			for (var j = 0; j < vertices.length; j++) {
				var v = vertices[j];
				min.min(v);
				max.max(v);
			}
		}
		// Checking mesh's children (if any)
		var len = obj.children.length;
		for (var i = 0; i < len; i++) {
			var child = obj.children[i];
			if (child.geometry != undefined) {
				vertices = obj.children[i].geometry.vertices;
				for (var j = 0; j < vertices.length; j++) {
					var v = vertices[j];
					min.min(v);
					max.max(v);
				}
			}
		}
	}
}

/*
**	BoundingBox
** The AABB of BoundingGeometries.
** Requires an update every time the geometry rotates.
*/
class BoundingBox extends BoundingGeometry {
	constructor(mesh, min=undefined, max=undefined) {
		super(mesh);
		this.type = "BoundingBox";

		if (min == undefined || max == undefined) {
			min = new THREE.Vector3();
			max = new THREE.Vector3(1, 1, 1);
			this.setFromMesh(mesh, min, max);
		} else {
			this.updateBounds(min, max);
		}

		return this;
	}

	setFromMesh(obj, min, max) {
		super.setFromMesh(obj, min, max);
		this.updateBounds(min, max);
	}

	// Updates geometry and boundaries
	updateBounds(min=new THREE.Vector3(), max=new THREE.Vector3(1,1,1)) {
		var diagonal = max.clone().sub(min);
		this.geometry = new THREE.BoxBufferGeometry(diagonal.x, diagonal.y, diagonal.z);
		this.geometry.boundingBox = new THREE.Box3(min, max);

		this.min = min;
		this.max = max;
	}

	intersects(bounds) {
		if (!(bounds instanceof BoundingBox)) {
			return false;
		}

		return this.min.x <= bounds.min.x && bounds.max.x <= this.max.x
			&& this.min.y <= bounds.min.y && bounds.max.y <= this.max.y
			&& this.min.z <= bounds.min.z && bounds.max.z <= this.max.z;
	}
}

/*
**	BoundingSphere
** Sphere of a radius that is supposed to surround the entire object.
** Better suited for performance since it doesn't need updating.
** Less suited for proper collisions as it is less accurate.
*/
class BoundingSphere extends BoundingGeometry {
	constructor(mesh, radius=0, center=new THREE.Vector3()) {
		super(mesh);
		this.type = "BoundingSphere";

		if (radius <= 0) { // This generates automatically a sphere around our mesh
			this.setFromMesh(mesh);
		} else { // This goes straight to the point and creates the sphere according to our radius
			this.updateBounds(radius, center)
		}

		return this;
	}

	// Self mesh-altering methods
	setFromMesh(obj) {
		var min = new THREE.Vector3(0, 0, 0);
		var max = new THREE.Vector3(1, 0, 0);

		super.setFromMesh(obj, min, max);

		var radius = min.distanceTo(max) / 2;
		this.updateBounds(radius, new THREE.Vector3());
	}

	// Updates geometry and boundaries
	updateBounds(radius, center=this.position) {
		this.position.copy(center);

		this.geometry = new THREE.SphereBufferGeometry(radius, 8, 8);
		this.geometry.boundingSphere = new THREE.Sphere(center, radius);

		this.radius = radius;
	}

	// Collision methods
	intersects(bounds) {
		if (!(bounds instanceof BoundingSphere)) {
			return false;
		} // FIXME: do this for BoundingBox whenever possible

		var sum = this.radius + bounds.radius;
		var d = this.getWorldPosition().clone();
		d.sub(bounds.getWorldPosition());
		d.setY(0);

		return sum >= d.length();
	}
}
