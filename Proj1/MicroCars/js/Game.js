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

		this.createPauseText();
		this.createGameOverText();
	}

	createPauseText() {
		var loader = new THREE.FontLoader();
			loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
				var textGeometry = new THREE.TextGeometry('Paused', {
					font: font,
					size: 80,
					height: 20,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 10,
					bevelSize: 5,
					bevelSegments: 3
				});
				var textMaterial = new THREE.MeshPhongMaterial({color: 0x000000, specular: 0x000000 });
				var mesh = new THREE.Mesh( textGeometry, textMaterial );
				var box = new THREE.Box3().setFromObject(mesh);
				var textWidth = box.getSize().x
				mesh.rotation.set(-NINETY_DEGREES, 0, 0);
				mesh.position.set(-textWidth / 2, 0, 0)

				var basicMaterial = new THREE.MeshBasicMaterial({color:0x000000});
				var phongMaterial = new THREE.MeshPhongMaterial({color: 0x000000, specular: 0x000000 });
				var lambertMaterial = new THREE.MeshLambertMaterial({color:0x000000});
				createMaterialsTwo(mesh, basicMaterial, phongMaterial, lambertMaterial);

				scene.add(mesh);
				pauseText = mesh;
				pauseText.visible = false;
			});
	}

	createGameOverText() {
		var loader = new THREE.FontLoader();
			loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
				var textGeometry = new THREE.TextGeometry('Game Over', {
					font: font,
					size: 80,
					height: 20,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 10,
					bevelSize: 3,
					bevelSegments: 3
				});
				var textMaterial = new THREE.MeshPhongMaterial({color: 0x000000, specular: 0x000000 });
				var mesh = new THREE.Mesh( textGeometry, textMaterial );
				var box = new THREE.Box3().setFromObject(mesh);
				var textWidth = box.getSize().x
				mesh.rotation.set(-NINETY_DEGREES, 0, 0);
				mesh.position.set(-textWidth / 2, 0, 0)

				var basicMaterial = new THREE.MeshBasicMaterial({color:0x000000});
				var phongMaterial = new THREE.MeshPhongMaterial({color: 0x000000, specular: 0x000000 });
				var lambertMaterial = new THREE.MeshLambertMaterial({color:0x000000});
				createMaterialsTwo(mesh, basicMaterial, phongMaterial, lambertMaterial);

				scene.add(mesh);
				gameoverText = mesh;
				gameoverText.visible = false;
			});
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
		gameoverText.visible = false;
		this.is_gameover = false;
		this.togglePause();
		this.resetLives(this.maximumLives);
		if (car == undefined) {
			car = new Car(100, 0, -325);
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
			this.is_gameover = true;
			gameoverText.visible = true;
			this.togglePause();
			return true;
		}
		return false;
	}

	togglePause() {
		if (this.is_paused) {
			pauseText.visible = false;
		}
		else if (!this.is_gameover) {
			pauseText.visible = true;
		}
		this.is_paused = !this.is_paused;
	}
}
