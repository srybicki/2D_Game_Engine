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



/*************************************************************************************************
 *   
 *    File: sound.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 23/08/19
 * 
 *    Info: Sound component of the engine. 
 *          Used to create sound objects for sound effects in a game project.
 *          Has basic sound management options such as play, pause and stop.
 */

/**
 * @constructor Creates a new Sound object.
 * @param {string} soundPath The path of the sound file.
 * @param {boolean} loop Flag to loop the playing sound if set to true.
 */
var Sound = function (soundPath = null, loop = false) {

    this.audio = new Audio(soundPath);
    if (loop) {
        this.audio.loop = true;
    }
}

/**
 * Checks if the audio has loaded or nearly loaded.
 * @returns {boolean} Returns true if the audio state is 4 or 3.
 */
Sound.prototype.loaded = function () {

    if (this.audio.readyState == 4 || this.audio.readyState == 3) {

        return true;
    }

    return false;
}

/**
 * Reloads the current sound file.
 */
Sound.prototype.reload = function () {

    this.audio.load();
}

/**
 * Checks if the sound file is already playing.
 * @returns {boolean} Returns true if the audio is not paused.
 */
Sound.prototype.playing = function () {

    if (!this.audio.paused) {

        return true;
    }

    return false;
}

/**
 * Plays the sound file.
 */
Sound.prototype.play = function () {

    this.audio.play();
}

/**
 * Pauses the sound file.
 */
Sound.prototype.pause = function () {

    this.audio.pause();
}

/**
 * Stops the sound file from playing.
 */
Sound.prototype.stop = function () {

    this.audio.pause();
    this.audio.currentTime = 0;
}

/**
 * Stops the current sound file from playing, and plays it again from the start.
 */
Sound.prototype.restart = function () {

    this.audio.pause();
    this.audio.currentTime = 0;
    this.play();
}

/**
 * Set the volume for the sound file.
 * @param {number} volume The volume amount (0.0 - 1.0).
 */
Sound.prototype.setVolume = function (volume) {

    if (volume < 0.0) {
        volume = 0.0;
    } else if (volume > 1.0) {
        volume = 1.0;
    }
    this.audio.volume = volume;
}

/**
 * Sets the loop flag for the sound file.
 * @param {boolean} loop Flag to loop the sound file if set to true.
 */
Sound.prototype.setLoop = function (loop) {

    this.audio.loop = loop;
}

/**
 * Sets the sound file muted flag to true.
 */
Sound.prototype.mute = function () {

    this.audio.muted = true;
}

/**
 * Sets the sound file muted flag to false.
 */
Sound.prototype.unmute = function () {

    this.audio.muted = false;
}



/**************************************************************************************************
 *
 *    File: colour.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 26/08/19
 * 
 *    Info: Colour component of the engine. 
 *          Used to colour a text object.
 *          Store a wide range of colours in HEX and RGB format.
 */

// List of colours in HEX format.
// https://htmlcolorcodes.com/
let COLOUR_HEX = {
    WHITE:   '#FFFFFF',
    SILVER:  '#C0C0C0',
    GREY:    '#808080',
    BLACK:   '#000000',
    RED:     '#FF0000',
    MAROON:  '#800000',
    YELLOW:  '#FFFF00',
    OLIVE:   '#808000',
    LIME:    '#00FF00',
    GREEN:   '#008000',
    AQUA:    '#00FFFF',
    TEAL:    '#008080',
    BLUE:    '#0000FF',
    NAVY:    '#000080',
    FUCHSIA: '#FF00FF',
    PURPLE:  '#800080',
}

// List of colours in RGB format.
let COLOUR_RGB = {
    WHITE:   { r:255, g:255, b:255 },
    SILVER:  { r:192, g:192, b:192 },
    GREY:    { r:128, g:128, b:128 },
    BLACK:   { r:0,   g:0,   b:0   },
    RED:     { r:255, g:0,   b:0   },
    MAROON:  { r:128, g:0,   b:0   },
    YELLOW:  { r:255, g:255, b:0   },
    OLIVE:   { r:128, g:128, b:0   },
    LIME:    { r:0,   g:255, b:0   },
    GREEN:   { r:0,   g:128, b:0   },
    AQUA:    { r:0,   g:255, b:255 },
    TEAL:    { r:0,   g:128, b:128 },
    BLUE:    { r:0,   g:0,   b:255 },
    NAVY:    { r:0,   g:0,   b:128 },
    FUCHSIA: { r:255, g:0,   b:255 },
    PURPLE:  { r:128, g:0,   b:128 }
};



/**************************************************************************************************
 *
 *    File: text.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 21/08/19
 * 
 *    Info: Text component of the engine. 
 *          Used to create text objects in a game project.
 *          Supports basic options such as font, color and alpha.
 */

// List of font sizes.
let FONT_SIZE = {
    _10:  10,
    _11:  11,
    _12:  12,
    _14:  14,
    _16:  16,
    _18:  18,
    _20:  20,
    _22:  22,
    _24:  24,
    _26:  26,
    _28:  28,
    _36:  36,
    _48:  48,
    _72:  72,
    _144: 144,
}

// List of font types (web safe).
// https://www.w3schools.com/cssref/css_websafe_fonts.asp
let FONT_TYPE = {
    GEORGIA:             'Georgia',
    PALATINO_LINOTYPE:   'Palatino Linotype',
    TIMES_NEW_ROMAN:     'Times New Roman',
    ARIAL:               'Arial',
    ARIAL_BLACK:         'Arial Black',
    COMIC_SANS_MS:       'Comic Sans MS',
    IMPACT:              'Impact',
    LUCIDA_SANS_UNICODE: 'Lucida Sans Unicode',
    TAHOMA:              'Tahoma',
    TREBUCHET_MS:        'Trebuchet MS',
    VERDANA:             'Verdana',
    COURIER_NEW:         'Courier New',
    LUCIDA_CONSOLE:      'Lucida Console'
};

// List of font weights.
let FONT_WEIGHT = {
    NORMAL: 'normal',
    BOLD:   'bold'
};

/**
 * @constructor Creates a new Text object.
 * @param {string} text Text to be displayed.
 * @param {number} fontSize The size of the font.
 * @param {string} fontType The type of font.
 * @param {string} fontWeight The weight of the font.
 * @param {object} colour The colour of the text.
 * @param {object} position The position of the text.
 */
var Text = function (text = '', fontSize = 24, fontType = FONT_TYPE.ARIAL, fontWeight = FONT_WEIGHT.NORMAL, colourRGB = COLOUR_RGB.WHITE, position = { x: 0, y: 0 }) {
    
    this.text = text;
    this.font = (fontWeight + ' ' + fontSize + 'px ' + fontType);
    this.alpha = 1.0;
    this.colour = colourRGB;
    this.colourRGBA = 'rgba(' + this.colour.r + ', ' + this.colour.g + ', ' + this.colour.b + ', ' + this.alpha + ')';
    this.position = position;
    this.isVisible = true;
}

/**
 * Sets the text to be displayed.
 */
Text.prototype.setText = function (text) {

    this.text = text;
}

/**
 * Gets the text displayed.
 * @returns {string} Returns the displayed text.
 */
Text.prototype.getText = function () {

    return this.text;
}

/**
 * Sets the font properties of the text.
 */
Text.prototype.setFont = function (fontSize, fontType, fontWeight) {

    this.font = (fontWeight + ' ' + fontSize + 'px ' + fontType);
}

/**
 * Gets the font object of the text.
 * @returns {object} Returns the font object.
 */
Text.prototype.getFont = function () {

    return this.font;
}

/**
 * Sets the alpha value of the text.
 */
Text.prototype.setAlpha = function (alpha) {

    if (alpha < 0.0) {
        this.alpha = 0.0;
    } else if (alpha > 1.0) {
        this.alpha = 1.0;
    } else {
        this.alpha = alpha;
    }
    this.colourRGBA = 'rgba(' + this.colour.r + ', ' + this.colour.g + ', ' + this.colour.b + ', ' + this.alpha + ')';
}

/**
 * Gets the alpha value of the text.
 * @returns {number} Returns the alpha value.
 */
Text.prototype.getAlpha = function () {

    return this.alpha;
}

/**
 * Sets the colour of the text.
 */
Text.prototype.setColour = function (colour) {

    this.colour = colour;
    this.colourRGBA = 'rgba(' + this.colour.r + ', ' + this.colour.g + ', ' + this.colour.b + ', ' + this.alpha + ')';
}

/**
 * Gets the colour of the text.
 * @returns {string} Returns the colour (style).
 */
Text.prototype.getColour = function () {

    return this.colourRGBA;
}

/**
 * Sets the position of the text.
 */
Text.prototype.setPosition = function (x, y) {

    this.position.x = x;
    this.position.y = y;
}

/**
 * Sets the x position of the text.
 */
Text.prototype.setX = function (x) {

    this.position.x = x;
}

/**
 * Sets the y position of the text.
 */
Text.prototype.setY = function (y) {

    this.position.y = y;
}

/**
 * Gets the position of the text.
 * @returns {object} Returns the x and y position.
 */
Text.prototype.getPosition = function () {

    return this.position;
}

/**
 * Gets the x position of the text.
 * @returns {number} Returns the x position.
 */
Text.prototype.getX = function () {

    return this.position.x;
}

/**
 * Gets the y position of the text.
 * @returns {number} Returns the y position.
 */
Text.prototype.getY = function () {

    return this.position.y;
}

/**
 * Gets the visible state of the text.
 * @returns {boolean} Returns true if visible.
 */
Text.prototype.draw = function () {

    return this.isVisible;
}

/**
 * Sets the visible state of the text to true.
 */
Text.prototype.show = function () {

    this.isVisible = true;
}

/**
 * Sets the visible state of the text to false.
 */
Text.prototype.hide = function () {

    this.isVisible = false;
}

/**
 * Get the number of characters in the text.
 * @returns {number} Returns the number of characters.
 */
Text.prototype.getLength = function () {

    return this.text.length;
}



/**************************************************************************************************
 *
 *    File: physics.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 24/08/19
 * 
 *    Info: Physics component of the engine. 
 *          Used to create physics bodies for sprite objects, and resolve collisions.
 *          Supports basic physics bodies such as bounding box and circle.
 */

/**
 * @constructor Creates a new Physics object.
 */
var Physics = function () {

    this.enabled = true;
}

/**
 * Checks if the physics is enabled.
 * @return {boolean} Returns true if enabled.
 */
Physics.prototype.isEnabled = function () {

    return this.enabled;
}

/**
 * Enables the physics.
 */
Physics.prototype.enable = function () {

    this.enabled = true;
}

/**
 * Disables the physics.
 */
Physics.prototype.disable = function () {

    this.enabled = false;
}

/**
 * Resolves a collision between 2 physics bodies.
 * Collision algorithms have been taken from the following site:
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 * @param {object} bodyA The physics body for the 1st sprite.
 * @param {object} bodyB The physics body for the 2nd sprite.
 * @param {object} posA Contains the x and y position values for the 1st sprite.
 * @param {object} posB Contains the x and y position values for the 2nd sprite.
 * @return {boolean} Returns true if there is a collision between the physics bodies.
 */
Physics.prototype.collision = function (bodyA, bodyB, posA, posB) {

    // Check body types to apply correct collision algorithm.
    if (bodyA.type == PHYSICS_BODY_TYPE.BOX && bodyB.type == PHYSICS_BODY_TYPE.BOX) {

        // BOX vs BOX.
        return (((posA.x - bodyA.size.w) < (posB.x + bodyB.size.w) && (posA.x + bodyA.size.w) > (posB.x - bodyB.size.w)) &&
                ((posA.y - bodyA.size.h) < (posB.y + bodyB.size.h) && (posA.y + bodyA.size.h) > (posB.y - bodyB.size.h)));

    } else if (bodyA.type == PHYSICS_BODY_TYPE.BOX && bodyB.type == PHYSICS_BODY_TYPE.CIRCLE) {

        // BOX vs CIRCLE.
        var x = Math.max(posA.x - bodyA.size.w, Math.min(posB.x, posA.x + bodyA.size.w));
        var y = Math.max(posA.y - bodyA.size.h, Math.min(posB.y, posA.y + bodyA.size.h));

        return (Math.sqrt((x - posB.x) * (x - posB.x) + (y - posB.y) * (y - posB.y)) < bodyB.radius);

    } else if (bodyA.type == PHYSICS_BODY_TYPE.CIRCLE && bodyB.type == PHYSICS_BODY_TYPE.BOX) {

        // CIRCLE vs BOX.
        var x = Math.max(posB.x - bodyB.size.w, Math.min(posA.x, posB.x + bodyB.size.w));
        var y = Math.max(posB.y - bodyB.size.h, Math.min(posA.y, posB.y + bodyB.size.h));

        return (Math.sqrt((x - posA.x) * (x - posA.x) + (y - posA.y) * (y - posA.y)) < bodyA.radius);

    } else if (bodyA.type == PHYSICS_BODY_TYPE.CIRCLE && bodyB.type == PHYSICS_BODY_TYPE.CIRCLE) {

        // CIRCLE vs CIRCLE.
        return (Math.sqrt((posA.x - posB.x) * (posA.x - posB.x) +
               (posA.y - posB.y) * (posA.y - posB.y)) <
               (bodyA.radius + bodyB.radius));
    }
}

/**
 * The different types of physics bodies.
 */
let PHYSICS_BODY_TYPE = {
    BOX: 'box',
    CIRCLE: 'circle'
};

/**
 * @constructor Creates a new PhysicsBody object.
 * @param {string} bodyType The type of physics body.
 * @param {object} size Contains the width and height values.
 * @param {boolean} active Flag to mark if the physics body is active.
 * @return {object} Returns a new PhysicsBody object.
 */
var PhysicsBody = function (bodyType = PHYSICS_BODY_TYPE.BOX, size = { w: 0, h: 0 }, active = false) {

    if (bodyType == PHYSICS_BODY_TYPE.BOX) {
        this.body = {
            type:   PHYSICS_BODY_TYPE.BOX,
            active: false,
            size:   { w: 0, h: 0 }
        };
        this.body.active = active;
        this.body.size.w = (size.w * 0.5);
        this.body.size.h = (size.h * 0.5);
    } else if (bodyType == PHYSICS_BODY_TYPE.CIRCLE) {
        this.body = {
            type:   PHYSICS_BODY_TYPE.CIRCLE,
            active: false,
            radius: 0
        };
        this.body.active = active;
        this.body.radius = ((this.size.w + this.size.h) * 0.5) * 0.5;
    }
}

/**
 * Checks is the physics body is active.
 * @return {boolean} Returns true if active.
 */
PhysicsBody.prototype.isActive = function () {

    return this.body.active;
}

/**
 * Sets the physics body to active.
 */
PhysicsBody.prototype.activate = function () {

    this.body.active = true;
}

/**
 * Sets the physics body to inactive.
 */
PhysicsBody.prototype.deactivate = function () {

    this.body.active = false;
}

/**
 * Gets the physics body for the sprite.
 * @return {object} Returns the Physics body.
 */
PhysicsBody.prototype.getBody = function () {

    return this.body;
}

/**
 * Sets a new physics body based on the given type.
 * @param {string} bodyType The type of physics body.
 * @param {object} size Contains the width and height values.
 */
PhysicsBody.prototype.setBody = function (bodyType, size) {

    if (bodyType == PHYSICS_BODY_TYPE.BOX) {
        this.body = {
            type:   PHYSICS_BODY_TYPE.BOX,
            active: true,
            size:   { w: 0, h: 0 }
        };
        this.body.size.w = (size.w * 0.5);
        this.body.size.h = (size.h * 0.5);
    } else if (bodyType == PHYSICS_BODY_TYPE.CIRCLE) {
        this.body = {
            type:   PHYSICS_BODY_TYPE.CIRCLE,
            active: true,
            radius: 0
        };
        this.body.radius = ((size.w + size.h) * 0.5) * 0.5;
    }
}

/**
 * Sets the size of the physics body.
 * @param {object} size Contains the width and height values.
 */
PhysicsBody.prototype.setSize = function (size) {

    if (this.body.type == PHYSICS_BODY_TYPE.BOX) {
        this.body.size.w = (size.w * 0.5);
        this.body.size.h = (size.h * 0.5);
    } else if (this.body.type == PHYSICS_BODY_TYPE.CIRCLE) {
        this.body.radius = ((size.w + size.h) * 0.5) * 0.5;
    }
}



/**************************************************************************************************
 *
 *    File: animation.js
 * 
 * Version: 1.1
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 25/08/19
 * 
 *    Info: Animation component of the engine. 
 *          Used to animate a sprite object.
 *          Has basic animation controllers such as play, pause, stop and loop.
 * 
 *   Notes: v1.1 - 01/09/19
 *          Renamed function 'new' to 'setup'.
 *          Set default values for parameters 'framerate' and 'loop' in function 'setup'.
 *          Added new function 'setFrameWidth'.
 *          Added new function 'setFrameHeight'.
 */

/**
 * @constructor Creates a new Animation object.
 * @param {boolean} active Flag for running the animation.
 * @param {boolean} loop Flag for looping the animation.
 * @param {object} size Contains width and height values for a single frame.
 * @param {number} frameCount The number of frames in the animation.
 * @param {number} frameRate The speed of the animation.
 */
var Animation = function (active = false, loop = false, size = { w: 0, h: 0 }, frameCount, frameRate) {

    this.active = active;
    this.loop = loop;
    this.frame = {
        width:  size.w,
        height: size.h,
        rate:   frameRate,
        count:  frameCount,
        index:  0,
        posX:   0,
        time:   0.0
    };
}

/**
 * Creates settings for a new animation.
 * @param {object} size Contains width and height values for a single frame.
 * @param {number} frameCount The number of frames in the animation.
 * @param {number} frameRate The speed of the animation.
 * @param {boolean} loop Flag for looping the animation.
 */
Animation.prototype.setup = function (size = { w: 0, h: 0 }, frameCount, frameRate = 0.333, loop = false) {

    this.frame = {
        width:  size.w,
        height: size.h,
        rate:   frameRate,
        count:  frameCount,
        index:  0,
        posX:   0,
        time:   0.0
    };
    this.loop = loop;
}

/**
 * Updates the animation based on the current settings.
 */
Animation.prototype.update = function (deltaTime) {

    this.frame.time += deltaTime;

    if (this.frame.time > this.frame.rate) {
        this.frame.time = 0.0;
        if (this.frame.index + 1 != this.frame.count) {
            this.frame.index += 1;
        } else {
            this.frame.index = 0;
            if (this.loop == false) {
                this.active = false;
            }
        }
        this.frame.posX = (this.frame.width * this.frame.index);
    }
}

/**
 * Checks if the animation is active.
 * @return {boolean} Returns true if active.
 */
Animation.prototype.isActive = function () {

    return this.active;
}

/**
 * Sets the width of the animation frame.
 */
Animation.prototype.setFrameWidth = function (width) {

    this.frame.width = width;
}

/**
 * Gets the width of the animation frame.
 * @return {number} Returns frame width.
 */
Animation.prototype.getFrameWidth = function () {

    return this.frame.width;
}

/**
 * Sets the height of the animation frame.
 */
Animation.prototype.setFrameHeight = function (height) {

    this.frame.height = height;
}

/**
 * Gets the height of the animation frame.
 * @return {number} Returns frame height.
 */
Animation.prototype.getFrameHeight = function () {

    return this.frame.height;
}

/**
 * Sets the animation on a specific frame based on the index.
 */
Animation.prototype.setFramePosX = function (index) {

    if (index > -1 && index < this.frame.count) {
        this.frame.index = index;
        this.frame.posX = (this.frame.width * this.frame.index);
    }
}

/**
 * Gets the frame x position in the spritesheet.
 * @return {number} Returns frame x position.
 */
Animation.prototype.getFramePosX = function () {

    return this.frame.posX;
}

/**
 * Plays the animation from the current frame.
 */
Animation.prototype.play = function () {

    this.active = true;
}

/**
 * Stops the animation on the current frame.
 */
Animation.prototype.pause = function () {

    this.active = false;
}

/**
 * Stops the animation and resets to the first frame.
 */
Animation.prototype.stop = function () {

    this.active = false;
    this.frame.index = 0;
    this.frame.posX = 0;
    this.frame.time = 0.0;
}

/**
 * Sets the animation speed (lower is faster).
 */
Animation.prototype.setRate = function (rate) {

    if (rate < 0.0) {
        this.rate = 0.1;
    } else {
        this.rate = rate;
    }
}

/**
 * Sets looping status of the animation.
 */
Animation.prototype.setLoop = function (loop) {

    this.loop = loop;
}



/**************************************************************************************************
 *
 *    File: texture.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 22/08/19
 * 
 *    Info: Texture component of the engine. 
 *          Used to setup a image for a sprite object.
 *          Can be used to setup a spritesheet image for animating a sprite.
 */

/**
 * @constructor Creates a new Texture object.
 * @param {string} texturePath The file path of the texture.
 */
var Texture = function (texturePath) {

    this.image = new Image();
    this.image.src = texturePath;
}

/**
 * Checks if the texture has fully loaded.
 * @returns {boolean} Returns true if loaded.
 */
Texture.prototype.loaded = function () {

    return this.image.complete;
}

/**
 * Gets the image object used for the texture.
 * @returns {object} Returns the image object.
 */
Texture.prototype.getImage = function () {

    return this.image;
}

/**
 * Sets the file path of the texture.
 */
Texture.prototype.setPath = function (texturePath) {

    this.image.src = texturePath;
}

/**
 * Gets the file path of the texture.
 * @returns {boolean} Returns the file path.
 */
Texture.prototype.getPath = function () {

    return this.image.src;
}



/**************************************************************************************************
 *
 *    File: sprite.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 22/08/19
 * 
 *    Info: Sprite component of the engine. 
 *          Used to create game objects in a game project.
 *          Supports basic features such as positioning, scaling, animating and physics.
 * 
 *   Notes: v1.1 - 01/09/19
 *          Added new function 'getHalfWidth'.
 *          Added new function 'getHalfHeight'.
 *          Added 2nd parameter 'size' to function 'setTexture'.
 *          Renamed function 'newAnimation' to 'setupAnimation'.
 */

/**
 * @constructor Creates a new Sprite object.
 * @param {object} texture The texture for the sprite.
 * @param {object} size The size of the sprite.
 * @param {object} position The position of the sprite (origin 0.5).
 * @param {boolean} activePhysics Turn physics body on or off.
 */
var Sprite = function (texture = null, size = { w: 0, h: 0 }, position = { x: 0, y: 0 }, activePhysics) {

    this.texture = texture;
    this.animation = new Animation(false, false, size, 1, 1.0);
    this.physicsBody = new PhysicsBody(PHYSICS_BODY_TYPE.BOX, size, activePhysics);
    this.width = size.w;
    this.height = size.h;
    this.originX = 0.5;
    this.originY = 0.5;
    this.x = position.x - (this.width * this.originX);
    this.y = position.y - (this.height * this.originY);
    this.isVisible = true;
}

/**
 * Sets the texture.
 */
Sprite.prototype.setTexture = function (texture, size) {

    this.texture = texture;
    var oldWidth = this.width;
    var oldHeight = this.height;
    this.width = size.w;
    this.height = size.h;
    this.x -= (this.width - oldWidth) * this.originX;
    this.y -= (this.height - oldHeight) * this.originY;
    this.animation.setFrameWidth(this.width);
    this.animation.setFrameHeight(this.height);
    this.physicsBody.setSize({ w: this.width, h: this.height });
}

/**
 * Gets the texture (if loaded).
 * @returns {object} Returns an image object or NULL.
 */
Sprite.prototype.getTexture = function () {

    if (this.texture.loaded()) {

        return this.texture.getImage();
    }

    return null;
}

/**
 * Sets the texture file path.
 */
Sprite.prototype.setTexturePath = function (texturePath) {

    this.texture.setPath(texturePath);
}

/**
 * Sets the texture file path.
 * @returns {string} Returns the file path.
 */
Sprite.prototype.getTexturePath = function () {

    return this.texture.getPath();
}

/**
 * Gets the size of the sprite.
 * @returns {object} Returns the size.
 */
Sprite.prototype.getSize = function () {

    return { w: this.width, h: this.height };
}

/**
 * Gets the width of the sprite.
 * @returns {number} Returns the width.
 */
Sprite.prototype.getWidth = function () {

    return this.width;
}

/**
 * Gets half of the width of the sprite.
 * @returns {number} Returns half the width.
 */
Sprite.prototype.getHalfWidth = function () {

    return (this.width * 0.5);
}

/**
 * Gets the height of the sprite.
 * @returns {number} Returns the height.
 */
Sprite.prototype.getHeight = function () {

    return this.height;
}

/**
 * Gets half of the height of the sprite.
 * @returns {number} Returns half the height.
 */
Sprite.prototype.getHalfHeight = function () {

    return (this.height * 0.5);
}

/**
 * Sets the position of the sprite.
 */
Sprite.prototype.setPosition = function (x, y) {

    this.x = x - (this.width * this.originX);
    this.y = y - (this.height * this.originY);
}

/**
 * Gets the position of the sprite.
 * @returns {object} Returns the position.
 */
Sprite.prototype.getPosition = function () {

    return {
        x: this.x + (this.width * this.originX),
        y: this.y + (this.height * this.originY)
    };
}

/**
 * Sets the x position of the sprite.
 */
Sprite.prototype.setX = function (x) {

    this.x = x - (this.width * this.originX);
}

/**
 * Gets the x position of the sprite.
 * @returns {number} Returns the x position.
 */
Sprite.prototype.getX = function () {

    return this.x + (this.width * this.originX);
}

/**
 * Gets the draw x position of the sprite
 * @returns {number} Returns the draw x position.
 */
Sprite.prototype.getDrawX = function () {

    return this.x;
}

/**
 * Sets the y position of the sprite.
 */
Sprite.prototype.setY = function (y) {

    this.y = y - (this.height * this.originY);
}

/**
 * Gets the y position of the sprite.
 * @returns {number} Returns the y position.
 */
Sprite.prototype.getY = function () {

    return this.y + (this.height * this.originY);
}

/**
 * Gets the draw y position of the sprite
 * @returns {number} Returns the draw y position.
 */
Sprite.prototype.getDrawY = function () {

    return this.y;
}

/**
 * Moves the sprite on the x axis by a given amount.
 */
Sprite.prototype.moveX = function (moveAmount) {

    this.x += moveAmount;
}

/**
 * Moves the sprite on the y axis by a given amount.
 */
Sprite.prototype.moveY = function (moveAmount) {

    this.y += moveAmount;
}

/**
 * Sets the origin of the sprite.
 */
Sprite.prototype.setOrigin = function (originX, originY) {

    if (originX < 0.0) {
        this.originX = 0.0;
    } else if (originX > 1.0) {
        this.originX = 1.0;
    } else {
        this.originX = originX;
    }

    if (originY < 0.0) {
        this.originY = 0.0;
    } else if (originY > 1.0) {
        this.originY = 1.0;
    } else {
        this.originY = originY;
    }
}

/**
 * Scales the sprite by a given amount.
 */
Sprite.prototype.scale = function (scale) {

    if (scale > 0 && scale < 1000) {
        var oldWidth = this.width;
        var oldHeight = this.height;
        this.width = this.width * scale;
        this.height = this.height * scale;
        this.x -= (this.width - oldWidth) * this.originX;
        this.y -= (this.height - oldHeight) * this.originY;
        this.physicsBody.setSize({ w: this.width, h: this.height });
    }
}

/**
 * Checks if the sprite should be drawn.
 * @returns {boolean} Returns true if loaded and is visible.
 */
Sprite.prototype.draw = function () {

    if (this.texture.loaded() && this.isVisible) {

        return true;
    }

    return false;
}

/**
 * Shows the sprite.
 */
Sprite.prototype.show = function () {

    this.isVisible = true;
}

/**
 * Hides the sprite.
 */
Sprite.prototype.hide = function () {

    this.isVisible = false;
}

/**
 * Sets a new animation for the sprite.
 */
Sprite.prototype.setupAnimation = function (size, frameCount, frameSpeed, loop) {

    this.animation.setup(size, frameCount, frameSpeed, loop);
}

/**
 * Updates the sprite animation.
 */
Sprite.prototype.updateAnimation = function (deltaTime) {

    this.animation.update(deltaTime);
}

/**
 * Checks if the sprite animation is active.
 * @returns {boolean} Returns true if active.
 */
Sprite.prototype.isAnimationActive = function () {

    return this.animation.isActive();
}

/**
 * Gets the width of a single sprite animation frame.
 * @returns {number} Returns the frame width.
 */
Sprite.prototype.getAnimationFrameWidth = function () {

    return this.animation.getFrameWidth();
}

/**
 * Gets the height of a single sprite animation frame.
 * @returns {number} Returns the frame height.
 */
Sprite.prototype.getAnimationFrameHeight = function () {

    return this.animation.getFrameHeight();
}

/**
 * Sets the sprite animation frame x position.
 */
Sprite.prototype.setAnimationFramePosX = function (index) {

    this.animation.setFramePosX(index);
}

/**
 * Gets the sprite animation frame x position.
 * @returns {boolean} Returns the frame x position.
 */
Sprite.prototype.getAnimationFramePosX = function () {

    return this.animation.getFramePosX();
}

/**
 * Plays the sprite animation.
 */
Sprite.prototype.playAnimation = function () {

    this.animation.play();
}

/**
 * Pauses the sprite animation.
 */
Sprite.prototype.pauseAnimation = function () {

    this.animation.pause();
}

/**
 * Stops the sprite animation.
 */
Sprite.prototype.stopAnimation = function () {

    this.animation.stop();
}

/**
 * Sets the speed of the sprite animation.
 */
Sprite.prototype.setAnimationSpeed = function (speed) {

    this.animation.setSpeed(speed);
}

/**
 * Sets the looping status of the sprite animation.
 */
Sprite.prototype.setAnimationLoop = function (loop) {

    this.animation.setLoop(loop);
}

/**
 * Checks if the sprite physics is active.
 * @returns {boolean} Returns true if active.
 */
Sprite.prototype.isPhysicsActive = function () {

    return this.physicsBody.isActive();
}

/**
 * Activates the sprite physics.
 */
Sprite.prototype.activatePhysics = function () {

    this.physicsBody.activate();
}

/**
 * Deactivates the sprite physics.
 */
Sprite.prototype.deactivatePhysics = function () {

    this.physicsBody.deactivate();
}

/**
 * Gets the sprite physics body.
 * @returns {object} Returns the physics body.
 */
Sprite.prototype.getPhysicsBody = function () {

    return this.physicsBody.getBody();
}

/**
 * Sets the sprite physics body.
 */
Sprite.prototype.setPhysicsBody = function (bodyType) {

    this.physicsBody.setBody(bodyType, { w: this.width, h: this.height });
}

/**
 * Sets the size of sprite physics body.
 */
Sprite.prototype.setPhysicsBodySize = function (size) {

    this.physicsBody.setSize(size);
}



/**************************************************************************************************
 *
 *    File: time.js
 * 
 * Version: 1.0
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 26/08/19
 * 
 *    Info: Time component of the engine. 
 *          Used to calculate the frame time.
 *          Keeps a history of frame times and calculates the average frame rate.
 */

/**
 * @constructor Creates a new Time object.
 */
var Time = function () {

    this.currentTime = 0.0;
    this.deltaTime = 0.0;
    this.fpsBuffer = [Array(60).fill(60.0)];
    this.fpsBufferMax = 60.0;
    this.fpsBufferIndex = 0;
    this.fps = 60;
}

/**
 * Calculates the number of seconds passed since the last frame.
 */
Time.prototype.updateDT = function (elapsedTime) {

    this.deltaTime = (elapsedTime - this.currentTime) / 1000.0;
    this.currentTime = elapsedTime;
}

/**
 * Updates the average frames per seconds value.
 */
Time.prototype.updateFPS = function () {

    // Calculate the current FPS.
    this.fpsBuffer[this.fpsBufferIndex] = Math.round(1.0 / this.deltaTime);

    // Update the buffer index and fps value every 60 frames.
    if (this.fpsBufferIndex + 1 != this.fpsBufferMax) {
        this.fpsBufferIndex += 1;
    } else {
        this.fpsBufferIndex = 0;

        // Calculate the average FPS (unwinded loop for performance).
        var avgFps = (
            this.fpsBuffer[0]  + this.fpsBuffer[1]  + this.fpsBuffer[2]  + this.fpsBuffer[3]  + this.fpsBuffer[4]  +
            this.fpsBuffer[5]  + this.fpsBuffer[6]  + this.fpsBuffer[7]  + this.fpsBuffer[8]  + this.fpsBuffer[9]  +
            this.fpsBuffer[10] + this.fpsBuffer[11] + this.fpsBuffer[12] + this.fpsBuffer[13] + this.fpsBuffer[14] +
            this.fpsBuffer[15] + this.fpsBuffer[16] + this.fpsBuffer[17] + this.fpsBuffer[18] + this.fpsBuffer[19] +
            this.fpsBuffer[20] + this.fpsBuffer[21] + this.fpsBuffer[22] + this.fpsBuffer[23] + this.fpsBuffer[24] +
            this.fpsBuffer[25] + this.fpsBuffer[26] + this.fpsBuffer[27] + this.fpsBuffer[28] + this.fpsBuffer[29] +
            this.fpsBuffer[30] + this.fpsBuffer[31] + this.fpsBuffer[32] + this.fpsBuffer[33] + this.fpsBuffer[34] +
            this.fpsBuffer[35] + this.fpsBuffer[36] + this.fpsBuffer[37] + this.fpsBuffer[38] + this.fpsBuffer[39] +
            this.fpsBuffer[40] + this.fpsBuffer[41] + this.fpsBuffer[42] + this.fpsBuffer[43] + this.fpsBuffer[44] +
            this.fpsBuffer[45] + this.fpsBuffer[46] + this.fpsBuffer[47] + this.fpsBuffer[48] + this.fpsBuffer[49] +
            this.fpsBuffer[50] + this.fpsBuffer[51] + this.fpsBuffer[52] + this.fpsBuffer[53] + this.fpsBuffer[54] +
            this.fpsBuffer[55] + this.fpsBuffer[56] + this.fpsBuffer[57] + this.fpsBuffer[58] + this.fpsBuffer[59]
        ) / 60.0;

        // Update fps value (ignore values after decimal using bitshift).
        this.fps = (avgFps >> 0);
    }
}

/**
 * Gets the delta time value.
 * @returns {number} Returns delta time.
 */
Time.prototype.getDT = function () {

    return this.deltaTime;
}

/**
 * Gets the average frames per second value.
 * @returns {number} Returns frames per second.
 */
Time.prototype.getFPS = function () {

    return this.fps;
}



/**************************************************************************************************
 *
 *    File: engine.js
 * 
 * Version: 1.1
 *
 *  Author: Simon Rybicki (SSR)
 * 
 *    Date: 20/08/19
 * 
 *    Info: The core of the engine. 
 *          Used to setup and manage different types of game objects.
 *          Has support for up to 1000 sprite and text objects, and 100 sound effects. 
 *          Targets a maximum frame rate of 60 fps.
 * 
 *   Notes: v1.1 - 01/09/19
 *          Added new function 'isJoypadConnected'.
 */

/**
 * @constructor Creates a new Engine object.
 * @param {string} canvasID The ID of the the canvas element.
 * @param {string} backgroundColour The background colour of the canvas.
 */
var Engine = function (canvasID, backgroundColour = COLOUR_HEX.BLACK) {

    // Set the canvas colour.
    document.getElementById(canvasID).style.backgroundColor = backgroundColour;

    // The request animation frame ID value.
    this.requestAFID = null;

    // Get the canvas element.
    this.canvas = document.getElementById(canvasID);

    // Get the 2D context of the canvas object.
    this.context = this.canvas.getContext('2d');

    // Set the window width based on the width of the canvas.
    this.windowWidth = this.canvas.width;

    // Set the window height based on the height of the canvas.
    this.windowHeight = this.canvas.height;

    // Flag to display the performance stats.
    this.showStats = false;

    // List of sprite objects.
    this.sprites = [];

    // Number of sprite objects added.
    this.spriteCount = 0;

    // The maximum number of sprite objects.
    this.spriteLimit = 1000;

    // List of text objects.
    this.texts = [];

    // Number of text objects added.
    this.textCount = 0;

    // The maximum number of text objects.
    this.textLimit = 1000;

    // List of sound objects.
    this.sounds = [];

    // Number of sound objects.
    this.soundCount = 0;

    // The maximum number of sound objects.
    this.soundLimit = 100;

    // The main game loop function.
    this.gameLoop = null;

    // Flag to indicate if the engine is on or off.
    this.isRunning = false;

    // Internal engine specific components.
    this.time = new Time();
    this.input = new Input();
    this.physics = new Physics();
}

/**
 * Sets the engine running flag to true.
 * Sets the requestion animation frame callback function to the game loop function in the game logic.
 * Begins the first call to the the game loop function.
 * @param {function} gameLoop The game loop function.
 */
Engine.prototype.start = function (gameLoop) {

    this.isRunning = true;
    this.gameLoop = gameLoop;
    window.requestAnimationFrame(this.gameLoop);
}

/**
 * Sets the show FPS flag to true.
 */
Engine.prototype.showFps = function () {

    this.showStats = true;
}

/**
 * Gets the frame time.
 * @returns Returns frame time.
 */
Engine.prototype.frameTime = function () {

    return this.time.getDT();
}

/**
 * Draws the game objects to the canvas object.
 * Could also display the performance stats.
 */
Engine.prototype.draw = function () {

    // Clear the canvas.
    this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);

    // Draw sprite objects.
    for (var i = 0; i < this.spriteCount; i++) {
        if (this.sprites[i] !== undefined && this.sprites[i].draw()) {
            this.context.drawImage(this.sprites[i].getTexture(), this.sprites[i].getAnimationFramePosX(), 0,
                                   this.sprites[i].getAnimationFrameWidth(), this.sprites[i].getAnimationFrameHeight(),
                                   this.sprites[i].getDrawX(), this.sprites[i].getDrawY(),
                                   this.sprites[i].getWidth(), this.sprites[i].getHeight());
        }
    }

    // Draw text objects.
    for (var i = 0; i < this.textCount; i++) {
        if (this.texts[i] !== undefined && this.texts[i].draw()) {
            this.context.font = this.texts[i].getFont();
            this.context.fillStyle = this.texts[i].getColour();
            this.context.fillText(this.texts[i].getText(), this.texts[i].getX(), this.texts[i].getY());
        }
    }

    // Check to show performance stats.
    if (this.showStats) {
        this.context.fillStyle = '#8ACF17';
        this.context.fillRect(0, 0, 100, 80);
        this.context.font = 'bold 72px Arial';
        this.context.fillStyle = '#FFFFFF';
        this.context.fillText('' + this.time.getFPS(), 10, 65);
    }
}

/**
 * Updates the frame time and sprite object animations.
 * Calls the game loop.
 */
Engine.prototype.update = function (elapsedTime) {

    this.time.updateDT(elapsedTime);

    // Animate sprite objects.
    for (var i = 0; i < this.spriteCount; i++) {
        if (this.sprites[i] !== undefined && this.sprites[i].isAnimationActive()) {
            this.sprites[i].updateAnimation(this.time.getDT());
        }
    }

    if (this.showStats) {
        this.time.updateFPS();
    }

    if (this.input.isJoypadEnabled()) {
        this.input.joyClear();
    }

    // Run next game loop cycle.
    this.requestAFID = window.requestAnimationFrame(this.gameLoop);
}

/**
 * Stops the game loop and clears the canvas.
 * Sets the engine running flag to false.
 */
Engine.prototype.stop = function () {

    window.cancelAnimationFrame(this.requestAFID);
    this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);
    this.isRunning = false;
}

/**
 * Gets the width of the window (canvas).
 * @returns {number} Returns the width.
 */
Engine.prototype.getWindowWidth = function () {

    return this.windowWidth;
}

/**
 * Gets the height of the window (canvas).
 * @returns {number} Returns the height.
 */
Engine.prototype.getWindowHeight = function () {

    return this.windowHeight;
}

/**
 * Creates a new texture object.
 * @returns {object} Returns texture.
 */
Engine.prototype.createTexture = function (texturePath) {

    return (new Texture(texturePath));
}

/**
 * Creates a new sprite object and adds it to the sprite list.
 * @returns {object} Returns a sprite object or NULL.
 */
Engine.prototype.createSprite = function (texturePath, width, height, x, y) {

    var freeSlotIndex = -1;
    for (var i = 0; i < this.textCount; i++) {
        if (this.texts[i] === undefined) {
            freeSlotIndex = i;
            break;
        }
    }

    if (freeSlotIndex != -1) {
        var uniqueObjectID = (Date.now() + ((Math.random() * 100000).toFixed()));
        var newSprite = new Sprite(texturePath, width, height, x, y);
        newSprite.id = uniqueObjectID;
        this.sprites[freeSlotIndex] = newSprite;

        return newSprite;

    } else if (this.spriteCount != this.spriteLimit) {
        var uniqueObjectID = (Date.now() + ((Math.random() * 100000).toFixed()));
        var newSprite = new Sprite(texturePath, width, height, x, y);
        newSprite.id = uniqueObjectID;
        this.sprites.push(newSprite);
        this.spriteCount += 1;

        return newSprite;
    }

    // No free memory slot or reached maximum sprite count.
    return null;
}

/**
 * Deletes a sprite in the sprite list.
 */
Engine.prototype.removeSprite = function (targetSprite) {

    if (targetSprite.id != undefined) {
        for (var i = 0; i < this.spriteCount; i++) {
            if (this.sprites[i].id == targetSprite.id) {
                this.sprites[i].delete();
                this.sprites[i].id = undefined;
                this.sprites[i] = undefined;
                break;
            }
        }
    }
}

/**
 * Creates a new text object and adds it to the text list.
 * @returns {object} Returns a text object or NULL.
 */
Engine.prototype.createText = function (text, fontSize, fontType, fontWeight, colour, position) {

    var freeSlotIndex = -1;
    for (var i = 0; i < this.textCount; i++) {
        if (this.texts[i] === undefined) {
            freeSlotIndex = i;
            break;
        }
    }

    if (freeSlotIndex != -1) {
        var uniqueObjectID = (Date.now() + ((Math.random() * 100000).toFixed()));
        var newText = new Text(text, fontSize, fontType, fontWeight, colour, position);
        newText.id = uniqueObjectID;
        this.texts[freeSlotIndex] = newText;

        return newText;

    } else if (this.textCount != this.textLimit) {
        var uniqueObjectID = (Date.now() + ((Math.random() * 100000).toFixed()));
        var newText = new Text(text, fontSize, fontType, fontWeight, colour, position);
        newText.id = uniqueObjectID;
        this.texts.push(newText);
        this.textCount += 1;

        return newText;
    }

    // No free memory slot or reached maximum text count.
    return null;
}

/**
 * Deletes a text in the text list.
 */
Engine.prototype.removeText = function (targetText) {

    if (targetText.id != undefined) {
        for (var i = 0; i < this.textCount; i++) {
            if (this.texts[i].id == targetText.id) {
                this.texts[i].delete();
                this.texts[i].id = undefined;
                this.texts[i] = undefined;
                break;
            }
        }
    }
}

/**
 * Creates a new sound object and adds it to the sound list.
 * @returns {object} Returns a sound object or NULL.
 */
Engine.prototype.createSound = function (soundPath, loop) {

    if (this.soundCount != this.soundLimit) {
        var uniqueObjectID = (Date.now() + ((Math.random() * 100000).toFixed()));
        var newSound = new Sound(soundPath, loop);
        newSound.id = uniqueObjectID;
        this.sounds.push(newSound);
        this.soundCount += 1;

        return newSound;
    }

    // Reached maximum sound count.
    return null;
}

/**
 * Checks a single key input from the keyboard.
 * @returns {boolean} Returns true if the key has been pressed once.
 */
Engine.prototype.keyPress = function (keyCode) {

    return this.input.keyPress(keyCode);
}

/**
 * Checks a continuous key input from the keyboard.
 * @returns {boolean} Returns true if the key has been pressed and held down.
 */
Engine.prototype.keyHold = function (keyCode) {

    return this.input.keyHold(keyCode);
}

/**
 * Checks if the first joypad is connected.
 * @returns Returns true if the joypad is connected.
 */
Engine.prototype.isJoypadConnected = function () {

    return this.input.isJoypadConnected();
}

/**
 * Enables the joypad control option.
 */
Engine.prototype.enableJoypad = function () {

    this.input.enableJoypad();
}

/**
 * Disables the joypad control option.
 */
Engine.prototype.disableJoypad = function () {

    this.input.disableJoypad();
}

/**
 * Checks a single button input from the joypad.
 * @returns {boolean} Returns true if the joypad is enabled and the button has been pressed once.
 */
Engine.prototype.joyPress = function (joyCode) {

    if (this.input.isJoypadEnabled()) {

        return this.input.joyPress(joyCode);
    }

    // Joypad has not been enabled.
    return null;
}

/**
 * Checks a continuous button input from the joypad.
 * @returns {boolean} Returns true if the joypad is enabled and button has been pressed and held down.
 */
Engine.prototype.joyHold = function (joyCode) {

    if (this.input.isJoypadEnabled()) {

        return this.input.joyHold(joyCode);
    }

    // Joypad has not been enabled.
    return null;
}

/**
 * Turns the physics engine on or off.
 */
Engine.prototype.setPhysicsStatus = function (on) {

    if (on) {
        this.physics.enable();
    } else {
        this.physics.disable();
    }
}

/**
 * Checks a collision between 2 sprite objects.
 * @returns {boolean} Returns true if there was a collision.
 */
Engine.prototype.spriteCollision = function (bodyA, bodyB, posA, posB) {

    if (this.physics.isEnabled() && bodyA.active && bodyB.active) {

        return this.physics.collision(bodyA, bodyB, posA, posB);
    }

    return false;
}

/**
 * Gets a random number between 2 whole numbers.
 * @returns {number} Returns a random whole number.
 */
Engine.prototype.randomNumber = function (min, max) {

    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Gets a random number between 2 decimal numbers.
 * @returns {number} Returns a random decimal number.
 */
Engine.prototype.randomNumberDecimal = function (min, max) {

    return (Math.random() * (max - min) + min).toFixed(1);
}