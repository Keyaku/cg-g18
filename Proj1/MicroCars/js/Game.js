class Game {
	constructor(numberOfLives=5, boardSize=BOARD_WIDTH) {
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
		var pos = {x:BOARD_WIDTH/2 + 25, y:0, z:-BOARD_WIDTH/2 + 100}

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
	}

	limitNumber(number) {
		return Math.min(this.maximumLives, Math.max(0, number));
	}

	/** @function resetLives
	** @param number: the exact number of lives to show
	*/
	resetLives(number) {
		for (var i = 0; i < this.carLiveReps.length; i++) {
			this.carLiveReps[i].visible = i < number;
		}
		this.numberOfLives = number;
	}

	/** @function addLives
	** @param amount: the amount of lives to add upon our current numberOfLives
	*/
	addLives(amount) {
		amount = this.limitNumber(this.numberOfLives + amount);
		this.resetLives(amount);
	}

	/** @function removeLives
	** @param amount: the amount of lives to remove upon our current numberOfLives
	*/
	removeLives(amount) {
		amount = this.limitNumber(this.numberOfLives - amount);
		this.resetLives(amount);
	}

	/** @function restart
	** @param amount: the amount of lives to add upon our current numberOfLives
	*/
	restart() {
		this.resetLives(this.maximumLives);
		if (car == undefined) {
			car = new Car(100, 0, -325);
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
			console.log('GAME OVER.');
			return true;
		}
		return false;
	}

	togglePause() {
		isGamePaused = !isGamePaused;
	}
}
