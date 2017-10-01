function onWindowResize() {
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var aspectRatio = windowWidth / windowHeight;
	if (windowWidth > 0 && windowHeight > 0) {
		if (camera instanceof THREE.PerspectiveCamera) {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
		} else {
			camera.left   = - frustumSize * aspectRatio / 2;
			camera.right  =   frustumSize * aspectRatio / 2;
			camera.top    =   frustumSize / 2;
			camera.bottom = - frustumSize / 2;
		}
		camera.updateProjectionMatrix();
		renderer.setSize(windowWidth, windowHeight);
	}
}

function onKeyDown(e) {
	switch(e.keyCode) {
		case 65: //A
		case 97: //a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh)
					node.material.wireframe = !node.material.wireframe;
			});
			break;
		case 83: //S
		case 115: //s
			createCamera();
			break;
		case 37: //left arrow
		case 38: //up arrow
		case 39: //right arrow
		case 40: //down arrow
		break;
	}
}
