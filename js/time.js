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