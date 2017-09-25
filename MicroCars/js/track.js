class Track {
	constructor() {
		this.type = 'Track';
		this.mesh = new THREE.Object3D();
		var points = [
			{x:0, z:0},
			{x:100, z:0},
			{x:140, z:40},
			{x:400, z:40},
			{x:400, z:200},
			{x:150, z:500},
			{x:120, z:500},
			{x:120, z:300},
			{x:160, z:240},
			{x:140, z:200},
			{x:70, z:270},
			{x:70, z:500},
			{x:0, z:500},
			{x:0, z:300},
			{x:40, z:240},
			{x:0, z:200},
			{x:0, z:0},
		]
		var geometry = new THREE.Geometry();
		for (var i in points) {
			geometry.vertices.push(new THREE.Vector3(points[i].x, 0, points[i].z));
		}
		var materialLine = new THREE.LineBasicMaterial({color:0x2194ce});
		var line = new THREE.Line(geometry, materialLine);
		this.mesh.add(line);
		scene.add(this.mesh);
		return this;
	}

	addTorus(torusMesh) {
		//TODO - @RafaelRibeiro
	}
}