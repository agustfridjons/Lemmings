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
lemming.prototype.KEY_DOWN  = 'S'.charCodeAt(0);

lemming.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
lemming.prototype.cx = 200;
lemming.prototype.cy = 200;
lemming.prototype.velX = 0;
lemming.prototype.velY = 1;
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

    // Returns -1 if lemming is not colliding with block
    // Returns 0 if lemming is colliding with top of block
    // Returns 1 if lemming is colliding with bottom of block
    // Returns 2 if lemming is colliding with left side of block
    // Returns 3 if lemming is colliding with right side of block
    var collision = entityManager.grid.isColliding(this.cx, this.cy, 
                                this.radius, this.velX, this.velY);
    //console.log(collision);
    
    if (collision === 0 || collision === 1) {
        this.velY *= -1;
    }
    if (collision === 2 || collision === 3) {
        this.velX *= -1;
    }
    if(eatKey(this.KEY_JUMP)){
        this.velY = -1;
        this.velX = 0;
    }
    if(eatKey(this.KEY_DOWN)){
        this.velY = 1;
        this.velX = 0;
    }
    if(entityManager.grid.collidesWith(this.cx,this.cy,this.velX,this.velY,this.radius) ===-1){
        this.velY = 0;
        this.velX *= -1;
    }
    if(eatKey(this.KEY_LEFT)){
        this.velY = 0;
        this.velX = -1;
    }

    /*
    if (blocks.blocks[2] === 1
        && this.cy + this.radius > blocks.posY[2] - blocks.blockWidth) {
        this.dropping = false;
        this.velY = 0;
        this.velX = 1;
        }else {
        this.velX = 0;
        this.velY += NOMINAL_GRAVITY * du;
    }
    if(blocks.blocks[3] === 1){
        this.velX *= -1;
    }
    */
    if (eatKey(this.KEY_JUMP)) {
        this.velY = -1;
        this.velX = 0;
    }
    if (eatKey(this.KEY_DOWN)) {
        this.velY = 1;
        this.velX = 0;
    }
    if (eatKey(this.KEY_RIGHT)) {
        this.velX = 1;
        this.velY = 0;
    }
    if (eatKey(this.KEY_LEFT)) {
        this.velX = -1;
        this.velY = 0;
    }

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
