class Butter extends StaticBody {
	constructor(name=undefined, x=0, y=0, z=0, angle=undefined) {
		super();

		if (name == undefined) {
			name = "Butter" + this.uuid;
		}
		this.name = name;

		// FIXME: Apply different textures to different sides
		var tex = RemoteTextures.load('https://i.imgur.com/KKvp36A.png');
		var material = new THREE.MeshBasicMaterial({ map: tex });

		var size = new THREE.Vector3(7, 10, 20);
		this.mesh = new ButterBox(this, material, size);

		// Places it in a given position
		this.position.set(x, y, z);
		if (angle == undefined) {
			angle = Math.random() + 360 * TO_RADIANS;
		}
		this.rotateY(angle);

		scene.add(this);
		this.updateMatrix(); // Necessary since this is a StaticBody
		return this;
	}
}

class ButterBox extends THREE.Mesh {
	constructor(obj, material, size) {
		var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
		super(geometry, material);

		obj.add(this);
		return this;
	}
}
