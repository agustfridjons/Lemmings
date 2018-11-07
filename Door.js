//Door


// A generic contructor which accepts an arbitrary descriptor object
function Door(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.door1;
    
    // Set normal drawing scale, and warp state off
    this._scale = 2;
};

Door.prototype = new Entity();



Door.prototype.cx = 180;
Door.prototype.cy = 200;
Door.prototype.currentIMG = 0;
Door.prototype.time = 0;
Door.prototype._scale = 1;


Door.prototype.update = function () {
    

    // Change current image at certain interval    
    if (this.time % 100 === 0) {
        if (this.currentIMG < 1) {
            this.currentIMG++;
        } else {
            this.currentIMG = 0;
        }
    }
    this.time++;
};

Door.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};