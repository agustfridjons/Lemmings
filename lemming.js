// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function lemming(descr) {

    // Common inherited setup logic from Entity
    this.rememberResets();
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.img0;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.2;
};

lemming.prototype = new Entity();

lemming.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

lemming.prototype.KEY_JUMP = 'W'.charCodeAt(0);
lemming.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
lemming.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

lemming.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
lemming.prototype.cx = 200;
lemming.prototype.cy = 200;
lemming.prototype.velX = 0;
lemming.prototype.velY = 0;
lemming.prototype.intervalVelY = 0;
lemming.prototype.useGravity = false;
lemming.prototype.useAveVel = true;
lemming.prototype.isGoingRight = true;
lemming.prototype.dropping = false;
lemming.prototype.numSubSteps = 3;

lemming.prototype.currentIMG = 0;
lemming.prototype.time = 0;
    
lemming.prototype.update = function (du) {
    
    // Change current image at certain interval    
    if (this.time % 10 === 0) {
        if (this.currentIMG < 3) {
            this.currentIMG++;
        } else {
            this.currentIMG = 0;
        }
    }
    this.time++;
    // Unregister and check for death
    spatialManager.unregister(this);

    // Check if entity is dead
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    // Reverse velocity if lemming is at canvas edge
    if (this.cx + this.radius > g_canvas.width ||
        this.cx - this.radius < 0) {
        this.velX *= -1;
    }
    var blocks = this.getAdjacentBlocks();

    //console.log("blocks pos: ", blocks.posX[2]);
    //console.log("width: ", blocks.blockWidth);
    

    // Move lemming
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    spatialManager.register(this);
};

var NOMINAL_GRAVITY = 0.04;


lemming.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

lemming.prototype.getAdjacentBlocks = function () {
    return entityManager.grid.findAdBlocks(this.cx, this.cy, this.radius);
};

lemming.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};
