class Board extends THREE.Mesh {
	constructor(x=0, y=0, z=0, size=BOARD_WIDTH) {
		var grassTexture;
		var geometry      = new THREE.PlaneGeometry(size, size)
		var textureLoader = new THREE.TextureLoader();
												textureLoader.crossOrigin = 'anonymous'
				grassTexture  = textureLoader.load('https://i.imgur.com/J4sDs4b.jpg')

		super(geometry);
		this.type = 'Board';
		this.lambertMaterial = new THREE.MeshLambertMaterial({map:grassTexture, side: THREE.DoubleSide});
		this.phongMaterial = new THREE.MeshPhongMaterial({map:grassTexture, side: THREE.DoubleSide});

		this.material = this.lambertMaterial;
		this.position.set(x, y, z);
		this.rotateX(90 * TO_RADIANS);

		scene.add(this);
		return this;
	}

}
