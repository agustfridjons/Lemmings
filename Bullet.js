//Bullet

function Bullet(descr) {

    this.setup(descr);

};

Bullet.prototype = new Entity();

Bullet.prototype.vel = 2.5;

Bullet.prototype.update = function(du){
    this.cx += this.vel * du;
};

Bullet.prototype.render = function(ctx){
    ctx.fillStyle = "green";
    ctx.fillRect(this.cx,this.cy,10,5);
};

