class Car {
	constructor(x, y, z) {
		this.type = 'Car';
		this.mesh = new THREE.Object3D();
		//Creates the material for the car body.
		var matBody = new THREE.MeshPhongMaterial({
			color:0x2194ce, /*Blue*/ specular: 0x111111, shininess: 10,
		});
		//Creates the material for the axles.
		var materialAxle = new THREE.MeshBasicMaterial({color:0x960101});
		//Extrude setting that define the car width.
		var extrSettings = {amount:8, bevelEnabled:false};
		//Creates the body panels.
		var c1 = new CarSquare(this.mesh, matBody, extrSettings, 3, 5, 0, 0);
		var c2 = new CarSquare(this.mesh, matBody, extrSettings, 8, 3, 3, 2);
		var c3 = new CarSquare(this.mesh, matBody, extrSettings, 7, 2, 11, 0);
		var c5 = new CarSquare(this.mesh, matBody, extrSettings, 12, 6, 11, 2);
		var t1 = new CarTriangle(this.mesh, matBody, extrSettings, -2, 2.5, 0, 0, 2.5, 0, 0, 5, 0);
		var t2 = new CarTriangle(this.mesh, matBody, extrSettings, -2, 2.5, 0, 0, 0, 0, 0, 2.5, 0);
		var t3 = new CarTriangle(this.mesh, matBody, extrSettings, 3, 0, 0, 4, 2, 0, 3, 2, 0);
		var t4 = new CarTriangle(this.mesh, matBody, extrSettings, 9, 2, 0, 11, 0, 0, 11, 2, 0);
		var t5 = new CarTriangle(this.mesh, matBody, extrSettings, 8.5, 5, 0, 11, 5, 0, 11, 8, 0);
		var t6 = new CarTriangle(this.mesh, matBody, extrSettings, 18, 0, 0, 19, 2, 0, 18, 2, 0);
		var t7 = new CarTriangle(this.mesh, matBody, extrSettings, 22, 2, 0, 23, 0, 0, 23, 2, 0);
		var t8 = new CarTriangle(this.mesh, matBody, extrSettings, 23, 0, 0, 24, 5, 0, 23, 5, 0);
		var t9 = new CarTriangle(this.mesh, matBody, extrSettings, 23, 5, 0, 24, 5, 0, 23, 8, 0);
		//Creates the wheels.
		var rfw = new CarTorus(this.mesh, 2.5, 1.7, 10, 16, 5.5, -1, -2);
		var rrw = new CarTorus(this.mesh, 2.5, 1.7, 10, 16, 20.5, -1, -2);
		var lfw = new CarTorus(this.mesh, 2.5, 1.7, 10, 16, 5.5, -1, 10);
		var lrw = new CarTorus(this.mesh, 2.5, 1.7, 10, 16, 20.5, -1, 10);
		//Creates the axles.
		var cy1 = new CarCylinder(this.mesh, materialAxle, 0.5, 12, 8, 1,  5.5,  -1, 4, 90, 0,  0);
		var cy2 = new CarCylinder(this.mesh, materialAxle, 0.5, 12, 8, 1, 20.5,  -1, 4, 90, 0,  0);
		var cy3 = new CarCylinder(this.mesh, materialAxle, 0.5,  3, 8, 1,  5.5, 0.5, 4,  0, 0,  0);
		var cy4 = new CarCylinder(this.mesh, materialAxle, 0.5,  3, 8, 1, 20.5, 0.5, 4,  0, 0,  0);
		var cy5 = new CarCylinder(this.mesh, materialAxle, 0.5, 15, 8, 1,    3,   9, 4,  0, 0, 90);
		//Translates the geometry so the car rotates around it's center.
		var children = this.mesh.children
		for (var i = 0; i < children.length; i++) {
			children[i].geometry.translate(-10, 0, 0 );
		}
		//Positions the car.
		this.mesh.position.set(x, y, z);
		//Scales the car.
		this.mesh.scale.set(0.5, 0.5, 0.5);
		//Creates the CarPhysics object.
		this.physics = new CarPhysics();
		//Adds the car to the scene.
		scene.add(this.mesh);
		return this;
	}

	update(delta) {
		this.physics.update(delta);
	}

}

class CarTriangle {
	constructor(obj, material, extrSettings, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
		//Creates the side panel's geometry - triangle.
		var geometry = new THREE.Shape()
		geometry.moveTo(x1, y1)
		geometry.lineTo(x2, y2)
		geometry.lineTo(x3, y3)
		geometry.lineTo(x1, y1)
		//Extrudes the side panel to create volume.
		var geometry = new THREE.ExtrudeGeometry(geometry, extrSettings)
		//Creates the side panel's mesh.
		var mesh = new THREE.Mesh(geometry, material)
		obj.add(mesh)
		return mesh
	}
}
class CarSquare {
	constructor(obj, material, extrSettings, cubeL1, cubeL2, x, y) {
		//Creates the side panel's geometry - square.
		var geometry = new THREE.Shape()
		geometry.moveTo(x, y)
		geometry.lineTo(x, y + cubeL2)
		geometry.lineTo(x + cubeL1, y + cubeL2)
		geometry.lineTo(x + cubeL1, y)
		geometry.lineTo(x, y)
		//Extrudes the side panel to create volume.
		var extrudeGeometry = new THREE.ExtrudeGeometry(geometry, extrSettings)
		//Creates the side panel's mesh.
		var mesh = new THREE.Mesh(extrudeGeometry, material)
		obj.add(mesh)
		return mesh
	}
}
class CarTorus {
	constructor(obj, radius, tube, rSeg, tSeg, x, y, z) {
		var material = new THREE.MeshLambertMaterial({color:0x222222})
		//Creates the wheel's geometry - torus.
		var geometry = new THREE.TorusGeometry(radius, tube, rSeg, tSeg)
		//Creates the wheel's mesh.
		var mesh = new THREE.Mesh(geometry, material)
		//Positions the wheel.
		mesh.position.set(x, y, z)
		obj.add(mesh)
		return mesh
	}
}
class CarCylinder {
	constructor(obj, material, radius, h, rSeg, hSeg, x, y, z, rotx, roty, rotz) {
		//Creates the axel's geometry - cylinder.
		var geometry = new THREE.CylinderGeometry(radius, radius, h, rSeg, hSeg)
		//Creates the axel's mesh.
		var mesh = new THREE.Mesh(geometry, material)
		//Rotates the axle.
		mesh.rotation.set(rotx * TO_RADIANS, roty * TO_RADIANS, rotz * TO_RADIANS)
		//Positions the axle.
		mesh.position.set(x, y, z)
		obj.add(mesh)
		return mesh
	}
}
