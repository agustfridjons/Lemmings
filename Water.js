//Water

// A generic contructor which accepts an arbitrary descriptor object
function Water(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.water1;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.8;
};

Water.prototype = new Entity();



Water.prototype.cx = 180;
Water.prototype.cy = 200;
Water.prototype.currentIMG = 0;
Water.prototype.time = 0;
Water.prototype._scale = 1;


Water.prototype.update = function () {
    

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

Water.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    ctx.globalAlpha = 0.7;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
    ctx.globalAlpha = 1;
};//Water