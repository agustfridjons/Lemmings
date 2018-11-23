//Gun


// A generic contructor which accepts an arbitrary descriptor object
function Gun(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.gun;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
};

Gun.prototype = new Entity();

Gun.prototype.cx = 180;
Gun.prototype.cy = 200;
Gun.prototype.currentIMG = 0;
Gun.prototype.time = 0;
Gun.prototype._scale = 1;


Gun.prototype.update = function () {
    var BlocksID = entityManager.grid.getBlocksID(this.cx, this.cy);

    // If gun has been removed from grid, delete gun
    if (BlocksID[1] != 8) {
        return entityManager.KILL_ME_NOW;
    } 
    // Change current image at certain interval 
    if(this.time%30 === 0){
        if(this.currentIMG >= 1){
            this.currentIMG = 0;
        } else {
            this.currentIMG++;
        }
    }
    this.time++;
};

Gun.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};