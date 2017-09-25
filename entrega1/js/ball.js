class Ball {
	constructor(x, y, z) {
		this.type = 'Table';
		this.mesh = new THREE.Object3D();
		this.mesh.userData = {jumping:true, step:0};

		var material = new THREE.MeshLambertMaterial({color:0xF3FFE2});
		var geometry = new THREE.SphereGeometry(4, 10, 10);
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh.add(mesh);
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
		return this.mesh;
	}
}