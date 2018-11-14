//Fire

// A generic contructor which accepts an arbitrary descriptor object
function Fire(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.fire1;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.8;
};

Fire.prototype = new Entity();



Fire.prototype.cx = 180;
Fire.prototype.cy = 200;
Fire.prototype.currentIMG = 0;
Fire.prototype.time = 0;
Fire.prototype._scale = 1;


Fire.prototype.update = function () {
    
    var BlocksID = entityManager.grid.getBlocksID(this.cx, this.cy);
    if (BlocksID[1] != 2) {
        return entityManager.KILL_ME_NOW;
    }

    // Change current image at certain interval    
    if (this.time % 10 === 0) {
        if (this.currentIMG < 3) {
            this.currentIMG++;
        } else {
            this.currentIMG = 0;
        }
    }
    this.time++;
};

Fire.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};