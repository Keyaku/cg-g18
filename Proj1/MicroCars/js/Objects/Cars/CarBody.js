class CarBody extends THREE.Geometry {
	constructor(carLength, carWidth) {
		super();
		var geometry = new THREE.Geometry();
		var geometry2 = new THREE.Geometry();
		var geometry3 = new THREE.Geometry();
		var material = new THREE.MeshBasicMaterial({color : 0xff0000});
		var carDistanceFromGround = 5;
		var carBodyHeight = 5;
		var lengthDiv = carLength / 3;
		var vertices = [
				{x: 0, y: carDistanceFromGround, z: 0}, //A - 0
				{x: 0, y: carDistanceFromGround, z: carWidth}, //B - 1
				{x: lengthDiv * 1, y: carDistanceFromGround, z: carWidth}, //C - 2
				{x: lengthDiv * 1, y: carDistanceFromGround, z: 0}, //D - 3
				{x: lengthDiv * 2, y: carDistanceFromGround, z: 0}, //E - 4
				{x: lengthDiv * 2, y: carDistanceFromGround, z: carWidth}, //F - 5
				{x: lengthDiv * 3, y: carDistanceFromGround, z: carWidth}, //G - 6
				{x: lengthDiv * 3, y: carDistanceFromGround, z: 0} //H - 7
		];
		for (var i = 0; i < vertices.length; i++) {
			var p = vertices[i];
			geometry.vertices.push(new THREE.Vector3(p.x, p.y + carBodyHeight, p.z));
			geometry2.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
			geometry3.vertices.push(new THREE.Vector3(p.x, p.y + carBodyHeight, p.z));
			geometry3.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
		}
		//Top Panel
		geometry.faces.push(new THREE.Face3(0, 2, 3));
		geometry.faces.push(new THREE.Face3(0, 1, 2));
		geometry.faces.push(new THREE.Face3(3, 5, 4));
		geometry.faces.push(new THREE.Face3(3, 2, 5));
		geometry.faces.push(new THREE.Face3(4, 6, 7));
		geometry.faces.push(new THREE.Face3(4, 5, 6));
		//Bottom Panel
		geometry2.faces.push(new THREE.Face3(0, 3, 2));
		geometry2.faces.push(new THREE.Face3(0, 2, 1));
		geometry2.faces.push(new THREE.Face3(3, 4, 5));
		geometry2.faces.push(new THREE.Face3(3, 5, 2));
		geometry2.faces.push(new THREE.Face3(4, 7, 6));
		geometry2.faces.push(new THREE.Face3(4, 6, 5));
		//Side Panel
		geometry3.faces.push(new THREE.Face3(1, 6, 7));
		geometry3.faces.push(new THREE.Face3(1, 0, 6));
		geometry3.faces.push(new THREE.Face3(7, 8, 9));
		geometry3.faces.push(new THREE.Face3(7, 6, 8));
		geometry3.faces.push(new THREE.Face3(9, 14, 15));
		geometry3.faces.push(new THREE.Face3(9, 8, 14));
		//Side Panel
		geometry3.faces.push(new THREE.Face3(3, 5, 4));
		geometry3.faces.push(new THREE.Face3(3, 4, 2));
		geometry3.faces.push(new THREE.Face3(5, 11, 10));
		geometry3.faces.push(new THREE.Face3(5, 10, 4));
		geometry3.faces.push(new THREE.Face3(11, 13, 12));
		geometry3.faces.push(new THREE.Face3(11, 12, 10));
		//Front Panel
		geometry3.faces.push(new THREE.Face3(1, 3, 2));
		geometry3.faces.push(new THREE.Face3(1, 2, 0));
		//Back Panel
		geometry3.faces.push(new THREE.Face3(13, 15, 14));
		geometry3.faces.push(new THREE.Face3(13, 14, 12));
		//Merging all the geometries.
		THREE.GeometryUtils.merge(geometry, geometry2);
		THREE.GeometryUtils.merge(geometry, geometry3);
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		
		//Creating and merging the wheels.
		return geometry;

	}
}