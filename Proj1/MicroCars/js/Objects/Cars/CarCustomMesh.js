function createCarMesh(carWidth, carLength) {
	// Wheels
	var pneuWidth = 2;
	var geometry = new WheelGeometry(3, pneuWidth);
	var wheel1 = new THREE.Mesh(geometry);
	var wheel2 = new THREE.Mesh(geometry);
	var wheel3 = new THREE.Mesh(geometry);
	var wheel4 = new THREE.Mesh(geometry);
	var wheels = [wheel1, wheel2, wheel3, wheel4];
	for (var i in wheels) {
		createMaterials(wheels[i], {color: 0x001111});
	}
	wheel1.position.set(0, 5, 0);
	wheel2.position.set(0, 5, carLength + pneuWidth);
	wheel3.position.set(carWidth, 5, 0);
	wheel4.position.set(carWidth, 5, carLength + pneuWidth);

	// Body
	var bodyGeometry = new CarBody(carWidth, carLength);
	var geometry = new CarBody(carWidth, carLength);
	var carBody = new THREE.Mesh(geometry);
	createMaterials(carBody, {color : 0xff0000});

	// Bumper
	var geometry = new BumperGeometry(10, 3, 3);
	var bumper = new THREE.Mesh(geometry);
	createMaterials(bumper, {color: 0xFFFF000});
	bumper.rotation.set(0, -Math.PI/2, 0);
	bumper.position.set(0, 5, 5);

	// All meshes
	var mesh = new THREE.Mesh();
	var allMeshes = [
		wheel1, wheel2, wheel3, wheel4,
		carBody, bumper
	];
	for (var i in allMeshes) {
		allMeshes[i].updateMatrix();
		mesh.add(allMeshes[i]);
	}

	mesh.position.set(0, 0, -2)
	return mesh;

}