class LightManager {
  constructor() {
    this.lightsNeedUpdate = true;
    this.directionalLight = this.newDirectionalLight();
    this.ambientLight = this.newAmbientLight();
    this.horizonLight = this.newHorizonLight();
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

	update() {
		// While lightsNeedUpdate == false, we shall ignore any of our relevant input
		// until one of them has been released
		if (!this.lightsNeedUpdate) {
			this.lightsNeedUpdate = !(
				Input.is_pressed("c") || Input.is_pressed("g") ||
				Input.is_pressed("l") || Input.is_pressed("n")
			);
			return;
		}

		var toggled = {
			switchPointLights      : Input.is_pressed("c"),
			switchMaterials        : Input.is_pressed("g"),
			disableLightUpdates    : Input.is_pressed("l"),
			switchDirectionalLight : Input.is_pressed("n"),
		};

		// Iterate our toggled keypresses
		for (var key in toggled) {
			if (toggled[key]) {
				this.lightsNeedUpdate = false;
				// if the given key was pressed, call the function with key's name
				this[key]();
			}
		}
	}

	switchDirectionalLight() {
		this.directionalLight.visible = !this.directionalLight.visible;
    this.ambientLight.visible = !this.ambientLight.visible;
    this.horizonLight.visible = !this.horizonLight.visible;
	}

	disableLightUpdates() {
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh && !(node instanceof BoundingGeometry)) {
				if (!(node.material instanceof THREE.MeshBasicMaterial)) {
					node.material = node.basicMaterial;
				} else {
					node.material = node.lambertMaterial;
				}
			}
		});
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
    raceTrack.lights.burnCandles();
  }

	switchMaterials() {
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh && !(node instanceof BoundingGeometry)) {
				if (node.material instanceof THREE.MeshLambertMaterial) {
					node.material = node.phongMaterial;
				} else {
					node.material = node.lambertMaterial;
				}
			}
		});
	}

}
