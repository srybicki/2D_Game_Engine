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