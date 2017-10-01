class Track {
	constructor() {
		this.type = 'Track';
		this.mesh = new THREE.Object3D();

		// trackWidth takes an int value that defines how large the road is
		var trackWidth = 45;
		// These points are used to generate the track and it's aspect
		var points = [
			{x:0, z:0},
			{x:200, z:0},
			{x:280, z:80},
			{x:800, z:80},
			{x:800, z:400},
			{x:400, z:1000},
			{x:200, z:1000},
			{x:240, z:600},
			{x:400, z:480},
			{x:400, z:200},
			{x:140, z:200},
			{x:140, z:540},
			{x:100, z:1000},
			{x:0, z:1000},
			{x:0, z:600},
			{x:80, z:480},
			{x:0, z:400},
			{x:0, z:200},
			//{x:0, z:0},
		];
		points = this.pointsOffset(points, 400)
		points = this.pointsConvertToVector3(points)
		var track = this.trackCreate(this.mesh, points, trackWidth, 0x13294B)
		this.trackAddTorus(track.geometry.vertices)		

		scene.add(this.mesh)
		return this
	}

	pointsOffset(points, offset) {
		var p2 = []
		for (var i = 0; i < points.length; i++) {
			var p = points[i]
			p2.push({x: p.x - offset, z: p.z - offset})
		}
		return p2
	}
	pointsConvertToVector3(points) {
		var p2 = []
		for (var i = 0; i < points.length; i++) {
			var p = points[i]
			p2.push(new THREE.Vector3(p.x, 0, p.z))
		}
		return p2
	}
	trackCreate(obj, points, width, color) {
		var closedSpline = new THREE.CatmullRomCurve3(points)
		closedSpline.type = 'catmullrom'
		closedSpline.closed = true
		var shape = new THREE.Shape([
			new THREE.Vector2(0, -width / 2),
			new THREE.Vector2(0, width / 2),
			new THREE.Vector2(1, 0),
		]);
		var extrudeSettings = {steps:2000, bevelEnabled:false, extrudePath:closedSpline}
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		var material = new THREE.MeshLambertMaterial({color:color})
		var mesh = new THREE.Mesh(geometry, material)
		obj.add(mesh)
		return mesh
	}
	trackAddTorus(obj, vertices) {
		var verticesOut = 4010
		var verticesIn = 1992
		var inSpacing = 6
		var outSpacing = parseInt(inSpacing / (verticesIn / verticesOut))
		for (var i = 0; i < verticesOut; i += outSpacing)
			new Tire(obj, 'black', vertices[i])
		for (var i = verticesOut; i < vertices.length; i += inSpacing)
			new Tire(obj, 'white', vertices[i])
	}
}

class Tire {
	constructor(obj, color, p) {
		this.type = 'Tire'
		this.mesh = new THREE.Object3D()
		var material1 = new THREE.MeshPhongMaterial({
			color:0xAA1111,
			emissive:0xAA1111,
			specular:0xAA1111,
			shininess:2,
		});
		var material2 = new THREE.MeshPhongMaterial({
			color:0xFEFEFE,
			emissive:0xFEFEFE,
			specular:0x111111,
			shininess: 2,
		});
		var material

		// Generates a pile of three tires, two red and one white
		for (var j = 0; j < 3; j++) {
			var geometry = new THREE.TorusGeometry(2.5, 0.8, 5, 16)
			if (j % 2 == 0) material = material1
			else material = material2
			var mesh = new THREE.Mesh(geometry, material)
			mesh.position.set(p.x, p.y + j * 2, p.z)
			mesh.rotation.set(3.14 / 2, 0, 0)
			this.mesh.add(mesh)
		}
		obj.add(this.mesh)
	}
}
