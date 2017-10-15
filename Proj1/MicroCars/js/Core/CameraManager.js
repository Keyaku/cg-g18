class CameraManager {
	constructor() {
		this.cameraNumber = 1
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
		this.aspectRatio = this.windowWidth / this.windowHeight;
		this.near = 0.1;
		this.far = 2000;
		this.frustumSize = 1000;

		this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, this.near, this.far);
		console.log(this.camera)
		this.camera.position.set(0, 1000, 0);
		this.camera.lookAt(scene.position);

		controls = new THREE.OrbitControls(this.camera);
		controls.enableKeys = false

		this.updateCamera();
	}

	updateValues(w, h, aspect) {
		this.windowWidth = w;
		this.windowHeight = h;
		this.aspectRatio = aspect;
	}

	updateCamera() {
		if (this.cameraNumber == 1) {
			if (this.windowHeight > this.windowWidth) {
				this.camera.left   = - this.frustumSize / 2;
				this.camera.right  =   this.frustumSize / 2;
				this.camera.top    =   this.frustumSize * this.aspectRatio / 2;
				this.camera.bottom = - this.frustumSize * this.aspectRatio / 2;
			}
			else {
				this.camera.left   = - this.frustumSize * this.aspectRatio / 2;
				this.camera.right  =   this.frustumSize * this.aspectRatio / 2;
				this.camera.top    =   this.frustumSize / 2;
				this.camera.bottom = - this.frustumSize / 2;
			}
		}
		else {
			this.camera.aspect = renderer.getSize().width / renderer.getSize().height;
		}
		this.camera.updateProjectionMatrix();
	}

	changeGlobal() {
		//controls = new THREE.OrbitControls(this.camera);
		//controls.enableKeys = false
		this.updateCamera();
	}

	changeToOrthographic() {
		if (this.cameraNumber == 1) {
			return;
		}
		this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, this.near, this.far);
		this.camera.position.set(0, 1000, 0);
		this.cameraNumber = 1;
		this.camera.lookAt(scene.position);
		this.changeGlobal();
	}

	changeToPerspectiveWorld() {
		if (this.cameraNumber == 2) {
			return;
		}
		this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, this.near, this.far);
		this.camera.position.set(-20, 50, -25);
		this.cameraNumber = 2;
		this.camera.lookAt(scene.position);
		this.changeGlobal();
	}

	changeToPerspectiveFollow() {
		if (this.cameraNumber == 3) {
			return;
		}
		this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, this.near, this.far);
		this.camera.position.set(-20, 50, -25);
		this.camera.rotation.set(0, 3.14/2, 0);
		this.cameraNumber = 3;
		this.changeGlobal();
	}

	updateFollowCamera(carPosition, angle, axis) {
		if (this.cameraNumber != 3) {
			return;
		}
		var x = carPosition.x;
		var y = carPosition.y + 100;
		var z = carPosition.z;
		this.camera.position.set(x, y, z);
		this.camera.lookAt(carPosition)
	}
}