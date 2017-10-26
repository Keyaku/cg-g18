/*******************************************************************************
* EventHandler - and some Input too
*******************************************************************************/

/**
*	InputServer
* A singleton (FIXME: not yet, but HEY, it works like this) accessed via Input.
* Creates scoping for Input, to allow more strict OOP and allow less clutter code
* all-in-one file.
*
* Check keyName values at:
* https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
*/
class InputServer {
	constructor() {
		this.pressed = [];
		this.keys = [];
		for (var i = 0; i < 256; i++) {
			this.pressed[i] = false;
		}
	}

	is_key_pressed(keyCode) {
		return this.pressed[keyCode];
	}

	is_pressed(keyName) {
		return this.keys.indexOf(keyName) != -1;
	}

	press(e) {
		this.pressed[e.keyCode] = true;
		if (this.keys.indexOf(e.key) == -1) {
			this.keys.push(e.key);
		}
	}

	release(e) {
		this.pressed[e.keyCode] = false;
		var idx = this.keys.indexOf(e.key);
		if (idx > -1) {
			this.keys.splice(idx, 1);
		}
	}
}
const Input = new InputServer();

/**
*	Keypresses Events (keydown, keyup, keypress)
*/
function onKeyDown(e) {
	// Setting InputServer input for whoever wants to catch it
	Input.press(e);

	// Setting global input (if any)
	switch(e.keyCode) {
		case 65: // A
		case 97: // a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh && !(node instanceof BoundingSphere))
					node.material.wireframe = !node.material.wireframe;
			});
			break;

		case 81:  // Q
		case 113: // q
			scene.traverse(function (node) {
				if (node instanceof PhysicsBody && node.bounds != undefined) {
					node.bounds.toggleVisibility();
				}
			});
			break;
	}
}

function onKeyUp(e) {
	// Releasing input from InputServer
	Input.release(e);

	// Setting global input (if any)
}

/**
*	Other EventHandlers
*/
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
	cameraManager.updateValues(windowWidth, windowHeight, aspectRatio);
	cameraManager.updateCamera();
}
