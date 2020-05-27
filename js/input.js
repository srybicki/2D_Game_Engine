/**************************************************************************************************
 *
 *    File: input.js
 * 
 * Version: 1.1
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 23/08/19
 * 
 *    Info: Input component of the engine. 
 *          Used to setup keyboard/joypad controls that can be used to move sprite objects.
 *          Handles many key/joy codes and multi states.
 * 
 *   Notes: v1.1 - 01/09/19
 *          Added new function 'isJoypadConnected'.
 */

// List of keys and their respective keys code values.
let KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:    13,
    ESC:       27,
    SPACE:     32,
    PAGEUP:    33,
    PAGEDOWN:  34,
    END:       35,
    HOME:      36,
    LEFT:      37,
    UP:        38,
    RIGHT:     39,
    DOWN:      40,
    INSERT:    45,
    DELETE:    46,
    ZERO:      48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:         65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:     192
};

// List of key codes.
let KEY_CODES = {
    8:   'backspace',
    9:   'tab',
    13:  'Return',
    27:  'esc',
    32:  'space',
    33:  'pageup',
    34:  'pagedown',
    35:  'end',
    36:  'home',
    37:  'left',
    38:  'up',
    39:  'right',
    40:  'down',
    45:  'insert',
    46:  'delete',
    48:  'zero', 49: 'one', 50: 'two', 51: 'three', 52: 'four', 53: 'five', 54: 'six', 55: 'seven', 56: 'eight', 57: 'nine',
    65:  'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
    192: 'tilda'
}

// Set default key status.
let KEY_STATUS = { keyDown: false };

// Set default status for all key codes.
for (keyCode in KEY_CODES) {
    KEY_STATUS[KEY_CODES[keyCode]] = false;
}

// Flag used to only allow a single key press.
let KEY_DOWN_ONCE = false;

// List of joypad buttons and their respective button code values.
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
let JOY = {
    BUTTON_1: 0,  // A
    BUTTON_2: 1,  // B
    BUTTON_3: 2,  // X
    BUTTON_4: 3,  // Y

    RT_1: 4,  // Right Trigger 1 (top)
    LT_1: 5,  // Left Trigger 1 (top)
    RT_2: 6,  // Right Trigger 2 (bottom)
    LT_2: 7,  // Left Trigger 2 (bottom)

    SELECT: 8,
    START: 9,

    UP: 12,
    DOWN: 13,
    LEFT: 14,
    RIGHT: 15
};

// List of joypad button codes.
let JOY_CODES = {
    0:  'button1',
    1:  'button2',
    2:  'button3',
    3:  'button4',
    4:  'rt1',
    5:  'lt1',
    6:  'rt2',
    7:  'lt2',
    8:  'select',
    9:  'start',
    12: 'up',
    13: 'down',
    14: 'left',
    15: 'right',
}

// Set default joypad button status.
let JOY_STATUS = { joyDown: false };

// Set default status for all joypad button codes.
for (joyCode in JOY_CODES) {
    JOY_STATUS[JOY_CODES[joyCode]] = false;
}

// Flag used to only allow a single joypad button press.
let JOY_DOWN_ONCE = false;

/**
 * @constructor Creates a new Input object.
 * Sets the keyboard event handlers and joypad active status.
 */
var Input = function () {

    this.onKeyDown = function (e) {
        if (KEY_DOWN_ONCE == false) {
            KEY_STATUS.keyDown = true;
            if (KEY_CODES[e.keyCode]) {
                e.preventDefault();
                KEY_STATUS[KEY_CODES[e.keyCode]] = true;
            }
        }
    }
    this.onKeyUp = function (e) {
        KEY_DOWN_ONCE = false;
        KEY_STATUS.keyDown = false;
        if (KEY_CODES[e.keyCode]) {
            e.preventDefault();
            KEY_STATUS[KEY_CODES[e.keyCode]] = false;
        }
    }
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);

    this.joypadActive = false;
}

/**
 * Checks a key press event.
 * @returns {boolean} Returns true if the expected key has been pressed.
 */
Input.prototype.keyPress = function (keyCode) {

    if (KEY_DOWN_ONCE == false && KEY_STATUS[KEY_CODES[keyCode]] == true) {
        KEY_DOWN_ONCE = true;

        return true;
    }

    return false;
}

/**
 * Checks a key hold event.
 * @returns {boolean} Returns true if the expected key has been held.
 */
Input.prototype.keyHold = function (keyCode) {

    if (KEY_STATUS[KEY_CODES[keyCode]] == true) {

        return true;
    }

    return false;
}

/**
 * Checks if the first joypad is connected.
 * @returns Returns true if the joypad is connected.
 */
Input.prototype.isJoypadConnected = function () {

    if (navigator.getGamepads()[0] != null) {

        return true;
    }

    return false;
}

/**
 * Checks if the joypad control option is available.
 * @returns Returns true if the joypad is active.
 */
Input.prototype.isJoypadEnabled = function () {

    return this.joypadActive;
}

/**
 * Enables the joypad control option.
 */
Input.prototype.enableJoypad = function () {

    this.joypadActive = true;
}

/**
 * Disables the joypad control option.
 */
Input.prototype.disableJoypad = function () {

    this.joypadActive = false;
}

/**
 * Checks a joypad button press event.
 * @returns {boolean} Returns true if the expected button has been pressed.
 */
Input.prototype.joyPress = function (joyCode) {

    let joypad = navigator.getGamepads()[0];

    if (joypad != null && joypad.buttons[joyCode].pressed) {
        if (JOY_DOWN_ONCE != true && JOY_STATUS[JOY_CODES[joyCode]] != true) {
            JOY_DOWN_ONCE = true;
            JOY_STATUS[JOY_CODES[joyCode]] = true;

            return true;
        }
    }

    return false;
}

/**
 * Checks a joypad button hold event.
 * @returns {boolean} Returns true if the expected button has been held.
 */
Input.prototype.joyHold = function (joyCode) {

    let joypad = navigator.getGamepads()[0];

    if (joypad != null && joypad.buttons[joyCode].pressed) {

        return true;
    }

    return false;
}

/**
 * Clears any joypad button hold down once state.
 */
Input.prototype.joyClear = function () {

    if (JOY_DOWN_ONCE == true) {
        let joypad = navigator.getGamepads()[0];
        if (joypad != null) {
            for (var i = 0, len = joypad.buttons.length; i < len; i++) {
                if (JOY_STATUS[JOY_CODES[i]] !== undefined) {
                    if (joypad.buttons[i].pressed == false && JOY_STATUS[JOY_CODES[i]] == true) {
                        JOY_STATUS[JOY_CODES[i]] = false;
                        JOY_DOWN_ONCE = false;

                        return;
                    }
                } else {

                    continue;
                }
            }
        }
    }
}