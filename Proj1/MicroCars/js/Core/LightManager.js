class LightManager {
  constructor() {
    this.lightsNeedUpdate = true;
    this.directionalLight = this.newDirectionalLight();
    this.ambientLight = this.newAmbientLight();
    this.horizon = this.newHorizonLight();
  }

  /**
  * A light that uses parallel rays allowing to simulate sunlight, it is the only
  * light used here that allows shadow casting.
  */
  newDirectionalLight() {
    var directionalLight = new THREE.DirectionalLight(0xFFFFE0);
    var frustumSize = cameraManager.frustumSize;
    var halfFrustum = frustumSize / 2;

  	directionalLight.name = 'sunLight';
  	directionalLight.position.set(0, 500, 0);
  	directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = HALF_BOARD_WIDTH;
    directionalLight.shadow.mapSize.height = HALF_BOARD_LENGHT;
  	directionalLight.shadow.camera.near = 1;
  	directionalLight.shadow.camera.far = frustumSize;
  	directionalLight.shadow.camera.left = - halfFrustum;
  	directionalLight.shadow.camera.right = halfFrustum;
  	directionalLight.shadow.camera.top = halfFrustum;
  	directionalLight.shadow.camera.bottom = halfFrustum;

  	// scene.add(new THREE.CameraHelper(this.directionalLight.shadow.camera));
  	scene.add(directionalLight);

    return directionalLight;
  }

  /**
  * A light source positioned directly above the scene, color fades from the sky
  * towards the ground. Simulates horizon.
  */
  newHorizonLight() {
  	var horizonLight = new THREE.HemisphereLight(0xFF4444, 0x44FF44, 0.6);

  	horizonLight.name = 'horizonLight';
  	horizonLight.position.set( 0, cameraManager.frustumSize, 0 );

  	scene.add(horizonLight);

    return horizonLight;
  }

  newAmbientLight() {
    var ambientLight = new THREE.AmbientLight(0x404040);

    ambientLight.name = 'ambientLight';

    scene.add(ambientLight);

    return ambientLight;
  }

  switchDirectionalLight() {
  	if (this.directionalLight.visible) {
  		this.directionalLight.visible = false;
  	} else {
  		this.directionalLight.visible = true;
  	}
  }

  disableLightUpdates() {
    // TODO
  }

  switchPointLights() {
    var lights = raceTrack.lights.getLightsArray();
    for (var i = 0; i < lights.length; i++) {
      var light = lights[i];
      if (light.intensity != 0) {
        light.intensity = 0;
      } else {
        light.intensity = POINT_LIGHT_INTENSITY;
      }
    }
  }

  switchMaterials() {
    scene.traverse(function (node) {
      if (node instanceof THREE.Mesh && node.type == "Board") {
        if (node.material instanceof THREE.MeshPhongMaterial) {
    			node.material = node.lambertMaterial;
    		} else {
    			node.material = node.phongMaterial;
    		}
      }
    });
  }

}
