// ==========
// LEMMING STUFF
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
    this.setup(descr);
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.img0;

    // Set normal drawing scale
    this._scale = 0.6;
};

lemming.prototype = new Entity();

// Initial, inheritable, default values
lemming.prototype.cx = 60;
lemming.prototype.cy = 348;
lemming.prototype.velX = -1.5;
lemming.prototype.velY = 0;
lemming.prototype.numSubSteps = 3;

lemming.prototype.speedX = 1.5;
lemming.prototype.sideJumpSPEED = 4.5;
lemming.prototype.bigJumpSPEED = 4.5;
lemming.prototype.smallJumpSPEED = 3.2;

lemming.prototype.lifeSpan = 1500 / NOMINAL_UPDATE_INTERVAL;

lemming.prototype.isDying = false;
lemming.prototype.explodingIMG = 0; 
lemming.prototype.isExploding = false;
lemming.prototype.isLeaving = false;
lemming.prototype.isDropping = false;
lemming.prototype.isOnRamp = false;
lemming.prototype.isDrowning = false;
// Game sound effects
lemming.prototype.soundE = ["Sounds/water.mp3",
                            "Sounds/zap.mp3",
                            "Sounds/flame.mp3"]; 

lemming.prototype.currentIMG = 0; // Index of image to use

// Used to change currentIMG at certain interval
lemming.prototype.time = 0;       

// Function to move lemming on the x-axis.
lemming.prototype.moveX = function(du) {
    this.cx += (this.velX/1.2) * du;
};

// Function to move lemming on the y-axis.
lemming.prototype.moveY = function(du) {
    this.cy += (this.velY/1.2) * du;
};

// For more accurate collision detection, 
// we divide du into substeps
lemming.prototype.computeSubsteps = function(du, realDU) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.velX * du;
    var nextY = prevY + this.velY * du;
    
    var verticalCollide = false;
    var horizontalCollide = false;

    // Check for horizontal collision
    for(var i = 0; i < this.numSubSteps; i++){
        if (entityManager.grid.collidesHorizontal(prevX, prevY, nextX, nextY, this.radius, this.velX < 0)) {
            this.velX *= -1; // change direction of lemming

            horizontalCollide = true;
            this.moveX(realDU);
            break;
        }
        prevX = nextX;
        prevY = nextY;
        nextX = prevX + this.velX * du;
        nextY = prevY + this.velY * du;
    }

    // Remember my previous position
    prevX = this.cx;
    prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    nextX = prevX + this.velX * du;
    nextY = prevY + this.velY * du;

    // Check for vertical collision
    for(var i = 0; i < this.numSubSteps; i++){
        if (entityManager.grid.collidesVertical(prevX, prevY, nextX, nextY, this.radius, this.velY  < 0)) {
            if (this.velY > 0) {
                this.velY = 0;
                if(!this.isExploding) this.isDropping = false;
                verticalCollide = true;
                
                this.moveY(realDU);
                //console.log("its a hit");
                break;
            } else {
                this.velY *= -1;
    
                verticalCollide = true;
                this.moveY(realDU);
                //console.log("its a hit");
                break;
            }
        }
        prevX = nextX;
        prevY = nextY;
        nextX = prevX + this.velX * du;
        nextY = prevY + this.velY * du;
    }
    // Returns an object containing info 
    // whether a vertical or horizontal collision occurred.
    return {
        vCollide : verticalCollide,
        hCollide : horizontalCollide
    }
};

var NOMINAL_GRAVITY = 0.1;


// Play soundeffects 
lemming.prototype.playEffect = function(index){
    if(!canvas2.getIsMuted()){
        var S = new sound(this.soundE[index]);
        S.playSoundE();
    }
}

// React to water, fire, jumps or door.
lemming.prototype.specialReaction = function(BlocksID, BlocksIDleft, BlocksIDright, adBlocks, du) {

    var currentBlockPos = adBlocks[1][1]; // Lemming current grid position

    // When the block beneath a lemming, turn gravity on
    if (BlocksID[0] != 1 && BlocksIDleft[0] != 1 && BlocksIDright[0] != 1) {
        if(!this.isExploding) this.isDropping = true;
    }
    // Jump when on a large jump pad
    if (BlocksID[1] === 5 && this.cy > currentBlockPos.cy) {
        if(!this.isExploding) this.isDropping = true;
        this.velY = -this.bigJumpSPEED;
    // Jump when on a small jump pad
    } else if (BlocksID[1] === 9 && this.cy > currentBlockPos.cy) {
        if(!this.isExploding) this.isDropping = true;
        this.velY = -this.smallJumpSPEED;
    // Walk up on jump pad and jump when on a right jump pad
    } else if (BlocksID[1] === 7) {
        if (currentBlockPos.cy < this.cy) {
            this.isOnRamp = true;
            this.velY = -this.speedX;
        } else if (currentBlockPos.cy < this.cy + this.radius / 2){
            if(!this.isExploding) this.isDropping = true;
            this.isOnRamp = false;
            this.velY = -this.sideJumpSPEED;
            this.velX = this.speedX;
        }
    // Walk up on jump pad and jump when on a left jump pad
    } else if (BlocksID[1] === 6) {
        if (currentBlockPos.cy < this.cy) {
            this.isOnRamp = true;
            this.velY = -this.speedX;
        } else if (currentBlockPos.cy < this.cy + this.radius / 2) {
            if(!this.isExploding) this.isDropping = true;
            this.isOnRamp = false;
            this.velY = -this.sideJumpSPEED;
            this.velX = -this.speedX;
        }
    // Begin drowning when lemming is in water
    } else if (BlocksID[1] === 3) {
        if(!this.isDrowning){
            this.playEffect(0);
        }
        this.isDrowning = true;
        this.lifeSpan -= du;
        this.currentIMG = 1;
        this.velX /= 1.02;
    // Blow up lemming if it is near fire
    } else if (BlocksID[1] === 2) {
        if(!this.isExploding){
            this.playEffect(2);
        }
        this.explode();
    // If lemming is at a door then let lemming leave
    } else if(BlocksID[1] === 4 && this.cx < currentBlockPos.cx + 1 && this.cx > currentBlockPos.cx - 1){
        this.lifeSpan -= du*4;
        this.isLeaving = true;
        this.currentIMG = 8;
        this.velX = 0;
    // Generate bullet when lemming walks on a gun
    } else if(BlocksID[1] === 8 && this.cx < currentBlockPos.cx + 2 && this.cx > currentBlockPos.cx - 2){
        this.playEffect(1);
        entityManager.generateBullet({
            cx : this.cx,
            cy : this.cy,
            vel : this.velX * 2
        });
        entityManager.grid.removeBlock(this.cx, this.cy);
    }
};

// Function for making a lemming explode
lemming.prototype.explode = function(){
    this.isDropping = false;
    this.isLeaving = false;
    this.isExploding = true;
    if(this.currentIMG > 3) this.currentIMG = 0;
    this.sprite = g_sprites.explosion;
    this.velX = 0;  
    this.velY = 0;  
};

// Function for updating each lemming
lemming.prototype.update = function (du) {
    du = 1;

    // Change sprite if lemming turns around
    if(this.velX < 0 && !this.isExploding){
        this.sprite = g_sprites.reverse;
    } else if(this.velX > 0 && !this.isExploding){
        this.sprite = g_sprites.img0;
    }
    
    // Change current image at certain interval
    if(!this.isExploding && !this.isLeaving){    
        if (this.time % 5 === 0) {
            if (this.currentIMG < 7) {
                this.currentIMG++;
            } else {
                this.currentIMG = 0;
            }
        }
    }
    // If lemming is exploding, change image 
    // at different interval
    if(this.isExploding){
        if (this.time % 10 === 0) {
            if (this.currentIMG < 3) {
                this.currentIMG++;
            } else {
                this.currentIMG = 3;
            }
        }
    }
    // Change to jumping lemming
    if (this.isDropping) {
        this.currentIMG = 8;
    }
    // Decrease life of exploding lemming
    if(this.isExploding){
        this.lifeSpan -= du*2;
    }
    this.time++;
    
    // Check if lemming is dead
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }
    if (this.lifeSpan < 0) { 
        // Check if lemming made it to the door or not
        if (this.isLeaving) {
            entityManager.grid.removeLemming(false);
        } else {
            entityManager.grid.removeLemming(true);
        }
        return entityManager.KILL_ME_NOW;
    }
    
    // Get the id of current block and bottom blocks
    var BlocksID = entityManager.grid.getBlocksID(this.cx, this.cy);
    var BlocksIDleft = entityManager.grid.getBlocksID(this.cx-this.radius, this.cy);
    var BlocksIDright = entityManager.grid.getBlocksID(this.cx+this.radius, this.cy);
    // Get position of adjacent blocks
    var adBlocks = entityManager.grid.findAdjacentBlocks(this.cx, this.cy);
    // React to specialBlocks
    this.specialReaction(BlocksID, BlocksIDleft, BlocksIDright, adBlocks, du);
    
    //If player wants to kill all to restart.
    if(entityManager.killALL && !this.isExploding){
        this.explode();
    }
    // Apply gravity if lemming is dropping
    if (this.isDropping) {
        this.velY += NOMINAL_GRAVITY;
    // Fix lemming position when walking    
    } else if (!this.isOnRamp){
        this.cy = adBlocks[1][1].cy + this.radius - 3;
    }

    // React to collision
    var collision = this.computeSubsteps(du/this.numSubSteps, du);
    
    // If collision did not occur, move lemming
    if (!collision.vCollide) {
        this.cy += (this.velY/1.2) * du;
    }
    if (!collision.hCollide) {
        this.cx += (this.velX/1.2) * du;
    }
};

// Function for rendering each lemming
lemming.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;

    // Fading interval
    var fadeThresh = lemming.prototype.lifeSpan / 3;

    // Decrease globalalpha
    if (this.lifeSpan < fadeThresh) {
       ctx.globalAlpha = this.lifeSpan / fadeThresh;
    }
    if (this.lifeSpan < 0) {
        ctx.globalAlpha = 0;
    }
    if (!this.isLeaving) {
        this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation, this.currentIMG
        );
    } else {
        
    }
    this.sprite.scale = origScale;
    ctx.globalAlpha = 1; // Reset globalalpha
};
