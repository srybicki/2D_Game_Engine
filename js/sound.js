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