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