class Butter {
	constructor(name, x, y, z) {
		this.type = 'Butter';
		this.mesh = new THREE.Object3D();
		this.mesh.name = name;
		// FIXME: Apply different textures to different sides
		var tex = TextureLoader.load('butter_side.png');
		var material = new THREE.MeshBasicMaterial({ map: tex });

		var pos = new THREE.Vector3(0, 0, 0)
		var size = new THREE.Vector3(7, 10, 20);
		new ButterBox(this.mesh, material, pos, size);

		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
		return this.mesh;
	}
}

class ButterBox {
	constructor(obj, material, pos, size) {
		this.type = 'ButterBox';

		var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.copy(pos);

		obj.add(mesh);
		return mesh;
	}
}
