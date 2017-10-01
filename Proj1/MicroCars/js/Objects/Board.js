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
		var geometry = new THREE.BoxGeometry(1000, 1000, 5)
		var mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z);
		// rotates the cube along the X axis by 90º
		mesh.rotation.x = 3.14 / 2;
		this.mesh.add(mesh)

		scene.add(this.mesh);
		return this;
	}
}
