/**
* Message is tied to CameraManager, as it requires an instanced CameraManager to work.
* It's an object to which we apply a texture.
*/
class MessageBox extends THREE.Mesh {
	constructor() {
		var geometry = new THREE.PlaneGeometry(512, 128);
		super(geometry);

		// Setting initial data
		this.visible = false;
		this.position.set(0, 0, -1);

		// Setting texture map
		this.material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
		this.textures = {};

		return this;
	}

	add(path) {
		// FIXME: use remote texture
		return this.textures[path] = LocalTextures.load(path);
	}

	apply(path) {
		// if path was already added, use it; else, load it to memory.
		var texture = path in this.textures ? this.textures[path] : this.add(path);
		this.material.map = texture;
		this.needsUpdate = true;
	}

	switchCamera(camera) {
		var oldCamera = this.parent;
		if (oldCamera != undefined) {
			oldCamera.remove(this);
		}
		camera.add(this);
	}
}
