class Game {
	constructor(numberOfLives=5, boardSize=BOARD_WIDTH) {
		this.numberOfLives = numberOfLives;
		// Defining immutable maximum values
		Object.defineProperty(this, "maximumLives", {
			value: numberOfLives,
			enumerable: true,
			configurable: false,
		});

		var carWidth = 20;
		var carLength = 10;
		this.carLiveReps = []
		for (var i = 0; i < this.numberOfLives-1; i++) {
			var pos = {x:BOARD_WIDTH/2 + 25 + 30*i, y:0, z:-BOARD_WIDTH/2 + 100}
			var mesh = createCarMesh(carWidth, carLength);
			mesh.position.set(pos.x, pos.y, pos.z)
			mesh.rotation.set(0, NINETY_DEGREES, 0)
			scene.add(mesh)
			this.carLiveReps.push(mesh);
		}
	}

	restart() {
		for (var i in this.carLiveReps) {
			this.carLiveReps[i].visible = true;
		}
		this.numberOfLives = this.maximumLives;
		if (scene.getObjectById(car.id) != undefined) {
			car.visible = true;
		}
	}

	getCurrentLives() { return this.numberOfLives; }
	getMaxLives() { return this.maximumLives; }
	playerDied() {
		if (this.gameOver()) { return; }
		this.numberOfLives -= 1;
		if (this.gameOver()) { return; } // FIXME: remove this line
		(this.carLiveReps[this.numberOfLives - 1]).visible = false;
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
