/*******************************************************************************
* Car variables
*******************************************************************************/
const CAR_ACCELERATION = 2;
const TURN_ASSIST = CAR_ACCELERATION / 32;
const WHEEL_ROTATION = Math.PI / 16;

/*******************************************************************************
* Board variables
*******************************************************************************/
const BOARD_WIDTH = 1000;
const BOARD_LENGHT = 1000;
const HALF_BOARD_WIDTH  = BOARD_WIDTH  >> 1;
const HALF_BOARD_LENGHT = BOARD_LENGHT >> 1;
const FRICTION = 0.02;

/*******************************************************************************
* Directional variables
*******************************************************************************/
const X_AXIS_HEADING = new THREE.Vector3(1, 0, 0);
const Y_AXIS_HEADING = new THREE.Vector3(0, 1, 0);
const Z_AXIS_HEADING = new THREE.Vector3(0, 0, 1);

/*******************************************************************************
* Trignometric variables
*******************************************************************************/
const TO_DEGREES = 180 / Math.PI;
const TO_RADIANS = Math.PI / 180;
