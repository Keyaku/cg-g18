class Board {
  //constructor(obj, x, y, z)
	constructor(x, y, z) {
		this.type = 'Board';
		this.mesh = new THREE.Object3D();

		var textureLoader = new THREE.TextureLoader();
		// Set crossOrigin to require no credentials
		textureLoader.crossOrigin = 'anonymous';
		// Loads image that generates the texture from a server with the right headers, locally does not work
		var grassTexture = textureLoader.load('https://i.imgur.com/KzAd9fi.png');
		var material = new THREE.MeshBasicMaterial({map: grassTexture});
		var geometry = new THREE.BoxGeometry(550, 550, 5);
		var board = new THREE.Mesh(geometry, material);

		scene.add(board);
		this.mesh.add(board);
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh); //obj.add(this.mesh);
		return this.mesh;
	}
}

class Tire {
	//constructor(obj, x, y, z)
	constructor(x, y, z, color) {
		this.type = 'Tire';
		this.mesh = new THREE.Object3D();

		var geometry = new THREE.TorusGeometry(2, 0.5, 5, 15);
		var material = new THREE.MeshBasicMaterial();
		var tire = new THREE.Mesh(geometry, material);

		// Condition works with color name name or HEX Value, ie: 'red' or 0xFF0000
		if (color != 'white') {
			tire.material.color.set(color);
		}

		scene.add(tire);
		this.mesh.add(tire);
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh); //obj.add(this.mesh);
		return this.mesh;
	}
}
