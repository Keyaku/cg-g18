class Candle {
	constructor(obj) {
		this.lightsArray = [];
		this.candleArray = [];
		var i, x, y, z;
		var lightsPositions = [
			[-QUARTER_BOARD_WIDTH - 50, 50, -QUARTER_BOARD_LENGTH - 50],
			[ 0, 50,  QUARTER_BOARD_LENGTH],
			[-QUARTER_BOARD_WIDTH - 100, 50,  QUARTER_BOARD_LENGTH],
			[ QUARTER_BOARD_WIDTH - 50, 50, -QUARTER_BOARD_LENGTH],
			[-QUARTER_BOARD_WIDTH + 100, 50, 0],
			[ QUARTER_BOARD_WIDTH + 25, 50, 0]
		];

		for (i = 0; i < NUMBER_OF_POINT_LIGHTS; i++) {
				x = lightsPositions[i][0];
				y = lightsPositions[i][1];
				z = lightsPositions[i][2];

				var candle = new ConcreteCandle(obj, x, 0, z);
        var light = new THREE.PointLight(0xCCFFFF, 0, POINT_LIGHT_DISTANCE, POINT_LIGHT_REAL);

				candle.position.set(x, 0, z);

				this.candleArray.push(candle);
				this.lightsArray.push(light);

				light.position.set(x, y, z);

        obj.add(light);
			}
			return this;
		}

		getLightsArray() {
			return this.lightsArray;
		}

		burnCandles() {
			var candle;
			for (candle = 0; candle < NUMBER_OF_POINT_LIGHTS; candle++) {
				this.candleArray[candle].burnCandle();
			}
		}
	}

class ConcreteCandle extends THREE.Object3D {
	constructor(obj, x, y, z, radius = 4) {
		super();
		this.type = 'Candle';
		this.candleBottom = new CandleBottom(this, radius);
		this.candleTop    = new CandleTop(this, radius * 5);
		obj.add(this);
		return this;
	}

	burnCandle() {
		this.candleTop.meshVisible();
	}
};

class CandleBottom extends THREE.Mesh {
	constructor(obj, radius) {
		var geometry = new THREE.CylinderGeometry(radius, radius, 100);
		super(geometry);
		this.type = 'CandleBottom';

		createMaterials(this, {color:0xDCDCDC});
		this.material.shininess = 10;
		this.material.specular = new THREE.Color("rgb(40%, 30%, 30%)");

		this.position.y = 50;
		obj.add(this);
		return this;
	}
}

class CandleTop extends THREE.Mesh {
	constructor(obj, radius){
		var geometry = new THREE.CylinderGeometry(radius, radius, 2);

		super(geometry);
		this.type = 'CandleTop';
		this.position.y = 100;
		this.visible = true;
		createMaterials(this, {color:0xDCDCDC});
		this.material.shininess = 10;
		this.material.specular = new THREE.Color("rgb(40%, 30%, 30%)");


		obj.add(this);
		return this;
	}

	meshVisible() {
		// this.visible = !this.visible;
	}
}
