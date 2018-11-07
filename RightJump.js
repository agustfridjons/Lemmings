//Right jump pad

function RightJump(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.right1;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.8;
};

RightJump.prototype = new Entity();



RightJump.prototype.cx = 180;
RightJump.prototype.cy = 200;
RightJump.prototype.currentIMG = 0;
RightJump.prototype.time = 0;
RightJump.prototype._scale = 1;


RightJump.prototype.update = function () {
    

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

RightJump.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
};