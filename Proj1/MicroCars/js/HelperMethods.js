/*******************************************************************************
* Object Oriented - Helper methods
*******************************************************************************/
/**
* Adds a new edible of type Object3D with subtype Orange or Butter to a dictionary
* whose keys are the desired Object3D name passed as a String
*/
function createEdible(edibleName, x, y, z) {
	if (edibleName.includes('Orange')) {
		edibleObjects[edibleName] = new Orange(edibleName, x, y, z);
	} else {
		edibleObjects[edibleName] = new Butter(x, y, z);
	}
}

function getEdible(edibleName) {
	console.log(edibleObjects[edibleName].name());
}

function deleteEdible(edibleName) {
	var obj = scene.getObjectByName(edibleName);
	scene.remove(obj);
	delete edibleObjects[edibleName];
}
