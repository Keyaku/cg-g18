class Butter extends StaticBody {
	constructor(name=undefined, x=0, y=0, z=0, angle=undefined) {
		var size = new THREE.Vector3(7, 10, 20);

		if (name == undefined) {
			name = "Butter" + this.uuid;
		}

		if (angle == undefined) {
			angle = Math.random() + 360 * TO_RADIANS;
		}

		super();

		this.type = "Butter";
		this.name = name;
		this.mesh = new ButterBox(this, size);
		// Places it in a given position
		this.position.set(x, y, z);
		this.rotateY(angle);
		this.scale.set(2,2,2);
		// Adding our Bounds
		this.bounds = new BoundingSphere(this.mesh);
		this.add(this.bounds);

		scene.add(this);

		this.updateMatrix(); // Necessary since this is a StaticBody

		return this;
	}
}

class ButterBox extends THREE.Mesh {
	constructor(obj, size) {
		var tex = RemoteTextures.load('https://i.imgur.com/KKvp36A.png');
		var geometry = new THREE.BoxGeometry(size.x, size.y, size.z);

		super(geometry);
		createMaterials(this, { map: tex });

		this.position.setY(10/2);

		obj.add(this);

		return this;
	}
}
