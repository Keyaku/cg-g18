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

		pauseObj = this.createCubeMsg('https://pbs.twimg.com/profile_images/551468212349845505/NJrwfoib.jpeg');
		gameoverObj = this.createCubeMsg('https://www.walldevil.com/wallpapers/w01/556098-brown-game-over-text.jpg');

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
		this.togglePause();
		this.resetLives(this.maximumLives);
		if (car == undefined) {
			car = new Car(100, 0, -325);
			var chaseCamera = cameraManager.cameras[3];
			cameraManager.attachCameraTo(chaseCamera, car)
		}
		else {
			car.position.set(100, 0, -325);
			car.rotation.set(0, 0, 0)
			car.velocity = 0;
		}
		var oranges = ['Orange1', 'Orange2', 'Orange3'];
		for (var i = 0; i < oranges.length; i++) {
			var name = oranges[i]
			var obj = getEdible(name)
			var heading;
			obj.visible = false;
			var x = Math.random() < 0.5 ? -1 : 1;
			var z = Math.random() < 0.5 ? -1 : 1;
			var maskDirection = Math.random();
			var vector = generateSpawnLocation();
			vector.setY(obj.bounds.radius);
			if (0 <= maskDirection && maskDirection < 0.33) {
				heading = new THREE.Vector3(x, 0, z);
			} else if (0.33 <= maskDirection && maskDirection < 0.66){
				heading = new THREE.Vector3(x, 0, 0);
			} else {
				heading = new THREE.Vector3(0, 0, z);
			}
			obj.velocity = ORANGE_VELOCITY
			obj.position.copy(vector);
			obj.mesh.rotation.set(0, 0, 0);
			obj.heading = heading.normalize();
			obj.visible = true;
		}
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
			this.showCubeMsg(gameoverObj);
			return true;
		}
		return false;
	}

	togglePause() {
		if (this.is_paused) {
			pauseObj.visible = false;
		}
		else if (!this.is_gameover) {
			this.showCubeMsg(pauseObj);
		}
		this.is_paused = !this.is_paused;
	}

	createCubeMsg(textureUrl) {
		var geometry = new THREE.BoxGeometry(10, 10, 10);
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		var mesh = new THREE.Mesh( geometry, material );
		var textureLoader = new THREE.TextureLoader();
		textureLoader.crossOrigin = 'anonymous';
		var texture = textureLoader.load(textureUrl);
		var basicMat = {map:texture, side: THREE.DoubleSide};
		var phongMat = {map:texture, side: THREE.DoubleSide, shininess: 5, specular: new THREE.Color("rgb(5%, 5%, 5%)")};
		var lambertMat = {map:texture, side: THREE.DoubleSide, emissive: 0x002200, emissiveIntensity: 0.5};
		createMaterialsTwo(mesh, basicMat, phongMat, lambertMat);
		mesh.visible = false;
		scene.add(mesh);
		return mesh;
	}

	showCubeMsg(obj) {
		var camera = cameraManager.getCurrentCamera();
		var camPos = camera.position;
		var camDir = camera.getWorldDirection();
		var objPos;
		obj.scale.set(1, 1, 1)
		if (camera.name == "Top Camera" || camera.name == "Orbit Camera") {
			objPos = {x:camPos.x+camDir.x*100, y:camPos.y+camDir.y*100, z:camPos.z+camDir.z*100}	
			obj.scale.set(10, 10, 10);
		}
		else if (camera.name == "Table Camera") {		
			objPos = {x:camPos.x+camDir.x*50, y:camPos.y+camDir.y*50, z:camPos.z+camDir.z*50}	
		}
		else if (camera.name == "Chase Camera") {
			var carPos = car.position;
			objPos = {x:carPos.x, y:carPos.y+20, z:carPos.z}
		}
		obj.visible = true;
		obj.position.set(objPos.x, objPos.y, objPos.z)
	}
}
