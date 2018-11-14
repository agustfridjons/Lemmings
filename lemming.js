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
lemming.prototype.numSubSteps = 6;

lemming.prototype.lifeSpan = 1500 / NOMINAL_UPDATE_INTERVAL;
lemming.prototype.isDying = false;
lemming.prototype.explodingIMG = 0; 
lemming.prototype.isExploding = false;
lemming.prototype.isLeaving = false;
lemming.prototype.isDropping = false;

lemming.prototype.currentIMG = 0;
lemming.prototype.time = 0;


lemming.prototype.update = function (du) {

    if(this.velX < 0){
        this.sprite = g_sprites.reverse;
    } else if(this.velX > 0){
        this.sprite = g_sprites.img0;
    }
    
    // Change current image at certain interval
    if(!this.isExploding){    
        if (this.time % 10 === 0) {
            if (this.currentIMG < 7) {
                this.currentIMG++;
            } else {
                this.currentIMG = 0;
            }
        }
    } else if(this.isLeaving){
        this.currentIMG = 8;
    }else {
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

    // Check if lemming is dead
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    if (this.lifeSpan < 0) { 
        if (this.isLeaving) {
            entityManager.grid.removeLemming(false);
        } else {
            entityManager.grid.removeLemming(true);
        }
        return entityManager.KILL_ME_NOW;
    }

    this.computeSubsteps(du/this.numSubSteps);

    var temp = entityManager.grid.findCurrentBlock(this.cx,this.cy);
    //var belowTop = entityManager.grid.position[temp.y+1][temp.x].cy - entityManager.grid.halfHeight;

    
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
    var BlocksIDleft = entityManager.grid.getBottomBlockID(this.cx-this.radius, this.cy);
    var BlocksIDright = entityManager.grid.getBottomBlockID(this.cx+this.radius, this.cy);
    // Get position of adjacent blocks
    var adBlocks = entityManager.grid.findAdjacentBlocks(this.cx, this.cy);
    // React to specialBlocks
    this.specialReaction(BlocksID, BlocksIDleft, BlocksIDright, adBlocks, du);
    
    if (this.isDropping) {
        this.velY += NOMINAL_GRAVITY;
    }
    // Move lemming
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    spatialManager.register(this);
};

lemming.prototype.computeSubsteps = function(du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.velX * du;
    var nextY = prevY + this.velY * du;

    for (var i = 0; i < this.numSubSteps; i++) {
        // Block collision
        if (entityManager.grid.collidesVertical(prevX, prevY, nextX, nextY, this.radius, this.velY  < 0)) {
            if (this.velY > 0) {
                this.velY = 0;
                this.isDropping = false;
                //console.log("its a hit");
                return;
            } else {
                this.velY *= -1;
                //console.log("its a hit");
                return;
            }
        }
        if (entityManager.grid.collidesHorizontal(prevX, prevY, nextX, nextY, this.radius, this.velX < 0)) {
            this.velX *= -1; // change direction of lemming
            //console.log("its a hit");
            return;
        }
        prevX = nextX;
        prevY = nextY;
        nextX = prevX + this.velX * du;
        nextY = prevY + this.velY * du;
    }
};

var NOMINAL_GRAVITY = 0.1;

lemming.prototype.specialReaction = function(BlocksID, BlocksIDleft, BlocksIDright, adBlocks, du) {
    //console.log(this.radius);
    var currentBlockPos = adBlocks[1][1];
    if (BlocksID[0] != 1 && BlocksIDleft[0] != 1 && BlocksIDright[0] != 1) {
        this.isDropping = true;
    }
    /*if (BlocksID[0] != 1) {
        this.isDropping = true;
    } else*/ if (BlocksID[1] === 5 && this.cy > currentBlockPos.cy) {
        this.isDropping = true;
        this.velY = -4.5;
    } else if (BlocksID[1] === 9 && this.cy > currentBlockPos.cy) {
        this.isDropping = true;
        this.velY = -3.2;
    } else if (BlocksID[1] === 7) {
        if (currentBlockPos.cy < this.cy + (this.radius/1.5)) {
            this.velY = -1.5;
            this.velX = -1.5;
        } else {
            this.isDropping = true;
            this.velY = -4;
            this.velX = 1.5;
        }
    } else if (BlocksID[1] === 6) {
        if (currentBlockPos.cy < this.cy + (this.radius)) {
            this.velY = -1.5;
        } else {
            this.isDropping = true;
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
    } else if(BlocksID[1] === 4 && this.cx < currentBlockPos.cx + 1 && this.cx > currentBlockPos.cx - 1){
        this.lifeSpan -= du*4;
        this.isLeaving = true;
        this.currentIMG = 8;
        this.velX = 0;
    } else if(BlocksID[1] === 8 && this.cx < currentBlockPos.cx + 2 && this.cx > currentBlockPos.cx - 2){
        entityManager.generateBullet({
            cx : this.cx,
            cy : this.cy,
            vel : this.velX * 2
        });
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
