class Wheel extends THREE.Geometry {
  constructor(wheelradius, depth) {
    super();
    this.wheelRadius      = wheelradius;
    this.pcr              = wheelradius * 0.25;
    this.bladeLenght      = wheelradius * 0.75;
    this.bladeWidth       = wheelradius / 6;
    this.capInnerLenght   = Math.sqrt(2*(this.bladeWidth*this.bladeWidth))

    // Defining the geometry's vertices
	var vertices = [
		// Define wheel's centercap points and spike point
		[-this.capInnerLenght, 0, 0],       // 0
		[this.capInnerLenght, 0, 0],        // 1
		[0, this.capInnerLenght, 0],        // 2
		[0, -this.capInnerLenght, 0],       // 3
		[-this.capInnerLenght, 0, -depth],  // 4
		[this.capInnerLenght, 0, -depth],   // 5
		[0, this.capInnerLenght, -depth],   // 6
		[0, -this.capInnerLenght, -depth],  // 7
		[0, 0, this.capInnerLenght],        // 8
	];

	// Pushing the vertices in
	for (var i in vertices) {
		var vertex = vertices[i];
		this.vertices.push(new THREE.Vector3(vertex[0], vertex[1], vertex[2]));
	}

	// Defining faces
	var faces = [
		// Define wheel's centercap front and back faces
		[0, 2, 3],        // 0
		[1, 2, 3],        // 1
		[4, 6, 7],        // 2
		[5, 6, 7],        // 3
		// Define wheel's centercap lateral faces left to right, top to bottom
		[2, 4, 6],        // 4
		[0, 2, 4],        // 5
		[4, 0, 7],        // 6
		[0, 3, 7],        // 7
		[3, 5, 7],        // 8
		[3, 4, 5],        // 9
		[2, 5, 6],        // 10
		[2, 4, 5],        // 11
		// Define spike faces
		[0, 2, 8],        // 12
		[0, 3, 8],        // 13
		[2, 4, 8],        // 14
		[3, 4, 8],        // 15
	];

	// Pushing the faces in
	for (var i in faces) {
		var face = faces[i];
		this.faces.push(new THREE.Face3(face[0], face[1], face[2]));
	}

    this.computeFaceNormals();
    this.computeVertexNormals();
    return this;
  }
}
