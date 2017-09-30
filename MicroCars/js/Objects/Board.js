class Board {
	constructor(x, y, z) {
		this.type = 'Board';
		this.mesh = new THREE.Object3D();

		var textureLoader = new THREE.TextureLoader();
		//Set crossOrigin to require no credentials.
		textureLoader.crossOrigin = 'anonymous'
		//Loads the image from a server. (locally DOESN'T work).
		var grassTexture = textureLoader.load('https://i.imgur.com/J4sDs4b.jpg')
		var material = new THREE.MeshBasicMaterial({map:grassTexture})
		var geometry = new THREE.BoxGeometry(1200, 1200, 5)
		var mesh = new THREE.Mesh(geometry, material)

		var floorSide = 1400
		mesh.position.set(floorSide / 2 - 250, -3, floorSide / 2 - 175)
		mesh.rotation.x = 3.14 / 2;
		this.mesh.add(mesh)

		scene.add(this.mesh);
		return this;
	}
}
