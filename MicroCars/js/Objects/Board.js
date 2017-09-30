class Board {
	constructor(x, y, z) {
		this.type = 'Board';
		this.mesh = new THREE.Object3D();

		/*
		var textureLoader = new THREE.TextureLoader();
		//Set crossOrigin to require no credentials.
		textureLoader.crossOrigin = 'anonymous'
		//Loads the image from a server. (locally DOESN'T work).
		var grassTexture = textureLoader.load('https://i.imgur.com/KzAd9fi.png')
		var material = new THREE.MeshBasicMaterial({map:grassTexture})
		var geometry = new THREE.BoxGeometry(550, 550, 5)
		var board = new THREE.Mesh(geometry, material)
		*/
		var floorSide = 700
		var geometry = new THREE.PlaneGeometry(floorSide, floorSide, 8, 8)
		var material = new THREE.MeshPhongMaterial({color:0x6d6d6d, side:THREE.DoubleSide})
		var mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(floorSide / 2 - 200, -5, floorSide / 2 - 100)
		mesh.rotation.x = 3.14 / 2;
		this.mesh.add(mesh)

		scene.add(this.mesh);
		return this;
	}
}

