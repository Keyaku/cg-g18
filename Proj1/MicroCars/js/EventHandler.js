function onWindowResize() {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var aspectRatio = windowWidth / windowHeight;
	if (windowWidth > 0 && windowHeight > 0) {
		renderer.setSize(windowWidth, windowHeight);
		renderer.setViewport (0, 0, windowWidth, windowHeight);
	} else {
		console.log("Error on window resize. Negative size values were detected.");
		return -1;
	}
	updateCamera();
}

function onKeyDown(e) {
	switch(e.keyCode) {
		case 65: // A
		case 97: // a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh)
					node.material.wireframe = !node.material.wireframe;
			});
			break;
		case 68: // D
		case 100: // d
			getEdible("Orange1");
			break;

		case 83: // S
		case 115: // s
			createCamera();
			break;

		// Up arrow
		case 38:
			if (!car.physics.controls.forward) {
				car.physics.controls.forward = true;
				car.physics.currentAcceleration = -car.physics.forwardAcceleration;
			}
			break;
		// Down arrow
		case 40:
			if (!car.physics.controls.backward) {
				car.physics.controls.backward = true;
				car.physics.currentAcceleration = car.physics.forwardAcceleration;
			}
			break;
		// Left arrow
		case 37:
			car.physics.controls.left = true;
			break
		 // Right arrow
		case 39:
			car.physics.controls.right = true;
			break;
	}
}

function onKeyUp(e) {
	switch(e.keyCode) {
		// Up arrow
		case 38:
			car.physics.controls.forward = false;
			car.physics.currentAcceleration = 0;
			break
		// Down arrow
		case 40:
			car.physics.controls.backward = false;
			car.physics.currentAcceleration = 0;
			break;
		// Left arrow
		case 37:
			car.physics.controls.left = false;
			break
		 // Right arrow
		case 39:
			car.physics.controls.right = false;
			break;
	}
}
