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
				this.camera.top    =   this.frustumSize / this.aspectRatio / 2;
				this.camera.bottom = - this.frustumSize / this.aspectRatio / 2;
			}
			else {
				this.camera.left   = - this.frustumSize * this.aspectRatio / 2;
				this.camera.right  =   this.frustumSize * this.aspectRatio / 2;
				this.camera.top    =   this.frustumSize / 2;
				this.camera.bottom = - this.frustumSize / 2;
			}
		}

		/*
		else if (this.cameraNumber == 2) {
			this.camera.aspect = renderer.getSize().width / renderer.getSize().height;
			var dir = this.camera.getWorldDirection();
			var pos = this.camera.position;
			var halfBoardWidth = BOARD_WIDTH;
			var halfCameraFOV = 45;
			var D = halfBoardWidth / Math.tan(halfCameraFOV);
			D = D / this.aspectRatio
			D = D*0.5
			var displ = {x:dir.x*-D, y:dir.y*-D, z:dir.z*-D};
			var newPos = {x:0, y:pos.y, z:displ.z+halfBoardWidth};
			this.camera.position.set(newPos.x, newPos.y, newPos.z)
		}
		*/
		/*
		else if (this.cameraNumber == 2) {
			this.camera.aspect = renderer.getSize().width / renderer.getSize().height;
			var halfBoardWidth = HALF_BOARD_WIDTH;
			var dCameraBoard = 1000//this.camera.position.z - halfBoardWidth;
			var halfHorizontalFOV = Math.atan(halfBoardWidth / dCameraBoard);
			var verticalFOV = halfHorizontalFOV * 100 * this.aspectRatio;
			console.log(halfHorizontalFOV, this.aspectRatio)
			this.camera.fov = verticalFOV;
		}
		*/

		else {
			this.camera.aspect = renderer.getSize().width / renderer.getSize().height;
		}
		this.camera.updateProjectionMatrix();
	}

	changeGlobal() {
		this.updateCamera();
		//controls = new THREE.OrbitControls(this.camera);
		//controls.enableKeys = false
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
		this.camera.position.set(0, 600, 550);
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
		this.camera.rotation.set(0, 0, 0);
		this.cameraNumber = 3;
		this.changeGlobal();
	}

	updateFollowCamera(carPosition, carDirection) {
		if (this.cameraNumber != 3) {
			return;
		}
		var offsetX = Math.cos(NINETY_DEGREES) * carDirection.x - Math.sin(NINETY_DEGREES) * carDirection.z;
		var offsetZ = Math.sin(NINETY_DEGREES) * carDirection.x + Math.cos(NINETY_DEGREES) * carDirection.z;
		var x = carPosition.x + offsetX * -40;
		var y = carPosition.y + 30;
		var z = carPosition.z + offsetZ * -40;
		this.camera.position.set(x, y, z);
		this.camera.lookAt(carPosition);
		this.changeGlobal();
	}
}
