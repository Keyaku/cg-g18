class Board {
  //constructor(obj, x, y, z)
	constructor(x, y, z) {
		this.type = 'Board';
		this.mesh = new THREE.Object3D();
    var geometry = new THREE.BoxGeometry(550, 550, 50);
    var material = new THREE.MeshLambertMaterial({
          color: 0x003300,
          map: new THREE.TextureLoader().load("textures/grass.jpg")
    });
    var board = new THREE.Mesh(geometry, material);
    scene.add(board);
		this.mesh.add(board);
		this.mesh.position.set(x, y, z);
		//obj.add(this.mesh);
    scene.add(this.mesh);
		
		return this.mesh;
	}
}
