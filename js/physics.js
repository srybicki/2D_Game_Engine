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