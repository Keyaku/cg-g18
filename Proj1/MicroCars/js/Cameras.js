/**
* Camera-related code
*/
var camera;
const frustumSize = 1000;

/**
* This method creates a perspective camera. Switching between perspective and
* orthographic cameras is also possible due to event listeners.
* OrthographicCamera params: Left, Right, Top, Bottom, Near, Far
* PerspectiveCamera params: Field of View, Aspect Ratio, Near, Far
*/
this.createCamera = function() {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var aspectRatio = windowWidth / windowHeight;
	var near = 0.1;
	var far = 2000;

	if (camera instanceof THREE.PerspectiveCamera) {
		if (windowHeight > windowWidth) {
			aspectRatio = windowHeight / windowWidth;
		}
		this.perspective = "Orthographic";
		camera = new THREE.OrthographicCamera(0, 0, 0, 0, near, far);
		camera.position.x = 0;
		camera.position.y = 1000;
		camera.position.z = 0;
	} else {
		this.perspective  = "Perspective";
		camera = new THREE.PerspectiveCamera(75, aspectRatio, near, far);
		camera.position.x = -250;
		camera.position.y = 600;
		camera.position.z = -250
	}
	camera.lookAt(scene.position);
	// Adding orbiting controls through our camera lens
	controls = new THREE.OrbitControls(camera);
	controls.enableKeys = false
	// Updating camera data
	updateCamera();
};

function updateCamera() {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var aspectRatio = windowWidth / windowHeight;
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