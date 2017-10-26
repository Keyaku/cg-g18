class Board extends THREE.Object3D {
	constructor(x=0, y=0, z=0, size=BOARD_WIDTH) {
		super();

		var grassTexture;
		var geometry      = new THREE.PlaneGeometry(size, size)
		var textureLoader = new THREE.TextureLoader();
												textureLoader.crossOrigin = 'anonymous'
				grassTexture  = textureLoader.load('https://i.imgur.com/J4sDs4b.jpg')

		this.type = 'Board';
		this.lambertMaterial = new THREE.MeshLambertMaterial({map:grassTexture, side: THREE.DoubleSide});
		this.phongMaterial = new THREE.MeshPhongMaterial({map:grassTexture, side: THREE.DoubleSide});

		this.mesh = new THREE.Mesh(geometry, this.phongMaterial);
		this.mesh.position.set(x, y, z);
		this.mesh.rotateX(90 * TO_RADIANS);

		this.add(this.mesh)

		scene.add(this);
		return this;
	}
	
}
