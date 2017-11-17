class Game {
	constructor(numberOfLives=5, boardSize=BOARD_WIDTH) {
		// Setting pause value
		this.is_paused = false;
		this.is_gameover = false;

		// Defining immutable maximum values
		Object.defineProperty(this, "maximumLives", {
			value: numberOfLives-1, // XXX: show off one fewer life, and yet still living it
			enumerable: true,
			configurable: false,
		});

		// Setting the maximum amount of Car meshes as lives, while putting
		// them invisible first
		var carWidth = 20;
		var carLength = 10;
		var pos = {x:boardSize/2 + 500, y:0, z:-boardSize/2 + 100}

		this.carLiveReps = []
		for (var i = 0; i < this.maximumLives; i++) {
			var mesh = createCarMesh(carWidth, carLength);
			mesh.position.set(pos.x + 30*i, pos.y, pos.z);
			mesh.rotation.set(0, NINETY_DEGREES, 0);
			mesh.visible = false;

			this.carLiveReps.push(mesh);
			scene.add(mesh);
		}

		// Showing off our lives
		this.numberOfLives = 0;
		this.resetLives(numberOfLives);

		// FIXME: use textures of Power of 2
		pauseObj = this.createCubeMsg('text_pause.png');
		gameoverObj = this.createCubeMsg('text_gameover.png');

	}

	limitNumber(number) {
		return Math.min(this.maximumLives, Math.max(0, number));
	}

	/** @function resetLives
	** @param number: the exact number of lives to show
	*/
	resetLives(number) {
		number = this.limitNumber(this.numberOfLives + number);
		for (var i = 0; i < this.carLiveReps.length; i++) {
			this.carLiveReps[i].visible = i < number;
		}
		this.numberOfLives = number;
	}

	/** @function addLives
	** @param amount: the amount of lives to add upon our current numberOfLives
	*/
	addLives(amount) {
		this.resetLives(amount);
	}

	/** @function removeLives
	** @param amount: the amount of lives to remove upon our current numberOfLives
	*/
	removeLives(amount) {
		this.resetLives(-amount);
	}

	/** @function restart
	*/
	restart() {
		gameoverObj.visible = false;
		this.is_gameover = false;
		this.is_paused = false;
		this.resetLives(this.maximumLives);

		reloadScene();
	}

	getCurrentLives() { return this.numberOfLives; }
	getMaxLives() { return this.maximumLives; }

	playerDied() {
		if (this.gameOver()) {
			if (car != undefined) { car.free(); }
			return;
		}
		this.removeLives(1);
	}

	gameOver() {
		if (this.numberOfLives <= 0) {
			cameraManager.changeToOrthographic();
			this.is_gameover = true;
			this.togglePause();
			this.setMsgVisibility(gameoverObj, true);
			return true;
		}
		return false;
	}

	togglePause() {
		if (this.is_paused) {
			this.setMsgVisibility(pauseObj, false);
		}
		else if (!this.is_gameover) {
			this.setMsgVisibility(pauseObj, true);
		}
		this.is_paused = !this.is_paused;
	}

	createCubeMsg(textureUrl) {
		var geometry = new THREE.PlaneGeometry(512, 128);
		var texture = LocalTextures.load(textureUrl); // FIXME: use remote texture
		var material = new THREE.MeshBasicMaterial( {map:texture, side: THREE.DoubleSide} );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.visible = false;
		return mesh;
	}

	setMsgVisibility(obj, value) {
		var camera = cameraManager.getCurrentCamera();
		if (value) {
			camera.add(obj);
			obj.position.set(0, 0, -10);
		} else {
			camera.remove(obj);
		}
		obj.visible = value;
	}

	updateMsgCamera(oldCamera, camera) {
		if (this.is_gameover) {
			oldCamera.remove(gameoverObj);
			camera.add(gameoverObj);
		}
		else if (this.is_paused) {
			oldCamera.remove(pauseObj);
			camera.add(pauseObj);
		}
	}
}
