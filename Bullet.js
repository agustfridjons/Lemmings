//Bullet

function Bullet(descr) {

    this.setup(descr);

};

Bullet.prototype = new Entity();

Bullet.prototype.vel = 2.5;
Bullet.prototype.halfHeight = 1;
Bullet.prototype.halfWidth = 2.5;

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
            entityManager.grid.removeBlock(adBlocks[0][1].cx, adBlocks[0][1].cy);
        }
        entityManager.grid.removeBlock(this.cx, this.cy);
        return entityManager.KILL_ME_NOW;
    }
    this.cx += this.vel * du;
};


Bullet.prototype.render = function(ctx){
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.cx,this.cy,this.halfWidth*2,this.halfHeight*2);
    ctx.fillStyle = "black";
};

