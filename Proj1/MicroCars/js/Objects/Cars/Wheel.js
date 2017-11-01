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
		[0, 0, this.capInnerLenght / 2],        // 8
	];

	// Pushing the vertices in
	for (var i in vertices) {
		var vertex = vertices[i];
		this.vertices.push(new THREE.Vector3(vertex[0], vertex[1], vertex[2]));
	}

	// Defining faces
	var faces = [
		// Define wheel's centercap front faces, which stand behind the spikes (+z) => (counter-clock wise)
		[0, 1, 2],        // A
		[0, 3, 1],        // B
    // Define wheel's centercap back faces, which have no spikes (-z) => (clock wise)
    [4, 6, 5],        // C
		[4, 5, 7],        // D
    // Define wheel's center cap left side faces (-x) => (ccw)
    [4, 0, 2],        // E
    [4, 2, 6],        // F
    [4, 7, 3],        // G
    [4, 3, 0],        // H
    // Define wheel's center cap right side faces (+x) => (ccw)
    [6, 2, 1],        // I
    [6, 1, 5],        // J
    [1, 3, 5],        // K
    [3, 7, 5],         // L
    // Define spike faces, faces are in -x and +x => (ccw)
    [8, 1, 2],        // M
    [8, 3, 1],        // N
    [8, 0, 3],        // O
    [8, 2, 0]         // P
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
