class Candle {
	constructor(obj) {
		this.lightsArray = []
		var i, x, y, z;
		var lightsPositions = [
			[-QUARTER_BOARD_WIDTH, 50, -QUARTER_BOARD_LENGHT],
			[ QUARTER_BOARD_WIDTH, 50,  QUARTER_BOARD_LENGHT],
			[-QUARTER_BOARD_WIDTH, 50,  QUARTER_BOARD_LENGHT],
			[ QUARTER_BOARD_WIDTH, 50, -QUARTER_BOARD_LENGHT],
			[-QUARTER_BOARD_WIDTH, 50, 0],
			[ QUARTER_BOARD_WIDTH, 50, 0]
		];

		for (i = 0; i < NUMBER_OF_POINT_LIGHTS; i++) {
        var light = new THREE.PointLight(0xCCFFFF, POINT_LIGHT_INTENSITY, POINT_LIGHT_DISTANCE, POINT_LIGHT_REAL);
				x = lightsPositions[i][0];
				y = lightsPositions[i][1];
				z = lightsPositions[i][2];
				light.position.set(x, y, z);
				this.lightsArray.push(light);
        obj.add(light);
			}
			return this;
		}

		getLightsArray() {
			return this.lightsArray;
		}
	}
