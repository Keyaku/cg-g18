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
	if (camera instanceof THREE.PerspectiveCamera) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
	} else {
		if (windowHeight > windowWidth) {
			aspectRatio   = windowHeight / windowWidth;
			camera.left   = - frustumSize / 2;
			camera.right  =   frustumSize / 2;
			camera.top    =   frustumSize * aspectRatio / 2;
			camera.bottom = - frustumSize * aspectRatio / 2;
		} else {
			camera.left   = - frustumSize * aspectRatio / 2;
			camera.right  =   frustumSize * aspectRatio / 2;
			camera.top    =   frustumSize / 2;
			camera.bottom = - frustumSize / 2;
		}
	}
	camera.updateProjectionMatrix();
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
			getEdible("FirstOrange");
			break;

		case 83: // S
		case 115: // s
			createCamera();
			break;

		// Up arrow
		case 38:
			clock.start()
			break
		// Down arrow
		case 40:

		// Left arrow
		case 37:
			clock.stop()
			break
		 // Right arrow
		case 39:
		break;
	}
}
