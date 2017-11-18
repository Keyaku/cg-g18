function createCarMesh(carWidth, carLength, basic=false) {
	// Wheels
	var pneuWidth = 2;
	var geometry = new WheelGeometry(3, pneuWidth, 45);
	var wheel1 = new THREE.Mesh(geometry);
	var wheel2 = new THREE.Mesh(geometry);
	var wheel3 = new THREE.Mesh(geometry);
	var wheel4 = new THREE.Mesh(geometry);
	var wheels = [wheel1, wheel2, wheel3, wheel4];
	for (var i in wheels) {
		if (basic) {
			wheels[i].material = new THREE.MeshBasicMaterial({color: 0x001111});
		} else {
			createMaterials(wheels[i], {color: 0x001111});
		}
	}
	wheel1.position.set(0, 5, 0);
	wheel2.position.set(0, 5, carLength + pneuWidth);
	wheel3.position.set(carWidth, 5, 0);
	wheel4.position.set(carWidth, 5, carLength + pneuWidth);

	// Body
	var bodyGeometry = new CarBody(carWidth, carLength);
	var geometry = new CarBody(carWidth, carLength);
	var carBody = new THREE.Mesh(geometry);
	if (basic) {
		carBody.material = new THREE.MeshBasicMaterial({color : 0xff0000});
	} else {
		createMaterials(carBody, {color : 0xff0000});
	}

	// Bumper
	var geometry = new BumperGeometry(10, 3, 3);
	var bumper = new THREE.Mesh(geometry);
	if (basic) {
		bumper.material = new THREE.MeshBasicMaterial({color: 0xFFFF000});
	} else {
		createMaterials(bumper, {color: 0xFFFF000});
	}
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

	// Associating car materials
	var basicMaterial = new THREE.MeshBasicMaterial({color:0x000000});
	var phongMaterial = new THREE.MeshPhongMaterial({color:0x111111});
	var lambertMaterial = new THREE.MeshLambertMaterial({color:0x222222});
	createMaterialsTwo(mesh, basicMaterial, phongMaterial, lambertMaterial);

	// Adding custom opacity changing method for this crazy mesh.
	mesh.changeOpacity = function(opacity=1.0) {
		this.traverse(function (opacity, node) {
			if (node instanceof THREE.Mesh) {
				changeOpacity(node, opacity);
			}
		}.bind(this, opacity));
	}.bind(mesh);

	return mesh;

}
