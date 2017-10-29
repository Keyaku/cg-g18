class Wheel extends THREE.Geometry {
  constructor(wheelradius, depth) {
    super();
    this.wheelRadius      = wheelradius;
    this.pcr              = wheelradius * 0.25;
    this.bladeLenght      = wheelradius * 0.75;
    this.bladeWidth       = wheelradius / 6;
    this.capInnerLenght   = Math.sqrt(2*(this.bladeWidth*this.bladeWidth))

    // Define wheel's centercap points and spike point
    this.vertices.push(new THREE.Vector3(-this.capInnerLenght, 0, 0));     // 0
    this.vertices.push(new THREE.Vector3(this.capInnerLenght, 0, 0));      // 1
    this.vertices.push(new THREE.Vector3(0, this.capInnerLenght, 0));      // 2
    this.vertices.push(new THREE.Vector3(0, -this.capInnerLenght, 0));     // 3

    this.vertices.push(new THREE.Vector3(-this.capInnerLenght, 0, -depth)); // 4
    this.vertices.push(new THREE.Vector3(this.capInnerLenght, 0, -depth));  // 5
    this.vertices.push(new THREE.Vector3(0, this.capInnerLenght, -depth));  // 6
    this.vertices.push(new THREE.Vector3(0, -this.capInnerLenght, -depth)); // 7

    this.vertices.push(new THREE.Vector3(0, 0, this.capInnerLenght)); // 8
    // Define wheel's centercap front and back faces
    this.faces.push(new THREE.Face3(0, 2, 3));
    this.faces.push(new THREE.Face3(1, 2, 3));
    this.faces.push(new THREE.Face3(4, 6, 7));
    this.faces.push(new THREE.Face3(5, 6, 7));
    // Define wheel's centercap lateral faces left to right, top to bottom
    this.faces.push(new THREE.Face3(2, 4, 6));
    this.faces.push(new THREE.Face3(0, 2, 4));
    this.faces.push(new THREE.Face3(4, 0, 7));
    this.faces.push(new THREE.Face3(0, 3, 7));
    this.faces.push(new THREE.Face3(3, 5, 7));
    this.faces.push(new THREE.Face3(3, 4, 5));
    this.faces.push(new THREE.Face3(2, 5, 6));
    this.faces.push(new THREE.Face3(2, 4, 5));
    // Define spike faces
    this.faces.push(new THREE.Face3(0, 2, 8));
    this.faces.push(new THREE.Face3(0, 3, 8));
    this.faces.push(new THREE.Face3(2, 4, 8));
    this.faces.push(new THREE.Face3(3, 4, 8));

    this.computeFaceNormals();
    this.computeVertexNormals();
    return this;
  }
}
