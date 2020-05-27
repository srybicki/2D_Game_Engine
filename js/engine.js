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