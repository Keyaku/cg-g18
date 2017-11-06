function createCarMesh(carWidth, carLength) {
	var pneuWidth = 2;
	var geometry = new WheelGeometry(3, pneuWidth);
	var material = new THREE.MeshLambertMaterial( {color: 0x001111});
	var wheel1 = new THREE.Mesh(geometry, material);
	var wheel2 = new THREE.Mesh(geometry, material);
	var wheel3 = new THREE.Mesh(geometry, material);
	var wheel4 = new THREE.Mesh(geometry, material);
	wheel1.position.set(0, 5, 0);
	wheel2.position.set(0, 5, carLength + pneuWidth);
	wheel3.position.set(carWidth, 5, 0);
	wheel4.position.set(carWidth, 5, carLength + pneuWidth);

	var bodyGeometry = new CarBody(carWidth, carLength);

	var geometry = new CarBody(carWidth, carLength);
	var material = new THREE.MeshBasicMaterial({color : 0xff0000});
	var carBody = new THREE.Mesh(geometry, material);

	var geometry = new BumperGeometry(10, 3, 3);
	var material = new THREE.MeshPhongMaterial( {color: 0xFFFF000});
	var bumper = new THREE.Mesh(geometry, material);
	bumper.rotation.set(0, -Math.PI/2, 0);
	bumper.position.set(0, 5, 5);

	var mesh = new THREE.Mesh();

	var allMeshes = [
		wheel1, wheel2, wheel3, wheel4,
		carBody, bumper
	];
	for (var i in allMeshes) {
		allMeshes[i].updateMatrix();
		mesh.add(allMeshes[i]);
	}
	mesh.material = new THREE.MeshPhongMaterial({color: 0xFF0000});

	mesh.position.set(0, 0, 0)
	return mesh;

}
