class Candle {
	constructor(obj) {
		this.lightsArray = []
		var horizontalSpacing = BOARD_WIDTH / 3;
		var verticalSpacing = BOARD_LENGHT / 4;
		for (var lines = 1; lines <= 2; lines++) {
			for (var columns = 1; columns <= 3; columns++) {
        var light = new THREE.PointLight(0x0000ff, POINT_LIGHT_INTENSITY, 100);
        var x = horizontalSpacing * lines - HALF_BOARD_WIDTH;
        var y = 20;
        var z = verticalSpacing * columns - HALF_BOARD_LENGHT;
				light.position.set(x, y, z);
        obj.add(light);
				this.lightsArray.push(light);
			}
		}
		return this;
	}

  getLightsArray() {
    return this.lightsArray;
  }
}
