/*******************************************************************************
*	Bounding Geometry classes
* Attaches a bounding box to a given mesh with option to toggle visibility or not
*******************************************************************************/

class BoundingSphere extends THREE.Mesh {
	constructor(mesh, radius=0, center=new THREE.Vector3()) {
		super();
		this.type = "BoundingSphere";
		this.visible = false;

		if (radius <= 0) { // This generates automatically a sphere around our mesh
			this.setFromMesh(mesh);
		} else { // This goes straight to the point and creates the sphere according to our radius
			this.updateBounds(radius, center)
		}
		this.material = new THREE.MeshBasicMaterial({wireframe:true});
		this.scale.copy(mesh.scale);
		return this;
	}

	updateBounds(radius, center=this.position) {
		this.geometry = new THREE.SphereBufferGeometry(radius, 8, 8);
		this.position.copy(center);

		this.geometry.boundingSphere = new THREE.Sphere(center, radius);

		this.radius = radius;
	}

	// Mesh-altering methods
	setFromMesh(obj) {
		var min = new THREE.Vector3(0, 0, 0);
		var max = new THREE.Vector3(1, 0, 0);

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

		var radius = min.distanceTo(max) / 2;
		this.updateBounds(radius, new THREE.Vector3());
	}

	// Lifesavers
	toggleVisibility() {
		this.visible = !this.visible;
	}

	// Collision methods
	intersects(bounds) {
		if (bounds.type != this.type) {
			return false; // We don't support other BoundingGeometries *yet*
		}

		var sum = this.radius + bounds.radius;
		var centerThis  = this.getWorldPosition();
		var centerOther = bounds.getWorldPosition();
		return centerThis.distanceToSquared(centerOther) <= sum*sum;
	}
}
