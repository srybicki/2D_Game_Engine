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