class CameraManager {
	constructor() {
		// Main CameraManager data
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
		this.aspectRatio = this.windowWidth / this.windowHeight;
		this.near = 0.1;
		this.far = 2000;
		this.frustumSize = BOARD_WIDTH;

		// Creating ALL cameras now
		this.cameraNumber = 0;
		this.cameras = [];
		var camera;

		// Creating debug camera: Orthographic + OrbitControls
		camera = this.createOrthographicCamera("Orbit Camera");
		camera.position.set(0, BOARD_WIDTH, 0);
		camera.lookAt(scene.position);
		controls = new THREE.OrbitControls(camera);
		controls.enableKeys = false;
		this.cameras.push(camera);

		// Creating 1st camera: Orthographic Top
		camera = this.createOrthographicCamera("Top Camera");
		camera.position.set(0, BOARD_WIDTH, 0);
		camera.lookAt(scene.position);
		this.cameras.push(camera);

		// Creating 2nd camera: Perspective World
		camera = this.createPerspectiveCamera("Table Camera");
		camera.position.set(0, 600, 550);
		camera.lookAt(scene.position);
		this.cameras.push(camera);

		// Creating 3rd camera: Perspective Chase
		camera = this.createPerspectiveCamera("Chase Camera");
		this.attachCameraTo(camera, car);
		camera.position.set(40, 30, 2); // FIXME: fix Car's position, THEN come back here and remove this line
		camera.lookAt(car.bounds.position); // FIXME
		this.cameras.push(camera);
	}

	createPerspectiveCamera(name="", fov=75) {
		var cam = new THREE.PerspectiveCamera(fov, this.aspectRatio, this.near, this.far);
		cam.name = name;
		return cam;
	}

	createOrthographicCamera(name="") {
		var cam = new THREE.OrthographicCamera(0, 0, 0, 0, this.near, this.far);
		cam.name = name;
		return cam;
	}

	attachCameraTo(camera, obj) {
		obj.add(camera);
		camera.position.set(0, 30, 40);
		camera.rotation.set(0, 0, 0);
		camera.lookAt(obj.getWorldPosition());
	}

	getCurrentCamera() {
		return this.cameras[this.cameraNumber];
	}

	updateValues(w, h, aspect) {
		this.windowWidth = w;
		this.windowHeight = h;
		this.aspectRatio = aspect;
	}

	// Updates
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

		else {
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
		}

		// Updating projection matrix (absolutely required)
		camera.updateProjectionMatrix();
	}

	update() {
		var toggled = {
			changeToOrthographic      : Input.is_pressed("1"),
			changeToPerspectiveWorld  : Input.is_pressed("2"),
			changeToPerspectiveFollow : Input.is_pressed("3"),
			changeToOrbit             : Input.is_pressed("0"),
		};

		// Iterate our toggled keypresses
		for (var key in toggled) {
			if (toggled[key]) {
				// if the given key was pressed, call the function with key's name
				this[key]();
			}
		}
	}

	changeTo(index) {
		if (0 <= index && index < this.cameras.length) {
			controls.enabled = index == 0;
			this.cameraNumber = index;
			this.updateCamera();
		}
	}

	changeToOrbit() {
		this.changeTo(0);
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
}
