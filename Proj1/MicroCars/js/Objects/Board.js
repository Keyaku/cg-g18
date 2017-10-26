class Board {
	constructor(x=0, y=0, z=0, size=BOARD_WIDTH) {
		var grassTexture;
		var textureLoader = new THREE.TextureLoader();
												textureLoader.crossOrigin = 'anonymous'
				grassTexture  = textureLoader.load('https://i.imgur.com/J4sDs4b.jpg')

		this.type = 'Board';
		this.lambertMaterial = new THREE.MeshLambertMaterial({map:grassTexture, side: THREE.DoubleSide});
		this.phongMaterial = new THREE.MeshPhongMaterial({map:grassTexture, side: THREE.DoubleSide});
		this.mesh = new THREE.Object3D();

		var material = new THREE.MeshLambertMaterial({map:grassTexture, side: THREE.DoubleSide})
		var geometry = new THREE.PlaneGeometry(size, size)
		var mesh = new THREE.Mesh(geometry, this.phongMaterial);

		mesh.position.set(x, y, z);
		mesh.rotateX(90 * TO_RADIANS);
		this.mesh.add(mesh)

		scene.add(this.mesh);
		return this;
	}

	switchMaterials() {
		console.log('entered board switchMaterials')
		if (this.mesh.material instanceof THREE.MeshPhongMaterial) {
			this.mesh.material = this.lambertMaterial;
			console.log('board switched to lambert')
		} else {
			this.mesh.material = this.phongMaterial;
			console.log('board switched to phong')
		}
	}
}
