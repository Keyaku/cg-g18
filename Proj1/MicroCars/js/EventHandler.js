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
			if (!car.carControls.forward) {
				car.carControls.forward = true;
				car.carPhysics.currentAcceleration = -car.carPhysics.forwardAcceleration;
			}
			break;
		// Down arrow
		case 40:
			if (!car.carControls.backward) {
				car.carControls.backward = true;
				car.carPhysics.currentAcceleration = car.carPhysics.forwardAcceleration;
			}
			break;
		// Left arrow
		case 37:
			car.carControls.left = true;
			break
		 // Right arrow
		case 39:
			car.carControls.right = true;
			break;
	}
}

function onKeyUp(e) {
	switch(e.keyCode) {
		// Up arrow
		case 38:
			car.carControls.forward = false;
			car.carPhysics.currentAcceleration = 0;
			break
		// Down arrow
		case 40:
			car.carControls.backward = false;
			car.carPhysics.currentAcceleration = 0;
			break;
		// Left arrow
		case 37:
			car.carControls.left = false;
			break
		 // Right arrow
		case 39:
			car.carControls.right = false;
			break;
	}
}
