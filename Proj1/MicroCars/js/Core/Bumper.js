class BumperGeometry extends THREE.Geometry {
	constructor(width=1, height=1, depth=1) {
		super();
		this.type = 'BumperGeometry';

		/* The objective of these custom faces is to interpolate between vertices. */
		var halfWidth = width / 2;
		var halfDepth = depth / 2;
		var quarterDepth = depth / 4;

		// Creating boxes
		this.createBox(width, height, quarterDepth); // main body
		this.createBox(width*0.05, height, depth, -halfWidth, 0, -quarterDepth); // left wing
		this.createBox(width*0.05, height, depth,  halfWidth, 0, -quarterDepth); // right wing
		// TODO: triangles

		// Update our Geometry
		this.mergeVertices();
		this.computeFaceNormals();
		this.computeVertexNormals();
	}

	/**
	* @method createBox: Creates a plane of a given width, height and depth
	* @argument u:
	* @argument v:
	* @argument w:
	* @argument udir:
	* @argument vdir:
	*/
	createPlane(u, v, w, udir, vdir, width, height, depth, xOrig=0, yOrig=0, zOrig=0) {
		var halfWidth  = width / 2;
		var halfHeight = height / 2;
		var halfDepth  = depth / 2;

		// Creating vertices
		for (var iy = 0; iy < 2; iy++) { // 2 = number of segments
			var y = iy * height - halfHeight;

			for (var ix = 0; ix < 2; ix++) { // 2 = number of segments
				var x = ix * width - halfWidth;

				var vertex = new THREE.Vector3();
				/* Defining box's dimensions */
				vertex[u] = x * udir;
				vertex[v] = y * vdir;
				vertex[w] = halfDepth;

				/* Defining box's position */
				vertex.x += xOrig;
				vertex.y += yOrig;
				vertex.z += zOrig;
				this.vertices.push(vertex);
			}
		}

		// Creating faces
		var numVertices = this.vertices.length;
		var a = numVertices - 1;
		var d = numVertices - 2;
		var b = numVertices - 3;
		var c = numVertices - 4;

		this.faces.push(new THREE.Face3(a, b, d));
		this.faces.push(new THREE.Face3(b, c, d));
	}

	/**
	* @method createBox: Creates a box of a given width, height and depth
	*/
	createBox(width, height, depth, x=0, y=0, z=0) {
		// Arguments to send to createPlane()
		var attributes = [
			[ 'x', 'y', 'z', -1, -1, width, height, -depth  ], // ABCD - front
			[ 'x', 'y', 'z',  1, -1, width, height,  depth  ], // BHGC - back
			[ 'x', 'z', 'y',  1,  1, width,  depth,  height ], // AEHB - top
			[ 'x', 'z', 'y',  1, -1, width,  depth, -height ], // DMGC - bottom
			[ 'z', 'y', 'x',  1, -1, depth, height, -width  ], // AEFD - side left
			[ 'z', 'y', 'x', -1, -1, depth, height,  width  ], // EGHM - side right
		];

		for (var i in attributes) {
			/* Creating planes with the arguments defined above + (x, y, z) */
			this.createPlane.apply(this, attributes[i].concat([x, y, z]));
		}
	}
}
