class Table {
	constructor(x, y, z) {
		this.type = 'Table';
		this.mesh = new THREE.Object3D();

		var material = new THREE.MeshLambertMaterial({color:0x00ff00});

		new TableTop(this.mesh, material, 0, 0, 0);
		new TableLeg(this.mesh, material, -25, -1, -8);
		new TableLeg(this.mesh, material, -25, -1, 8);
		new TableLeg(this.mesh, material, 25, -1, 8);
		new TableLeg(this.mesh, material, 25, -1, -8);

		this.mesh.position.x = x;
		this.mesh.position.y = y;
		this.mesh.position.z = z;
		scene.add(this.mesh);
		return this.mesh
	}
}

class TableTop {
	constructor(obj, material, x, y, z) {
		this.type = 'TableTop';
		var geometry = new THREE.CubeGeometry(60, 2, 20);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		obj.add(mesh);
		return mesh;
	}
}

class TableLeg {
	constructor(obj, material, x, y, z) {
		var geometry = new THREE.CubeGeometry(2, 6, 2);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y - 3, z);
		obj.add(mesh);
	}
}