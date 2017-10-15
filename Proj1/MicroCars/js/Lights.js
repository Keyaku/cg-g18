/*******************************************************************************
* Light related - Helper methods
*******************************************************************************/

/**
* Adds a soft white light with default intensity to the scene.
*/
function createAmbient() {
	var ambientLight = new THREE.AmbientLight(0x404040);
	ambientLight.name = 'ambientLight';
	scene.add(ambientLight);
}

/**
* A light source positioned directly above the scene, color fades from the sky
* towards the ground. Simulates horizon.
*/
function createHorizon() {
	var horizonLight = new THREE.HemisphereLight(0xFF4444, 0x44FF44, 0.6);
	horizonLight.name = 'horizonLight';
	horizonLight.position.set( 0, cameraManager.frustumSize, 0 );
	scene.add(horizonLight);
}

/**
* A light that uses parallel rays allowing to simulate sunlight, it is the only
* light used here that allows shadow casting.
*/
function createSun() {
	var sunLight = new THREE.DirectionalLight(0xFFFFE0);
	sunLight.name = 'sunLight';
	sunLight.position.x = Math.random()*100 + 800;
	sunLight.position.y = Math.random()*100 + 800;
	sunLight.position.z = Math.random()*100 + 800;
	sunLight.castShadow = true;
	var shadowHelper = new THREE.CameraHelper(sunLight.shadow.camera);
	sunLight.shadow.camera.near = 1;
	sunLight.shadow.camera.far = cameraManager.frustumSize;
	sunLight.shadow.camera.left = -cameraManager.frustumSize / 2;
	sunLight.shadow.camera.right = cameraManager.frustumSize / 2;
	sunLight.shadow.camera.top = cameraManager.frustumSize / 2;
	sunLight.shadow.camera.bottom = -cameraManager.frustumSize / 2;
	sunLight.shadow.mapSize.width = 1000;
	sunLight.shadow.mapSize.height = 1000;
	scene.add(shadowHelper);
	scene.add(sunLight);
}
// Calls all other light instanciating methods
function createLights() {
	createAmbient();
	createHorizon();
	createSun();
}
