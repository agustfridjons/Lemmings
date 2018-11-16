//Bullet

function Bullet(descr) {

    this.setup(descr);

};

Bullet.prototype = new Entity();

Bullet.prototype.vel = 2.5;
Bullet.prototype.halfHeight = 2;
Bullet.prototype.halfWidth = 4;

Bullet.prototype.rotation = 0;
Bullet.prototype.rotationSpeed = 0;
Bullet.prototype.rotVEL = 25;

Bullet.prototype.update = function(du){

    var adBlocks = entityManager.grid.findAdjacentBlocks(this.cx, this.cy);
    var currentBlockID = entityManager.grid.getBlocksID(this.cx, this.cy);
    var topBlockID = entityManager.grid.getBlocksID(adBlocks[0][1].cx, adBlocks[0][1].cy);

    if (this.cx + this.halfWidth > g_canvas.width || 
        this.cx - this.halfWidth < 0) {
        return entityManager.KILL_ME_NOW;
    }

    if (currentBlockID[1] === 1) {
        if (topBlockID[1] != 1) {
            entityManager.grid.removeBlock(adBlocks[0][1].cx, adBlocks[0][1].cy, false);
        }
        entityManager.grid.removeBlock(this.cx, this.cy, true);
        return entityManager.KILL_ME_NOW;
    }
    this.rotationSpeed += this.rotVEL;
    this.rotation = this.rotationSpeed * (Math.PI / 180);
    this.cx += this.vel * du;
};

Bullet.prototype.drawCentredAt = function (ctx) {

    var w = this.halfWidth*2,
        h = this.halfHeight*2;

    ctx.save();
    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.rotation);
    ctx.scale(1, 1);

    ctx.fillStyle = "#c700ff";
    ctx.fillRect(-w/2, -h/2,this.halfWidth*2,this.halfHeight*2);
    
    ctx.restore();
};

Bullet.prototype.render = function(ctx){
    this.drawCentredAt(ctx);
};

