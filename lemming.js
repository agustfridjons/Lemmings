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

    //this.radius = this.sprite.width/2;
    // Set normal drawing scale, and warp state off
    this._scale = 1;
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
lemming.prototype.KEY_STOP  = 'E'.charCodeAt(0);
lemming.prototype.KEY_GRAVITY  = 'Z'.charCodeAt(0);

lemming.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
lemming.prototype.cx = 60;
lemming.prototype.cy = 348;
lemming.prototype.velX = -1.5;
lemming.prototype.velY = 0;
lemming.prototype.isGoingRight = true;
lemming.prototype.numSubSteps = 3;

lemming.prototype.lifeSpan = 1500 / NOMINAL_UPDATE_INTERVAL;
lemming.prototype.isDying = false;
lemming.prototype.explodingIMG = 0; 
lemming.prototype.isExploding = false;


lemming.prototype.currentIMG = 0;
lemming.prototype.time = 0;
    


lemming.prototype.update = function (du) {
    
    // Change current image at certain interval
    if(!this.isExploding){    
        if (this.time % 10 === 0) {
            if (this.currentIMG < 7) {
                this.currentIMG++;
            } else {
                this.currentIMG = 0;
            }
        }
    } else {
        if (this.time % 10 === 0) {
            if (this.currentIMG < 3) {
                this.currentIMG++;
            } else {
                this.currentIMG = 0;
            }
        }
    }
    if(this.isExploding){
        this.lifeSpan -= du*2;
    }
    this.time++;
    // Unregister and check for death
    spatialManager.unregister(this);

    // Check if entity is dead
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.velX * du;
    var nextY = prevY + this.velY * du;
    var temp = entityManager.grid.findCurrentBlock(this.cx,this.cy);
    //var belowTop = entityManager.grid.position[temp.y+1][temp.x].cy - entityManager.grid.halfHeight;


    // Block collision
    if (entityManager.grid.collidesVertical(prevX, prevY, nextX, nextY, this.radius, this.velY  < 0)) {
        if (this.velY > 0) {
            this.velY = 0;
            //this.cy = belowTop - this.radius - 0.5;
        } else {
            this.velY *= -1;
        }
    }
    if (entityManager.grid.collidesHorizontal(prevX, prevY, nextX, nextY, this.radius, this.velX < 0)) {
        this.velX *= -1; // change direction of lemming
    }
    
    if (eatKey(this.KEY_JUMP)) {
        this.velY = -4;
        //this.velX = 0;
    }
    if (eatKey(this.KEY_DOWN)) {
        this.velY = 1;
    }
    if (eatKey(this.KEY_RIGHT)) {
        this.velX *= -1;
        this.velY = 0;
    }
    if (eatKey(this.KEY_LEFT)) {
        this.velX *= -1;
        this.velY = 0;
    }
    if (eatKey(this.KEY_STOP)) {
        this.velX = 0;
        this.velY = 0;
    }
    // Get the id of current block and bottom blocks
    var BlocksID = entityManager.grid.getBottomBlockID(this.cx, this.cy);
    // Get position of adjacent blocks
    var adBlocks = entityManager.grid.findAdjacentBlocks(this.cx, this.cy);
    // React to specialBlocks
    this.specialReaction(BlocksID, adBlocks, du);
    
    // Move lemming
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    spatialManager.register(this);
};

var NOMINAL_GRAVITY = 0.1;

lemming.prototype.specialReaction = function(BlocksID, adBlocks, du) {
    var currentBlockPos = adBlocks[1][1];
    if (BlocksID[0] != 1) {
        this.velY += NOMINAL_GRAVITY;
    } else if (BlocksID[1] === 5) {
        this.velY = -4;
    } else if (BlocksID[1] === 7) {
        if(this.velX > 0){
            this.velX *= -1;
        }
         else if (currentBlockPos.cy < this.cy + (this.radius/1.5)) {
            this.velY = -1.5;
            this.velX = -1.5;
        } else {
            this.velY = -4;
            this.velX = 1.5;
        }
    } else if (BlocksID[1] === 6) {
        if(this.velX < 0){
            this.velX *= -1;
        }
        else if (currentBlockPos.cy < this.cy + (this.radius)) {
            this.velY = -1.5;
        } else {
            this.velY = -4;
            this.velX = -1.5;
        }
    } else if (BlocksID[1] === 3) {
        this.lifeSpan -= du;
        this.currentIMG = 1;
        this.velX /= 1.02;
    } else if (BlocksID[1] === 2) {
        this.isExploding = true;
        if(this.currentIMG >3) this.currentIMG = 0;
        this.sprite = g_sprites.explosion;
        this.velX = 0;
        this.velY = 0;

        //this.lifeSpan -= du * 2;
        //if (currentBlockPos)
        // WORK IN PROGRESS MOTHERFUCKERS
    }
};

lemming.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};

lemming.prototype.getAdjacentBlocks = function () {
    return entityManager.grid.findAdBlocks(this.cx, this.cy, this.radius);
};

lemming.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;

    var fadeThresh = lemming.prototype.lifeSpan / 3;

    if (this.lifeSpan < fadeThresh) {
       ctx.globalAlpha = this.lifeSpan / fadeThresh;
    }
    if (this.lifeSpan < 0) {
        ctx.globalAlpha = 0;
    }
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
    ctx.globalAlpha = 1;
};
