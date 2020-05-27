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