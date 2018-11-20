//Portal


// A generic contructor which accepts an arbitrary descriptor object
function Portal(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.portal;
    
    // Set normal drawing scale, and warp state off
    this._scale = 2;
};

Portal.prototype = new Entity();



Portal.prototype.cx = 180;
Portal.prototype.cy = 200;
Portal.prototype.currentIMG = 7;
Portal.prototype.time = 0;
Portal.prototype._scale = 1;
Portal.prototype.alpha = 0;


Portal.prototype.update = function () {
    if(this.time%3 === 0 && this.time < 200){
        if(this.alpha < 1) this.alpha += 0.09;
        if(this.currentIMG !== 0){
            this.currentIMG--;
        } else {
            this.currentIMG = 0;
        }
    } else if(this.time%3 === 0 && this.time > 200 && this.time < 1000 && 
        entityManager.grid.lemmingsInPlay === entityManager.grid.totalLemmings){
        if(this.alpha > 0) this.alpha -= 0.09;
        if(this.currentIMG !== 6){
            this.currentIMG++;
        }else {
            return entityManager.KILL_ME_NOW;
        }
    }
    this.time++;
};

Portal.prototype.render = function (ctx) {
    ctx.globalAlpha = this.alpha;
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation, this.currentIMG
    );
    this.sprite.scale = origScale;
    ctx.globalAlpha = 1;
};
