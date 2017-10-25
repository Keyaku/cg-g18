class CameraManager {
	constructor() {
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
		this.aspectRatio = this.windowWidth / this.windowHeight;
		this.near = 0.1;
		this.far = 2000;
		this.frustumSize = 1000;

		// Creating ALL cameras now
		this.cameraNumber = 0;
		this.cameras = [];
		var camera;

		// Creating debug camera: Orthographic + OrbitControls
		camera = new THREE.OrthographicCamera(0, 0, 0, 0, this.near, this.far);
		camera.position.set(0, 1000, 0);
		camera.lookAt(scene.position);
		controls = new THREE.OrbitControls(camera);
		controls.enableKeys = false;
		this.cameras.push(camera);

		// Creating 1st camera: Orthographic Top
		camera = new THREE.OrthographicCamera(0, 0, 0, 0, this.near, this.far);
		camera.position.set(0, 1000, 0);
		camera.lookAt(scene.position);
		this.cameras.push(camera);

		// Creating 2nd camera: Perspective World
		camera = new THREE.PerspectiveCamera(75, this.aspectRatio, this.near, this.far);
		camera.position.set(0, 600, 550);
		camera.lookAt(scene.position);
		this.cameras.push(camera);

		// Creating 3rd camera: Perspective Chase
		camera = new THREE.PerspectiveCamera(75, this.aspectRatio, this.near, this.far);
		camera.position.set(-20, 50, -25);
		camera.rotation.set(0, 0, 0);
		camera.lookAt(car.position);
		this.cameras.push(camera);

		// Switching to our initial camera
		this.changeToOrthographic();
	}

	getCurrentCamera() {
		return this.cameras[this.cameraNumber];
	}

	updateValues(w, h, aspect) {
		this.windowWidth = w;
		this.windowHeight = h;
		this.aspectRatio = aspect;
	}

	updateCamera() {
		var camera = this.getCurrentCamera();
		if (camera instanceof THREE.OrthographicCamera) {
			if (this.windowHeight > this.windowWidth) {
				camera.left   = - this.frustumSize / 2;
				camera.right  =   this.frustumSize / 2;
				camera.top    =   this.frustumSize / this.aspectRatio / 2;
				camera.bottom = - this.frustumSize / this.aspectRatio / 2;
			}
			else {
				camera.left   = - this.frustumSize * this.aspectRatio / 2;
				camera.right  =   this.frustumSize * this.aspectRatio / 2;
				camera.top    =   this.frustumSize / 2;
				camera.bottom = - this.frustumSize / 2;
			}
		}

		/*
		else if (this.cameraNumber == 2) {
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
			var dir = camera.getWorldDirection();
			var pos = camera.position;
			var halfBoardWidth = BOARD_WIDTH;
			var halfCameraFOV = 45;
			var D = halfBoardWidth / Math.tan(halfCameraFOV);
			D = D / this.aspectRatio
			D = D*0.5
			var displ = {x:dir.x*-D, y:dir.y*-D, z:dir.z*-D};
			var newPos = {x:0, y:pos.y, z:displ.z+halfBoardWidth};
			camera.position.set(newPos.x, newPos.y, newPos.z)
		}
		*/
		/*
		else if (this.cameraNumber == 2) {
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
			var halfBoardWidth = HALF_BOARD_WIDTH;
			var dCameraBoard = 1000//camera.position.z - halfBoardWidth;
			var halfHorizontalFOV = Math.atan(halfBoardWidth / dCameraBoard);
			var verticalFOV = halfHorizontalFOV * 100 * this.aspectRatio;
			console.log(halfHorizontalFOV, this.aspectRatio)
			camera.fov = verticalFOV;
		}
		*/

		else {
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
		}

		// Updating projection matrix (absolutely required)
		camera.updateProjectionMatrix();
	}

	changeTo(index) {
		if (0 <= index && index < this.cameras.length) {
			controls.enabled = index == 0;
			this.cameraNumber = index;
			this.updateCamera();
		}
	}

	changeToOrthographic() {
		this.changeTo(1);
	}

	changeToPerspectiveWorld() {
		this.changeTo(2);
	}

	changeToPerspectiveFollow() {
		this.changeTo(3);
	}

	updateFollowCamera(position, direction) {
		if (this.cameraNumber != 3) {
			return;
		}
		var camera = this.getCurrentCamera();
		var offsetX = Math.cos(NINETY_DEGREES) * direction.x - Math.sin(NINETY_DEGREES) * direction.z;
		var offsetZ = Math.sin(NINETY_DEGREES) * direction.x + Math.cos(NINETY_DEGREES) * direction.z;
		var x = position.x + offsetX * -40;
		var y = position.y + 30;
		var z = position.z + offsetZ * -40;
		camera.position.set(x, y, z);
		camera.lookAt(position);
		this.updateCamera();
	}
}
