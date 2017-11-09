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
		for (var i = 0; i < this.numberOfLives; i++) {
			var pos = {x:BOARD_WIDTH/2 + 25 + 30*i, y:0, z:-BOARD_WIDTH/2 + 100}
			var mesh = createCarMesh(carWidth, carLength);
			mesh.position.set(pos.x, pos.y, pos.z)
			mesh.rotation.set(0, NINETY_DEGREES, 0)
			scene.add(mesh)
			this.carLiveReps.push(mesh);
		}
	}

	getCurrentLives() { return this.numberOfLives; }
	getMaxLives() { return this.maximumLives; }
	playerDied() {
		this.numberOfLives -= 1;
		(this.carLiveReps[this.numberOfLives]).visible = false;
		if (this.numberOfLives == 0) { this.gameOver(); }
	}

	gameOver() {
		console.log('GAME OVER.')
	}

	togglePause() {
		isGamePaused = !isGamePaused;
	}
}
