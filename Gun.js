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
Gun.prototype.currentIMG = 1;
Gun.prototype.time = 0;
Gun.prototype._scale = 1;


Gun.prototype.update = function () {
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