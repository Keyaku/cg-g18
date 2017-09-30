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
		var material = new THREE.MeshLambertMaterial({color:0x00ff00})
		var track = new THREE.Mesh(geometry, material)
		this.mesh.add(track)


		var vertices = track.geometry.vertices
		var verticesOut = 4010
		var verticesIn = 1992
		var inSpacing = 6
		var outSpacing = parseInt(inSpacing / (verticesIn / verticesOut))

		material = new THREE.MeshLambertMaterial({color:0xffffff, wireframe:true});		
		for (var i = 0; i < verticesOut; i += outSpacing) {
			var p = vertices[i]
			this.addTorus(this.mesh, material, p.x, p.y, p.z)
		}
		for (var i = verticesOut; i < vertices.length; i += inSpacing) {
			var p = vertices[i]
			this.addTorus(this.mesh, material, p.x, p.y, p.z)
		}
		
		scene.add(this.mesh)
		return this
	}

	addTorus(obj, material, x, y, z) {
		/*var geometry = new THREE.SphereGeometry(4, 10, 10);
		var meshb = new THREE.Mesh(geometry, material);
		meshb.position.set(x, y, z)
		obj.add(meshb)*/
		var m = new Tire(obj, 'red', x, y, z)
	}
}

class Tire {
	constructor(obj, color, x, y, z) {
		this.type = 'Tire'
		this.mesh = new THREE.Object3D()

		var geometry = new THREE.TorusGeometry(2, 0.5, 5, 15)
		var material = new THREE.MeshBasicMaterial()
		var mesh = new THREE.Mesh(geometry, material)

		if (color != 'white') mesh.material.color.set(color)
		this.mesh.add(mesh)
		this.mesh.position.set(x, y, z)
		this.mesh.rotation.set(3.14 / 2, 0, 0)
		obj.add(this.mesh)
	}
}