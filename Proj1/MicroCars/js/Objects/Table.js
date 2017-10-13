class Table {
	constructor(x=0, y=0, z=0, size=100) {
		this.type = 'Table';
		this.mesh = new THREE.Object3D();

		var material = new THREE.MeshLambertMaterial({color:0xDEB887});
		var halfSize = size >> 1;
		var legDistance = size >> 2;
		var thickness = 5;

		new TableTop(this.mesh, material, 0, -thickness, 0, size, thickness);
		new TableLeg(this.mesh, material, -legDistance, -1, -legDistance, halfSize);
		new TableLeg(this.mesh, material, -legDistance, -1, legDistance, halfSize);
		new TableLeg(this.mesh, material, legDistance, -1, legDistance, halfSize);
		new TableLeg(this.mesh, material, legDistance, -1, -legDistance, halfSize);

		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
		return this;
	}
}

class TableTop {
	constructor(obj, material, x, y, z, size, thickness) {
		var geometry = new THREE.CubeGeometry(size, thickness, size);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		obj.add(mesh);
		return mesh;
	}
}

class TableLeg {
	constructor(obj, material, x, y, z, size) {
		var geometry = new THREE.CubeGeometry(size/10, size, size/10);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y - (size >> 1), z);
		obj.add(mesh);
		return mesh;
	}
}
