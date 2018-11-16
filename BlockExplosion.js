//Bullet

function BlockExplosion(descr) {

    this.setup(descr);

};

BlockExplosion.prototype = new Entity();

BlockExplosion.prototype.halfHeight = 1;
BlockExplosion.prototype.halfWidth = 2.5;
BlockExplosion.prototype.lifeSpan = 500 / NOMINAL_UPDATE_INTERVAL;
BlockExplosion.prototype.fadeThresh = (500 / NOMINAL_UPDATE_INTERVAL) / 2;

BlockExplosion.prototype.blockIMG;

BlockExplosion.prototype.blockX;
BlockExplosion.prototype.blockY;
BlockExplosion.prototype.rotation;
BlockExplosion.prototype.maxVELX = 1;

BlockExplosion.prototype.width = 20;
BlockExplosion.prototype.height = 20;

BlockExplosion.prototype.drawCentredAt = function (ctx, cx, cy, rotation, img) {

    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    //console.log(img);
    ctx.drawImage(img,
                  -w/2, -h/2);
    
    ctx.restore();
};

BlockExplosion.prototype.update = function(du) {
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }
    if (this.rotationSpeed > 0) {
        this.rotationSpeed += 4;
    } else {
        this.rotationSpeed -= 4;
    }

    this.rotation = this.rotationSpeed * (Math.PI / 180);
    if (this.xSpeed != 0) {
        this.xVel += this.xSpeed;
    }
    if (this.xVel > this.maxVELX) {
        this.xVel = this.maxVELX;
    }

    this.blockX += this.xVel * du;
    this.blockY += this.yVel * du;
};


BlockExplosion.prototype.render = function(ctx) {


    if (this.lifeSpan < this.fadeThresh) {
       ctx.globalAlpha = this.lifeSpan / this.fadeThresh;
    }

    this.drawCentredAt(ctx, this.blockX, this.blockY, this.rotation, this.img);
    ctx.globalAlpha = 1;
};

