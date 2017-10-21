class Track {
	constructor() {
		this.type = 'Track'
		this.mesh = new THREE.Object3D()

		//Sets how wide the track is.
		var trackWidth = 45
		//Sets the position of the curves that compose the track.
		var points = [
			{x:0, z:0}, {x:200, z:0},
			{x:280, z:80}, {x:800, z:80},
			{x:800, z:400}, {x:400, z:800},
			{x:200, z:800}, {x:240, z:600},
			{x:400, z:480}, {x:400, z:200},
			{x:140, z:200}, {x:140, z:540},
			{x:100, z:800}, {x:0, z:800},
			{x:0, z:600}, {x:80, z:480},
			{x:0, z:400}, {x:0, z:200},
			//{x:0, z:0},
		]
		//Offsets the points to be alligned with the camera and converts them
		//to be THREE.Vector3 to be used by THREE.CatmullRomCurve3.
		points = this.pointsOffset(points, 400)
		//Draws the track.
		var track = this.trackCreate(this.mesh, points, trackWidth, 0x13294B)
		//Adds the tori on the track.
		this.trackAddTorus(this.mesh, track.geometry.vertices)
		//Adds all to the scene.
		scene.add(this.mesh)
		return this
	}

	pointsOffset(points, offset) {
		var p2 = []
		for (var i = 0; i < points.length; i++) {
			var p = points[i]
			p2.push(new THREE.Vector3(p.x - offset, 0, p.z - offset))
		}
		return p2
	}
	trackCreate(obj, points, width, color) {
		//Creates a Curve to be the shape of the track defined by the points.
		var closedSpline = new THREE.CatmullRomCurve3(points)
		closedSpline.type = 'catmullrom'
		closedSpline.closed = true
		var shape = new THREE.Shape([
			new THREE.Vector2(0, -width / 2),
			new THREE.Vector2(0, width / 2),
			new THREE.Vector2(1, 0),
		])
		//Extrusion settings.
		//Steps represents the smoothness of the corners.
		//ExtrudePath extrudes along the curve defined above. This is what gives
		//the width to the track (instead of being a line).
		var extrudeSettings = {steps:2000, bevelEnabled:false, extrudePath:closedSpline}
		//Creates the track geometry.
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
		//Creates the track material.
		var material = new THREE.MeshBasicMaterial({color:color})
		var mesh = new THREE.Mesh(geometry, material)
		//Adds the mesh to the track class object.
		obj.add(mesh)
		return mesh
	}
	trackAddTorus(obj, vertices) {
		//Number of vertices in the tracks's outside line.
		var verticesOut = 4010
		//Number of vertices in the tracks's inside line.
		var verticesIn = 1992
		/*
		The spacing of the tori is different in the inside and outside
		because there are more outside vertices than inside ones. For the
		tori to be spaces equally on both sides of the track the spacing ratio
		needs to match the vertices amount ratio.
		*/
		//Step of the for loop for the tori to be added on the inside line.
		var inSpacing = 6
		//Step of the for loop for the tori to be added on the outside line.
		var outSpacing = parseInt(inSpacing / (verticesIn / verticesOut))
		//Adds the tires to the track's outside line.
		for (var i = 0; i < verticesOut; i += outSpacing)
			new Tire(obj, vertices[i])
		//Adds the tires to the track's inside line.
		for (var i = verticesOut; i < vertices.length; i += inSpacing)
			new Tire(obj, vertices[i])
	}
}

class Tire {
	constructor(obj, p) {
		this.type = 'Tire'
		this.mesh = new THREE.Object3D()
		//Creates the torus geometry.
		var geometry = new THREE.TorusGeometry(2.5, 0.8, 5, 16)
		//Creates the torus material.
		var material = new THREE.MeshBasicMaterial({color:0xAA1111})
		var mesh = new THREE.Mesh(geometry, material)
		//Positions the torus to be on the track point.
		mesh.position.set(p.x, p.y, p.z)
		//Rotates the torus to be horizontal.
		mesh.rotation.set(NINETY_DEGREES, 0, 0)
		//Adds the mesh to the track class object.
		this.mesh.add(mesh)
		obj.add(this.mesh)
	}
}
