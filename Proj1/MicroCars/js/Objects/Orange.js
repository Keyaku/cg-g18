class OrangeLeaf {
	constructor(obj, x, y, z) {
		this.type = 'OrangeLeaf';
		this.mesh = new THREE.Object3D();
		var leafShape = new THREE.Shape();
		leafShape.moveTo( 0, 0 );
		leafShape.bezierCurveTo( x + 6, y - 6, x + 12, y + 4, x, y );
		var extrudeSettings = { amount: 0.5, bevelEnabled: false };
		var geometry = new THREE.ExtrudeGeometry( leafShape, extrudeSettings );
		var material = new THREE.MeshLambertMaterial({color: 0x009900});
		var mesh = new THREE.Mesh( geometry, material );
		this.mesh.add(mesh);
		this.mesh.position.set(x, y+6.5, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

class OrangeBranch {
	constructor(obj, x, y, z) {
		this.type = 'OrangeBranch';
		this.mesh = new THREE.Object3D();
		var material = new THREE.MeshLambertMaterial({color:0x666633});
		var geometry = new THREE.CylinderGeometry(0.66, 0.33, 4);
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh.add(mesh);
		this.mesh.position.set(x, y + 5, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

class OrangeFruit {
	constructor(obj, x, y, z) {
		this.type = 'OrangeFruit';
		this.mesh = new THREE.Object3D();
		var material = new THREE.MeshLambertMaterial({color:0xFF9900});
		var geometry = new THREE.SphereGeometry(5, 15, 15);
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh.add(mesh);
		this.mesh.position.set(x, y, z);
		obj.add(this.mesh);
		return this.mesh;
	}
}

class Orange {
	constructor(orangeName, x, y, z) {
		this.type = 'Orange';
		this.mesh = new THREE.Object3D();
		this.mesh.name = orangeName
		var orangeFruit = new OrangeFruit(this.mesh, x, y, z);
		var orangeBranch = new OrangeBranch(this.mesh, x, y, z);
		// var orangeLeaf = new OrangeLeaf(this.mesh, x, y, z); Buggy leaf
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
		return this.mesh;
	}
}
