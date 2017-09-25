class Car1 {
	constructor(x, y, z) {
		this.type = 'Car1';
		this.mesh = new THREE.Object3D();
		
		this.acc = 0;
		this.maxAcceleration = 2;

		//var matBody = new THREE.MeshLambertMaterial({color:0x147be2});
		var matBody = new THREE.MeshPhongMaterial({
			color:0x2194ce,
			//emissive: 0x2194ce,
			specular: 0x111111,
			shininess: 10,
			flatShading: false,
			wireframe: false
		});
		var materialWheels = new THREE.MeshLambertMaterial({color:0x222222});
		var materialAxel = new THREE.MeshLambertMaterial({color:0x8002e8, wireframe:false});
		
		var extrSettings = {amount:8, bevelEnabled:false};

		var c1 = new Car1Square(this.mesh, matBody, extrSettings, 3, 5, 0, 0)
		var c2 = new Car1Square(this.mesh, matBody, extrSettings, 8, 3, 3, 2);
		var c3 = new Car1Square(this.mesh, matBody, extrSettings, 7, 2, 11, 0);
		var c5 = new Car1Square(this.mesh, matBody, extrSettings, 12, 6, 11, 2);

		var t1 = new Car1Triangle(this.mesh, matBody, extrSettings, -2, 2.5, 0, 0, 2.5, 0, 0, 5, 0);
		var t2 = new Car1Triangle(this.mesh, matBody, extrSettings, -2, 2.5, 0, 0, 0, 0, 0, 2.5, 0);
		var t3 = new Car1Triangle(this.mesh, matBody, extrSettings, 3, 0, 0, 4, 2, 0, 3, 2, 0);
		var t4 = new Car1Triangle(this.mesh, matBody, extrSettings, 9, 2, 0, 11, 0, 0, 11, 2, 0);
		var t5 = new Car1Triangle(this.mesh, matBody, extrSettings, 8.5, 5, 0, 11, 5, 0, 11, 8, 0);
		var t6 = new Car1Triangle(this.mesh, matBody, extrSettings, 18, 0, 0, 19, 2, 0, 18, 2, 0);
		var t7 = new Car1Triangle(this.mesh, matBody, extrSettings, 22, 2, 0, 23, 0, 0, 23, 2, 0);
		var t8 = new Car1Triangle(this.mesh, matBody, extrSettings, 23, 0, 0, 24, 5, 0, 23, 5, 0);
		var t9 = new Car1Triangle(this.mesh, matBody, extrSettings, 23, 5, 0, 24, 5, 0, 23, 8, 0);
	
		var w1 = new Car1Torus(this.mesh, materialWheels, 2.5, 1.7, 10, 16, 5.5, -1, -2);
		var w2 = new Car1Torus(this.mesh, materialWheels, 2.5, 1.7, 10, 16, 20.5, -1, -2);
		var w3 = new Car1Torus(this.mesh, materialWheels, 2.5, 1.7, 10, 16, 5.5, -1, 10);
		var w4 = new Car1Torus(this.mesh, materialWheels, 2.5, 1.7, 10, 16, 20.5, -1, 10);

		var cy1 = new Car1Cylinder(this.mesh, materialAxel, 0.5, 12, 8, 1, 5.5, -1, 4, 90, 0, 0);
		var cy2 = new Car1Cylinder(this.mesh, materialAxel, 0.5, 12, 8, 1, 20.5, -1, 4, 90, 0, 0);
		var cy3 = new Car1Cylinder(this.mesh, materialAxel, 0.5, 3, 8, 1, 5.5, 0.5, 4, 0, 0, 0);
		var cy4 = new Car1Cylinder(this.mesh, materialAxel, 0.5, 3, 8, 1, 20.5, 0.5, 4, 0, 0, 0);
		var cy5 = new Car1Cylinder(this.mesh, materialAxel, 0.5, 15, 8, 1, 13, -1, 4, 0, 0, 90);

		this.mesh.position.y = 5
		this.mesh.rotation.set(0, 3.14, 0);

		scene.add(this.mesh);
		return this;
	}

	get acceleration() { return this.acc; }
	set acceleration(val) { this.acc = Math.min(val, this.maxAcceleration); }
	
	speedUp() { this.acc = Math.min(this.maxAcceleration, this.acc + 0.5) }
	slowDown() { this.acc = Math.max(-this.maxAcceleration, this.acc - 0.6); }
	stop() { this.acc = 0; }

	animate() {
		this.mesh.position.x += this.acc;
	}
}


class Car1Triangle {
	constructor(obj, material, extrSettings, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
		var geometry = new THREE.Shape();
		geometry.moveTo(x1, y1);
		geometry.lineTo(x2, y2);
		geometry.lineTo(x3, y3);
		geometry.lineTo(x1, y1);
		var geometry = new THREE.ExtrudeGeometry(geometry, extrSettings);
		var mesh = new THREE.Mesh(geometry, material);
/*		var geometry = new THREE.Geometry();
		var v1 = new THREE.Vector3(x1, y1, z3);
		var v2 = new THREE.Vector3(x2, y2, z2);
		var v3 = new THREE.Vector3(x3, y3, z3);
		geometry.vertices.push(v1, v2, v3);
		geometry.faces.push(new THREE.Face3(0, 1, 2));
		geometry.computeFaceNormals();
		//var extrudeGeometry = new THREE.ExtrudeGeometry(geometry, {amount:5, bevelEnabled:false});
		var mesh = new THREE.Mesh(geometry, material);
		obj.add(mesh); */
		var geometryE = new THREE.EdgesGeometry(mesh.geometry);
		var materialE = new THREE.LineBasicMaterial({color:0xffffff, linewidth:4});
		var wireframe = new THREE.LineSegments(geometryE, materialE);
		obj.add(mesh, wireframe);
	}
}

class Car1Square {
	constructor(obj, material, extrSettings, cubeL1, cubeL2, x, y) {
		var geometry = new THREE.Shape();
		geometry.moveTo(x, y);
		geometry.lineTo(x, y + cubeL2);
		geometry.lineTo(x + cubeL1, y + cubeL2);
		geometry.lineTo(x + cubeL1, y);
		geometry.lineTo(x, y);
		var extrudeGeometry = new THREE.ExtrudeGeometry(geometry, extrSettings);
		var mesh = new THREE.Mesh(extrudeGeometry, material);
/*		var geometry = new THREE.CubeGeometry(cubeL1, cubeL2, cubeL3);
		//var extrudeGeometry = new THREE.ExtrudeGeometry(geometry, {amount:5, bevelEnabled:false});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x + cubeL1 / 2, y + cubeL2 / 2, z);
		obj.add(mesh); */
		var geometryE = new THREE.EdgesGeometry(mesh.geometry);
		var materialE = new THREE.LineBasicMaterial({color:0xffffff, linewidth:4});
		var wireframe = new THREE.LineSegments(geometryE, materialE);
		obj.add(mesh, wireframe);
	}
}

class Car1Torus {
	constructor(obj, material, radius, tube, rSeg, tSeg, x, y, z) {
		var geometry = new THREE.TorusGeometry(radius, tube, rSeg, tSeg);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		var geometryE = new THREE.EdgesGeometry( mesh.geometry );
		var materialE = new THREE.LineBasicMaterial({color:0xffffff, linewidth:2});
		var wireframe = new THREE.LineSegments(geometryE, materialE);
		wireframe.position.set(x, y, z);
		obj.add(wireframe);
	}
}

class Car1Cylinder {
	constructor(obj, material, radius, h, rSeg, hSeg, x, y, z, rotx, roty, rotz) {
		var geometry = new THREE.CylinderGeometry(radius, radius, h, rSeg, hSeg);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		mesh.rotation.set(rotx*3.14/180, roty*3.14/180, rotz*3.14/180);
		obj.add(mesh);
	}
}