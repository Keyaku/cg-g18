class Track {
	constructor() {
		this.type = 'Track';
		this.mesh = new THREE.Object3D();

		var trackWidth = 20;
		var points = [
			{x:0, z:0},
			{x:100, z:0},
			{x:140, z:40},
			{x:400, z:40},
			{x:400, z:200},
			{x:200, z:500},
			{x:100, z:500},
			{x:120, z:300},
			{x:200, z:240},
			{x:200, z:100},
			{x:70, z:100},
			{x:70, z:270},
			{x:50, z:500},
			{x:0, z:500},
			{x:0, z:300},
			{x:40, z:240},
			{x:0, z:200},
			{x:0, z:100},
			//{x:0, z:0},
		];		
		for (var i = 0; i < points.length; i++) {
			var p = points[i]
			points[i] = new THREE.Vector3(p.x, 0, p.z)
		}
		var closedSpline = new THREE.CatmullRomCurve3(points)
		closedSpline.type = 'catmullrom'
		closedSpline.closed = true

		var shape = new THREE.Shape([
			new THREE.Vector2(0, -trackWidth / 2),
			new THREE.Vector2(0, trackWidth / 2),
			new THREE.Vector2(1, 0),
		]);
		var extrudeSettings = {steps:2000, bevelEnabled:false, extrudePath:closedSpline}
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		var material = new THREE.MeshLambertMaterial({color:0x13294B})
		var track = new THREE.Mesh(geometry, material)
		this.mesh.add(track)

		var vertices = track.geometry.vertices
		var verticesOut = 4010
		var verticesIn = 1992
		var inSpacing = 6
		var outSpacing = parseInt(inSpacing / (verticesIn / verticesOut))
		for (i = 0; i < verticesOut; i += outSpacing)
			new Tire(this.mesh, 'black', vertices[i])
		for (i = verticesOut; i < vertices.length; i += inSpacing)
			new Tire(this.mesh, 'white', vertices[i])
		
		scene.add(this.mesh)
		return this
	}
}

class Tire {
	constructor(obj, color, p) {
		this.type = 'Tire'
		this.mesh = new THREE.Object3D()

		var material1 = new THREE.MeshPhongMaterial({
			color:0xaa1111,
			emissive:0xaa1111,
			specular:0x111111,
			shininess:10,
		});
		var material2 = new THREE.MeshPhongMaterial({
			color:0x161616,
			emissive:0x161616,
			specular:0x111111,
			shininess:10,
		});
		var material
		for (var j = 0; j < 4; j++) {
			var geometry = new THREE.TorusGeometry(2.5, 1, 5, 16)	
			if (j % 2 == 0) material = material1
			else material = material2
			var mesh = new THREE.Mesh(geometry, material)
			mesh.position.set(p.x, p.y + j * 2, p.z)
			mesh.rotation.set(3.14 / 2, 0, 0)
			this.mesh.add(mesh)
		}

		
		//var material = new THREE.MeshBasicMaterial()
		//var material = new THREE.MeshLambertMaterial({color:0xffffff, wireframe:false});
		
		//if (color != 'white') mesh.material.color.set(color)
		obj.add(this.mesh)
	}
}