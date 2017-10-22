/*******************************************************************************
*	Bounding Geometry classes
* Attaches a bounding box to a given mesh with option to toggle visibility or not
*******************************************************************************/

class BoundingSphere extends THREE.Mesh {
	constructor(mesh) {
		super();
		this.setFromMesh(mesh);
		this.material = new THREE.MeshBasicMaterial({wireframe:true}); // FIXME: do not use wireframe as it affects the 'A' keyDown event

		this.position.set(0, 0, 0);
		this.scale.copy(mesh.scale);
		return this;
	}

	setFromMesh(obj) {
		var len = obj.children.length;
		var min = new THREE.Vector3(0, 0, 0);
		var max = new THREE.Vector3(1, 0, 0);

		for (var i = 0; i < len; i++) {
			var vertices = obj.children[i].geometry.vertices;
			for (var j = 0; j < vertices.length; j++) {
				var v = vertices[j];
				min.min(v);
				max.max(v);
			}
		}

		var radius = min.distanceTo(max) / 2;
		this.geometry = new THREE.SphereBufferGeometry(radius, 8, 8);
	}

}
