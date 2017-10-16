class Board {
	constructor(x=0, y=0, z=0, size=BOARD_WIDTH) {
		this.type = 'Board';
		this.mesh = new THREE.Object3D();

		var textureLoader = new THREE.TextureLoader();
		//Set crossOrigin to require no credentials.
		textureLoader.crossOrigin = 'anonymous'
		//Loads the image from a server. (locally DOESN'T work).
		var grassTexture = textureLoader.load('https://i.imgur.com/J4sDs4b.jpg')
		var material = new THREE.MeshBasicMaterial({map:grassTexture, side: THREE.DoubleSide})
		var geometry = new THREE.PlaneGeometry(size, size)
		var mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z);
		mesh.rotateX(90 * TO_RADIANS);
		this.mesh.add(mesh)

		scene.add(this.mesh);
		return this;
	}
}
